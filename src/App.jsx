import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventDetails from './pages/EventDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/discover" element={<HomePage />} />
        <Route path="/for-organizers" element={<HomePage />} />
        <Route path="/host" element={<HomePage />} />
        <Route path="/organizers/:id" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
