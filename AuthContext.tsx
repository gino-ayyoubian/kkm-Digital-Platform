import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, getDocs, collection, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';
import { INITIAL_ORG_MEMBERS } from './data/orgMembers';
import { OrgMemberProfile, OrgRole, OrgUserPermissions } from './types';


export type { OrgRole, OrgUserPermissions };
export type UserProfile = OrgMemberProfile;

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  allUsers: UserProfile[];
  loading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  login: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithMember: (memberUidOrId: string) => Promise<void>;
  loginWithCredentials: (username: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  switchPersona: (memberUid: string) => void;
  updateUserProfile: (uid: string, updates: Partial<UserProfile>) => Promise<void>;
  addUser: (newUser: Omit<UserProfile, 'uid' | 'createdAt'>) => Promise<UserProfile>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  allUsers: INITIAL_ORG_MEMBERS,
  loading: true,
  isAdmin: false,
  isSuperAdmin: false,
  login: async () => {},
  loginWithGoogle: async () => {},
  loginWithMember: async () => {},
  loginWithCredentials: async () => ({ success: false }),
  switchPersona: () => {},
  updateUserProfile: async () => {},
  addUser: async () => INITIAL_ORG_MEMBERS[0],
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [allUsers, setAllUsers] = useState<UserProfile[]>(INITIAL_ORG_MEMBERS);
  const [loading, setLoading] = useState(true);

  // Sync users from Firestore only when user is authenticated
  const fetchAllUsers = useCallback(async () => {
    if (!db || !auth?.currentUser) return;
    try {
      const snap = await getDocs(collection(db, 'users'));
      if (!snap.empty) {
        const firestoreUsers: UserProfile[] = [];
        snap.forEach(docSnap => {
          const data = docSnap.data();
          firestoreUsers.push({
            ...data,
            uid: docSnap.id,
          } as UserProfile);
        });

        // Merge with INITIAL_ORG_MEMBERS ensuring official members are present
        const merged = [...firestoreUsers];
        for (const defaultMember of INITIAL_ORG_MEMBERS) {
          if (!merged.some(u => u.employeeId === defaultMember.employeeId || u.email === defaultMember.email)) {
            merged.push(defaultMember);
          }
        }
        setAllUsers(merged);
      }
    } catch (_) {
      setAllUsers(INITIAL_ORG_MEMBERS);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchAllUsers();
    }
  }, [currentUser, fetchAllUsers]);

  // Auth state listener
  useEffect(() => {
    if (!auth) { 
      setLoading(false); 
      return; 
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          } else {
            // Check if user email matches an existing organizational member (e.g. info.kkm.co@gmail.com is Executive Admin)
            const matchedMember = INITIAL_ORG_MEMBERS.find(m => 
              m.email.toLowerCase() === user.email?.toLowerCase() ||
              (user.email === 'info.kkm.co@gmail.com' && m.role === 'super_admin')
            );

            const newProfile: UserProfile = matchedMember ? {
              ...matchedMember,
              uid: user.uid,
              email: user.email || matchedMember.email,
              displayName: user.displayName || matchedMember.displayName,
              lastLogin: new Date().toISOString(),
            } : {
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || user.email?.split('@')[0] || 'Employee',
              displayNameFa: 'همکار سازمانی',
              role: (user.email === 'info.kkm.co@gmail.com') ? 'super_admin' : 'employee',
              title: (user.email === 'info.kkm.co@gmail.com') ? 'Enterprise System Administrator' : 'Staff Engineer',
              titleFa: (user.email === 'info.kkm.co@gmail.com') ? 'مدیر ارشد سامانه یکپارچه سازمانی' : 'کارشناس فنی',
              department: (user.email === 'info.kkm.co@gmail.com') ? 'Executive Board' : 'Engineering & Operations',
              departmentFa: 'ستاد مرکزی و عملیات فنی',
              employeeId: `KKM-${Math.floor(100 + Math.random() * 900)}`,
              clearanceLevel: (user.email === 'info.kkm.co@gmail.com') ? 'Top Secret / Strategic' : 'Operational / Tier-2',
              permissions: {
                canApproveAll: user.email === 'info.kkm.co@gmail.com',
                canApproveDepartment: user.email === 'info.kkm.co@gmail.com',
                canManageUsers: user.email === 'info.kkm.co@gmail.com',
                canAccessFinancials: user.email === 'info.kkm.co@gmail.com',
                canAccessConfidentialDMS: true,
                canIssueDirectives: user.email === 'info.kkm.co@gmail.com',
                canSubmitRequests: true,
              },
              status: 'active',
              lastLogin: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            };

            try {
              await setDoc(userDocRef, newProfile);
            } catch (err) {
              console.warn("Couldn't save user profile to firestore:", err);
            }
            setUserProfile(newProfile);
            setAllUsers(prev => {
              if (prev.some(u => u.uid === newProfile.uid)) return prev;
              return [newProfile, ...prev];
            });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        let restoredProfile: UserProfile | null = null;

        try {
          const response = await fetch('/api/auth/me');
          if (response.ok) {
            const data = await response.json();
            if (data?.user) {
              restoredProfile = data.user as UserProfile;
            }
          }
        } catch {
          // Ignore session restore errors and continue to local fallback.
        }

        if (!restoredProfile) {
          const savedPersona = localStorage.getItem('kkm_active_persona');
          if (savedPersona) {
            try {
              const parsed = JSON.parse(savedPersona);
              if (parsed && typeof parsed === 'object' && typeof parsed.uid === 'string' && typeof parsed.email === 'string') {
                restoredProfile = parsed as UserProfile;
              } else {
                localStorage.removeItem('kkm_active_persona');
              }
            } catch {
              localStorage.removeItem('kkm_active_persona');
            }
          }
        }

        setUserProfile(restoredProfile);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const loginWithMember = async (memberUidOrId: string) => {
    const member = allUsers.find(u => u.uid === memberUidOrId || u.employeeId === memberUidOrId);
    if (member) {
      const activeMember: UserProfile = {
        ...member,
        lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };
      setUserProfile(activeMember);
      localStorage.setItem('kkm_active_persona', JSON.stringify(activeMember));
      if (db) {
        try {
          await updateDoc(doc(db, 'users', member.uid), { lastLogin: activeMember.lastLogin });
        } catch (e) {
          // ignore
        }
      }
    } else {
      throw new Error(`Member with ID ${memberUidOrId} not found`);
    }
  };

  const loginWithCredentials = async (
    username: string, 
    pass: string
  ): Promise<{ success: boolean; message?: string }> => {
    // 1. Authenticate with real Express backend server using JWT
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: pass })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const activeMember = data.user as UserProfile;
        setUserProfile(activeMember);
        localStorage.setItem('kkm_active_persona', JSON.stringify(activeMember));

        // Persist to Firestore if available
        if (db && activeMember.uid) {
          try {
            await updateDoc(doc(db, 'users', activeMember.uid), { lastLogin: activeMember.lastLogin });
          } catch (e) {
            // Ignore firestore update errors
          }
        }
        return { success: true };
      } else {
        return {
          success: false,
          message: data.message || 'شناسه کاربری سازمانی یا کلمه عبور وارد شده نادرست است.'
        };
      }
    } catch (apiError) {
      console.warn('Backend authentication API unreachable:', apiError);
      return {
        success: false,
        message: 'سامانه احراز هویت سازمانی در دسترس نیست. تنظیمات سرور و محیط را بررسی نمایید.'
      };
    }
  };

  const switchPersona = (memberUid: string) => {
    const target = allUsers.find(u => u.uid === memberUid);
    if (target) {
      setUserProfile(target);
      localStorage.setItem('kkm_active_persona', JSON.stringify(target));
    }
  };

  const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
    setAllUsers(prev => prev.map(u => u.uid === uid ? { ...u, ...updates, updatedAt: new Date().toISOString() } : u));
    if (userProfile?.uid === uid) {
      const updated = { ...userProfile, ...updates, updatedAt: new Date().toISOString() };
      setUserProfile(updated);
      localStorage.setItem('kkm_active_persona', JSON.stringify(updated));
    }

    if (db) {
      try {
        await updateDoc(doc(db, 'users', uid), {
          ...updates,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Error updating profile in Firestore:', err);
      }
    }
  };

  const addUser = async (newUser: Omit<UserProfile, 'uid' | 'createdAt'>): Promise<UserProfile> => {
    const uid = `kkm-user-${Date.now()}`;
    const userObj: UserProfile = {
      ...newUser,
      uid,
      createdAt: new Date().toISOString(),
    };

    setAllUsers(prev => [userObj, ...prev]);

    if (db) {
      try {
        await setDoc(doc(db, 'users', uid), userObj);
      } catch (err) {
        console.warn('Error creating user in Firestore:', err);
      }
    }

    return userObj;
  };

  const logout = async () => {
    try {
      localStorage.removeItem('kkm_active_persona');
      setUserProfile(null);
      // Inform backend to clear HTTP-only session cookie
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch (e) {
        // ignore
      }
      if (auth && auth.currentUser) {
        await auth.signOut();
      }
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    }
  };

  const isSuperAdmin = userProfile?.role === 'super_admin' || (userProfile?.role as string) === 'admin' || userProfile?.email === 'info.kkm.co@gmail.com';
  const isAdmin = isSuperAdmin || userProfile?.role === 'executive';

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      userProfile, 
      allUsers, 
      loading, 
      isAdmin,
      isSuperAdmin,
      login, 
      loginWithGoogle: login,
      loginWithMember, 
      loginWithCredentials,
      switchPersona,
      updateUserProfile,
      addUser,
      logout 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
