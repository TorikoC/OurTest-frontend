<template>
  <div class="test-details-container flex-1 flex-column" v-loading="loading">
    <div class="header">
      <h1 class="test-title">{{ test.title }}</h1>
      <small class="test-author">by {{ test.author }}</small>
      <br>
      <router-link class="start-test-link" :to="'/room/' + title">start test</router-link>
<ul class="test-info">
          <li>
            <span class="label">创建时间</span>
            <span class="info">{{ new Date().toLocaleString() }}</span>
          </li>
          <li>
            <span class="label">测试次数</span>
            <span class="info">1964</span>
          </li>
          <li>
            <span class="label">收藏</span>
            <span class="info">12093</span>
          </li>
          <li>
            <span class="label">评分</span>
            <span class="info">3</span>
          </li>
          <li>
            <span class="label">难度</span>
            <span class="info">2</span>
          </li>
        </ul>
    </div>
    <main class="intro">
      <p>{{ test.intro }}</p>
    </main>
    <footer class="comment">
      <ul>
        <li v-for="(comment, index) in test.comments" :key="index">
          <div class="flex-row">
            <div class="left">
              <img class="comment-avatar" :src="comment.avatar" alt="avatar">
            </div>
            <div class="right flex-1">
              <div class="flex-column">
                <div class="comment-header">
                  <span class="comment-username">{{ comment.username }}</span>
                  <span class="comment-datetime">{{ comment.dateTime | formatDateTime }}</span>
                </div>
                <p class="comment-content" v-html="comment.content"></p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <form action="" class="pure-form pure-form-stacked comment-form" @submit.prevent="submit">
        <div class="flex-column" style="width: 500px;">
          <textarea class="" name="comment" id="comment" cols="30" rows="10"></textarea>
          <button class="pure-button">Comment</button>
        </div>
      </form>
    </footer>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      test: {},
      loading: true,
    };
  },
  mounted() {
    this.$axios.get(`${this.$url.tests}/${this.title}`)
      .then((resp) => {
        this.test = resp.data;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  methods: {
    submit(event) {
      const form = event.target;
      const formData = new FormData(form);
      formData.append('title', this.test.title);
      formData.set('comment', this.keepLinebreak(formData.get('comment').trim()));
      const user = JSON.parse(localStorage.getItem('user'));
      const jwt = localStorage.getItem('jwt');
      this.test.comments.push({
        avatar: user.avatar,
        dateTime: new Date().toLocaleString(),
        username: user.username,
        content: this.keepLinebreak(formData.get('comment')),
      });

      this.$axios.post(this.$url.comments, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
}
.test-author {
  position: relative;
  top: -2em;
}
.test-info {
  margin-top: 1em;
  color: #777;
  font-size: 0.8em;
  font-weight: lighter;
}
.label, .info {
  display: inline-block;
  width: 200px;
  text-align: center;
}
.intro, .comment {
  width: 50%;
  margin: 0 auto;
}

.left {
  .comment-avatar {
    width: 50px;
    height: 50px;
  }
}

.right {
  margin-left: 1em;
  .comment-header {
    color: #777;
  }
  .comment-datetime {
    margin-left: 1em;
  }
  .comment-content {
    margin: 0px;
  }
}
.comment-form {
  margin-left: calc(1em + 50px);
  margin-top: 3em;
}
</style>
