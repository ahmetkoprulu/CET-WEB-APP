import axios from "axios";
import Settings from '../Settings.json'

const base = Settings.developmentDomain

export default {
    getExamByInstructorEmail(token, email) {
      /* eslint-disable no-console */  
        console.log(Settings.developmentDomain)
        return axios.get({
          baseURL: base + `/exams/${email}/all`,
          timeout: 5000,
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjJAc2VoaXIuZWR1LnRyIiwidW5pcXVlX25hbWUiOiJBbGkgw4dha21hayIsInJvbGUiOiJJbnN0cnVjdG9yIiwibmJmIjoxNTcyNTA1NDAwLCJleHAiOjE1NzI1OTE4MDAsImlhdCI6MTU3MjUwNTQwMH0.kVMPMbhnAs8Ir6W5rxL94CoPwqLHwqkrPZRaGAtqFkan_wyiuPBfMVMlXfsma23WWdcpSQ78y6xVr2NzBWIqmQ`
          }
        })
    }
}