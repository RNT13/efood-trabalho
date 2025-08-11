import { ConfirmationButton, ConfirmationContainer } from './ConfirmationStyles'

interface ConfirmationProps {
  orderId: string | null
  total: number
  deliveryInfo: Delivery
  cartItems: CartItem[]
  onClose?: () => void
}

export default function Confirmation({ orderId, total, deliveryInfo, cartItems, onClose }: ConfirmationProps) {
  const handleClick = () => {
    if (onClose) {
      onClose()
    }
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
        <strong>Endereço de Entrega:</strong>
        <br />
        Quem receberá: {deliveryInfo.name},<br />
        Rua: {deliveryInfo.address}, {deliveryInfo.number},<br />
        Bairro: {deliveryInfo.city} - {deliveryInfo.zip}
        <br />
        {deliveryInfo.complement && `, ${deliveryInfo.complement}`}
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
