import { HashRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from './pages/Index.tsx';
import NotFound from './pages/NotFound.tsx';

const App = () => (
  <>
    <Toaster />
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </>
);

export default App;
