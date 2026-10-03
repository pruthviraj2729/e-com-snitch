import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './router/AppRoutes.jsx'
import { CartProvider } from './features/landing/state/CartContext.jsx'
import { MyStoreProvider } from './context/contextApi.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <MyStoreProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
      </MyStoreProvider>
    </BrowserRouter>
  )
}

export default App
