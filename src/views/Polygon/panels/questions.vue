<template>
  <div>
    <ul v-for="(question, index) in questions" :key="question.desc">
      <question-item
        :data="question"
        @del="del($event, index)"
        @edit="edit($event, index)"
      >
      </question-item>
    </ul>
    <form class="pure-form pure-form-aligned">
      <div class="pure-control-group">
        <label for="type">Question Type</label>
        <select name="type" :value="type" id="type" @change="changeType($event)">
          <option value="sc">Single Choice</option>
          <option value="bf">Blank Filling</option>
        </select>
      </div>
      <div v-if="type === 'sc'">
        <div class="pure-control-group">
          <label for="sc-desc">Description</label>
          <textarea name="sc-desc" id="sc-desc" cols="60" rows="3"></textarea>
        </div>
        <div class="pure-control-group">
          <label for="sc-option">Option</label>
          <textarea name="sc-option" id="sc-option" cols="60" rows="3"></textarea>
          <button class="pure-button" style="margin-left: 1em" @click.prevent="addOption">Add Option</button>
        </div>
        <hr>
        <span class="pure-form-message-inline">
          check the correct answer.
        </span>
        <ul>
          <li v-for="(option, index) in singleChoiceQuestion.options" :key="option.desc">
            <div class="option flex-row">
              <label :for="'option' + index" class="flex-1" :title="option.desc">{{ option.desc }}</label>
              <input
                class="align-self: center;"
                :checked="index === singleChoiceQuestion.correctIndex"
                type="radio"
                name="options"
                :id="'option' + index"
                @change="changeCorrectOption($event, index)"
              >
            </div>
          </li>
        </ul>
      </div>
      <div v-else-if="type === 'bf'">
        <div class="pure-control-group">
          <label for="bf-desc">Description</label>
          <textarea name="bf-desc" id="bf-desc" cols="60" rows="3">
            what's the answer ?
          </textarea>
        </div>
        <div class="pure-control-group">
          <label for="bf-answer">Explain/Answer</label>
          <textarea name="bf-answer" id="bf-answer" cols="60" rows="3">
            42
          </textarea>
        </div>
      </div>
      <div class="pure-controls">
        <button v-if="editing" class="pure-button" @click.prevent="update">Update</button>
        <button v-else class="pure-button" @click.prevent="submit">Add Question</button>
      </div>
      <div class="pure-controls">
        <button style="width: 10em" class="pure-button pure-button-primary" @click.prevent="next('general')">Back</button>
        <button style="width: 10em; margin-left: 1em" class="pure-button pure-button-primary" @click.prevent="next('publish')">Save & Next</button>
      </div>
    </form>
  </div>
</template>

<script>
import QuestionItem from '../components/question-item';

export default {
  components: {
    QuestionItem,
  },
  data() {
    return {
      type: 'bf',
      editing: false,
      editingIndex: 0,

      loading: true,

      questions: [],

      blankFillingQuestion: {
        desc: '',
        answer: '',
      },

      singleChoiceQuestion: {
        desc: '',
        options: [],
        correctIndex: 0,
      },

    };
  },
  mounted() {
    const questions = localStorage.getItem('questions');
    if (questions) {
      this.questions = JSON.parse(questions);
    }
    this.loading = false;
  },
  methods: {
    changeCorrectOption(event, index) {
      if (event.target.checked) {
        this.singleChoiceQuestion.correctIndex = index;
      }
    },
    addOption(event) {
      const elScOption = document.getElementById('sc-option');
      const desc = elScOption.value;
      elScOption.value = '';
      if (desc && desc.trim().length > 0) {
        this.singleChoiceQuestion.options.push({
          desc,
        });
      }
    },
    changeType(event) {
      this.type = event.target.value;
    },
    submit(event) {
      const formData = this.getFormData(this.type);
      this.questions.push(formData);
      localStorage.setItem('questions', JSON.stringify(this.questions));
    },
    update() {
      const formData = this.getFormData(this.type);
      this.$set(this.questions, this.editingIndex, formData);
      this.editing = false;
    },
    next(type) {
      localStorage.setItem('questions', JSON.stringify(this.questions));
      this.$emit('next', { type });
    },
    del(data) {
      if (data && data.desc) {
        this.questions = this.questions.filter(q => q.desc !== data.desc);
        localStorage.setItem('questions', JSON.stringify(this.questions));
      }
    },
    edit(data, index) {
      this.editing = true;
      this.editingIndex = index;
      this.type = data.type;
      this.$nextTick(() => {
        switch (data.type) {
          case 'sc': {
            const elDesc = document.getElementById('sc-desc');
            elDesc.value = data.desc;
            this.singleChoiceQuestion.options = this.deepCopy(data.options);
            break;
          }
          case 'bf': {
            const elDesc = document.getElementById('bf-desc');
            const elAnswer = document.getElementById('bf-answer');
            elDesc.value = data.desc;
            elAnswer.value = data.answer;
            break;
          }
          default: {
            break;
          }
        }
      });
    },

    getFormData(type) {
      debugger;
      switch (this.type) {
        case 'sc': {
          const elDesc = document.getElementById('sc-desc');
          const desc = elDesc.value;
          if (desc.trim() === '') {
            return;
          }
          elDesc.value = '';
          this.singleChoiceQuestion.options.forEach(o => o.true = false);
          this.singleChoiceQuestion.options[this.singleChoiceQuestion.correctIndex].true = true;
          const result = {
            desc,
            type,
            options: JSON.parse(JSON.stringify(this.singleChoiceQuestion.options)),
          };
          this.singleChoiceQuestion.options = [];
          return result;
        }
        case 'bf': {
          const elDesc = document.getElementById('bf-desc');
          const elAnswer = document.getElementById('bf-answer');
          const desc = elDesc.value;
          if (desc.trim() === '') {
            return;
          }
          elDesc.value = '';
          const answer = elAnswer.value;
          if (answer.trim() === '') {
            return;
          }
          elAnswer.value = '';
          const result = {
            desc,
            type,
            answer,
          };
          return result;
        }
      }
    },

  },
};
</script>

<style lang="scss" scoped>
.option label {
  margin: 0;
}

</style>

