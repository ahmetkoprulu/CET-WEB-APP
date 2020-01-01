import axios from "axios";
import Settings from '../Settings.json'

const base = Settings.developmentDomain

export default {
    async login(loginDto, action=null) {
      axios.post(base+'/instructors/login', loginDto)
      .then((response) => {
        /* eslint-disable no-console */
        console.log(response)
        if(action)
          action()
        else
          return response.data
      }).catch((error) => {console.log(error)})
    }
}


