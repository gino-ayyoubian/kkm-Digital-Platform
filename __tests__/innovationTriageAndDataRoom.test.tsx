import { describe, it, expect, beforeEach, vi } from 'vitest';
import { innovationTriageService } from '../backend/innovationTriageService';

describe('AI Innovation Triage & Partner Data Room System', () => {
  beforeEach(() => {
    // Reset any state if necessary
  });

  describe('AI Innovation Triage Engine', () => {
    it('generates a unique tracking ID and automated Novelty Report upon proposal submission', () => {
      const submission = {
        title: 'مدل شبیه‌سازی انتقال حرارت نانوسیال گرافنی در چاه‌های ژئوترمال مداربسته',
        domain: 'Advanced Materials & Sensors',
        submitterName: 'دکتر فرزاد کمالی',
        submitterOrg: 'دانشگاه صنعتی شریف',
        submitterEmail: 'f.kamali@sharif.edu',
        submitterPhone: '+989121112233',
        declaredTrl: 'TRL-4',
        abstract: 'این طرح به بررسی سنتز نانوسیال هیبریدی اکسید گرافن جهت بهبود انتقال حرارت هدایتی در چاه‌های بسته GMEL می‌پردازد.',
        ndaAgreed: true
      };

      const result = innovationTriageService.submitProposal(submission);

      expect(result.trackingId).toMatch(/^KKM-INN-2026-\d{4}$/);
      expect(result.proposal).toBeDefined();
      expect(result.proposal.trackingId).toBe(result.trackingId);
      expect(result.proposal.status).toBe('AI_TRIAGED');
      
      // Verify Novelty Report structure
      const report = result.proposal.noveltyReport;
      expect(report).toBeDefined();
      expect(report.noveltyScore).toBeGreaterThanOrEqual(70);
      expect(report.noveltyScore).toBeLessThanOrEqual(100);
      expect(report.matchedKkmPatents.length).toBeGreaterThan(0);
      expect(report.matchedKkmPatents[0].patentId).toBe('KKM-PAT-GMEL-01');
      expect(report.committeeRecommendation).toBeDefined();
      expect(report.keyStrengthsFa.length).toBeGreaterThan(0);
    });

    it('sanitizes public tracking query and prevents leaking submitter personal phone/email', () => {
      const publicStatus = innovationTriageService.getPublicTracking('KKM-INN-2026-7842');

      expect(publicStatus.found).toBe(true);
      expect(publicStatus.trackingId).toBe('KKM-INN-2026-7842');
      expect(publicStatus.title).toBeDefined();
      expect(publicStatus.timeline).toBeDefined();
      expect(publicStatus.timeline!.length).toBe(5);

      // Verify privacy: personal contact details must NOT be returned in public tracking object
      expect((publicStatus as any).submitterPhone).toBeUndefined();
      expect((publicStatus as any).submitterEmail).toBeUndefined();
    });

    it('returns not found for nonexistent tracking ID', () => {
      const publicStatus = innovationTriageService.getPublicTracking('INVALID-CODE-9999');
      expect(publicStatus.found).toBe(false);
    });

    it('allows Innovation Committee to update review stage and record evaluation notes', () => {
      const updated = innovationTriageService.updateProposalStatus(
        'KKM-INN-2026-9104',
        'FEASIBILITY_NDA',
        'تایید اولیه جهت ورود به آزمون میدانی پایلوت آب-انرژی',
        90
      );

      expect(updated).not.toBeNull();
      expect(updated!.status).toBe('FEASIBILITY_NDA');
      expect(updated!.statusLabelFa).toContain('NDA');
      expect(updated!.evaluatorNotes).toBe('تایید اولیه جهت ورود به آزمون میدانی پایلوت آب-انرژی');
      expect(updated!.committeeScore).toBe(90);
    });
  });

  describe('Tier-2 Partner Data Room (OTP & Digital NDA Workflow)', () => {
    it('issues an OTP for accredited corporate partner email', () => {
      const res = innovationTriageService.requestDataRoomOtp('partner@investor-fund.com', 'Sovereign Clean Infrastructure Fund');
      expect(res.success).toBe(true);
      expect(res.demoOtp).toBeDefined();
      expect(res.demoOtp).toMatch(/^\d{6}$/);
    });

    it('verifies valid OTP and issues a session token', () => {
      const otpReq = innovationTriageService.requestDataRoomOtp('partner2@energy-epc.com', 'Alpine EPC Consortium');
      const otp = otpReq.demoOtp!;

      const verifyRes = innovationTriageService.verifyDataRoomOtp('partner2@energy-epc.com', otp);
      expect(verifyRes.success).toBe(true);
      expect(verifyRes.token).toMatch(/^kkm_dr_/);
    });

    it('rejects dossier access before digital NDA execution', () => {
      const otpReq = innovationTriageService.requestDataRoomOtp('partner3@fund.org', 'Nordic Geothermal Fund');
      const verifyRes = innovationTriageService.verifyDataRoomOtp('partner3@fund.org', otpReq.demoOtp!);
      const token = verifyRes.token!;

      // Attempt to access documents without signing NDA
      const accessAttempt = innovationTriageService.getDataRoomDossiers(token);
      expect(accessAttempt.authorized).toBe(false);
      expect(accessAttempt.error).toContain('NDA');
    });

    it('grants full access to Tier-2 confidential dossiers after digital NDA execution', () => {
      const otpReq = innovationTriageService.requestDataRoomOtp('partner4@sovereign.ae', 'Emirates Energy Capital');
      const verifyRes = innovationTriageService.verifyDataRoomOtp('partner4@sovereign.ae', otpReq.demoOtp!);
      const token = verifyRes.token!;

      // Execute digital NDA
      const ndaRes = innovationTriageService.acceptDigitalNda(token, 'Tariq Al-Mansoor', 'Managing Partner', '195.229.241.12');
      expect(ndaRes.success).toBe(true);

      // Now access dossiers
      const dossiersRes = innovationTriageService.getDataRoomDossiers(token);
      expect(dossiersRes.authorized).toBe(true);
      expect(dossiersRes.partnerOrg).toBe('Emirates Energy Capital');
      expect(dossiersRes.dossiers).toBeDefined();
      expect(dossiersRes.dossiers!.length).toBeGreaterThanOrEqual(4);

      // Verify specific confidential dossiers exist
      const gmelDossier = dossiersRes.dossiers!.find(d => d.category === 'Geothermal GMEL');
      expect(gmelDossier).toBeDefined();
      expect(gmelDossier!.code).toContain('GMEL');
      expect(gmelDossier!.keyMetrics.length).toBeGreaterThan(0);
      expect(gmelDossier!.classification).toBe('CONFIDENTIAL • TIER 2 PARTNER');
    });
  });
});
