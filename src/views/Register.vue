<template>
  <div class="register-form-container">
    <form action="" class="pure-form pure-form-stacked" @submit.prevent="submit">
      <div class="form-group">
        <label for="email" class="text-light">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="username" class="text-light">Username</label>
        <input type="text" id="username" name="username" required>
      </div>
      <div class="form-group">
        <label for="password" class="text-light">Password</label>
        <input type="password" id="password" name="password" required>
      </div>
      <div class="form-group">
        <label for="password2" class="text-light">Repeat Passowrd</label>
        <input type="password" id="password2" name="password2" required>
      </div>
      <div class="text-right form-group">
        <button class="pure-button pure-button-primary" type="submit">Register</button>
        <br>
        <small class="text-light">
          already have account?
          <router-link class="link" to="/login">Login</router-link>
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
      if (!this.checkPassword(formData)) {
        window.alert('password did not match.');
        return;
      }
      this.$axios.post(this.$url.users, formData, {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjEiLCJlbWFpbCI6ImFiY0AxMjMuY29tIiwiaWF0IjoxNTM5MDcxMDgwfQ.she24SK0ONz3BTspx0vwJ8Cv_KLi6Ql9Cl1cWwxhToo',
        },
      })
        .then(() => {
          this.$router.push('/login');
        })
        .catch((err) => {
          alert(err.response.data);
        });
    },
    checkPassword(formData) {
      const password1 = formData.get('password');
      const password2 = formData.get('password2');
      return password1 === password2;
    },
  },
};
</script>

<style scoped>
.register-form-container {
  margin-left: auto;
  margin-right: auto;
  margin-top: 2em;
}
</style>
