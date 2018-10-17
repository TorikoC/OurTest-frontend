<template>
  <div v-if="loaded" class="flex-1 room-container">
    <div v-if="end" class="text-center">
      <p>Test is ended.</p>
      <router-link to="/profile">see the resutls</router-link>
    </div>
    <div v-else>
      <header class="header">
        <nav>
          <ul class="flex-row">
            <li style="margin-left: auto;" @click="exit">
              <span>
                Exit
                <i class="fas fa-door-closed"></i>
              </span>
            </li>
          </ul>
        </nav>
      </header>
      <main class="main flex-column">
        <div class="desc flex-row">
          <span>
            {{ currentIndex + 1 }}.
          </span>
          <div class="flex-1">
            {{ test.questions[currentIndex].desc }}
          </div>
        </div>
        <div class="blank flex-1">
          <div v-if="test.questions[currentIndex].type === 'sc'" class="flex-row">
            <ul class="flex-1">
              <li v-for="(option, index) in test.questions[currentIndex].data.options" :key="index">
                <div class="flex-row option" style="width: 80%;">
                  <label class="flex-1" :for="'option' + index">{{ option.desc }}
                    <input
                      type="radio"
                      style="align-self: center;"
                      :id="'option' + index"
                      :name="test.questions[currentIndex].desc"
                      :checked="replys[currentIndex] === index + 1"
                      @change="changeOption($event, index)"
                      >
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div v-else-if="test.questions[currentIndex].type === 'bf'" class="flex-row">
            <textarea
              id="bf-answer"
              class="flex-1"
              name="bf-answer"
              cols="30" rows="10"
              style="padding: 0.6em 1em; min-height: 300px;"
              v-model="replys[currentIndex]"
              >
            </textarea>
          </div>
        </div>
        <div class="flex-row">
          <button class="pure-button" @click="next(currentIndex - 1)">prev</button>
          <button class="pure-button" @click="next(currentIndex + 1)">next</button>
          <button
            style="margin-left: auto;"
            class="pure-button pure-button-primary"
            @click.prevent="submit">Sumbit</button>
        </div>
      </main>
      <footer class="flex-row margin-top-1 margin-bottom-1">
        <ul class="pager flex-1">
          <li
          v-for="index in test.questions.length"
          class="pager-index"
          :id="'pager-' + index"
          :class="{active: currentIndex + 1 === index, done: replys[index - 1]}"
          :key="index"
          @click="next(index - 1)"
          >
            <span>{{ index }}</span>
          </li>
        </ul>
      </footer>
      <aside class="meta-info" @click="toggleMeta">
        <div v-if="displayMeta" class="meta-detail" >
          <dl>
            <dt>
              剩余时间
            </dt>
            <dd>
              {{ remainningTime | clock}}
            </dd>
            <dt>
              进度
            </dt>
            <dd>
              26 / 27
            </dd>
          </dl>
        </div>
        <span v-else class="meta-default">
          {{ remainningTime | clock}}
        </span>
      </aside>
    </div>
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
      remainningTime: 99999,
      currentIndex: 0,
      correctIndex: -1,

      replys: [],

      tickHandler: null,

      end: false,
      loaded: false,
      displayMeta: false,
    };
  },
  mounted() {
    this.$bus.$emit('changeMode', 'testing');
    this.$axios.get(`${this.$url.tests}/${this.title}`)
      .then((resp) => {
        this.test = resp.data;
        this.currentIndex = 0;
        this.remainningTime = resp.data.timeLimit * 10;
        this.tickHandler = setInterval(this.countdown, 1000);
        this.loaded = true;
      })
      .catch(() => {
        this.loaded = true;
      });
  },
  methods: {
    changeOption(event, index) {
      if (event.target && event.target.checked) {
        this.correctIndex = index;
        this.replys[this.currentIndex] = this.correctIndex + 1;
      }
    },
    countdown() {
      this.remainningTime -= 1000;
      if (this.remainningTime === 0) {
        this.end = true;
        clearInterval(this.tickHandler);
      }
    },
    next(newIndex) {
      if (newIndex < 0 || newIndex >= this.test.questions.length) {
        return;
      }
      switch (this.test.questions[this.currentIndex].type) {
        case 'sc': {
          if (this.correctIndex !== -1) {
            this.replys[this.currentIndex] = this.correctIndex + 1;
            this.correctIndex = -1;
          }
          this.currentIndex = newIndex;
          break;
        }
        case 'bf': {
          const el = document.getElementById('bf-answer');
          const reply = el.value;
          this.replys[this.currentIndex] = reply;
          this.currentIndex = newIndex;
          this.correctIndex = -1;
          break;
        }
        default: {
          break;
        }
      }
    },
    toggleMeta() {
      if (this.displayMeta) {
        document.getElementsByClassName('meta-detail')[0].classList += ' slideOut';
        setTimeout(() => {
          this.displayMeta = false;
        }, 300);
      } else {
        this.displayMeta = true;
      }
    },
    submit() {
      const result = {
        title: this.test.title,
        questions: this.test.questions,
        replys: this.replys,
      };
      const jwt = localStorage.getItem('jwt');
      this.$axios.put(`${this.$url.users}`, { result }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((resp) => {
          console.log(resp);
          this.$bus.$emit('changeMode', 'normal');
          setTimeout(() => {
            this.$router.replace('/profile');
          }, 1000);
        })
        .catch((err) => {
          window.alert(err.message);
        });
    },
    exit() {
      const yes = window.confirm('you will lose your changes, are you sure to exit?');
      if (yes) {
        this.$bus.$emit('changeMode', 'normal');
        this.$router.replace('/');
      }
    },
  },
  destroyed() {
    clearInterval(this.tickHandler);
  },
};
</script>

<style lang="scss" scoped>
.room-container {
  width: 80%;
  margin: 0 auto;
}

nav li {
  font-size: 1.6em;
  color: #777;
  &:hover {
    color: black;
    cursor: pointer;
    i::before {
      content: "\f52b";
    }
  }
}

.main .desc {
  background: #df7514;
  color:white;
  padding: 1em;
  white-space: pre-line;
}
.main ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}
.main li {
  &:hover {
    background: #cad2d3;
  }
}

.main li + li {
  margin-top: 0.3em;

}
.main .option {
  min-height: 100px;;
  padding: 0.6em 0 0 0.6em;
}

.pager {
  display: grid;
  grid-template-columns: repeat(10, 50px);
}
.pager-index {
  display: inline-block;
  width: 50px;
  border: 1px dashed silver;
  color: #777;
  text-align: center;
  line-height: 50px;
  &:hover {
    border: 1px solid silver;
    color: black;
    cursor: pointer;
  }
  height: 50px;
}
.active {
  background: silver !important;
  color: black !important;
}
.done {
  background: #1cb841;
  color: snow;
}

.meta-info {
  position: fixed;
  color: #777;
  right: 0px;
  top: 10em;
  width: 50px;
}
.meta-default {
  border: 1px solid silver;
  padding: 0.2em;
  border-radius: 2px;
}
@keyframes slideIn {
  from {
    right: -100px;
    width: 0px;
  }
  to {
    right: 150px;
    width: 200px;
  }
}
@keyframes slideOut {
  from {
    right: 150px;
    width: 200px;
  }
  to {
    right: -100px;
    width: 0px;
  }
}
.meta-detail {
  margin: 0px;
  position: relative;
  background: white;
  animation: slideIn 0.3s;
  border: 1px solid silver;
  padding-left: 0.6em;
  width: 200px;;
  height: 200px;
  right: 150px;;
}
.slideOut {
  animation: slideOut 0.3s;
}

</style>
