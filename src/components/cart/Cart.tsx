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

export default function Cart({ onContinue }: CartProps) {
  const dispatch = useDispatch()

  const { items: cartItems } = useSelector((state: RootState) => state.cart)

  const expendexCartItem = cartItems.flatMap(item => Array.from({ length: item.quantity }, () => item))

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleRemoveItem = (foodId: string) => {
    dispatch(decrementItemQuantity(foodId))
  }

  if (cartItems.length === 0)
    return (
      <CartContainer>
        <CartContent>
          <p>Seu carrinho esta vazio</p>
          <p>Adicione pelo menos um item ao carrinho</p>
        </CartContent>
      </CartContainer>
    )

  return (
    <CartContainer>
      <CartContent>
        {expendexCartItem.map((item, idx) => (
          <CartItem key={`${item.foodId}-${idx}`}>
            <CartItemImage src={item.image} alt={item.name} />
            <CartItemInfo>
              <p>{item.name}</p>
              <CartItemPrice>R$ {item.price.toFixed(2).replace('.', ',')}</CartItemPrice>
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
