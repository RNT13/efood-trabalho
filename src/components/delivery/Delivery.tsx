/* eslint-disable prettier/prettier */
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { MaskedInputCheck } from '../../utils/maskedInputCheck';
import { MaskedInput } from '../MaskedInput/MaskedInput';
import { DeliveryButton, DeliveryContainer, DeliveryFooter, DeliveryForm, DeliveryLabel, DeliveryRow, DeliveryTitle, InputGroup } from './DeliveryStyles';

interface DeliveryProps {
  onContinue: (deliveryInfo: Delivery) => void
  onBack?: () => void
}



export default function Delivery({ onContinue, onBack }: DeliveryProps) {
  const form = useFormik({
    initialValues: {
      name: '',
      address: '',
      city: '',
      zip: '',
      number: '',
      complement: ''
    },
    validationSchema: yup.object({
      name: yup.string().matches(/^[a-zA-Z\s]+$/, 'Use apenas letras').min(5, 'Minimo de 5 letras').required('Campo obrigatorio'),
      address: yup.string().matches(/^[a-zA-Z\s]+$/, 'Use apenas letras').min(5, 'Minimo de 5 letras').required('Campo obrigatorio'),
      city: yup.string().matches(/^[a-zA-Z\s]+$/, 'Use apenas letras').min(5, 'Minimo de 5 letras').required('Campo obrigatorio'),
      zip: yup.string().matches(/^[0-9--]+$/, 'Use apenas numeros e tracinho').min(8, 'Minimo de 8 numeros').max(8, 'Maximo de 8 numeros').required('  Campo obrigatorio'),
      number: yup.string().matches(/^[0-9]+$/, 'Use apenas numeros').min(1, 'Minimo de 1 numeros').max(9, 'Maximo de 9 numeros').required('Campo obrigatorio'),
      complement: yup.string().matches(/^[a-zA-Z\s]+$/, 'Use apenas letras')
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
              <MaskedInput id="zip" name="zip" placeholder="00000-000" className={MaskedInputCheck('zip', form) ? 'error' : ''} showError />
            </InputGroup>

            <InputGroup>
              <DeliveryLabel htmlFor="number">Número</DeliveryLabel>
              <MaskedInput id="number" name="number" placeholder="123" className={MaskedInputCheck('number', form) ? 'error' : ''} showError />
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


