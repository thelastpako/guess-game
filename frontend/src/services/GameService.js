import axios from 'axios';

function query(){
    return axios.get(`http://localhost:3001/words`).then(res => res.data)
}

export default {
    query,
}
