import { useState } from 'react'

export const useForm = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched({
      ...touched,
      [name]: true,
    })
  }

  const validate = async () => {
    if (!validationSchema) return true

    try {
      await validationSchema.validate(values, { abortEarly: false })
      setErrors({})
      return true
    } catch (err) {
      const validationErrors = {}
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message
      })
      setErrors(validationErrors)
      return false
    }
  }

  const handleSubmit = async (onSubmit) => {
    return async (e) => {
      e.preventDefault()
      setIsSubmitting(true)

      const isValid = await validate()
      if (isValid) {
        await onSubmit(values)
      }

      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
  }
}
