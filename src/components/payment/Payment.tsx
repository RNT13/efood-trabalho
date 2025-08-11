import { FormikProvider, useFormik } from 'formik'
import * as yup from 'yup'
import { MaskedInputCheck } from '../../utils/maskedInputCheck'
import { MaskedInput } from '../MaskedInput/MaskedInput'
import { PaymentButton, PaymentContainer, PaymentFooter, PaymentForm, PaymentLabel, PaymentRow, PaymentTitle } from './PaymentStyles'

interface PaymentProps {
  total: number
  onFinalize: (paymentInfo: Payment) => void
  onBack: () => void
}

export default function Payment({ total, onBack, onFinalize }: PaymentProps) {
  const form = useFormik({
    initialValues: {
      cardName: '',
      cardNumber: '',
      cvv: '',
      expiryMonth: '',
      expiryYear: ''
    },
    validationSchema: yup.object({
      cardName: yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, 'Use apenas letras')
        .min(5, 'Minimo de 5 letras')
        .required('Campo obrigatorio'),
      cardNumber: yup
        .string()
        .matches(/^[0-9--]+$/, 'Use apenas numeros')
        .min(16, 'Minimo de 16 numeros')
        .max(16, 'Maximo de 16 numeros')
        .required('Campo obrigatorio'),
      cvv: yup.string().min(3, 'Minimo de 3 numeros').max(3, 'Maximo de 3 numeros').required('Campo obrigatorio'),
      expiryMonth: yup.string().min(2, 'Minimo de 2 numeros').max(2, 'Maximo de 2 numeros').required('Campo obrigatorio'),
      expiryYear: yup.string().min(4, 'Minimo de 4 numeros').max(4, 'Maximo de 4 numeros').required('Campo obrigatorio')
    }),
    onSubmit: async values => {
      onFinalize({
        cardName: values.cardName,
        cardNumber: values.cardNumber,
        cvv: Number(values.cvv),
        expiryMonth: Number(values.expiryMonth),
        expiryYear: Number(values.expiryYear)
      })
    }
  })

  return (
    <PaymentContainer>
      <PaymentTitle>Pagamento - Valor a pagar R$ {total.toFixed(2).replace('.', ',')}</PaymentTitle>
      <FormikProvider value={form}>
        <PaymentForm onSubmit={form.handleSubmit}>
          <PaymentLabel htmlFor="cardName">Nome no cartão</PaymentLabel>
          <MaskedInput
            id="cardName"
            name="cardName"
            type="text"
            placeholder="Nome no cartão"
            className={MaskedInputCheck('cardName', form) ? 'error' : ''}
            showError
          />

          <PaymentRow>
            <div id="cddDiv">
              <PaymentLabel htmlFor="cardNumber">Número do cartão</PaymentLabel>
              <MaskedInput
                id="cardNumber"
                name="cardNumber"
                type="text"
                placeholder="0000 0000 0000 0000"
                className={MaskedInputCheck('cardNumber', form) ? 'error' : ''}
                showError
              />
            </div>
            <div>
              <PaymentLabel htmlFor="cvv">CVV</PaymentLabel>
              <MaskedInput id="cvv" name="cvv" type="text" placeholder="123" className={MaskedInputCheck('cvv', form) ? 'error' : ''} showError />
            </div>
          </PaymentRow>

          <PaymentRow>
            <div>
              <PaymentLabel htmlFor="expiryMonth">Mês de vencimento</PaymentLabel>
              <MaskedInput
                id="expiryMonth"
                name="expiryMonth"
                type="text"
                placeholder="MM"
                className={MaskedInputCheck('expiryMonth', form) ? 'error' : ''}
                showError
              />
            </div>
            <div>
              <PaymentLabel htmlFor="expiryYear">Ano de vencimento</PaymentLabel>
              <MaskedInput
                id="expiryYear"
                name="expiryYear"
                type="text"
                placeholder="AAAA"
                className={MaskedInputCheck('expiryYear', form) ? 'error' : ''}
                showError
              />
            </div>
          </PaymentRow>

          <PaymentFooter>
            <PaymentButton type="button" onClick={form.submitForm}>
              Confirmar pagamento
            </PaymentButton>
            <PaymentButton type="button" onClick={onBack}>
              Voltar para a edição de endereço
            </PaymentButton>
          </PaymentFooter>
        </PaymentForm>
      </FormikProvider>
    </PaymentContainer>
  )
}
