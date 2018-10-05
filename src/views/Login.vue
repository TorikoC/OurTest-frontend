<template>
  <div>
    <form action="">
      <div>
        <label for="email">Email:</label>
        <input type="text" id="username" name="username">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="text" id="password" name="password">
      </div>
      <div>
        <button @click.prevent="submit">Login</button>
      </div>
      <div>
        <router-link to="/Register">Register</router-link>
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
