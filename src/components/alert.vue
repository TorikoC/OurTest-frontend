<template>
  <div v-if="show" class="alert-container">
    <div class="header">
      <span @click="close">x</span>
    </div>
    <div class="content">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.show = false;
    }, 3000);
  },
  methods: {
    close(event) {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  @keyframes in {
    from {
      top: -3em;
    }
    to {
      top: 3em;
    }
  }
  .alert-container {
    width: 300px;
    margin: 0 auto;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.9;
    top: 3em;
    animation-duration: 0.3s;
    animation-name: in;
    .header {
      text-align: right;
    }
    .content {
      text-align: center;
    }
  }
</style>
