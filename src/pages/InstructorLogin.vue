<template>
<b-container>
  <b-row class="justify-content-md-center mt-5">
    <b-col col sm="0" lg="4" class="login-banner">
      <div style="margin-top:40%">
        <router-link to='/'>
          <b-img class="login-icon" src="https://marketing-image-production.s3.amazonaws.com/uploads/ad0b88bbacb48ba91be2da635bad44a3696639ca5f1cbbd7414dc14541e9f089a9be96fc63789ad8e6ba9ff1349bcf87fc772607c954735844dec07cc3a3508c.png" alt="Fluid image"></b-img>
        </router-link>
        <p>
          Please login with your email and password to access to the administration panel.
        </p>
      </div>
    </b-col>
    <b-col col lg="4" class="bg-white">
      <SignIn />
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import SignIn from '../components/SignIn'

export default {
  data() {
    return {};
  },
  components: {
    SignIn
  }
};
</script>

<style scoped>
.login-banner {
  background-color: #627cc8;
  color: white;
  text-align: center;
}

.login-icon {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  width: 25%;
}

</style>