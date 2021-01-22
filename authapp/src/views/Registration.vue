<template>
<body>
  <div class="registration">
    <input class="info-input"
            type="text"
            id="username"
            placeholder="User Name"
            v-model="register.username"
            required
          />
          <input class="info-input"
            type="password"
            id="password"
            placeholder="Password"
            v-model="register.password"
            required
          />
        <button class="confirm-button" @click="registerUser">Зарегистрироваться</button>
        <router-link to="/">Войти</router-link>
  </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      register: {
        username: "",
        password: "",
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        let response = await this.$http.post("/auth/registration", this.register);
        alert(response.data.message)
        this.$router.push("/");
      }
      catch(err){
        let error = err.response;
        alert(error.data.message)
        console.log(error.data.message);
      }
    }
  }
};
</script>

<style scoped>
  body{
    background:rgb(241, 236, 236);
    border: 1px solid black;
  }
  .registration{
    margin-top: 50px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .info-input{
    
    height: 70px;
    width: 300px;
    border-radius: 10px;
    margin-top: 20px;
  }
  .confirm-button{
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    height: 50px;
  }
</style>