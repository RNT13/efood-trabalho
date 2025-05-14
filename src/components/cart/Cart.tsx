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
  CartItemPrice,
  CartItemTotal,
  CartText
} from './CartStyles'

interface CartProps {
  onClose?: () => void
  onContinue: (cartTotal: number) => void
}

const Cart: React.FC<CartProps> = ({ onContinue }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const expandedCartItems = cartItems.flatMap(item => Array.from({ length: item.quantity }, () => item))

  const totalPrice = expandedCartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('R$', '').replace(',', '.'))
    return total + price
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
        <CartText>Valor Total:</CartText>
        <CartItemTotal>R$ {totalPrice.toFixed(2).replace('.', ',')}</CartItemTotal>
      </CartDesdcription>
      <CartButton onClick={() => onContinue(totalPrice)}>Continuar com a entrega</CartButton>
    </CartContainer>
  )
}

export default Cart
