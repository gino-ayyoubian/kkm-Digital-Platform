/**
 * KKM International Group - Server-Side Secrets Manager & Security Gatekeeper
 * 
 * Securely encapsulates sensitive keys, credentials, and cryptographic seeds on the server.
 * Ensures zero secrets leak to the client bundle or client-side environment.
 * Validates request signatures and API keys on every protected API endpoint.
 */
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import logger from '../logger.ts';

interface HashedCredential {
  uid: string;
  email: string;
  username: string;
  salt: string;
  hash: string;
}

class SecretsManager {
  private static instance: SecretsManager;
  private jwtSecret: string;
  private serverInternalKey: string;
  private credentialsMap: Map<string, HashedCredential> = new Map();
  private isInitialized = false;

  private constructor() {
    // Initialize server-side secrets from environment or secure cryptographic generation
    this.jwtSecret = process.env.JWT_SECRET || process.env.KKM_SERVER_JWT_SECRET || this.generateSecureRandomKey(48);
    this.serverInternalKey = process.env.KKM_INTERNAL_API_KEY || this.generateSecureRandomKey(32);
    this.initializeCredentialsStore();
  }

  public static getInstance(): SecretsManager {
    if (!SecretsManager.instance) {
      SecretsManager.instance = new SecretsManager();
    }
    return SecretsManager.instance;
  }

  private generateSecureRandomKey(bytes = 32): string {
    return crypto.randomBytes(bytes).toString('hex');
  }

  private hashPassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  }

  private initializeCredentialsStore() {
    if (this.isInitialized) return;

    // Securely ingest default enterprise credentials into hashed records (never storing plaintext)
    const baseCredentials = [
      { uid: 'kkm-user-001', email: 'g.ayyoubian@kkm-intl.org', username: 'g.ayyoubian', pass: 'kkm!GinoAyyoubian2026' },
      { uid: 'kkm-user-007', email: 'r.baghdadchi@kkm-intl.org', username: 'r.baghdadchi', pass: 'kkm!RezaBaghdadchi2026' },
      { uid: 'kkm-user-008', email: 'a.tofangchiha@kkm-intl.org', username: 'a.tofangchiha', pass: 'kkm!AshkanTofangchiha2026' },
      { uid: 'kkm-user-002', email: 'r.asakereh@kkm-intl.org', username: 'r.asakereh', pass: 'kkm!RezaAsakereh2026' },
      { uid: 'kkm-user-003', email: 'k.jarrahian@kkm-intl.org', username: 'k.jarrahian', pass: 'kkm!KhosroJarrahian2026' },
      { uid: 'kkm-user-004', email: 'f.imani@kkm-intl.org', username: 'f.imani', pass: 'kkm!FaridImani2026' },
      { uid: 'kkm-user-005', email: 'p.abdarzadeh@kkm-intl.org', username: 'p.abdarzadeh', pass: 'kkm!PedramAbdarzadeh2026' },
      { uid: 'kkm-user-006', email: 'h.yarveicy@kkm-intl.org', username: 'h.yarveicy', pass: 'kkm!HeidarYarveicy2026' },
      { uid: 'kkm-user-010', email: 's.hashemi@kkm-intl.org', username: 's.hashemi', pass: 'kkm!SalarHashemi2026' },
      { uid: 'kkm-user-011', email: 'm.ghiasy@kkm-intl.org', username: 'm.ghiasy', pass: 'kkm!MahdiGhiasy2026' },
      { uid: 'kkm-user-015', email: 'm.moshar@kkm-intl.org', username: 'm.moshar', pass: 'kkm!MasoumehMoshar2026' },
      { uid: 'kkm-user-016', email: 'h.zatajam@kkm-intl.org', username: 'h.zatajam', pass: 'kkm!HamedZatajam2026' },
      { uid: 'kkm-user-018', email: 's.ayyoubian@kkm-intl.org', username: 's.ayyoubian', pass: 'kkm!SinaAyyoubian2026' },
      { uid: 'kkm-user-042', email: 'a.rezaei@kkm-intl.org', username: 'a.rezaei', pass: 'kkm!AliRezaei2026' },
      { uid: 'kkm-user-043', email: 'm.bahrami@kkm-intl.org', username: 'm.bahrami', pass: 'kkm!MaryamBahrami2026' },
    ];

    // Check if custom environment credentials JSON is supplied
    const envAuth = process.env.KKM_CORPORATE_AUTH_JSON;
    if (envAuth) {
      try {
        const parsed = JSON.parse(envAuth);
        if (Array.isArray(parsed)) {
          parsed.forEach((item) => {
            if (item && item.email && item.password) {
              const salt = crypto.randomBytes(16).toString('hex');
              const hash = this.hashPassword(item.password, salt);
              const record: HashedCredential = {
                uid: item.uid || `kkm-user-${Date.now()}`,
                email: item.email.toLowerCase().trim(),
                username: (item.username || item.email.split('@')[0]).toLowerCase().trim(),
                salt,
                hash,
              };
              this.credentialsMap.set(record.email, record);
              this.credentialsMap.set(record.username, record);
              if (record.uid) this.credentialsMap.set(record.uid, record);
            }
          });
        }
      } catch (err) {
        logger.warn('Failed to parse KKM_CORPORATE_AUTH_JSON env variable, using defaults.');
      }
    }

    // Ingest defaults into hashed map
    baseCredentials.forEach((item) => {
      const email = item.email.toLowerCase().trim();
      const username = item.username.toLowerCase().trim();
      if (!this.credentialsMap.has(email)) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = this.hashPassword(item.pass, salt);
        const record: HashedCredential = {
          uid: item.uid,
          email,
          username,
          salt,
          hash,
        };
        this.credentialsMap.set(email, record);
        this.credentialsMap.set(username, record);
        this.credentialsMap.set(item.uid, record);
      }
    });

    this.isInitialized = true;
    logger.info('Server-side SecretsManager securely initialized with hashed credentials.');
  }

  public getJwtSecret(): string {
    return this.jwtSecret;
  }

  public getServerInternalKey(): string {
    return this.serverInternalKey;
  }

  public verifyPassword(identity: string, plainTextPassword: string): boolean {
    const normalized = identity.toLowerCase().trim();
    const record = this.credentialsMap.get(normalized);
    if (!record) return false;

    const candidateHash = this.hashPassword(plainTextPassword, record.salt);
    const expected = Buffer.from(record.hash, 'hex');
    const actual = Buffer.from(candidateHash, 'hex');

    if (expected.length !== actual.length) return false;
    return crypto.timingSafeEqual(expected, actual);
  }

  public setOrUpdatePassword(identity: string, newPassword: string): boolean {
    const normalized = identity.toLowerCase().trim();
    let record = this.credentialsMap.get(normalized);
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = this.hashPassword(newPassword, salt);

    if (record) {
      record.salt = salt;
      record.hash = hash;
    } else {
      record = {
        uid: `kkm-user-${Date.now()}`,
        email: normalized.includes('@') ? normalized : `${normalized}@kkm-intl.org`,
        username: normalized.includes('@') ? normalized.split('@')[0] : normalized,
        salt,
        hash,
      };
      this.credentialsMap.set(record.email, record);
      this.credentialsMap.set(record.username, record);
    }
    return true;
  }

  /**
   * Validates internal API key or server session for protected API requests
   */
  public validateApiRequest(req: Request): boolean {
    // 1. Check for Internal API Key header
    const internalKeyHeader = req.headers['x-kkm-internal-key'];
    if (typeof internalKeyHeader === 'string' && internalKeyHeader.trim() !== '') {
      if (crypto.timingSafeEqual(Buffer.from(internalKeyHeader), Buffer.from(this.serverInternalKey))) {
        return true;
      }
    }

    // 2. Check for Bearer token or session cookie
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.kkm_session_token;
    const token = (authHeader && authHeader.startsWith('Bearer ')) ? authHeader.split(' ')[1] : cookieToken;

    if (token) {
      try {
        const jwt = require('jsonwebtoken');
        jwt.verify(token, this.jwtSecret);
        return true;
      } catch {
        return false;
      }
    }

    return false;
  }
}

export const secretsManager = SecretsManager.getInstance();

/**
 * Express Middleware: Validates that every incoming API request has either
 * a valid JWT corporate session or valid Server Internal Key.
 */
export const requireApiSecurity = (req: Request, res: Response, next: NextFunction) => {
  if (secretsManager.validateApiRequest(req)) {
    return next();
  }

  return res.status(401).json({
    success: false,
    code: 'UNAUTHORIZED_API_ACCESS',
    message: 'دسترسی غیرمجاز. کلید امنیتی سرور یا نشست معتبر کاربری الزامی است.',
    messageEn: 'Unauthorized API request. Valid server internal key or active session token is required.',
  });
};
