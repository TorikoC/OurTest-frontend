<template>
  <div id="app" class="flex-column">
    <router-view v-if="mode === 'testing'" @login="login = true" />
    <div v-else-if="mode === 'normal'" class="flex-1 flex-column">
      <header>
        <nav id="nav" class="pure-menu pure-menu-horizontal">
          <ul class="pure-menu-list flex-row">
            <li class="pure-menu-item">
              <router-link to="/" class="pure-menu-link">Home</router-link>
            </li>
            <li class="pure-menu-item">
              <router-link to="/Polygon" class="pure-menu-link">Polygon</router-link>
            </li>
            <li class="pure-menu-item" style="margin-left: auto;">
              <div v-if="login" class="flex-row">
                <router-link to="/Profile" class="pure-menu-link">Profile</router-link>
                <a href="#" class="pure-menu-link" @click="logout">logout</a>
              </div>
              <div v-else>
                <router-link to="/Login" class="pure-menu-link">Login</router-link>
              </div>
            </li>
          </ul>
        </nav>
      </header>
      <div class="panel flex-1 flex-row">
        <router-view @login="login = true" />
      </div>
      <footer>
        @copyright
      </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  components: {
  },
  data() {
    return {
      login: false,
      mode: 'normal',
    };
  },
  mounted() {
    let user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      if (user.keepLogin) {
        this.login = true;
      }
    }
    this.$bus.$on('changeMode', this.changeMode);
  },
  destroyed() {
    this.$bus.$off('changeMode', this.changeMode);
  },
  methods: {
    changeMode(mode) {
      this.mode = mode;
    },
    logout() {
      // forget user
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      this.login = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/colors.scss';
@import '@/assets/css/flex.scss';

#app {
  width: 100%;;
  min-width: 900px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
}
.panel {
  padding: 0 2em;
  position: relative;
}
header {
  background: black;
  border-radius: 2px;
  margin-bottom: 1em;
}
footer {
  border-radius: 2px;
  text-align: center;
  display: block;
  font-size: 0.8em;
  color: #777;
  padding: 1.6em 0;
}

</style>


<style lang="scss">
@import '@/assets/css/colors.scss';
@import '@/assets/css/flex.scss';
@import '@/assets/css/text.scss';
@import '@/assets/css/custom.scss';
@import '@/assets/css/box.scss';
@import '@/assets/css/global.scss';
@import '@/assets/css/button.scss';
@import '@/assets/css/alert.scss';
@import '@/assets/css/font.scss';
@import '@/assets/css/loading.scss';
</style>
