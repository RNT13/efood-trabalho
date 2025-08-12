/* eslint-disable prettier/prettier */
import { FormikProvider, useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { RootState } from '../../redux/store';
import { MaskedInputCheck } from '../../utils/maskedInputCheck';
import { MaskedInput } from '../MaskedInput/MaskedInput';
import { DeliveryButton, DeliveryContainer, DeliveryFooter, DeliveryForm, DeliveryLabel, DeliveryRow, DeliveryTitle, InputGroup } from './DeliveryStyles';

interface DeliveryProps {
  onContinue: (deliveryInfo: Delivery) => void
  onBack?: () => void
}



export default function Delivery({ onContinue, onBack }: DeliveryProps) {
  const { deliveryInfo } = useSelector((state: RootState) => state.checkout)

  const form = useFormik({
    initialValues: deliveryInfo || {
      name: '',
      address: '',
      city: '',
      zip: '',
      number: '',
      complement: ''
    },
    validationSchema: yup.object({
      name: yup.string().matches(/^[a-zA-Z\u00C0-\u017F\s]+$/, 'Use apenas letras').min(5, 'Minimo de 5 letras').required('Campo obrigatorio'),
      address: yup.string().min(5, 'Minimo de 5 letras').required('Campo obrigatorio'),
      city: yup.string().matches(/^[a-zA-Z\u00C0-\u017F\s]+$/, 'Use apenas letras').min(5, 'Minimo de 5 letras').required('Campo obrigatorio'),
      zip: yup.string().min(9, 'Minimo de 9 numeros').required('  Campo obrigatorio'),
      number: yup.string().required('Campo obrigatorio'),
      complement: yup.string()
    }),
    onSubmit: async (values) => {
      onContinue({
        name: values.name,
        address: values.address,
        city: values.city,
        zip: values.zip,
        number: Number(values.number),
        complement: values.complement
      })
    }
  })

  return (
    <DeliveryContainer>
      <DeliveryTitle>Entrega</DeliveryTitle>

      <FormikProvider value={form}>
        <DeliveryForm onSubmit={form.handleSubmit}>

          <InputGroup>
            <DeliveryLabel htmlFor="name">Quem irá receber?</DeliveryLabel>
            <MaskedInput id="name" name="name" placeholder="Nome Completo" className={MaskedInputCheck('name', form) ? 'error' : ''} showError />
          </InputGroup>

          <InputGroup>
            <DeliveryLabel htmlFor="address">Endereço</DeliveryLabel>
            <MaskedInput id="address" name="address" placeholder="Rua Exemplo" className={MaskedInputCheck('address', form) ? 'error' : ''} showError />
          </InputGroup>

          <InputGroup>
            <DeliveryLabel htmlFor="city">Cidade</DeliveryLabel>
            <MaskedInput id="city" name="city" placeholder="Cidade" className={MaskedInputCheck('city', form) ? 'error' : ''} showError />
          </InputGroup>

          <DeliveryRow>

            <InputGroup>
              <DeliveryLabel htmlFor="zip">CEP</DeliveryLabel>
              <MaskedInput id="zip" name="zip" placeholder="00000-000" mask="00000-000" className={MaskedInputCheck('zip', form) ? 'error' : ''} showError />
            </InputGroup>

            <InputGroup>
              <DeliveryLabel htmlFor="number">Número</DeliveryLabel>
              <MaskedInput id="number" name="number" placeholder="123" mask="00000" className={MaskedInputCheck('number', form) ? 'error' : ''} showError />
            </InputGroup>

          </DeliveryRow>

          <InputGroup>
            <DeliveryLabel htmlFor="complement">Complemento (opcional)</DeliveryLabel>
            <MaskedInput name="complement" placeholder="Apartamento, bloco, etc." className={MaskedInputCheck('complement', form) ? 'error' : ''} showError />
          </InputGroup>

          <DeliveryFooter>
            <DeliveryButton type="button" onClick={form.submitForm}>
              Continuar com o pagamento
            </DeliveryButton>
            <DeliveryButton type="button" onClick={onBack}>
              Voltar para o carrinho
            </DeliveryButton>
          </DeliveryFooter>
        </DeliveryForm>
      </FormikProvider>

    </DeliveryContainer>
  )
}


