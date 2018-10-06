<template>
  <div>
    <form action="" id='loginForm' name='loginForm'>
      <div>
        <label for="email">Email:</label>
        <input type="text" id="email" name="email">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="text" id="password" name="password">
      </div>
      <div>
        <button type="submit" @click.prevent="submit">Login</button>
      </div>
      <div>
        <router-link to="/Register">Register</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    submit(event) {
      const form = document.getElementById('loginForm');
      const formData = new FormData(form);
      axios.post('http://localhost:3000/login', formData)
        .then((resp) => {
          if (resp.data === 'error') {
            alert('email or password wrong');
            return;
          }
          const { token } = resp.data;
          localStorage.setItem('jwt', token);
          this.$router.push('/home');
        })
        .catch((err) => {
          console.log('err', err);
        });
      },
    },
  };
  </script>

  <style>

  </style>
