import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RiskReportPage from './pages/RiskReportPage';
import CoursesPage from './pages/CoursesPage';
import AcademyLessonPage from './pages/AcademyLessonPage';
import ScamDetectorPage from './pages/ScamDectectorPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/risk-report" element={<RiskReportPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/academy/lesson" element={<AcademyLessonPage />} />
        <Route path="/scam-detector" element={<ScamDetectorPage />} />
      </Routes>
    </BrowserRouter>
  );
} 
  
