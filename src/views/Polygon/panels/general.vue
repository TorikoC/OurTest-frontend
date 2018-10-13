<template>
  <div class="flex-row">
    <form class="pure-form pure-form-aligned" @submit.prevent="submit">
      <div class="pure-control-group">
        <label for="title" class="text-light">Title</label>
        <input type="text" id="title" name="title" required>
      </div>
      <div class="pure-control-group">
        <label for="author" class="text-light">Author</label>
        <input type="text" id="author" name="author" required>
      </div>
      <div class="pure-control-group" style="max-width: 900px;">
        <label for="intro" class="text-light">Introduction</label>
        <textarea name="intro" id="intro" cols="60" rows="10" required></textarea>
      </div>
      <div class="text-right">
        <button class="pure-button pure-button-primary" type="submit">Save & Next</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    submit(event) {
      const form = event.target;
      const formData = new FormData(form);
      const data = {};
      for (const [key, value] of formData) {
        data[key] = value;
      }
      localStorage.setItem('general', JSON.stringify(data));
      this.$emit('next', { type: 'questions' });
    },
  },
};
</script>
