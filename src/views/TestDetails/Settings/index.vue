<template>
<div class="flex-column flex-1 container">
  <form class="margin-top-1">
    <div class="form-group">
      <span class="form-group-label">Accessbility</span>
      <label for="public">public</label>
      <input type="radio" id="public" name="accessbility" :value=1 v-model="settings.accessbility">
      <label for="private" class="margin-left-1">private</label>
      <input type="radio" id="private" name="accessbility" :value=2 v-model="settings.accessbility">
    </div>
    <div class="form-group">
      <label class="form-group-label" for="timeLimit">Time Limit</label>
      <input type="number" v-model="settings.timeLimit">
    </div>
    <div class="form-group">
      <span class="form-group-label">Timer Mode</span>
      <label for="timerMode1">Each Question</label>
      <input type="radio" name="timerMode" id="timerMode1" v-model="settings.timerMode" :value=1>
      <label for="timerMode2" class="margin-left-1">All Questions</label>
      <input type="radio" name="timerMode" id="timerMode2" v-model="settings.timerMode" :value=2>
    </div>
    <div class="form-group">
      <span class="form-group-label">
        Open Time
      </span>
      <label for="openMode1">always</label>
      <input type="radio" name="openMode" id="openMode1" v-model="settings.openMode" :value=1>
      <label for="openMode2" class="margin-left-1">some time</label>
      <input type="radio" name="openMode" id="openMode2" v-model="settings.openMode" :value=2>
    </div>
    <div v-if="settings.openMode === 2" class="form-group">
      <span class="form-group-label">Date & Time</span>
      <input type="date" id="openDate" required v-model="openDate">
      <input type="time" id="openTime" required v-model="openTime">
    </div>
  </form>
  <div v-if="settings.accessbility === 2" class="flex-column margin-top-1 whitelist">
    <div class="flex-row whitelist-header">
        <input type="text" id="whitelist-search" placeholder="Search" v-model="mailKeyword">
        <label for="whitelist-selectAll" class="margin-left-auto" style="align-self: center">Select All</label>
        <input type="checkbox" id="whitelist-selectAll" style="align-self: center" @change="selectAll">
        <button class="pure-button pure-button-primary margin-left-1" @click="sendMail">Send Invite</button>
    </div>
    <div class="whitelist-body">
      <div class="header flex-row">
        <form class="margin-left-auto margin-top-1">
          <input type="email" placeholder="Email" id="email">
          <button @click.prevent="addEmail" class="margin-left-1">+ Add</button>
        </form>
      </div>
      <ul class="margin-top-1">
        <li v-for="email in filterdMails" :key="email">
          <div class="flex-row">
            <div>
              <input class="mail-checkbox" type="checkbox">
              <label class="" style="margin-left: 0.6em" >{{ email }}</label>
            </div>
            <div style="margin-left: auto">
              <button @click="delEmail(email)">delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="footer flex-row">
    <button @click="reset" class="pure-button">Reset</button>
    <button class="margin-left-1 pure-button pure-button-primary" @click="save">Save</button>
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
  computed: {
    filterdMails() {
      if (!this.mailKeyword) {
        return this.settings.whitelist;
      }
      const reg = new RegExp(this.mailKeyword);
      return this.settings.whitelist.filter(mail => reg.test(mail));
    },
  },
  data() {
    return {
      settings: {
        accessbility: 1,
        timeLimit: 0,
        timerMode: 1,
        whitelist: [
          'fancyworld@yandex.com',
          'breakthroughtgw@gmail.com',
          'isawdevil92@gmail.com',
        ],
        openMode: 1,
        openTime: 0,
      },
      openDate: '',
      openTime: '',
      mailKeyword: '',
    };
  },
  mounted() {
    this.settings = JSON.parse(JSON.stringify(this.data));
    if (this.settings.openMode === 2) {
      this.$nextTick(() => {
        const date = new Date(this.settings.openTime);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = `0${month}`;
        }
        let day = date.getDate();
        if (day < 10) {
          day = `0${10}`;
        }
        this.openDate = `${year}-${month}-${day}`;
        const timeString = date.toLocaleTimeString();
        const arr = timeString.split(':');
        let hour = +arr.shift();
        let minute = +arr.shift();
        const mode = arr.pop();
        if (mode.toLowerCase().indexOf('pm') !== -1) {
          hour += 12;
        }
        if (hour < 10) {
          hour = `0${hour}`;
        }
        if (minute < 10) {
          minute = `0${minute}`;
        }
        this.openTime = `${hour}:${minute}`;
      });
    }
  },
  methods: {
    changeOpenMode(data) {
      this.openMode = data;
    },
    selectAll(event) {
      const el = event.target;
      if (el.checked) {
        const els = document.getElementsByClassName('mail-checkbox');
        for (let i = 0; i < els.length; i += 1) {
          els[i].checked = true;
        }
      } else {
        const els = document.getElementsByClassName('mail-checkbox');
        for (let i = 0; i < els.length; i += 1) {
          els[i].checked = false;
        }
      }
    },
    sendMail() {
      this.$axios.post(`${this.$url.sendmail}/turing%20test`)
        .then(() => {
          alert('mail sent');
        })
        .catch(console.log);
    },
    save() {
      const openDate = document.getElementById('openDate');
      const openTime = document.getElementById('openTime');
      if (openDate.checkValidity() && openTime.checkValidity()) {
        const dateTime = `${openDate.value} ${openTime.value}`;
        const timeStamp = new Date(dateTime).getTime();
        this.settings.openTime = timeStamp;
        this.$emit('save', this.settings);
      }
    },
    reset() {
      this.settings = JSON.parse(JSON.stringify(this.data));
    },
    addEmail() {
      const email = document.getElementById('email');
      if (email.checkValidity()) {
        this.settings.whitelist.push(email.value);
      } else {
        const btn = document.createElement('button');
        email.appendChild(btn);
        btn.click();
        email.removeChild(btn);
      }
    },
    delEmail(data) {
      this.settings.whitelist = this.settings.whitelist.filter(email => email !== data);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  margin: auto;
}

.form-group {
  input[type='radio'] {
    vertical-align: middle;
  }
}
.form-group-label {
  display: inline-block;
  width: 11em;
  vertical-align: middle;
}

.whitelist-header {
  background: #eee;
  padding: 0.8em 1em;
}
.whitelist-body {
  padding: 0em 1em 0.8em 1em;
  li {
    padding: 0.2em 0em;
  }
  li:hover {
    background: #eee;
  }
}
.mail-checkbox {
  vertical-align: middle;
}

.footer {
  justify-content: center;
  margin-top: auto;
}

</style>
