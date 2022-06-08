import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './types/types';
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
  const isAuth = useSelector((state: RootState) => state.signIn.isAuth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/main"
          element={
            <RequireAuth isAuth={isAuth}>
              <MainPage />
            </RequireAuth>
          }
        />
        <Route
          path="/edit"
          element={
            <RequireAuth isAuth={isAuth}>
              <EditProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/board/:id"
          element={
            <RequireAuth isAuth={isAuth}>
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
