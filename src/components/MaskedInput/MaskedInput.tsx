import { useField } from 'formik'
import { IMaskInput } from 'react-imask'
import { MaskedInputContainer } from './MaskedInputStyles'

type MaskedInputProps = {
  name: string
  mask?: string
  placeholder?: string
  className?: string
  showError?: boolean
  type?: string
  id?: string
}

export const MaskedInput = ({ name, mask, placeholder, className, showError = false, type = 'text', id }: MaskedInputProps) => {
  const [field, meta, helpers] = useField(name)

  const commonProps = {
    ...field,
    placeholder,
    className,
    type,
    id,
    onBlur: () => helpers.setTouched(true)
  }

  return (
    <MaskedInputContainer>
      {mask ? (
        <IMaskInput {...commonProps} mask={mask} value={String(field.value ?? '')} onAccept={(value: string) => helpers.setValue(value)} />
      ) : (
        <input {...commonProps} value={String(field.value ?? '')} onChange={e => helpers.setValue(e.target.value)} />
      )}
      {showError && meta.touched && meta.error && <div>{meta.error}</div>}
    </MaskedInputContainer>
  )
}
