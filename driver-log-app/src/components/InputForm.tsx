import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

interface InputFormProps {
  onSubmit: (formData: any) => void
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
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

  // ✅ Vérifie si tous les champs sont remplis
  const isFormValid =
    formData.current_location.trim() !== '' &&
    formData.pickup_location.trim() !== '' &&
    formData.dropoff_location.trim() !== '' &&
    formData.current_cycle_hours.trim() !== ''

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>
          Current Location <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="current_location"
          value={formData.current_location}
          onChange={handleChange}
          placeholder="e.g. Chicago, IL"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Pickup Location <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="pickup_location"
          value={formData.pickup_location}
          onChange={handleChange}
          placeholder="e.g. Indianapolis, IN"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Dropoff Location <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="dropoff_location"
          value={formData.dropoff_location}
          onChange={handleChange}
          placeholder="e.g. Detroit, MI"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Cycle Used (hours) <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="number"
          name="current_cycle_hours"
          value={formData.current_cycle_hours}
          onChange={handleChange}
          placeholder="e.g. 12"
          required
        />
      </Form.Group>

      <Button
        variant={isFormValid ? 'dark' : 'secondary'}
        type="submit"
        className="w-100"
        disabled={!isFormValid}
      >
        Generate Route
      </Button>
    </Form>
  )
}

export default InputForm
