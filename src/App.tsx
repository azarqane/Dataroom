import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Security } from './components/Security';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import DataRoomPage from './pages/DataRoomPage';
import AccessDataRoom from "./pages/access/AccessDataRoom";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <Hero />
                <Features />
                <Security />
                <Testimonials />
                <Pricing />
                <FAQ />
              </main>
              <Footer />
            </>
          } />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dataroom/:id" element={<DataRoomPage />} />
          <Route path="/access/:token" element={<AccessDataRoom />} />
        </Routes>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#14b8a6',
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '1rem',
              boxShadow: '0 4px 32px 0 rgb(0 0 0 / 10%)',
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#14b8a6"
            }
          }}
        />
      </div>
    </Router>
  );
}

export default App;