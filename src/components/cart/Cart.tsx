import { FaTrashCan } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { decrementItemQuantity } from '../../redux/slices/cartSlice'
import { RootState } from '../../redux/store'
import {
  CartButton,
  CartContainer,
  CartContent,
  CartDesdcription,
  CartItem,
  CartItemButton,
  CartItemImage,
  CartItemInfo,
  CartItemPrice
} from './CartStyles'

interface CartProps {
  onClose?: () => void
  onContinue: (cartTotal: number) => void
}

const Cart: React.FC<CartProps> = ({ onContinue }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const expandedCartItems = cartItems.flatMap(item => Array.from({ length: item.quantity }, () => item))

  const totalPrice = cartItems.reduce((acc, item) => {
    const priceNumber = typeof item.price === 'string' ? Number(item.price.replace('R$', '').replace(',', '.').trim()) : Number(item.price)
    return acc + priceNumber * item.quantity
  }, 0)

  const handleRemoveItem = (foodId: string) => {
    dispatch(decrementItemQuantity(foodId))
  }

  return (
    <CartContainer>
      <CartContent>
        {expandedCartItems.map((item, idx) => (
          <CartItem key={item.foodId + '-' + idx}>
            <CartItemImage src={item.image} alt={item.title} />
            <CartItemInfo>
              <p>{item.title}</p>
              <CartItemPrice>{item.price}</CartItemPrice>
            </CartItemInfo>
            <div>
              <CartItemButton onClick={() => handleRemoveItem(item.foodId)}>
                <FaTrashCan />
              </CartItemButton>
            </div>
          </CartItem>
        ))}
      </CartContent>
      <CartDesdcription>
        <p>Valor Total:</p>
        <p>R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
      </CartDesdcription>
      <CartButton onClick={() => onContinue(totalPrice)}>Continuar com a entrega</CartButton>
    </CartContainer>
  )
}

export default Cart
