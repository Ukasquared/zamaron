import Sidebar from '../components/risk-report/Sidebar';
import RiskBadge from '../components/risk-report/RiskBadge';
import NeuralRiskScoreCard from '../components/risk-report/NeuralRiskScoreCard';
import StatusMetricCard from '../components/risk-report/StatusMetricCard';
import ThreatVectorPanel from '../components/risk-report/ThreatVectorPanel';
import ChatSidebar from '../components/risk-report/ChatSidebar';
import Footer from '../components/Footer';
import { TARGET_ENTITY, NEURAL_RISK_SCORE, STATUS_METRICS } from '../data/riskReportContent';

export default function RiskReportPage() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md min-h-screen flex overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-surface-container-high/40 via-background to-background" />
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

      <Sidebar />

      <main className="flex-1 ml-0 md:ml-64 h-screen overflow-y-auto overflow-x-hidden relative">
        <div className="max-w-[1280px] mx-auto p-container-margin min-h-full flex flex-col gap-section-gap">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-label-sm text-label-sm text-outline tracking-[0.2em] uppercase">
                  Target Entity
                </span>
                <div className="h-[1px] w-12 bg-outline-variant" />
                <span className="font-label-sm text-label-sm text-outline-variant font-mono">
                  {TARGET_ENTITY.addressShort}
                </span>
              </div>
              <h1 className="font-display-xl text-display-xl text-on-surface">
                {TARGET_ENTITY.name} <span className="text-outline-variant">({TARGET_ENTITY.ticker})</span>
              </h1>
            </div>
            <RiskBadge label="High Risk" />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter flex-1">
            <div className="lg:col-span-8 flex flex-col gap-gutter">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <NeuralRiskScoreCard
                  score={NEURAL_RISK_SCORE.score}
                  max={NEURAL_RISK_SCORE.max}
                  summary={NEURAL_RISK_SCORE.summary}
                />
                {STATUS_METRICS.map((metric) => (
                  <StatusMetricCard key={metric.label} {...metric} />
                ))}
              </div>

              <ThreatVectorPanel />
            </div>

            <ChatSidebar />
          </div>

          <Footer compact />
        </div>
      </main>
    </div>
  );
}
