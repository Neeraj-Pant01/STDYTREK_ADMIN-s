import axios from 'axios'

function NewRequest(token) {
    const instance = axios.create(
        {
            baseURL : `${import.meta.env.VITE_REACT_APP_API_URL}`,
            headers: {
                "Authorization" : `bearer ${token}`
            }
        }
    )

    return instance;
}

export default NewRequest
  