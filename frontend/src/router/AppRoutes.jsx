import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from '../features/landing/ui/pages/LandingPage.jsx'
import LoginPage from '../features/auth/ui/pages/LoginPage.jsx'
import SignupPage from '../features/auth/ui/pages/SignupPage.jsx'
import DashboardPage from '../features/dashboard/ui/pages/DashboardPage.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}