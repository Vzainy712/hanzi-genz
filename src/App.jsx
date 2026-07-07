import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ReminderManager from './components/ReminderManager.jsx'
import HomePage from './pages/HomePage.jsx'
import LessonsPage from './pages/LessonsPage.jsx'
import LessonDetailPage from './pages/LessonDetailPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import ProgressPage from './pages/ProgressPage.jsx'
import GrammarPage from './pages/GrammarPage.jsx'
import GrammarDetailPage from './pages/GrammarDetailPage.jsx'
import PronunciationPage from './pages/PronunciationPage.jsx'
import PracticePage from './pages/PracticePage.jsx'
import FlashcardPage from './pages/FlashcardPage.jsx'
import ListeningPage from './pages/ListeningPage.jsx'
import RadicalsPage from './pages/RadicalsPage.jsx'
import DictionaryPage from './pages/DictionaryPage.jsx'
import VocabLessonDetailPage from './pages/VocabLessonDetailPage.jsx'
import VocabQuizPage from './pages/VocabQuizPage.jsx'
import TrendyPage from './pages/TrendyPage.jsx'
import SentenceGamePage from './pages/SentenceGamePage.jsx'
import ReviewPage from './pages/ReviewPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import BossPage from './pages/BossPage.jsx'
import CollectionPage from './pages/CollectionPage.jsx'

/** Bố cục gốc + định tuyến toàn ứng dụng. */
export default function App() {
  return (
    <div className="min-h-screen">
      <ReminderManager />
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6 sm:pb-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/lesson/:lessonId" element={<LessonDetailPage />} />
          <Route path="/quiz/:lessonId" element={<QuizPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/flashcards" element={<FlashcardPage />} />
          <Route path="/listening" element={<ListeningPage />} />
          <Route path="/radicals" element={<RadicalsPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/vocab/:lessonId" element={<VocabLessonDetailPage />} />
          <Route path="/vocab-quiz/:lessonId" element={<VocabQuizPage />} />
          <Route path="/trending" element={<TrendyPage />} />
          <Route path="/sentence-game" element={<SentenceGamePage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/boss/:lessonId" element={<BossPage />} />
          <Route path="/collection" element={<CollectionPage />} />
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
