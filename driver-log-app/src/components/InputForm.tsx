import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

interface InputFormProps {
  onSubmit: (formData: any) => void
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    current_location: '',
    pickup_location: '',
    dropoff_location: '',
    current_cycle_hours: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const isFormValid =
    formData.current_location.trim() !== '' &&
    formData.pickup_location.trim() !== '' &&
    formData.dropoff_location.trim() !== '' &&
    formData.current_cycle_hours.trim() !== ''

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>
          {t('INPUT_FORM.CURRENT_LOCATION')} <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="current_location"
          value={formData.current_location}
          onChange={handleChange}
          placeholder={t('INPUT_FORM.CURRENT_LOCATION_PLACEHOLDER')}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          {t('INPUT_FORM.PICKUP_LOCATION')} <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="pickup_location"
          value={formData.pickup_location}
          onChange={handleChange}
          placeholder={t('INPUT_FORM.PICKUP_LOCATION_PLACEHOLDER')}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          {t('INPUT_FORM.DROPOFF_LOCATION')} <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="dropoff_location"
          value={formData.dropoff_location}
          onChange={handleChange}
          placeholder={t('INPUT_FORM.DROPOFF_LOCATION_PLACEHOLDER')}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          {t('INPUT_FORM.CYCLE_HOURS')} <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="number"
          name="current_cycle_hours"
          value={formData.current_cycle_hours}
          onChange={handleChange}
          placeholder={t('INPUT_FORM.CYCLE_HOURS_PLACEHOLDER')}
          required
        />
      </Form.Group>

      <Button
        variant={isFormValid ? 'dark' : 'secondary'}
        type="submit"
        className="w-100"
        disabled={!isFormValid}
      >
        {t('INPUT_FORM.SUBMIT')}
      </Button>
    </Form>
  )
}

export default InputForm
