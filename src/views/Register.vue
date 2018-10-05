<template>
  <div>
    <form action="">
      <div>
        <label for="email">Email</label>
        <input type="text" id="email" name="email">
      </div>
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" name="username">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="text" id="password" name="password">
      </div>
      <div>
        <label for="password2">Repeat Passowrd</label>
        <input type="text" id="password2" name="password2">
      </div>
      <div>
        <button @click.prevent="submit">Register</button>
      </div>
      <div>
        <router-link to="/login">Login</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {

};
</script>

<style>

</style>
