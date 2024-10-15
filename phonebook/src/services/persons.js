import axios from 'axios'
const baseUrl = '/api'

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/persons`)
  return response.data
}

const addPerson = async ({ person }) => {
  const response = await axios.post(`${baseUrl}/persons`, person)
  return response.data
}

const updatePerson = async (person) => {
  const response = await axios.put(`${baseUrl}/persons/${person.id}`, person)
  return response.data
}

const deletePerson = async (id) => {
  const response = await axios.delete(`${baseUrl}/persons/${id}`)
  return response.data
}

export default {
  getAll,
  addPerson,
  updatePerson,
  deletePerson,
}
