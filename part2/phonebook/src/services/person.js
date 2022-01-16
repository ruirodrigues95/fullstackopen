import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const personService = {
  getAll: () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  },
  create: newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
  },
  delete: id => {
    return axios.delete(`${baseUrl}/${id}`)
  },
  update: (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
  },
}

export default personService
