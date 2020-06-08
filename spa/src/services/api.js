import axios from "axios"
require('dotenv').config()
console.log(process.env)
class Api{
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    post(url, data){
        return axios.post(this.baseUrl + url, data)
    }
}

export default new Api(process.env.REACT_APP_API_URL)