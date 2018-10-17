<template>
  <div class="flex-1" v-loading="loading">
    <form class="pure-form margin-bottom-1" @submit.prevent="">
      <input type="text" placeholder="Search" v-model="keyword">
    </form>
    <ul>
      <li v-for="item in filterdTests" :key="item._id">
        <list-item :reg="reg" :data="item"/>
      </li>
    </ul>
    <div v-if="noData" class="no-data">
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script>
import ListItem from './components/list-item.vue';

export default {
  components: {
    ListItem,
  },
  computed: {
    filterdTests() {
      // eslint-disable-next-line
      this.reg = this.keyword ? new RegExp(this.keyword, 'ig') : '';
      if (!this.reg) {
        // eslint-disable-next-line
        this.noData = false;
        return this.tests;
      }
      const results = this.tests.filter(obj => this.reg.test(obj.title));
      if (results.length === 0) {
        // eslint-disable-next-line
        this.noData = true;
        return [];
      }
      // eslint-disable-next-line
      this.noData = false;
      return results;
    },
  },
  data() {
    return {
      tests: [],
      loading: true,
      noData: false,
      keyword: '',
      reg: '',
    };
  },
  mounted() {
    this.$axios.get(this.$url.tests)
      .then((resp) => {
        this.tests = resp.data;
        this.loading = false;
      })
      .catch((err) => {
        alert(err.response.data);
        this.loading = false;
      });
  },
};
</script>

<style lang="scss" scoped>
  .no-data {
    color: #777;
    height: 100%;
    width: 100%;
    z-index: 999;
    span {
      position: relative;
      left: 50%;
      top: 20%;
      transform: translate(-50%, -50%);
    }
  }
</style>
