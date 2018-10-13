<template>
  <div class="preview-wrapper" @click="close">
    <div class="preview-container" @click.stop="() => false">
      <header>
        <h1>{{ test.title }}</h1>
        <small>{{ test.author }}</small>
        <p>{{ test.intro }}</p>
      </header>
      <section>
        <ul>
          <li v-for="(question, index) in test.questions" :key="question.desc">
            <p>{{ `${index + 1}. ${question.desc}` }}</p>
            <div v-if="question.type === 'sc'">
              <ul>
                <li v-for="(option, index) in question.options" :key="index">
                  <div class="flex-row" style="width: 80%; padding-left: 1em;">
                    <span class="flex-1">{{ option.desc }}</span>
                    <input type="radio" name="question.desc" disabled>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else-if="question.type === 'bf'">
              <br>
              <br>
              <br>
            </div>
          </li>
        </ul>
      </section>
      <footer>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    test: {
      type: Object,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    next() {
      this.$emit('next', { type: 'questions' });
    },
    publish() {
      this.$axios.post(this.$url.tests, this.paper);
    },
  },
};
</script>

<style scoped>
  .preview-wrapper {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(155, 155, 155, 0.5);
    z-index: 998;
  }
  .preview-container {
    position: relative;
    background: white;
    width: 600px;
    margin: 0 auto;
    padding: 2em;
    top: 2em;
    z-index: 999;
  }
  header, footer {
    text-align: center;
  }
</style>
