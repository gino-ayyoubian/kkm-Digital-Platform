/**
 * KKM International Group - Enterprise Backend Server
 * Node.js + Express + JWT Authentication + Firestore Schema Integration
 * Evidence Registry (Levels A-G) & Project Milestones
 */
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import logger from "../logger";
import { INITIAL_ORG_MEMBERS } from "../data/orgMembers";
import { getCorporateAuthSetupMessage, isCorporateAuthConfigured, verifyCorporatePassword } from "./corporateAuth";
import { createInMemoryRateLimit } from "./rateLimit";

export interface AuthenticatedUserPayload {
  uid: string;
  email: string;
  username: string;
  displayName: string;
  displayNameFa?: string;
  role: string;
  department: string;
  employeeId: string;
  clearanceLevel: string;
  permissions: Record<string, boolean>;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUserPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = "12h";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required.");
}

/**
 * Enterprise Protected Route Middleware
 * Validates corporate session JWT from Authorization Bearer header or HTTP-only cookie.
 */
export const requireCorporateAuth = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.kkm_session_token) {
    token = req.cookies.kkm_session_token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      code: "UNAUTHORIZED",
      message: "احراز هویت سازمانی الزامی است. لطفاً وارد پرتال شوید.",
      messageEn: "Corporate authentication required. Please sign in."
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthenticatedUserPayload;
    req.user = decoded;
    next();
  } catch (err: any) {
    logger.warn(`Corporate JWT verification failure: ${err?.message}`);
    return res.status(401).json({
      success: false,
      code: "TOKEN_EXPIRED_OR_INVALID",
      message: "نشست کاری شما منقضی شده یا نامعتبر است. لطفاً مجدداً وارد شوید.",
      messageEn: "Session expired or invalid token."
    });
  }
};

/**
 * RBAC Role Authorization Middleware
 */
export const requireRoles = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        code: "FORBIDDEN_PRIVILEGES",
        message: "شما دسترسی مجاز به این بخش از پرتال سازمانی را ندارید.",
        messageEn: "Access denied. Insufficient role permissions."
      });
    }
    next();
  };
};

/**
 * Configure and mount enterprise backend API routes on the Express application
 */
export function setupBackendRoutes(app: express.Application) {
  // Mount Cookie Parser
  app.use(cookieParser());
  const authRateLimit = createInMemoryRateLimit({
    windowMs: 15 * 60 * 1000,
    maxRequests: 10,
    message: "Too many authentication attempts. Please try again later."
  });
  const portalReadRateLimit = createInMemoryRateLimit({
    windowMs: 60 * 1000,
    maxRequests: 120,
    message: "Too many portal requests. Please slow down and try again."
  });

  // Corporate Users Store (Initialized from INITIAL_ORG_MEMBERS, dynamic in-memory)
  const corporateUsers = [...INITIAL_ORG_MEMBERS];

  // Evidence Registry Levels A through G (P0-13 / Technical & Scientific Evidence)
  const evidenceRegistryItems = [
    {
      id: "EV-2026-A-001",
      registryCode: "KKM-EVD-A-001",
      title: "گواهی ثبت بین‌المللی اختراع هیدرودینامیک GMEL در کنوانسیون PCT ژنو",
      titleFa: "گواهی ثبت بین‌المللی اختراع هیدرودینامیک GMEL در کنوانسیون PCT ژنو",
      evidenceLevel: "Level A",
      domain: "Energy Systems & Intellectual Property",
      domainFa: "سامانه‌های انرژی و مالکیت فکری",
      certificationDate: "2026-01-14",
      certifyingAuthority: "WIPO / Swiss Federal Institute of IP",
      cryptographicHash: "sha256:4a8b79f9c0e21a8d9b1c78e9f2a4b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5",
      createdAt: "2026-01-14T10:00:00Z"
    },
    {
      id: "EV-2026-B-002",
      registryCode: "KKM-EVD-B-002",
      title: "تست آزمایشگاهی صحه‌گذاری پایلوت سلول کاتالیزوری در دانشگاه لوزان (EPFL)",
      titleFa: "تست آزمایشگاهی صحه‌گذاری پایلوت سلول کاتالیزوری در دانشگاه لوزان (EPFL)",
      evidenceLevel: "Level B",
      domain: "Applied Physics & Green Chemistry",
      domainFa: "فیزیک کاربردی و شیمی سبز",
      certificationDate: "2026-03-20",
      certifyingAuthority: "EPFL Energy Research Center",
      cryptographicHash: "sha256:9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d",
      createdAt: "2026-03-20T14:30:00Z"
    },
    {
      id: "EV-2026-C-003",
      registryCode: "KKM-EVD-C-003",
      title: "نتایج شبیه‌سازی عددی دوقلوی دیجیتال جریان گردابی GMEL تحت استاندارد ASME",
      titleFa: "نتایج شبیه‌سازی عددی دوقلوی دیجیتال جریان گردابی GMEL تحت استاندارد ASME",
      evidenceLevel: "Level C",
      domain: "Digital Twin & Computational Fluid Dynamics",
      domainFa: "دوقلوی دیجیتال و دینامیک محاسباتی سیالات",
      certificationDate: "2026-05-18",
      certifyingAuthority: "KKM Digital Twin Verification Lab",
      cryptographicHash: "sha256:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
      createdAt: "2026-05-18T09:15:00Z"
    },
    {
      id: "EV-2026-D-004",
      registryCode: "KKM-EVD-D-004",
      title: "گزارش ممیزی سوم‌شخص محاسبه ردپای کربن و اعتبارات کربن جنگل‌داری هوشمند",
      titleFa: "گزارش ممیزی سوم‌شخص محاسبه ردپای کربن و اعتبارات کربن جنگل‌داری هوشمند",
      evidenceLevel: "Level D",
      domain: "Sustainability & Carbon Offsets",
      domainFa: "پایداری زیست‌محیطی و اعتبارات کربن",
      certificationDate: "2026-07-02",
      certifyingAuthority: "TÜV SÜD Sustainability Audit Bureau",
      cryptographicHash: "sha256:5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
      createdAt: "2026-07-02T11:45:00Z"
    },
    {
      id: "EV-2026-E-005",
      registryCode: "KKM-EVD-E-005",
      title: "تاییدیه‌های انطباق سخت‌افزاری IoT و سنسورهای پایش بلادرنگ با ISO 14001",
      titleFa: "تاییدیه‌های انطباق سخت‌افزاری IoT و سنسورهای پایش بلادرنگ با ISO 14001",
      evidenceLevel: "Level E",
      domain: "Industrial IoT & Environmental Telemetry",
      domainFa: "اینترنت اشیاء صنعتی و تله‌متری محیطی",
      certificationDate: "2026-08-11",
      certifyingAuthority: "International Electrotechnical Commission (IEC)",
      cryptographicHash: "sha256:7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
      createdAt: "2026-08-11T16:20:00Z"
    },
    {
      id: "EV-2026-F-006",
      registryCode: "KKM-EVD-F-006",
      title: "تاییدیه میدانی عملکرد فصلی میکروتوربین هیدروکینتیک رودخانه‌ای REE در کارون",
      titleFa: "تاییدیه میدانی عملکرد فصلی میکروتوربین هیدروکینتیک رودخانه‌ای REE در کارون",
      evidenceLevel: "Level F",
      domain: "Field Operations & Hydrokinetics",
      domainFa: "عملیات میدانی و هیدروکینتیک",
      certificationDate: "2026-09-05",
      certifyingAuthority: "Ministry of Energy & Water Resources",
      cryptographicHash: "sha256:3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e",
      createdAt: "2026-09-05T08:00:00Z"
    },
    {
      id: "EV-2026-G-007",
      registryCode: "KKM-EVD-G-007",
      title: "اسناد مالی و قراردادهای راهبردی سرمایه‌گذاری مشترک کنسرسیوم اوراسیا",
      titleFa: "اسناد مالی و قراردادهای راهبردی سرمایه‌گذاری مشترک کنسرسیوم اوراسیا",
      evidenceLevel: "Level G",
      domain: "Strategic Partnerships & Investment Banking",
      domainFa: "مشارکت‌های راهبردی و سرمایه‌گذاری بانکی",
      certificationDate: "2026-09-18",
      certifyingAuthority: "KKM Executive Board & Legal Counsel",
      cryptographicHash: "sha256:2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c",
      createdAt: "2026-09-18T15:00:00Z"
    }
  ];

  // Project Milestones
  const projectMilestones = [
    {
      id: "MS-GMEL-01",
      projectId: "PRJ-GMEL-ALPHA",
      projectTitle: "توسعه نیروگاه هیدروکینتیک مدولار GMEL فاز پایلوت",
      projectTitleFa: "توسعه نیروگاه هیدروکینتیک مدولار GMEL فاز پایلوت",
      milestoneCode: "GMEL-M1",
      title: "تکمیل مدل‌سازی دوقلوی دیجیتال و اخذ تأییدیه شبیه‌سازی CFD",
      titleFa: "تکمیل مدل‌سازی دوقلوی دیجیتال و اخذ تأییدیه شبیه‌سازی CFD",
      targetDate: "2026-04-30",
      completionDate: "2026-04-25",
      status: "completed",
      evidenceLevelRequired: "Level C",
      assignedLead: "Dr. Reza Asakereh",
      department: "R&D & AI Systems",
      departmentFa: "تحقیق و توسعه، هوش مصنوعی و سامانه‌های شناختی",
      createdAt: "2026-01-20T08:00:00Z"
    },
    {
      id: "MS-GMEL-02",
      projectId: "PRJ-GMEL-ALPHA",
      projectTitle: "توسعه نیروگاه هیدروکینتیک مدولار GMEL فاز پایلوت",
      projectTitleFa: "توسعه نیروگاه هیدروکینتیک مدولار GMEL فاز پایلوت",
      milestoneCode: "GMEL-M2",
      title: "تست هیدرودینامیکی میدانی و تطبیق داده‌های بلادرنگ IoT",
      titleFa: "تست هیدرودینامیکی میدانی و تطبیق داده‌های بلادرنگ IoT",
      targetDate: "2026-11-15",
      status: "in_progress",
      evidenceLevelRequired: "Level F",
      assignedLead: "Eng. Farzad Kazemi",
      department: "Engineering & Technical Office",
      departmentFa: "دفتر فنی و مهندسی سیستم‌ها",
      createdAt: "2026-02-10T10:00:00Z"
    },
    {
      id: "MS-CARBON-01",
      projectId: "PRJ-ECO-CARBON",
      projectTitle: "پلتفرم صدور و معامله اعتبارات کربن جنگل‌های هوشمند",
      projectTitleFa: "پلتفرم صدور و معامله اعتبارات کربن جنگل‌های هوشمند",
      milestoneCode: "CARB-M1",
      title: "ممیزی امنیتی قرارداد هوشمند و ثبت در Evidence Registry",
      titleFa: "ممیزی امنیتی قرارداد هوشمند و ثبت در Evidence Registry",
      targetDate: "2026-10-01",
      status: "in_progress",
      evidenceLevelRequired: "Level D",
      assignedLead: "Dr. Khosro Jarrahian",
      department: "Science & Sustainability",
      departmentFa: "علوم پایه، پایداری و اکوسیستم‌ها",
      createdAt: "2026-03-01T12:00:00Z"
    }
  ];

  // In-Memory Automation Requests
  const portalRequests = [
    {
      id: "REQ-2026-1042",
      type: "leave",
      title: "درخواست مرخصی استحقاقی سالانه - ۳ روز کاری",
      titleEn: "Annual Leave Request - 3 Days",
      requesterId: "kkm-user-005",
      requesterName: "Dr. Ali Rezaei",
      department: "Science & Sustainability",
      priority: "normal",
      status: "pending",
      details: "درخواست مرخصی استحقاقی جهت شرکت در همایش بین‌المللی انرژی و محیط‌زیست ژنو",
      startDate: "2026-10-05",
      endDate: "2026-10-08",
      approvals: [
        {
          step: 1,
          role: "مدیر واحد پایداری",
          approverName: "Dr. Reza Asakereh",
          status: "pending"
        }
      ],
      createdAt: "2026-09-22T08:30:00Z",
      updatedAt: "2026-09-22T08:30:00Z"
    },
    {
      id: "REQ-2026-1039",
      type: "procurement",
      title: "خرید تجهیزات سرور GPU کلاستر مدل NVIDIA H100",
      titleEn: "Procurement of NVIDIA H100 GPU Cluster Nodes",
      requesterId: "kkm-user-002",
      requesterName: "Dr. Reza Asakereh",
      department: "R&D & AI Systems",
      priority: "critical",
      status: "approved",
      amount: "45000 USD",
      details: "توسعه زیرساخت محاسباتی هوش مصنوعی لایه دوقلوی دیجیتال برای مدلسازی هیدرودینامیکی GMEL",
      approvals: [
        {
          step: 1,
          role: "مدیر ارشد فناوری",
          approverName: "Dr. Reza Asakereh",
          status: "approved",
          comments: "تایید فنی انجام شد. اولویت راهبردی گروه.",
          timestamp: "2026-09-21 10:14"
        },
        {
          step: 2,
          role: "مدیرعامل و هیئت مدیره",
          approverName: "Gino Ayyoubian",
          status: "approved",
          comments: "تخصیص بودجه از محل ذخیره استراتژیک R&D تصویب شد.",
          timestamp: "2026-09-21 14:30"
        }
      ],
      createdAt: "2026-09-21T09:00:00Z",
      updatedAt: "2026-09-21T14:30:00Z"
    },
    {
      id: "REQ-2026-1044",
      type: "technical_review",
      title: "ممیزی امنیتی کد قرارداد هوشمند بلاکچین صدور اعتبارات کربن",
      titleEn: "Security & Formal Verification of Carbon Credit Smart Contract",
      requesterId: "kkm-user-003",
      requesterName: "Dr. Kasra Jarrahian",
      department: "Energy Systems",
      priority: "urgent",
      status: "in_review",
      details: "بررسی رسمی آسیب‌پذیری‌های امنیتی اسمارت‌کانترکت‌های شبکه قبل از دیپلوی روی شبکه اصلی",
      approvals: [
        {
          step: 1,
          role: "ممیز ارشد نرم‌افزار و قرارداد هوشمند",
          approverName: "Eng. Farzad Kazemi",
          status: "pending"
        }
      ],
      createdAt: "2026-09-22T14:20:00Z",
      updatedAt: "2026-09-22T14:20:00Z"
    }
  ];

  const portalRecoveryTickets: Array<{
    ticketId: string;
    targetEmail: string;
    requesterNote?: string;
    status: string;
    createdAt: string;
  }> = [];

  // ==========================================
  // AUTHENTICATION & SESSION MANAGEMENT ROUTES
  // ==========================================

  /**
   * POST /api/auth/login
   * Validates corporate credentials and returns a secure JWT token + HTTP-only session cookie
   */
  app.post("/api/auth/login", authRateLimit, (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "نام کاربری سازمانی و رمز عبور الزامی است.",
        messageEn: "Corporate username and password are required."
      });
    }

    const raw = username.trim().toLowerCase();
    const cleanUsername = raw.includes("@") ? raw : `${raw}@kkm-intl.org`;

    // Find member by email, username, or employee ID
    const member = corporateUsers.find((u) => {
      const email = u.email.toLowerCase();
      const userField = (u.username || "").toLowerCase();
      const empId = u.employeeId.toLowerCase();
      return email === raw || email === cleanUsername || userField === raw || userField === cleanUsername || empId === raw;
    });

    if (!member) {
      return res.status(401).json({
        success: false,
        message: "شناسه کاربری سازمانی یافت نشد. دسترسی انحصاری برای اعضای تأییدشده KKM می‌باشد.",
        messageEn: "Corporate identity not found in enterprise registry."
      });
    }

    if (!isCorporateAuthConfigured()) {
      return res.status(503).json({
        success: false,
        message: "سامانه احراز هویت سازمانی هنوز پیکربندی نشده است.",
        messageEn: getCorporateAuthSetupMessage()
      });
    }

    if (!verifyCorporatePassword(member, username, password)) {
      return res.status(401).json({
        success: false,
        message: "کلمه عبور سازمانی وارد شده نادرست است. در صورت فراموشی درخواست بازیابی به بخش IT ارسال فرمایید.",
        messageEn: "Invalid corporate password. Use 'Request IT Support' to recover."
      });
    }

    // Generate JWT Payload
    const userPayload: AuthenticatedUserPayload = {
      uid: member.uid,
      email: member.email,
      username: member.username || member.email,
      displayName: member.displayName,
      displayNameFa: member.displayNameFa,
      role: member.role,
      department: member.department,
      employeeId: member.employeeId,
      clearanceLevel: member.clearanceLevel,
      permissions: member.permissions
    };

    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    // Update last login
    member.lastLogin = new Date().toISOString().replace("T", " ").substring(0, 16);

    // Set secure HTTP-only cookie
    res.cookie("kkm_session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 12 * 60 * 60 * 1000 // 12 hours
    });

    logger.info(`Corporate login successful for ${member.email} [${member.role}]`);

    return res.status(200).json({
      success: true,
      user: {
        ...userPayload,
        title: member.title,
        titleFa: member.titleFa,
        lastLogin: member.lastLogin
      }
    });
  });

  /**
   * GET /api/auth/me
   * Validates active corporate JWT session and returns current profile
   */
  app.get("/api/auth/me", requireCorporateAuth, (req: Request, res: Response) => {
    const userPayload = req.user!;
    const member = corporateUsers.find((u) => u.uid === userPayload.uid);

    return res.json({
      success: true,
      user: member || userPayload
    });
  });

  /**
   * POST /api/auth/logout
   * Clears corporate session cookie
   */
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    res.clearCookie("kkm_session_token");
    return res.json({ success: true, message: "خروج موفقیت‌آمیز از پرتال سازمانی" });
  });

  /**
   * POST /api/portal/auth/recovery-request
   * Formal IT Helpdesk Ticket Dispatch
   */
  app.post("/api/portal/auth/recovery-request", authRateLimit, (req: Request, res: Response) => {
    const { email, reason } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Corporate email is required." });
    }

    const ticketId = `IT-SEC-TKT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTicket = {
      ticketId,
      targetEmail: email.trim().toLowerCase(),
      requesterNote: reason || "کاربر درخواست بازنشانی رمز عبور سازمانی ثبت نموده است.",
      status: "dispatched_to_it_desk",
      createdAt: new Date().toISOString()
    };

    portalRecoveryTickets.push(newTicket);
    logger.info(`Password recovery ticket logged for ${email}: ${ticketId}`);

    return res.status(200).json({
      success: true,
      ticketId,
      itDeskEmail: "it-security@kkm-intl.org",
      message: "درخواست بازیابی رمز عبور به بخش امنیت و فناوری اطلاعات (IT Desk) ارسال شد.",
      timestamp: newTicket.createdAt
    });
  });

  // ==========================================
  // PROTECTED EVIDENCE REGISTRY (LEVELS A - G)
  // ==========================================

  /**
   * GET /api/portal/evidence-registry
   * Returns certified evidence items across levels A through G
   */
  app.get("/api/portal/evidence-registry", portalReadRateLimit, requireCorporateAuth, (req: Request, res: Response) => {
    return res.json({
      success: true,
      levels: ["Level A", "Level B", "Level C", "Level D", "Level E", "Level F", "Level G"],
      items: evidenceRegistryItems
    });
  });

  /**
   * POST /api/portal/evidence-registry
   * Register new certified evidence artifact (Requires Executive or Director role)
   */
  app.post("/api/portal/evidence-registry", requireCorporateAuth, requireRoles(["super_admin", "executive", "director"]), (req: Request, res: Response) => {
    const { title, evidenceLevel, domain, certifyingAuthority, cryptographicHash } = req.body;
    if (!title || !evidenceLevel || !domain) {
      return res.status(400).json({ error: "Title, evidenceLevel, and domain are required." });
    }

    const levelCode = evidenceLevel.replace("Level ", "");
    const newEvidence = {
      id: `EV-2026-${levelCode}-${Math.floor(100 + Math.random() * 900)}`,
      registryCode: `KKM-EVD-${levelCode}-${Math.floor(100 + Math.random() * 900)}`,
      title,
      titleFa: req.body.titleFa || title,
      evidenceLevel,
      domain,
      domainFa: req.body.domainFa || domain,
      certificationDate: new Date().toISOString().split("T")[0],
      certifyingAuthority: certifyingAuthority || "KKM Technical Audit Bureau",
      cryptographicHash: cryptographicHash || `sha256:generated-${Math.random().toString(36).substring(2)}`,
      createdAt: new Date().toISOString()
    };

    evidenceRegistryItems.unshift(newEvidence);
    return res.status(201).json({ success: true, item: newEvidence });
  });

  // ==========================================
  // PROTECTED PROJECT MILESTONES
  // ==========================================

  /**
   * GET /api/portal/project-milestones
   * Returns strategic project milestones and evidence requirements
   */
  app.get("/api/portal/project-milestones", portalReadRateLimit, requireCorporateAuth, (req: Request, res: Response) => {
    return res.json({ success: true, milestones: projectMilestones });
  });

  /**
   * POST /api/portal/project-milestones
   * Create new milestone (Protected)
   */
  app.post("/api/portal/project-milestones", requireCorporateAuth, (req: Request, res: Response) => {
    const newMs = req.body;
    if (!newMs || !newMs.title || !newMs.projectId) {
      return res.status(400).json({ error: "Missing required milestone attributes." });
    }

    const milestoneId = `MS-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullMilestone = {
      ...newMs,
      id: milestoneId,
      createdAt: new Date().toISOString()
    };

    projectMilestones.push(fullMilestone);
    return res.status(201).json({ success: true, milestone: fullMilestone });
  });

  // ==========================================
  // AUTOMATION CARTABLE ENDPOINTS (PROTECTED)
  // ==========================================

  app.get("/api/portal/cartable/requests", portalReadRateLimit, requireCorporateAuth, (req: Request, res: Response) => {
    return res.json({ requests: portalRequests });
  });

  app.post("/api/portal/cartable/requests", requireCorporateAuth, (req: Request, res: Response) => {
    const newReq = req.body;
    if (!newReq || !newReq.title) {
      return res.status(400).json({ error: "Invalid request payload." });
    }
    const requestId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullRequest = {
      ...newReq,
      id: requestId,
      approvals: newReq.approvals || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: newReq.status || "pending"
    };
    portalRequests.unshift(fullRequest);
    return res.status(201).json({ success: true, request: fullRequest });
  });

  app.patch("/api/portal/cartable/requests/:id/status", requireCorporateAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, comments, approverName, approverRole } = req.body;
    const reqItem = portalRequests.find((r) => r.id === id);
    if (!reqItem) {
      return res.status(404).json({ error: "Request not found." });
    }
    reqItem.status = status;
    reqItem.updatedAt = new Date().toISOString();
    if (comments || approverName) {
      reqItem.approvals.push({
        step: reqItem.approvals.length + 1,
        role: approverRole || req.user?.role || "مقام تاییدکننده",
        approverName: approverName || req.user?.displayName || "System Approver",
        status: status === "approved" ? "approved" : "rejected",
        comments: comments || "",
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 16)
      });
    }
    return res.json({ success: true, request: reqItem });
  });
}
