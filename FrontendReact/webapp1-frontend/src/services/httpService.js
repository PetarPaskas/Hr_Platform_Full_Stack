import axios from "axios";
 
const http = {
    get: axios.get,
    put: axios.put,
    delete: axios.delete,
    post: axios.post
}

export default http;