import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStyle } from "./styles/global";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from './Pages/MainPage';
import Origames from './Pages/Origames';
import Events from './Pages/Events';
import AthleteList from './Pages/AthleteList';
import Notifications from './Pages/Notifications';
import Settings from './Pages/Settings';
import GamePage from './Pages/Game';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
    <Router>
      {/* Optional: Add a navbar or sidebar here */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/origames" element={<Origames />} />
        <Route path="/events" element={<Events />} />
        <Route path="/athletes" element={<AthleteList />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/origames/:id" element={<GamePage />} />
        <Route path="/signin/" element={<SignIn />} />
        <Route path="/signup/" element={<SignUp />} />

      </Routes>
      <GlobalStyle />
    </Router>
    </AuthProvider>
  );
}

export default App;
