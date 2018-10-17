<template>
  <div class="question-container flex-row">
    <div class="flex-1">
      <div class="desc">
        {{ data.desc }}
        <span class="label" title="blank filling question">{{ data.type }}</span>
      </div>
      <div class="main">
        <ul v-if="data.type === 'sc'">
          <li v-for="(option,index) in data.options" :key="index">
            <div :class="option.true ? 'checked' : ''" class="flex-row option" style="width: 80%">
              <label
                for=""
                class="flex-1 option-label"
                :title="option.desc" >{{ `${index + 1}. ${option.desc}` }}
              </label>
              <input type="radio" name="" id=""  :checked="option.true" disabled>
            </div>
          </li>
        </ul>
        <div v-else-if="data.type === 'bf'">
          <div class="answer">
            {{ data.answer }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex-row" style="align-self: start">
      <a href="#type">
        <i class="fas fa-pencil-alt" @click="edit"></i>
      </a>
      <i class="fas fa-times" @click="del" style="margin-left: 0.6em"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  mounted() {
  },
  methods: {
    edit() {
      this.$emit('edit', this.data);
    },
    del() {
      debugger;
      this.$emit('del', this.data);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/colors.scss';

.question-container {
  background: #7777770f;
  margin-bottom: 1em;
}

.desc {
  margin-bottom: 0.6em;
}

.main {
  background: #eee;
}

.desc, .answer {
  white-space: pre-line;
}
.option {
  padding: 0.3em 0;
}

.question-container {
  padding: 1em;
  // border: 1px solid $gray;
  border-radius: 2px;
}
.label {
  font-family: monospace;
  background: orange;
  width: 2em;
  display: inline-block;
  text-overflow: ellipsis;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  color: #777;
}
.option-label {
  display: inline-block;
  white-space: pre-line;
  // width: 90px;
}

i:hover {
  cursor: pointer;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.45);
}

</style>
