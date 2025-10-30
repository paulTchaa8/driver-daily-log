import { handleResponse, handleError } from "./statusHandler"

// const baseUrl = 'http://127.0.0.1:8000/api'
const baseUrl = 'https://driver-backend-7x0l.onrender.com/api'

export async function handleSubmit(roadDriverObj: any) {
  return fetch(`${baseUrl}/route/`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      roadDriverObj,
    ),
  })
  .then(handleResponse)
  .catch(handleError) 
}