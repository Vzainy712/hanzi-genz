import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import LessonsPage from './pages/LessonsPage.jsx'
import LessonDetailPage from './pages/LessonDetailPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import ProgressPage from './pages/ProgressPage.jsx'
import GrammarPage from './pages/GrammarPage.jsx'
import GrammarDetailPage from './pages/GrammarDetailPage.jsx'
import PronunciationPage from './pages/PronunciationPage.jsx'

/** Bố cục gốc + định tuyến toàn ứng dụng. */
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6 sm:pb-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/lesson/:lessonId" element={<LessonDetailPage />} />
          <Route path="/quiz/:lessonId" element={<QuizPage />} />
          <Route path="/grammar" element={<GrammarPage />} />
          <Route path="/grammar/:grammarId" element={<GrammarDetailPage />} />
          <Route path="/pronunciation" element={<PronunciationPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
