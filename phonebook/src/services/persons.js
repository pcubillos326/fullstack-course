import axios from 'axios'
const baseUrl = "http://localhost:3001"

const getAll = () => {
  return axios
    .get(`${baseUrl}/persons`)
    .then(response => response.data)
}

const addPerson = ({ person }) => {
  return axios
    .post(`${baseUrl}/persons`, person)
    .then(response => response.data)
}

const updatePerson = (person) => {
  return axios
    .put(`${baseUrl}/persons/${person.id}`, person)
    .then(response => response.data)
}

const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/persons/${id}`)
    .then(response => response.data)
}

export default {
  getAll,
  addPerson,
  updatePerson,
  deletePerson
}
