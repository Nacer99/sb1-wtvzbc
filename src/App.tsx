import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FarmDetails from './pages/FarmDetails';
import Dashboard from './pages/Dashboard';
import ManageFarm from './pages/ManageFarm';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/farm/:id" element={<FarmDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/farm/:id?" element={<ManageFarm />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-center" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;