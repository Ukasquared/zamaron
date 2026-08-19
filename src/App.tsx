import type { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';

import { AuthLayout } from '@/components/layouts/AuthLayout';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { MarketingLayout } from '@/components/layouts/MarketingLayout';

import { LoginPage } from '@/pages/auth/LoginPage';
import { InductionPage } from '@/pages/auth/InductionPage';
import { SecureGatePage } from '@/pages/auth/SecureGatePage';
import { CoursePlayerPage } from '@/pages/academy/CoursePlayerPage';
import { CoursesLibraryPage } from '@/pages/academy/CoursesLibraryPage';
import { AssessmentQuizPage } from '@/pages/academy/AssessmentQuizPage';
import { CertificatePage } from '@/pages/academy/CertificatePage';
import { AdminOverviewPage } from '@/pages/admin/AdminOverviewPage';
import { ContentAdministrationPage } from '@/pages/admin/ContentAdministrationPage';
import { SecurityOperationsPage } from '@/pages/admin/SecurityOperationsPage';
import { BillingHistoryPage } from '@/pages/admin/BillingHistoryPage';
import { InvoiceTemplatePage } from '@/pages/admin/InvoiceTemplatePage';
import { SecurityConfigPage } from '@/pages/admin/SecurityConfigPage';
import { SecurityLogsPage } from '@/pages/admin/SecurityLogsPage';
import { AiTerminalPage } from '@/pages/auditor/AiTerminalPage';
import { AuditorLeaderboardPage } from '@/pages/auditor/AuditorLeaderboardPage';
import { AuditorQueuePage } from '@/pages/auditor/AuditorQueuePage';
import { ForensicsPage } from '@/pages/auditor/ForensicsPage';
import { AnalyticsPage } from '@/pages/analytics/AnalyticsPage';
import { ScannerPage } from '@/pages/scanner/ScannerPage';
import { MasterCatalogPage } from '@/pages/catalog/MasterCatalogPage';
import { CheckoutPage } from '@/pages/client/CheckoutPage';
import { ClientDashboardPage } from '@/pages/client/ClientDashboardPage';
import { DocumentVaultPage } from '@/pages/client/DocumentVaultPage';
import { DualPaneReviewPage } from '@/pages/client/DualPaneReviewPage';
import { FinalReportPage } from '@/pages/client/FinalReportPage';
import { LiveAuditTrackerPage } from '@/pages/client/LiveAuditTrackerPage';
import { NewAuditRequestPage } from '@/pages/client/NewAuditRequestPage';
import { VulnerabilityTriagePage } from '@/pages/client/VulnerabilityTriagePage';
import { GovernancePage } from '@/pages/governance/GovernancePage';
import { ProposalDetailPage } from '@/pages/governance/ProposalDetailPage';
import { UserProfilePage } from '@/pages/governance/UserProfilePage';
import { HomePage } from '@/pages/marketing/HomePage';
import { PricingPage } from '@/pages/marketing/PricingPage';
import { SolutionsAuditingPage } from '@/pages/marketing/SolutionsAuditingPage';
import { SupportPage } from '@/pages/marketing/SupportPage';
import { EcosystemPage } from '@/pages/threat-hub/EcosystemPage';
import { RiskAssessmentPage } from '@/pages/client/RiskAssessmentPage';
import { ScamDetectorPage } from '@/pages/threat-hub/ScamDetectorPage';
import { SkynetDashboardPage } from '@/pages/threat-hub/SkynetDashboardPage';
import { TokenAnalyzerPage } from '@/pages/threat-hub/TokenAnalyzerPage';
import { WhaleAlertsPage } from '@/pages/threat-hub/WhaleAlertsPage';

export const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public marketing routes */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions/auditing" element={<SolutionsAuditingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/catalog" element={<MasterCatalogPage />} />
          </Route>

          {/* Authentication routes */}
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/secure-gate" element={<SecureGatePage />} />
            <Route path="/auth/induction" element={<InductionPage />} />
            <Route path="/auth/induction-signup" element={<InductionPage />} />
          </Route>

          {/* Core operations dashboard routes */}
          <Route element={<DashboardLayout />}>
            {/* Client portal */}
            <Route path="/client/dashboard" element={<ClientDashboardPage />} />
            <Route path="/client/audits/new" element={<NewAuditRequestPage />} />
            <Route path="/client/audits/:id/status" element={<LiveAuditTrackerPage />} />
            <Route path="/client/audits/:id/review" element={<DualPaneReviewPage />} />
            <Route path="/client/audits/:id/triage" element={<VulnerabilityTriagePage />} />
            <Route path="/client/audits/:id/report" element={<FinalReportPage />} />
            <Route path="/client/vault" element={<DocumentVaultPage />} />
            <Route path="/client/checkout" element={<CheckoutPage />} />
            <Route path="/risk-report" element={<RiskAssessmentPage />} />

            {/* Auditor workspace */}
            <Route path="/auditor/queue" element={<AuditorQueuePage />} />
            <Route path="/auditor/ai-terminal" element={<AiTerminalPage />} />
            <Route path="/auditor/forensics" element={<ForensicsPage />} />
            <Route path="/leaderboard/auditors" element={<AuditorLeaderboardPage />} />
            <Route path="/leaderboard/security" element={<SkynetDashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/scanner" element={<ScannerPage />} />

            {/* Intelligence and threat hub */}
            <Route path="/threat-hub/skynet" element={<SkynetDashboardPage />} />
            <Route path="/threat-hub/ecosystem" element={<EcosystemPage />} />
            <Route path="/threat-hub/scam-detector" element={<ScamDetectorPage />} />
            <Route path="/threat-hub/whales" element={<WhaleAlertsPage />} />
            <Route path="/threat-hub/token-analyzer" element={<TokenAnalyzerPage />} />
            <Route path="/threat-hub/protocols/:id" element={<TokenAnalyzerPage />} />
            <Route path="/threat-hub/vaults" element={<DocumentVaultPage />} />

            {/* Governance and profile */}
            <Route path="/governance" element={<GovernancePage />} />
            <Route path="/governance/proposals/:id" element={<ProposalDetailPage />} />
            <Route path="/profile/:id" element={<UserProfilePage />} />

            {/* Academy and LMS */}
            <Route path="/courses" element={<CoursesLibraryPage />} />
            <Route path="/academy/lesson" element={<CoursePlayerPage />} />
            <Route path="/academy/learn/:courseId" element={<CoursePlayerPage />} />
            <Route path="/academy/assessment/:id" element={<AssessmentQuizPage />} />
            <Route path="/academy/certificate/:id" element={<CertificatePage />} />

            {/* Admin operations */}
            <Route path="/admin/overview" element={<AdminOverviewPage />} />
            <Route path="/admin/logs" element={<SecurityLogsPage />} />
            <Route path="/admin/security-monitor" element={<SecurityOperationsPage />} />
            <Route path="/admin/logs-tactical" element={<SecurityLogsPage />} />
            <Route path="/admin/security-config" element={<SecurityConfigPage />} />
            <Route path="/admin/alerts" element={<SecurityConfigPage />} />
            <Route path="/admin/content" element={<ContentAdministrationPage />} />
            <Route path="/admin/course-builder" element={<ContentAdministrationPage />} />
            <Route path="/admin/course-builder-enhanced" element={<ContentAdministrationPage />} />
            <Route path="/admin/token-reports" element={<TokenAnalyzerPage />} />
            <Route path="/admin/users-protocols" element={<AdminOverviewPage />} />
            <Route path="/admin/developers-api" element={<SecurityConfigPage />} />
            <Route path="/admin/gateways" element={<BillingHistoryPage />} />
            <Route path="/admin/billing" element={<BillingHistoryPage />} />
            <Route path="/admin/invoices/:id" element={<InvoiceTemplatePage />} />
            <Route path="/admin/refunds" element={<BillingHistoryPage />} />
          </Route>

          {/* Compatibility redirect for the old scam-detector URL */}
          <Route path="/scam-detector" element={<Navigate to="/threat-hub/scam-detector" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
