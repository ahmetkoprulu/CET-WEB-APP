<template>
  <form class="mx-lg-4 my-lg-5" @submit.prevent="handleSubmit">
    <p class="h4 text-center mb-4">Sign in</p>
    <label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
    <input type="email" id="defaultFormLoginEmailEx" class="form-control"/>
    <br/>
    <label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
    <input type="password" id="defaultFormLoginPasswordEx" class="form-control"/>
    <div class="text-center mt-4">
      <button class="btn w-100" style="background: #627cc8; color:white" type="submit">Login</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'

export default {
    methods:{
      handleSubmit(){
        axios.post('https://localhost:5001/api/v1/instructors/login', {email:'2@sehir.edu.tr', password:'ekrembaba1'})
          .then((response) => {
            /* eslint-disable no-console */
            console.log(response)
            this.$store.dispatch('setCurrentUserAction', response.data)
            this.$router.push({name:'Instructor'})
          }).catch((error) => {console.log(error)})
      }
    }
}
</script>

<style scoped>

</style>