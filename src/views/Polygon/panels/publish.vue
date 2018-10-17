<template>
  <div class="flex-column">
    <div v-if="!success" class="flex-column">
      <div class="flex-row margin-bottom-3" style="align-self: center">
        <button class="pure-button" @click="togglePreview">Preview</button>
        <button class="pure-button button-success" @click="publish">Publishs</button>
      </div>
      <div style="align-self: center">
        <button
          class="pure-button pure-button-primary"
          style="width: 200px" @click="next('questions')">Back</button>
      </div>
      <preview v-if="preview" :test="paper" @close="preview = false"/>
    </div>
    <div v-else>
      <p>发布成功</p>
      <p><a href="/">前往查看</a></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Preview from '../components/preview.vue';

export default {
  components: {
    Preview,
  },
  data() {
    return {
      paper: {},
      preview: false,
      success: false,
    };
  },
  mounted() {
    const general = JSON.parse(localStorage.getItem('general'));
    const questions = JSON.parse(localStorage.getItem('questions'));
    this.paper = {
      title: general.title,
      intro: general.intro,
      author: general.author,
      questions,
    };
  },
  methods: {
    togglePreview() {
      this.preview = !this.preview;
    },
    next(type) {
      this.$emit('next', { type });
    },
    publish() {
      axios.post('http://localhost:3001/tests/', this.paper)
        .then(() => {
          this.success = true;
        })
        .catch(() => {
        });
    },
  },
};
</script>

<style lang="scss" scoped>
button + button {
  margin-left: 1em;
}
</style>
