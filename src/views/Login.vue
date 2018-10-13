<template>
  <div class="login-form-container">
    <form class="pure-form pure-form-stacked" @submit.prevent="submit">
      <div class="form-group">
        <label for="email" class="text-light">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="password" class="text-light">Password</label>
        <input type="password" id="password" name="password" required>
      </div>
      <div class="text-right form-group">
        <button class="pure-button pure-button-primary" type="submit">Login</button>
        <br>
        <small class="text-light">
          don't have account?
          <router-link class="link" to="/Register">Register</router-link>
        </small>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  methods: {
    submit(event) {
      const form = event.target;
      const formData = new FormData(form);
      this.$axios.post(this.$url.login, formData)
        .then((resp) => {
        // TODO
        // save user data for later use.
          const { token, user } = resp.data;
          user.keepLogin = true;
          localStorage.setItem('jwt', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.$router.push('/');
          this.$emit('login');
        })
        .catch((err) => {
          alert(err.response.data);
        });
    },
  },
};
</script>

<style scoped>
  .login-form-container {
    margin-left: auto;
    margin-right: auto;
    margin-top: 2em;
  }
</style>
