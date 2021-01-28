<template>
<body>
    <div class="login">
          <input class="info-input"
            type="text"
            id="username"
            placeholder="User Name"
            v-model="login.username"
            required
          />
          <input class="info-input"
            type="password"
            id="password"
            placeholder="Password"
            v-model="login.password"
            required
          />
        <button class="confirm-button" @click="loginUser">Войти</button>
        <router-link to="/register">Зарегистрироваться</router-link>
  </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post("/auth/login", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          alert('Успешный вход')
          this.$router.push("/home");
        }
      } catch (err) {
        alert('Проверьте введённые данные')
        console.log(err.response.data.message);
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
  .login{
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
    width: 70px;
  }
</style>
