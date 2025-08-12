import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCreatePurchaseMutation } from '../../redux/api/purchaseApi'
import { setDeliveryInfo, setPaymentInfo } from '../../redux/slices/checkoutSlice'
import { RootState } from '../../redux/store'
import Cart from '../cart/Cart'
import Confirmation from '../confirmation/Confirmation'
import Delivery from '../delivery/Delivery'
import Payment from '../payment/Payment'
import Popup from '../popup/Popup'
import { AsideBarButton, AsideBarCloseButton, AsideBarContainer, AsideBarOverlay } from './AsideBarStyles'

interface AsideBarProps {
  onClose: () => void
  omSaveDelivery?: (deliveryInfo: Delivery) => void
}

export default function AsideBar({ onClose }: AsideBarProps) {
  const dispatch = useDispatch()
  const [total, setTotal] = useState<number>(0)
  const [step, setStep] = useState<'cart' | 'delivery' | 'payment' | 'confirmation'>('cart')
  const [showPopup, setShowPopup] = useState(false)

  //estados globais do Redux
  const { deliveryInfo } = useSelector((state: RootState) => state.checkout)
  const { paymentInfo } = useSelector((state: RootState) => state.checkout)
  const { items: cartItems } = useSelector((state: RootState) => state.cart)

  const [createPurchase, { data, isSuccess }] = useCreatePurchaseMutation()

  const handleShowDeliveryForm = (cartTotal: number) => {
    setTotal(cartTotal)
    setStep('delivery')
  }

  const handleShowPaymentForm = (info: Delivery) => {
    dispatch(setDeliveryInfo(info))
    setStep('payment')
  }

  const handleFinalizePayment = (info: Payment) => {
    dispatch(setPaymentInfo(info))
    setShowPopup(true)
  }

  const handleConfirmOrder = async () => {
    if (!deliveryInfo || !paymentInfo) {
      alert('Informações de entrega/pagamento incompletas.')
      return
    }

    const products: PurchaseProduct[] = cartItems.map(item => {
      const idNum = Number(item.foodId)
      return {
        id: isNaN(idNum) ? item.foodId : idNum,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }
    })

    const orderData: PurchaseRequest = {
      price: total,
      products,
      delivery: {
        receiver: deliveryInfo.name,
        address: {
          description: deliveryInfo.address,
          city: deliveryInfo.city,
          zipCode: deliveryInfo.zip,
          number: Number(deliveryInfo.number),
          complement: deliveryInfo.complement
        }
      },
      payment: {
        card: {
          name: paymentInfo.cardName,
          number: paymentInfo.cardNumber,
          code: Number(paymentInfo.cvv),
          expires: {
            month: Number(paymentInfo.expiryMonth),
            year: Number(paymentInfo.expiryYear)
          }
        }
      }
    }

    try {
      await createPurchase(orderData).unwrap()
      setShowPopup(false)
      setStep('confirmation')
    } catch (err) {
      console.error(err)
      alert('Erro ao finalizar o pedido.')
    }
  }

  return (
    <>
      <AsideBarOverlay onClick={onClose} />
      <AsideBarContainer>
        <AsideBarCloseButton onClick={onClose}>x</AsideBarCloseButton>
        {step === 'cart' && <Cart onContinue={handleShowDeliveryForm} />}
        {step === 'delivery' && <Delivery onContinue={info => handleShowPaymentForm(info)} onBack={() => setStep('cart')} />}
        {step === 'payment' && <Payment total={total} onBack={() => setStep('delivery')} onFinalize={handleFinalizePayment} />}
        {step === 'confirmation' && deliveryInfo && isSuccess && data && (
          <Confirmation orderId={data.orderId!} total={total} deliveryInfo={deliveryInfo} cartItems={cartItems} onClose={onClose} />
        )}
      </AsideBarContainer>
      {showPopup && (
        <Popup title="Confirmação do Pedido" message="Confira as informações do pedido antes de finalizar." onClose={() => setShowPopup(false)}>
          <p>Resumo do Pedido:</p>
          <ul>
            {cartItems.map(item => (
              <li key={item.foodId}>
                {item.name} - {item.quantity}x - {item.price.toFixed(2).replace('.', ',')}
              </li>
            ))}
          </ul>
          {deliveryInfo && (
            <p>
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
          )}
          <p>
            <strong>Total:</strong> R$ {total.toFixed(2).replace('.', ',')}
          </p>
          <AsideBarButton onClick={handleConfirmOrder}>Confirmar e finalizar pedido</AsideBarButton>
        </Popup>
      )}
    </>
  )
}
