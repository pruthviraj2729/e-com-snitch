import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from '../features/landing/ui/pages/LandingPage.jsx'
import LoginPage from '../features/auth/ui/pages/LoginPage.jsx'
import SignupPage from '../features/auth/ui/pages/SignupPage.jsx'
import DashboardPage from '../features/dashboard/ui/pages/DashboardPage.jsx'
import SellerDashboardPage from '../features/dashboard/ui/pages/SellerDashboardPage.jsx'
import { useContext } from 'react'
import { MyStore } from '../context/MyStore.jsx'
import MenCollection from '../features/landing/ui/components/MenCollection.jsx'
import WomenCollection from '../features/landing/ui/components/WomenCollection.jsx'

function SellerRoute({ children }) {
  const { accessToken, user } = useContext(MyStore)

  if (!accessToken) return <Navigate to="/login" replace />
  if (user?.role !== 'seller') return <Navigate to="/" replace />
  return children
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/for-him-collection" element={<MenCollection/>}/>
      <Route path="/for-her-collection" element={<WomenCollection/>}/>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/seller" element={<SellerRoute><SellerDashboardPage /></SellerRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}