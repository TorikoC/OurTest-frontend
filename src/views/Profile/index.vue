<template>
  <div class="flex-row flex-1 profile-container">
    <div class="left" v-loading="loading" style="align-self: start;">
      <div class="avatar">
        <img :src="user.avatar" alt="avatar">
      </div>
      <div class="username">
        {{ user.username }}
      </div>
      <div class="email">
        {{ user.email }}
      </div>
      <!-- <div class="join">
        {{ user.joinDate }}
      </div> -->
    </div>
    <div class="right flex-1 flex-column">
      <div class="panel flex-1 flex-column">
        <div class="panel-header">
          Rectent Activies...
        </div>
        <div class="panel-body flex-1">
          <ul>
            <li v-for="item in user.testHistories" :key="item.title">
              try {{ item.title }} at {{ new Date().toLocaleString() }}
            </li>
          </ul>
        </div>
        <div class="panel-footer flex-row">
          <a style="margin-left: auto; margin-right: 1em" href="#">more</a>
        </div>
      </div>
      <div class="panel flex-1 flex-column">
        <div class="panel-header">
          Recent Test Results...
        </div>
        <div class="panel-body flex-1">
          <ul>
            <li v-for="item in user.testHistories" :key="item.title">
              <a href="#">{{ item.title }}</a>
            </li>
          </ul>
        </div>
        <div class="panel-footer flex-row">
          <a style="margin-left: auto; margin-right: 1em" href="#">more</a>
        </div>
      </div>
      <div class="panel flex-1 flex-column">
        <div class="panel-header">
          Recent Comments...
        </div>
        <div class="panel-body flex-1">
          <ul>
            <li v-for="item in user.comments" :key="item.content">
              <!-- <a href="#">{{ item.content }}</a> -->
              <div v-html="item.content">

              </div>
              <span>
                at <a href="#">{{ item.title }}</a> - {{ new Date().toLocaleString() }}
              </span>
            </li>
          </ul>
        </div>
        <div class="panel-footer flex-row">
          <a style="margin-left: auto; margin-right: 1em" href="#">more</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      loading: true,
    };
  },

  mounted() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this.loading = false;
    } else {
      alert('login first');
      this.$router.push('/login');
    }
  },
  methods: {
    upload() {
      this.editing = false;
    },
  },
};
</script>

<style lang="scss" scoped>

.profile-container {
  word-break: break-word;
}

.left {
  color: #777;
  border: 1px dashed silver;
}
.left .email {
  font-size: 0.8em;
}
.left .avatar img {
  width: 120px;
  height: auto;
}

.right {
  border: 1px dashed silver;
  margin-left: 1em;
}
.right .panel-header {
  background: #f1f1f1;
  padding: 0.6em 0 0.6em 1em;
  color: #777;
  font-size: 1.4em;
}
.right .panel-body {
  color: #777;
  padding: 1em 0.6em 0.6em 0.8em;
}
.right .panle-body p {
  white-space: pre-line;
}
.right li + li {
  margin-top: 0.6em;
}

</style>
