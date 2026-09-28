import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './router/AppRoutes.jsx'
import { CartProvider } from './features/landing/state/CartContext.jsx'
import { AuthSessionProvider } from './features/auth/state/AuthSessionProvider.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <AuthSessionProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthSessionProvider>
    </BrowserRouter>
  )
}

export default App
