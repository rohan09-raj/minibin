import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
})

export const createBin = async (payload) => {
  const response = await apiClient.post('/bin', payload)
  return response
}

export const getBin = async (id, payload) => {
  const response = await apiClient.get(`/bin/${id}`, payload)
  return response
}