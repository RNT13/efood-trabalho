import { FormikProps } from 'formik'

export const MaskedInputCheck = <T>(fieldName: keyof T, form: FormikProps<T>): boolean => {
  const isTouched = fieldName in form.touched
  const hasError = fieldName in form.errors
  return isTouched && hasError
}
