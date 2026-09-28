import { useState } from 'react'
import { CartContext } from './cartStoreContext.js'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  function addItem(product) {
    setItems((currentItems) => [...currentItems, product])
  }

  return (
    <CartContext.Provider value={{ count: items.length, addItem }}>
      {children}
    </CartContext.Provider>
  )
}