import axios from 'axios'

let Api = axios.create({
    baseURL: 'https://gist.githubusercontent.com'
})

export default Api