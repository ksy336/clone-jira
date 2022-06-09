import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import Login from './pages/AuthPage/LoginPage';
import SignUp from './pages/AuthPage/SignUpPage';
import { RequireAuth } from './hoc/RequireAuth';
import MainPage from './pages/MainPage';
import EditProfile from './pages/EditProfilePage';
import Error from './pages/ErrorPage';
import './App.css';
import Board from './pages/BoardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/main"
          element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          }
        />
        <Route
          path="/edit"
          element={
            <RequireAuth>
              <EditProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/board/:id"
          element={
            <RequireAuth>
              <Board />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
