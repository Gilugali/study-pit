
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../src/components/Header";
import { Footer } from "../src/components/Footer";
import { HomePage } from "../src/pages/HomePage";
import { AskQuestionPage } from "../src/pages/AskQuestionPage";
import { QuestionDetailPage } from "../src/pages/QuestionDetailPage";
import { SearchPage } from "../src/pages/SearchPage";
import { ProfilePage } from "../src/pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ask" element={<AskQuestionPage />} />
            <Route path="/q/:id" element={<QuestionDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;