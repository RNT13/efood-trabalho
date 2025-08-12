import { useDispatch } from 'react-redux'
import { resetCart } from '../../redux/slices/cartSlice'
import { resetCheckout } from '../../redux/slices/checkoutSlice'
import { ConfirmationButton, ConfirmationContainer } from './ConfirmationStyles'

interface ConfirmationProps {
  orderId: string | null
  total: number
  deliveryInfo: Delivery
  cartItems: CartItem[]
  onClose: () => void
}

export default function Confirmation({ orderId, total, deliveryInfo, cartItems, onClose }: ConfirmationProps) {
  const dispatch = useDispatch()
  const handleClick = () => {
    onClose()
    dispatch(resetCheckout())
    dispatch(resetCart())
  }

  return (
    <ConfirmationContainer>
      <h2>Pedido realizado - {orderId}</h2>
      <p>Resumo do Pedido:</p>
      <ul>
        {cartItems.map(item => (
          <li key={item.foodId}>
            {item.name} - {item.quantity}x - {item.price.toFixed(2).replace('.', ',')}
          </li>
        ))}
      </ul>
      <p>
        <strong>Dados de Entrega</strong>
        <br />
        <strong>Nome de quem receberá:</strong> {deliveryInfo.name}
        <br />
        <strong>Endereço de Entrega:</strong> {deliveryInfo.address}
        <br />
        <strong>Numeroda da Casa </strong> {deliveryInfo.number}
        <br />
        <strong>Bairro de Entrega:</strong> {deliveryInfo.city}, {deliveryInfo.zip}
        <br />
        <strong>Complemento:</strong> {deliveryInfo.complement}
      </p>
      <p>
        <strong>Total:</strong> R$ {total.toFixed(2).replace('.', ',')}
      </p>
      <p>Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.</p>
      <p>Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar cobranças extras.</p>
      <p>
        Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo assim sua segurança e bem-estar durante a refeição.
      </p>
      <p>Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. Bom apetite!</p>
      <ConfirmationButton id="button" to={'/'} onClick={handleClick}>
        Voltar para Home
      </ConfirmationButton>
    </ConfirmationContainer>
  )
}
