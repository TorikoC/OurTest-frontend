<template>
  <div class="polygon-container">
    <nav class="margin-bottom-3">
      <ul class="flex-row">
        <li :class="type === 'general' ? 'active' : ''" class="done" >基本信息</li>
        <li :class="{active: type === 'questions', done: type === 'publish'}">问题</li>
        <li :class="type === 'publish' ? 'active' : ''" >发布</li>
      </ul>
    </nav>
    <component :is='type' @next='next'></component>
  </div>
</template>

<script>
import General from './panels/general.vue';
import Questions from './panels/questions.vue';
import Publish from './panels/publish.vue';

export default {
  components: {
    General,
    Questions,
    Publish,
  },
  data() {
    return {
      type: 'questions',
    };
  },
  methods: {
    next(data) {
      this.type = data.type;
    },
  },
};
</script>

<style lang="scss" scoped>

.polygon-container {
  width: 80%;
  margin: 0 auto;
}
ul {
  justify-content: space-around;
  border-bottom: 1px solid #eee;
  padding: 0px;
  li {
    display: inline-block;
    text-align: center;
    flex: 0 0 100px;
    position: relative;
    top: 10px;
    background: #eee;
    border-radius: 10px;
  }
}

.done {
  background: blue;
  color: white;
}

.active {
  background-color: yellow;
}

</style>

