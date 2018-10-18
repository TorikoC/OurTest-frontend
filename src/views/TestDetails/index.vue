<template>
  <div class="test-details-container flex-1 flex-column" v-loading="loading">
    <nav v-if="isAuthor" class="nav flex-row" style="justify-content: center;">
      <ul>
        <li @click="active = 'general'" :class="active === 'general'? 'active': ''">general</li>
        <li @click="active = 'settings'" :class="active === 'settings'? 'active': ''">settings</li>
      </ul>
    </nav>
    <settings
      v-if="active === 'settings'"
      @save="save"
      :data="test.settings"
     />
     <general
      v-if="active === 'general'"
      :test="test"
      @comment="doComment"
     />
  </div>
</template>

<script>
import Settings from './Settings/index.vue';
import General from './General/index.vue';

export default {
  components: {
    Settings,
    General,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      active: 'general',
      loading: true,
      isAuthor: false,

      test: {},
      comment: {
        flag: false,
      },
    };
  },
  mounted() {
    this.title = this.title.replace('?', '%3F');
    console.log(this.title);
    this.$axios.get(`${this.$url.tests}/${this.title}`)
      .then((resp) => {
        this.test = resp.data;
        let user = localStorage.getItem('user');
        console.log(user);
        if (user) {
          console.log('hi');
          user = JSON.parse(user);
          console.log(this.test);
          console.log(user);
          if (this.test.author === user.username) {
            this.isAuthor = true;
          }
        }
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  methods: {
    doComment(formData) {
      if (this.comment.flag) {
        return;
      }
      this.comment.flag = true;
      const user = JSON.parse(localStorage.getItem('user'));
      this.test.comments.push({
        avatar: user.avatar,
        dateTime: new Date().toLocaleString(),
        username: user.username,
        content: this.keepLinebreak(formData.get('comment')),
      });
      const jwt = localStorage.getItem('jwt');
      this.$axios.post(this.$url.comments, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then(() => {
          this.comment.flag = false;
        })
        .catch(() => {
          this.comment.flag = false;
        });
    },
    save(settings) {
      this.$axios.put(`${this.$url.tests}/${this.title}`, { settings })
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>

.test-detail-container {
}

.nav {
  li {
    display: inline-block;
    width: 4em;
    border: 1px;
    padding: 1em;
    border: 1px solid white;
    &:hover {
      cursor: pointer;
    }
  }
  .active {
    border-top: 1px solid #aaa;
    border-left: 1px solid #aaa;
    border-right: 1px solid #aaa;
  }
}
</style>
