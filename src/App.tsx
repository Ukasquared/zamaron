import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { GuestRoute } from '@/auth/GuestRoute';

// Layouts
import { MarketingLayout } from '@/components/layouts/MarketingLayout';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { AuthLayout } from '@/components/layouts/AuthLayout';

// Marketing Pages
import { HomePage } from '@/pages/marketing/HomePage';
import { SolutionsAuditingPage } from '@/pages/marketing/SolutionsAuditingPage';
import { PricingPage } from '@/pages/marketing/PricingPage';
import { SupportPage } from '@/pages/marketing/SupportPage';

// Auth Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { SecureGatePage } from '@/pages/auth/SecureGatePage';
import { InductionPage } from '@/pages/auth/InductionPage';
import { UnauthorizedPage } from '@/pages/auth/UnauthorizedPage';

// Client Portal Pages
import { ClientDashboardPage } from '@/pages/client/ClientDashboardPage';
import { NewAuditRequestPage } from '@/pages/client/NewAuditRequestPage';
import { LiveAuditTrackerPage } from '@/pages/client/LiveAuditTrackerPage';
import { DualPaneReviewPage } from '@/pages/client/DualPaneReviewPage';
import { VulnerabilityTriagePage } from '@/pages/client/VulnerabilityTriagePage';
import { FinalReportPage } from '@/pages/client/FinalReportPage';
import { DocumentVaultPage } from '@/pages/client/DocumentVaultPage';
import { CheckoutPage } from '@/pages/client/CheckoutPage';

// Auditor Pages
import { AuditorQueuePage } from '@/pages/auditor/AuditorQueuePage';
import { AiTerminalPage } from '@/pages/auditor/AiTerminalPage';
import { ForensicsPage } from '@/pages/auditor/ForensicsPage';
import { AuditorLeaderboardPage } from '@/pages/auditor/AuditorLeaderboardPage';

// Threat Hub Pages
import { SkynetDashboardPage } from '@/pages/threat-hub/SkynetDashboardPage';
import { WhaleAlertsPage } from '@/pages/threat-hub/WhaleAlertsPage';
import { TokenAnalyzerPage } from '@/pages/threat-hub/TokenAnalyzerPage';
import { SecurityLeaderboardPage } from '@/pages/threat-hub/SecurityLeaderboardPage';
import { ProjectProfilePage } from '@/pages/threat-hub/ProjectProfilePage';
import { SecurityIncidentsPage } from '@/pages/threat-hub/SecurityIncidentsPage';

// Governance & Profile
import { GovernancePage } from '@/pages/governance/GovernancePage';
import { ProposalDetailPage } from '@/pages/governance/ProposalDetailPage';
import { UserProfilePage } from '@/pages/governance/UserProfilePage';

// Academy Pages
import { CoursePlayerPage } from '@/pages/academy/CoursePlayerPage';
import { AssessmentQuizPage } from '@/pages/academy/AssessmentQuizPage';
import { CertificatePage } from '@/pages/academy/CertificatePage';

// Admin Suite Pages
import { SecurityLogsPage } from '@/pages/admin/SecurityLogsPage';
import { SecurityConfigPage } from '@/pages/admin/SecurityConfigPage';
import { BillingHistoryPage } from '@/pages/admin/BillingHistoryPage';
import { InvoiceTemplatePage } from '@/pages/admin/InvoiceTemplatePage';

// Master Matrix Catalog
import { MasterCatalogPage } from '@/pages/catalog/MasterCatalogPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing Routes */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions/auditing" element={<SolutionsAuditingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/catalog" element={<MasterCatalogPage />} />
          </Route>

          {/* Authentication Routes */}
          <Route element={<AuthLayout />}>
            <Route element={<GuestRoute />}>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/induction" element={<InductionPage />} />
              <Route path="/auth/induction-signup" element={<InductionPage />} />
            </Route>
            {/* Secondary factor — requires an existing session, cannot mint a role. */}
            <Route path="/auth/secure-gate" element={<SecureGatePage />} />
          </Route>

          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/*
            All dashboard surfaces require a restored, authenticated session.
            Role checks are centralized in rbac.ts (canAccessPath) — hiding
            nav links is never the security boundary.
          */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              {/* Client Portal */}
              <Route path="/client/dashboard" element={<ClientDashboardPage />} />
              <Route path="/client/audits/new" element={<NewAuditRequestPage />} />
              <Route path="/client/audits/:id/status" element={<LiveAuditTrackerPage />} />
              <Route path="/client/audits/:id/review" element={<DualPaneReviewPage />} />
              <Route path="/client/audits/:id/triage" element={<VulnerabilityTriagePage />} />
              <Route path="/client/audits/:id/report" element={<FinalReportPage />} />
              <Route path="/client/vault" element={<DocumentVaultPage />} />
              <Route path="/client/checkout" element={<CheckoutPage />} />

              {/* Auditor Workspace */}
              <Route path="/auditor/queue" element={<AuditorQueuePage />} />
              <Route path="/auditor/ai-terminal" element={<AiTerminalPage />} />
              <Route path="/auditor/forensics" element={<ForensicsPage />} />
              <Route path="/leaderboard/auditors" element={<AuditorLeaderboardPage />} />
              <Route path="/leaderboard/security" element={<SkynetDashboardPage />} />

              {/* Intelligence & Threat Hub */}
              <Route path="/threat-hub/skynet" element={<SkynetDashboardPage />} />
              <Route path="/threat-hub/ecosystem" element={<SkynetDashboardPage />} />
              <Route path="/threat-hub/whales" element={<WhaleAlertsPage />} />
              <Route path="/threat-hub/token-analyzer" element={<TokenAnalyzerPage />} />
              <Route path="/threat-hub/leaderboard" element={<SecurityLeaderboardPage />} />
              <Route path="/threat-hub/projects/:id" element={<ProjectProfilePage />} />
              <Route path="/threat-hub/incidents" element={<SecurityIncidentsPage />} />
              <Route path="/threat-hub/protocols/:id" element={<TokenAnalyzerPage />} />
              <Route path="/threat-hub/vaults" element={<DocumentVaultPage />} />

              {/* Governance & Profile */}
              <Route path="/governance" element={<GovernancePage />} />
              <Route path="/governance/proposals/:id" element={<ProposalDetailPage />} />
              <Route path="/profile/:id" element={<UserProfilePage />} />

              {/* Academy & LMS */}
              <Route path="/academy/learn/:courseId" element={<CoursePlayerPage />} />
              <Route path="/academy/assessment/:id" element={<AssessmentQuizPage />} />
              <Route path="/academy/certificate/:id" element={<CertificatePage />} />

              {/* Admin Operations */}
              <Route path="/admin/logs" element={<SecurityLogsPage />} />
              <Route path="/admin/logs-tactical" element={<SecurityLogsPage />} />
              <Route path="/admin/security-config" element={<SecurityConfigPage />} />
              <Route path="/admin/alerts" element={<SecurityConfigPage />} />
              <Route path="/admin/content" element={<CoursePlayerPage />} />
              <Route path="/admin/course-builder" element={<CoursePlayerPage />} />
              <Route path="/admin/course-builder-enhanced" element={<CoursePlayerPage />} />
              <Route path="/admin/token-reports" element={<TokenAnalyzerPage />} />
              <Route path="/admin/users-protocols" element={<SecurityConfigPage />} />
              <Route path="/admin/developers-api" element={<SecurityConfigPage />} />
              <Route path="/admin/gateways" element={<BillingHistoryPage />} />
              <Route path="/admin/billing" element={<BillingHistoryPage />} />
              <Route path="/admin/invoices/:id" element={<InvoiceTemplatePage />} />
              <Route path="/admin/refunds" element={<BillingHistoryPage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
