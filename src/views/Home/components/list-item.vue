<template>
  <div class="container flex-row">
    <div class="flex-1">
      <div class="header">
        <p class="title">
          {{ data.title }}
        </p>
        <small class="text-light">by {{ data.author }}</small>
      </div>
      <div class="intro">
        <p>{{ data.intro }}</p>
      </div>
    </div>
    <div style="align-self: center;">
      <router-link class="link" :to="'/tests/' + data.title">see more</router-link>
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
    reg: {
      required: true,
    },
  },
  watch: {
    reg(value) {
      if (value) {
        const els = document.getElementsByClassName('title');
        for (let i = 0; i < els.length; i += 1) {
          const text = this.data.title;
          els[i].innerHTML = text.replace(value, match => `<span style="color: yellow">${match}</span>`);
        }
      } else {
        const els = document.getElementsByClassName('title');
        for (let i = 0; i < els.length; i += 1) {
          els[i].innerHTML = this.data.title;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/colors.scss';

.container {
  padding: 1em;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 2px 2px 10px 0 $gray;
  }
}

.header {
  margin-bottom: 1em;
}

.intro {
  color: #666;
  word-break: break-word;
}

</style>
