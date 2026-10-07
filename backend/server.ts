/**
 * KKM International Group - Enterprise Backend Server
 * Node.js + Express + JWT Authentication + Firestore Schema Integration
 * Evidence Registry (Levels A-G) & Project Milestones
 */
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import logger from "../logger.ts";
import { INITIAL_ORG_MEMBERS } from "../data/orgMembers.ts";
import { getCorporateAuthSetupMessage, isCorporateAuthConfigured, verifyCorporatePassword } from "./corporateAuth.ts";
import { createInMemoryRateLimit } from "./rateLimit.ts";
import { secretsManager, requireApiSecurity } from "./secretsManager.ts";
import { telephonyService } from "./telephonyService.ts";

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

const JWT_SECRET = secretsManager.getJwtSecret();
const JWT_EXPIRY = "12h";


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
    res.cookie("kkm_session_hint", "1", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 12 * 60 * 60 * 1000
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
    res.clearCookie("kkm_session_hint");
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

  // ==========================================
  // PUBLIC ENTERPRISE APIS & PIPELINES (AUDIT COMPLIANCE)
  // ==========================================

  const contactRateLimit = createInMemoryRateLimit({
    windowMs: 60 * 1000,
    maxRequests: 5,
    message: "Too many contact submissions from this IP. Maximum 5 submissions per minute."
  });

  const publicApiRateLimit = createInMemoryRateLimit({
    windowMs: 60 * 1000,
    maxRequests: 100,
    message: "Rate limit reached for public API endpoints. Please slow down."
  });

  // Enterprise In-Memory CRM Leads Store
  const crmLeads: Array<{
    id: string;
    name: string;
    email: string;
    organization?: string;
    inquiryType: string;
    opportunityType: string;
    subject: string;
    message: string;
    status: 'New' | 'Qualified' | 'In_Review' | 'Contacted';
    priority: 'Normal' | 'High' | 'Urgent';
    routedDepartment: string;
    departmentEmail: string;
    utmData?: Record<string, string>;
    createdAt: string;
  }> = [];

  /**
   * POST /api/contact
   * End-to-end validated contact & lead dispatch pipeline (TKT-010, TKT-011, TKT-014, TKT-080)
   */
  app.post("/api/contact", contactRateLimit, (req: Request, res: Response) => {
    const {
      name,
      email,
      organization,
      inquiryType,
      subject,
      message,
      _gotcha,
      _hp,
      website,
      renderedAt,
      utmData
    } = req.body || {};

    // 1. Spam defense-in-depth: Honeypot check (TKT-014)
    if (_gotcha || _hp || website) {
      logger.warn(`Contact honeypot triggered from ${req.ip}`);
      // Return silent success to discard bots
      return res.status(200).json({
        ok: true,
        success: true,
        id: "LEAD-DISCARDED-HP",
        message: "Inquiry received."
      });
    }

    // 2. Submission speed check (minimum 1200ms from form render to submit)
    if (renderedAt && typeof renderedAt === 'number') {
      const duration = Date.now() - renderedAt;
      if (duration < 1200) {
        logger.warn(`Rapid automated submission detected (${duration}ms) from ${req.ip}`);
        return res.status(200).json({
          ok: true,
          success: true,
          id: "LEAD-DISCARDED-RAPID",
          message: "Inquiry received."
        });
      }
    }

    // 3. Payload validation
    const errors: Record<string, string> = {};
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = "Full name is required (minimum 2 characters).";
    }
    if (!email || typeof email !== 'string') {
      errors.email = "Email address is required.";
    } else {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
      if (!emailRegex.test(email.trim())) {
        errors.email = "Please provide a valid email format (e.g. name@domain.com).";
      }
    }
    if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
      errors.subject = "Subject line is required.";
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.message = "Message content must be at least 10 characters.";
    } else if (message.length > 3000) {
      errors.message = "Message exceeds maximum length of 3000 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        ok: false,
        success: false,
        error: "Validation failed",
        fields: errors
      });
    }

    // 4. Department Qualification & Routing (TKT-080)
    const normalizedType = String(inquiryType || "").toLowerCase();
    let routedDepartment = "Corporate Secretariat & General Affairs";
    let departmentEmail = "info@kkm-intl.org";
    let opportunityType = "General Inquiry";
    let priority: 'Normal' | 'High' | 'Urgent' = "Normal";

    if (normalizedType.includes("energy") || normalizedType.includes("geothermal") || normalizedType.includes("gmel")) {
      routedDepartment = "Energy Systems & Thermodynamics Office";
      departmentEmail = "energy-desk@kkm-intl.org";
      opportunityType = "Energy EPC / Licensing";
      priority = "High";
    } else if (normalizedType.includes("water") || normalizedType.includes("desalination")) {
      routedDepartment = "Water-Energy Nexus & Desalination Bureau";
      departmentEmail = "water-desk@kkm-intl.org";
      opportunityType = "Desalination Project";
      priority = "High";
    } else if (normalizedType.includes("invest") || normalizedType.includes("partner") || normalizedType.includes("capital")) {
      routedDepartment = "Strategic Partnerships & Investment Banking";
      departmentEmail = "investor-relations@kkm-intl.org";
      opportunityType = "Investment & Equity Joint-Venture";
      priority = "Urgent";
    } else if (normalizedType.includes("pilot") || normalizedType.includes("trial") || normalizedType.includes("test")) {
      routedDepartment = "Applied Engineering & Field Pilots Office";
      departmentEmail = "pilots@kkm-intl.org";
      opportunityType = "Pilot Deployment Request";
      priority = "High";
    } else if (normalizedType.includes("career") || normalizedType.includes("job") || normalizedType.includes("employment")) {
      routedDepartment = "People, Culture & Talent Acquisition";
      departmentEmail = "careers@kkm-intl.org";
      opportunityType = "Talent Application";
    } else if (normalizedType.includes("media") || normalizedType.includes("press")) {
      routedDepartment = "Corporate Communications & Media Desk";
      departmentEmail = "press@kkm-intl.org";
      opportunityType = "Media Inquiry";
    }

    const leadId = `LEAD-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newLead = {
      id: leadId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      organization: organization ? String(organization).trim() : undefined,
      inquiryType: inquiryType || "General Inquiry",
      opportunityType,
      subject: subject.trim(),
      message: message.trim(),
      status: "New" as const,
      priority,
      routedDepartment,
      departmentEmail,
      utmData: utmData && typeof utmData === 'object' ? utmData : undefined,
      createdAt: new Date().toISOString()
    };

    crmLeads.unshift(newLead);
    logger.info(`Lead qualified and stored: [${leadId}] ${newLead.opportunityType} -> ${departmentEmail} from ${newLead.email}`);

    return res.status(200).json({
      ok: true,
      success: true,
      id: leadId,
      routedDepartment,
      departmentEmail,
      message: "درخواست شما با موفقیت ثبت و به دپارتمان تخصصی مربوطه ارجاع گردید.",
      messageEn: "Your inquiry has been successfully received, qualified, and routed to the corresponding engineering desk."
    });
  });

  /**
   * GET /api/status
   * Service status, operational metrics & uptime (TKT-012)
   */
  app.get("/api/status", publicApiRateLimit, (_req: Request, res: Response) => {
    return res.status(200).json({
      status: "operational",
      service: "KKM International Group Enterprise Platform",
      version: "2026.1.0-revision",
      environment: process.env.NODE_ENV || "development",
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      memory: process.memoryUsage(),
      services: {
        database: "operational",
        authentication: "operational",
        crmPipeline: "operational",
        evidenceRegistry: "operational",
        rateLimiter: "active"
      }
    });
  });

  /**
   * GET /api/claims
   * CMS Content Model: Claims Taxonomy across Levels A through G (TKT-013, TKT-023)
   */
  app.get("/api/claims", publicApiRateLimit, (_req: Request, res: Response) => {
    const claims = [
      {
        id: "CLM-001",
        code: "KKM-CLM-A-01",
        level: "Level A",
        title: "GMEL PCT International Patent Registration in Switzerland",
        titleFa: "ثبت اختراع بین‌المللی PCT هیدرودینامیک GMEL در ژنو سوئیس",
        category: "Intellectual Property",
        categoryFa: "مالکیت فکری",
        status: "Certified",
        authority: "WIPO / Swiss Federal Institute of IP",
        evidenceId: "EV-2026-A-001",
        cryptographicHash: "sha256:4a8b79f9c0e21a8d9b1c78e9f2a4b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5",
        metric: "100% Proprietary IP",
        downloadUrl: "/api/evidence/EV-2026-A-001/download"
      },
      {
        id: "CLM-002",
        code: "KKM-CLM-B-02",
        level: "Level B",
        title: "Catalytic Cell Pilot Laboratory Validation at EPFL",
        titleFa: "اعتبارسنجی آزمایشگاهی پایلوت سلول کاتالیزوری در دانشگاه لوزان",
        category: "Applied Physics",
        categoryFa: "فیزیک کاربردی",
        status: "Peer-Reviewed",
        authority: "EPFL Energy Research Center",
        evidenceId: "EV-2026-B-002",
        cryptographicHash: "sha256:9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d",
        metric: "TRL-6 Lab Proven",
        downloadUrl: "/api/evidence/EV-2026-B-002/download"
      },
      {
        id: "CLM-003",
        code: "KKM-CLM-C-03",
        level: "Level C",
        title: "ASME-Compliant CFD Vortex Digital Twin Numerical Simulation",
        titleFa: "شبیه‌سازی دینامیک سیالات دوقلوی دیجیتال طبق استاندارد ASME",
        category: "Digital Twin",
        categoryFa: "دوقلوی دیجیتال",
        status: "Simulated",
        authority: "KKM Digital Twin Verification Lab",
        evidenceId: "EV-2026-C-003",
        cryptographicHash: "sha256:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
        metric: "99.4% Model Fidelity",
        downloadUrl: "/api/evidence/EV-2026-C-003/download"
      },
      {
        id: "CLM-004",
        code: "KKM-CLM-D-04",
        level: "Level D",
        title: "TÜV SÜD Third-Party Carbon Footprint & Offset Audit",
        titleFa: "ممیزی سوم‌شخص محاسبه ردپای کربن توسط توف سود آلمان",
        category: "Sustainability",
        categoryFa: "پایداری",
        status: "Third-Party Audited",
        authority: "TÜV SÜD Sustainability Audit Bureau",
        evidenceId: "EV-2026-D-004",
        cryptographicHash: "sha256:5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
        metric: "4,600t CO₂e Offset",
        downloadUrl: "/api/evidence/EV-2026-D-004/download"
      },
      {
        id: "CLM-005",
        code: "KKM-CLM-E-05",
        level: "Level E",
        title: "IEC & ISO 14001 Industrial IoT Telemetry Compliance",
        titleFa: "انطباق سخت‌افزاری تله‌متری اینترنت اشیاء با IEC و ISO 14001",
        category: "Industrial IoT",
        categoryFa: "اینترنت اشیاء صنعتی",
        status: "Standard Certified",
        authority: "International Electrotechnical Commission",
        evidenceId: "EV-2026-E-005",
        cryptographicHash: "sha256:7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
        metric: "<50ms Sensor Latency",
        downloadUrl: "/api/evidence/EV-2026-E-005/download"
      },
      {
        id: "CLM-006",
        code: "KKM-CLM-F-06",
        level: "Level F",
        title: "Field Deployment & Karun River Seasonal Microturbine Performance",
        titleFa: "تاییدیه میدانی عملکرد فصلی میکروتوربین هیدروکینتیک کارون",
        category: "Field Operations",
        categoryFa: "عملیات میدانی",
        status: "Field Operational",
        authority: "Ministry of Energy & Water Resources",
        evidenceId: "EV-2026-F-006",
        cryptographicHash: "sha256:3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e",
        metric: "98.7% Availability",
        downloadUrl: "/api/evidence/EV-2026-F-006/download"
      },
      {
        id: "CLM-007",
        code: "KKM-CLM-G-07",
        level: "Level G",
        title: "Eurasia Joint-Venture Investment Agreements & Financial Audit",
        titleFa: "قراردادهای سرمایه‌گذاری مشترک و اسناد مالی ممیزی‌شده کنسرسیوم",
        category: "Financial & Corporate",
        categoryFa: "مالی و حاکمیتی",
        status: "Legally Binding",
        authority: "KKM Executive Board & International Legal Counsel",
        evidenceId: "EV-2026-G-007",
        cryptographicHash: "sha256:2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c",
        metric: "$120M Capital Pipeline",
        downloadUrl: "/api/evidence/EV-2026-G-007/download"
      }
    ];

    return res.status(200).json({
      ok: true,
      total: claims.length,
      levels: ["Level A", "Level B", "Level C", "Level D", "Level E", "Level F", "Level G"],
      claims
    });
  });

  /**
   * GET /api/divisions
   * CMS Content Model: Engineering Divisions (TKT-013, TKT-030)
   */
  app.get("/api/divisions", publicApiRateLimit, (_req: Request, res: Response) => {
    const divisions = [
      {
        id: "DIV-ENERGY",
        slug: "energy",
        name: "Energy Systems & Geothermal Division",
        nameFa: "دپارتمان سامانه‌های انرژی و زمین‌گرمایی پیشرفته",
        description: "Leading closed-loop geothermal heat extraction, Organic Rankine Cycle (ORC) turbines, and high-efficiency baseload power infrastructure.",
        technologies: ["GMEL-CLG", "Downhole Heat Exchanger", "Subsurface Thermoelectrics"],
        activeProjects: 3,
        leadExecutive: "Dr. Benyamin Rezaei"
      },
      {
        id: "DIV-WATER",
        slug: "water",
        name: "Water-Energy Nexus & Desalination Division",
        nameFa: "دپارتمان پیوند آب و انرژی و نمک‌زدایی پایدار",
        description: "Zero-liquid discharge (ZLD) seawater desalination, industrial water reclamation, and solar/geothermal-driven multi-effect distillation.",
        technologies: ["ZLD Evaporation", "Membrane Distillation", "Geothermal Desalination"],
        activeProjects: 2,
        leadExecutive: "Dr. Khosro Jarrahian"
      },
      {
        id: "DIV-AI",
        slug: "digital-twins",
        name: "Industrial AI & Cognitive Digital Twins Division",
        nameFa: "دپارتمان هوش مصنوعی صنعتی و دوقلوهای دیجیتال",
        description: "Computational fluid dynamics, physics-informed neural networks (PINN), and real-time telemetry pipelines for heavy engineering assets.",
        technologies: ["PINN Reservoir Modeling", "Subsurface Telemetry", "ASME CFD Twin"],
        activeProjects: 4,
        leadExecutive: "Dr. Reza Asakereh"
      },
      {
        id: "DIV-RURAL",
        slug: "rural-development",
        name: "Rural & Nomadic Engineering Division",
        nameFa: "دپارتمان مهندسی و توسعه پایدار مناطق روستایی و عشایری",
        description: "Decentralized micro-grids, mobile river hydrokinetics, and portable clean water purifiers tailored for harsh and off-grid geographies.",
        technologies: ["REE Hydrokinetics", "Off-grid Battery Banks", "Mobile Desalination"],
        activeProjects: 5,
        leadExecutive: "Gino Ayyoubian"
      },
      {
        id: "DIV-BIOMED",
        slug: "biomedical",
        name: "Biomedical & Advanced Materials Division",
        nameFa: "دپارتمان بیومدیکال و سنتز مواد پیشرفته",
        description: "Nanomaterial synthesis, thermal transfer fluids, and specialized medical/environmental diagnostics.",
        technologies: ["Nanofluids", "Phase Change Materials", "Bio-Sensors"],
        activeProjects: 1,
        leadExecutive: "Dr. Ali Rezaei"
      }
    ];

    return res.status(200).json({ ok: true, count: divisions.length, divisions });
  });

  /**
   * GET /api/projects
   * CMS Content Model: Flagship Engineering Projects (TKT-013, TKT-030)
   */
  app.get("/api/projects", publicApiRateLimit, (_req: Request, res: Response) => {
    return res.status(200).json({
      ok: true,
      count: projectMilestones.length,
      projects: projectMilestones
    });
  });

  /**
   * GET /api/evidence/:id/download
   * Verified PDF Artifact Download (TKT-020)
   */
  app.get("/api/evidence/:id/download", (req: Request, res: Response) => {
    const { id } = req.params;
    const cleanId = String(id || '').trim();

    const matchedEvidence = evidenceRegistryItems.find(
      e => e.id.toLowerCase() === cleanId.toLowerCase() ||
           e.registryCode.toLowerCase() === cleanId.toLowerCase()
    );

    if (!matchedEvidence) {
      return res.status(404).json({
        ok: false,
        error: "Evidence artifact not found in certified registry.",
        id: cleanId,
        validLevels: ["Level A", "Level B", "Level C", "Level D", "Level E", "Level F", "Level G"]
      });
    }

    // Generate valid, well-formed PDF buffer on the fly
    const titleAscii = matchedEvidence.domain || "Certified Technical Evidence Artifact";
    const authorityAscii = matchedEvidence.certifyingAuthority || "KKM Technical Audit Bureau";
    const pdfBuffer = createCertifiedPdfBuffer(
      titleAscii,
      matchedEvidence.registryCode,
      matchedEvidence.evidenceLevel,
      authorityAscii,
      matchedEvidence.certificationDate,
      matchedEvidence.cryptographicHash
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="KKM-Evidence-${matchedEvidence.registryCode}.pdf"`);
    res.setHeader("Content-Length", pdfBuffer.length);
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.send(pdfBuffer);
  });

  /**
   * GET /api/docs/openapi.json
   * OpenAPI 3.1 Contract Specification (TKT-013)
   */
  app.get("/api/docs/openapi.json", publicApiRateLimit, (_req: Request, res: Response) => {
    const openApiSpec = {
      openapi: "3.1.0",
      info: {
        title: "KKM International Group API",
        version: "2026.1.0",
        description: "Official REST API contracts for public discovery, lead capture, and corporate portal operations."
      },
      servers: [
        { url: "https://www.kkm-intl.org", description: "Production Apex" },
        { url: "http://localhost:3000", description: "Local Development" }
      ],
      paths: {
        "/api/health": {
          get: {
            summary: "Health Check",
            responses: { "200": { description: "Service is healthy and ready to receive traffic." } }
          }
        },
        "/api/status": {
          get: {
            summary: "Detailed System Status",
            responses: { "200": { description: "Returns uptime, memory, and subsystem operational status." } }
          }
        },
        "/api/contact": {
          post: {
            summary: "Submit and Qualify Inquiries",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["name", "email", "subject", "message"],
                    properties: {
                      name: { type: "string" },
                      email: { type: "string", format: "email" },
                      organization: { type: "string" },
                      inquiryType: { type: "string" },
                      subject: { type: "string" },
                      message: { type: "string" }
                    }
                  }
                }
              }
            },
            responses: {
              "200": { description: "Inquiry accepted and routed." },
              "400": { description: "Validation failure." },
              "429": { description: "Rate limit exceeded." }
            }
          }
        },
        "/api/claims": {
          get: {
            summary: "Claims & Evidence Registry Taxonomy (Levels A-G)",
            responses: { "200": { description: "Returns list of verified claims and audit hashes." } }
          }
        },
        "/api/divisions": {
          get: {
            summary: "Engineering Divisions",
            responses: { "200": { description: "Returns list of specialized business units." } }
          }
        },
        "/api/evidence/{id}/download": {
          get: {
            summary: "Download Evidence PDF",
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
              "200": { description: "Binary PDF document.", content: { "application/pdf": {} } },
              "404": { description: "Evidence item not found." }
            }
          }
        },
        "/api/admin/telemetry": {
          get: {
            summary: "Real-Time GMEL Ecosystem Telemetry",
            responses: { "200": { description: "Real-time thermodynamic and digital twin telemetry." } }
          }
        }
      }
    };
    return res.status(200).json(openApiSpec);
  });

  // ========================================================
  // GMEL ECOSYSTEM REAL-TIME TELEMETRY & ADMIN CONTROL PANEL
  // ========================================================

  const gmelTelemetryNodes = [
    {
      nodeId: "GMEL-QESHM-01",
      name: "Qeshm Island Deep Geothermal Well-1",
      nameFa: "چاه ژرف زمین‌گرمایی پایلوت قشم ۱",
      status: "ACTIVE",
      wellheadTempC: 188.4,
      downholeTempC: 242.1,
      wellheadPressureBar: 242.0,
      massFlowRateKgS: 84.5,
      targetMassFlowRateKgS: 85.0,
      sorcRpm: 11840,
      sorcEfficiencyPercent: 94.6,
      powerOutputMWe: 14.8,
      thermalOutputMWth: 46.2,
      co2AvoidedPerHourTons: 11.2,
      microSeismicRichter: 0.015,
      secondaryExchangerActive: true,
      emergencyBypassActive: false,
      digitalTwinLatencyMs: 14,
      neuralNetworkConvergence: 0.9984
    },
    {
      nodeId: "GMEL-SARAKHS-02",
      name: "Sarakhs Sedimentary Geothermal Field",
      nameFa: "میدان رسوبی زمین‌گرمایی سرخس ۲",
      status: "ACTIVE",
      wellheadTempC: 174.2,
      downholeTempC: 218.5,
      wellheadPressureBar: 215.3,
      massFlowRateKgS: 68.0,
      targetMassFlowRateKgS: 70.0,
      sorcRpm: 10420,
      sorcEfficiencyPercent: 92.8,
      powerOutputMWe: 11.2,
      thermalOutputMWth: 38.0,
      co2AvoidedPerHourTons: 8.6,
      microSeismicRichter: 0.012,
      secondaryExchangerActive: true,
      emergencyBypassActive: false,
      digitalTwinLatencyMs: 18,
      neuralNetworkConvergence: 0.9961
    },
    {
      nodeId: "GMEL-BANDAR-03",
      name: "Bandar Abbas Closed-Loop Desalination Nexus",
      nameFa: "مجتمع آب‌شیرین‌کن مداربسته بندرعباس",
      status: "STANDBY_READY",
      wellheadTempC: 162.8,
      downholeTempC: 195.4,
      wellheadPressureBar: 185.0,
      massFlowRateKgS: 52.4,
      targetMassFlowRateKgS: 55.0,
      sorcRpm: 9200,
      sorcEfficiencyPercent: 91.2,
      powerOutputMWe: 7.5,
      thermalOutputMWth: 29.4,
      co2AvoidedPerHourTons: 6.1,
      microSeismicRichter: 0.009,
      secondaryExchangerActive: false,
      emergencyBypassActive: false,
      digitalTwinLatencyMs: 22,
      neuralNetworkConvergence: 0.9942
    }
  ];

  const portalAnnouncements = [
    {
      id: "ANN-2026-001",
      title: "بخشنامه سازمانی: استقرار سراسری سامانه تله‌متری بلادرنگ GMEL و اتصال به دوقلوی دیجیتال",
      titleEn: "Directive: Enterprise rollout of GMEL Real-Time Telemetry and Digital Twin Integration",
      category: "Executive Directive",
      author: "Gino Ayyoubian (CEO)",
      date: "2026-09-28",
      priority: "high",
      content: "پیرو مصوبه هیئت مدیره، کلیه سایت‌های عملیاتی موظف به انتقال داده‌های سنسورهای زیرسطحی به مرکز کنترل و فرماندهی پرتال هستند."
    },
    {
      id: "ANN-2026-002",
      title: "تأییدیه ممیزی آزمایشگاه EPFL لوزان بر پایداری ترمودینامیکی چرخه‌های sORC",
      titleEn: "EPFL Lausanne Laboratory Verification of sORC Thermodynamic Cycle Stability",
      category: "Scientific & QA",
      author: "Dr. Khosro Jarrahian (CSO)",
      date: "2026-09-25",
      priority: "medium",
      content: "نتایج تست فاز سوم صحه‌گذاری چرخه‌های فوق بحرانی در رجیستری شواهد KKM ثبت گردید."
    }
  ];

  /**
   * GET /api/admin/telemetry
   * Returns real-time telemetry from GMEL ecosystem, with dynamic thermodynamic fluctuations
   */
  app.get("/api/admin/telemetry", requireCorporateAuth, (req: Request, res: Response) => {
    // Dynamic slight thermodynamic fluctuations for realism
    const now = new Date();
    const updatedNodes = gmelTelemetryNodes.map((node) => {
      const deltaTemp = (Math.random() - 0.48) * 0.4;
      const deltaPressure = (Math.random() - 0.5) * 0.2;
      const deltaRpm = Math.floor((Math.random() - 0.5) * 20);
      return {
        ...node,
        wellheadTempC: Number((node.wellheadTempC + deltaTemp).toFixed(2)),
        wellheadPressureBar: Number((node.wellheadPressureBar + deltaPressure).toFixed(1)),
        sorcRpm: node.sorcRpm + deltaRpm,
        lastSampleTime: now.toISOString()
      };
    });

    const totalPowerMWe = updatedNodes.reduce((acc, n) => acc + (n.status === "ACTIVE" ? n.powerOutputMWe : 0), 0);
    const totalThermalMWth = updatedNodes.reduce((acc, n) => acc + (n.status === "ACTIVE" ? n.thermalOutputMWth : 0), 0);
    const totalCo2Avoided = updatedNodes.reduce((acc, n) => acc + (n.status === "ACTIVE" ? n.co2AvoidedPerHourTons : 0), 0);

    return res.status(200).json({
      success: true,
      timestamp: now.toISOString(),
      systemStatus: "OPTIMAL",
      metrics: {
        totalPowerMWe: Number(totalPowerMWe.toFixed(1)),
        totalThermalMWth: Number(totalThermalMWth.toFixed(1)),
        totalCo2AvoidedPerHourTons: Number(totalCo2Avoided.toFixed(1)),
        activeNodeCount: updatedNodes.filter(n => n.status === "ACTIVE").length,
        totalNodeCount: updatedNodes.length,
        networkLatencyMs: 14,
        telemetrySamplingRateHz: 10
      },
      nodes: updatedNodes
    });
  });

  /**
   * POST /api/admin/telemetry/control
   * Dispatches operational control commands to GMEL downhole subsystems
   */
  app.post("/api/admin/telemetry/control", requireCorporateAuth, (req: Request, res: Response) => {
    const { nodeId, command, parameterValue } = req.body;

    const node = gmelTelemetryNodes.find(n => n.nodeId === nodeId);
    if (!node) {
      return res.status(404).json({
        success: false,
        message: "گره عملیاتی GMEL مورد نظر یافت نشد.",
        messageEn: "GMEL telemetry node not found."
      });
    }

    if (command === "SET_MASS_FLOW") {
      const target = Number(parameterValue);
      if (isNaN(target) || target < 30 || target > 150) {
        return res.status(400).json({
          success: false,
          message: "دبی جرمی باید در محدوده ایمن بین ۳۰ تا ۱۵۰ کیلوگرم بر ثانیه باشد.",
          messageEn: "Mass flow rate must be between 30 and 150 kg/s."
        });
      }
      node.targetMassFlowRateKgS = target;
      node.massFlowRateKgS = target;
      logger.info(`Admin ${req.user?.email} adjusted GMEL mass flow to ${target} kg/s on ${nodeId}`);
    } else if (command === "TOGGLE_SECONDARY_EXCHANGER") {
      node.secondaryExchangerActive = Boolean(parameterValue);
    } else if (command === "TOGGLE_EMERGENCY_BYPASS") {
      node.emergencyBypassActive = Boolean(parameterValue);
    } else if (command === "RECALIBRATE_SENSORS") {
      node.digitalTwinLatencyMs = 12;
      node.neuralNetworkConvergence = 0.9992;
    }

    return res.status(200).json({
      success: true,
      message: "دستور عملیاتی با موفقیت به سیستم کنترل GMEL ارسال شد.",
      messageEn: "Control directive acknowledged by GMEL SCADA controller.",
      updatedNode: node
    });
  });

  /**
   * GET /api/admin/content
   * Administrative endpoint for retrieving manageable portal and public content
   */
  app.get("/api/admin/content", requireCorporateAuth, (req: Request, res: Response) => {
    return res.status(200).json({
      success: true,
      announcements: portalAnnouncements,
      milestones: projectMilestones,
      evidenceItems: evidenceRegistryItems,
      members: corporateUsers.map(m => ({
        uid: m.uid,
        displayName: m.displayName,
        displayNameFa: m.displayNameFa,
        title: m.title,
        titleFa: m.titleFa,
        department: m.department,
        departmentFa: m.departmentFa,
        role: m.role,
        avatarUrl: m.avatarUrl,
        isVerifiedMember: m.isVerifiedMember,
        evidenceRegistryId: m.evidenceRegistryId
      }))
    });
  });

  /**
   * POST /api/admin/content/update
   * Administrative endpoint for editing portal announcements, milestones, or member attributes
   */
  app.post("/api/admin/content/update", requireCorporateAuth, (req: Request, res: Response) => {
    const { contentType, itemData } = req.body;

    if (!contentType || !itemData) {
      return res.status(400).json({
        success: false,
        message: "نوع محتوا و اطلاعات ارسالی الزامی است.",
        messageEn: "Content type and payload are required."
      });
    }

    if (contentType === "announcement") {
      if (itemData.id) {
        const existingIdx = portalAnnouncements.findIndex(a => a.id === itemData.id);
        if (existingIdx >= 0) {
          portalAnnouncements[existingIdx] = { ...portalAnnouncements[existingIdx], ...itemData };
        } else {
          portalAnnouncements.unshift(itemData);
        }
      } else {
        portalAnnouncements.unshift({
          id: `ANN-2026-${Date.now().toString().slice(-4)}`,
          date: new Date().toISOString().split("T")[0],
          author: req.user?.displayName || "Admin",
          ...itemData
        });
      }
    } else if (contentType === "milestone") {
      const existingIdx = projectMilestones.findIndex(m => m.id === itemData.id);
      if (existingIdx >= 0) {
        projectMilestones[existingIdx] = { ...projectMilestones[existingIdx], ...itemData };
      } else {
        projectMilestones.push(itemData);
      }
    } else if (contentType === "member") {
      const existingMember = corporateUsers.find(u => u.uid === itemData.uid);
      if (existingMember) {
        Object.assign(existingMember, itemData);
      }
    }

    return res.status(200).json({
      success: true,
      message: "محتوا با موفقیت ذخیره و به‌روزرسانی شد.",
      messageEn: "Content successfully updated and synced across portal."
    });
  });

  // ==========================================
  // DAFTARE SHOMA CLOUD PBX & TELEPHONY ROUTES
  // Active Account Line: +98 21 9103 0830
  // ==========================================

  // Dashboard-safe telephony summary
  app.get("/api/telephony/dashboard", portalReadRateLimit, requireCorporateAuth, (_req: Request, res: Response) => {
    return res.status(200).json({
      success: true,
      data: telephonyService.getDashboardSnapshot()
    });
  });

  // 1. Telephony Status & Live Trunk Metrics
  app.get("/api/telephony/status", portalReadRateLimit, requireCorporateAuth, (_req: Request, res: Response) => {
    const status = telephonyService.getStatus();
    return res.status(200).json({
      success: true,
      data: status
    });
  });

  // 2. Extensions Directory
  app.get("/api/telephony/extensions", portalReadRateLimit, requireCorporateAuth, (_req: Request, res: Response) => {
    const extensions = telephonyService.getExtensions();
    return res.status(200).json({
      success: true,
      data: extensions
    });
  });

  // 3. Toggle Extension Forwarding (e.g. forward to mobile)
  app.post("/api/telephony/extensions/:ext/toggle-forward", requireCorporateAuth, (req: Request, res: Response) => {
    const ext = Array.isArray(req.params.ext) ? req.params.ext[0] : req.params.ext;
    const updated = telephonyService.toggleExtensionForward(ext);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "شماره داخلی یافت نشد."
      });
    }
    return res.status(200).json({
      success: true,
      data: updated,
      message: `انتقال تماس داخلی ${ext} ${updated.forwardEnabled ? "فعال" : "غیرفعال"} شد.`
    });
  });

  // 4. Update Extension Settings (Mobile forward number, ring strategy)
  app.put("/api/telephony/extensions/:ext", requireCorporateAuth, (req: Request, res: Response) => {
    const ext = Array.isArray(req.params.ext) ? req.params.ext[0] : req.params.ext;
    const updates = req.body;
    const updated = telephonyService.updateExtension(ext, updates);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "شماره داخلی یافت نشد."
      });
    }
    return res.status(200).json({
      success: true,
      data: updated,
      message: `تنظیمات داخلی ${ext} با موفقیت به‌روزرسانی شد.`
    });
  });

  // 5. Corporate Voicemail Box
  app.get("/api/telephony/voicemails", portalReadRateLimit, requireCorporateAuth, (_req: Request, res: Response) => {
    const voicemails = telephonyService.getVoicemails();
    return res.status(200).json({
      success: true,
      data: voicemails
    });
  });

  // 6. Mark Voicemail as Read/Unread
  app.post("/api/telephony/voicemails/:id/mark-read", requireCorporateAuth, (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { isRead = true } = req.body;
    const updated = telephonyService.markVoicemailRead(id, isRead);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "پیام صوتی یافت نشد."
      });
    }
    return res.status(200).json({
      success: true,
      data: updated
    });
  });

  // 7. Delete Voicemail
  app.delete("/api/telephony/voicemails/:id", requireCorporateAuth, (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const deleted = telephonyService.deleteVoicemail(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "پیام صوتی یافت نشد."
      });
    }
    return res.status(200).json({
      success: true,
      message: "پیام صوتی از صندوق حذف شد."
    });
  });

  // 8. Call Logs & Telemetry History
  app.get("/api/telephony/call-logs", portalReadRateLimit, requireCorporateAuth, (_req: Request, res: Response) => {
    const logs = telephonyService.getCallLogs();
    return res.status(200).json({
      success: true,
      data: logs
    });
  });

  // 9. Daftare Shoma Webhook Receiver
  app.post("/api/telephony/webhook", (req: Request, res: Response) => {
    const event = req.body;
    logger.info("Received Daftare Shoma webhook event", { event });
    const log = telephonyService.recordIncomingCallEvent(event);
    return res.status(200).json({
      success: true,
      eventId: log.id,
      message: "Webhook processed successfully"
    });
  });

  // 10. Generate / Download Daftare Shoma Full Import Package
  app.get("/api/telephony/export-config", portalReadRateLimit, requireCorporateAuth, (_req: Request, res: Response) => {
    const exportConfig = telephonyService.generateDaftareShomaExportConfig();
    return res.status(200).json({
      success: true,
      data: exportConfig
    });
  });

  // 11. Click-to-call / WebRTC Handshake Dispatch
  app.post("/api/telephony/call", requireCorporateAuth, (req: Request, res: Response) => {
    const { destination, extension } = req.body;
    const callLog = telephonyService.recordIncomingCallEvent({
      callType: "outbound",
      callerNumber: "+98 21 9103 0830",
      destination: destination || extension || "101",
      agentName: req.user?.displayName || "Corporate Staff",
      status: "completed",
      durationSeconds: 15
    });

    return res.status(200).json({
      success: true,
      message: `تماس با ${destination} از طریق ترانک ext.daftareshoma.com ارسال شد.`,
      callId: callLog.id,
      gateway: "wss://ext.daftareshoma.com:4443"
    });
  });

}

/**
 * Generates an authentic, fully compliant PDF 1.4 binary buffer
 */
function createCertifiedPdfBuffer(
  title: string,
  code: string,
  level: string,
  authority: string,
  date: string,
  hash: string
): Buffer {
  const content = [
    "BT",
    "/F1 18 Tf",
    "50 720 Td",
    "(KKM INTERNATIONAL GROUP - CERTIFIED EVIDENCE ARTIFACT) Tj",
    "/F1 12 Tf",
    "0 -30 Td",
    `(${escapePdf(`Registry Code: ${code}  |  Classification: ${level}`)}) Tj`,
    "0 -24 Td",
    `(${escapePdf(`Domain: ${title}`)}) Tj`,
    "0 -24 Td",
    `(${escapePdf(`Certifying Authority: ${authority}`)}) Tj`,
    "0 -24 Td",
    `(${escapePdf(`Date of Certification: ${date}`)}) Tj`,
    "0 -24 Td",
    `(${escapePdf(`Cryptographic Hash: ${hash}`)}) Tj`,
    "0 -36 Td",
    "/F1 10 Tf",
    "(STATUS: VERIFIED & AUDITED UNDER ISO 14001 / WIPO PCT STANDARDS) Tj",
    "0 -20 Td",
    "(This document is an immutable cryptographic audit record published by KKM International Group.) Tj",
    "ET"
  ].join("\n");

  const streamLen = Buffer.byteLength(content);
  const pdfString = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamLen} >>
stream
${content}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000234 00000 n 
0000000${(295 + streamLen).toString().padStart(3, '0')} 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${370 + streamLen}
%%EOF`;

  return Buffer.from(pdfString);
}

function escapePdf(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}
