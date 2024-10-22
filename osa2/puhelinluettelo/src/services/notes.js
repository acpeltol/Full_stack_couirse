import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const bost = axios.get(baseUrl)
    return bost.then(response => response.data)
  }
  
  const create = newObject => {
    const bost = axios.post(baseUrl, newObject)
    return bost.then(response => response.data)
  }
  
  const remove = (id) => {
    const bolt = axios.delete(`${baseUrl}/${id}`)
    return bolt.then(response => response.data)
  }

  const change_num = (id,num) => {
    const bolt = axios.put(`${baseUrl}/${id}`,num)
    return bolt.then(response => response.data)
  }
  
  export default { 
    getAll, 
    create, 
    remove,
    change_num
  }