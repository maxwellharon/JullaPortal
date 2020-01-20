<template>
<div class="d-flex flex-row mb-3" id="app">
  <p v-if="loading"><pulse-loader :loading="loading" color="#00a0ff" :size="size"></pulse-loader></p>
  <div v-else>
    <div v-for="(value, key ) in post.reverse()" :key="key">
    <router-link tag="a" :to="detailPath" class="d-block position-relative">
        <img :src="value.user.image_url" :alt="value.user.image_url" class="list-thumbnail border-0" />
        <b-badge :variant="order.statusColor" pill class="position-absolute badge-top-right">{{value.merchant.status}}</b-badge>
    </router-link>
    <div class="pl-3 pt-2 pr-2 pb-2">
        <router-link tag="a" :to="detailPath">
            <p class="list-item-heading">Name : {{ value.user.name }}</p>
            <div class="pr-4">
                <p class="text-muted mb-1 text-small">Julla Score : {{ value.user.julla_score }}</p>
                <p class="text-muted mb-1 text-small">Requested Amount : {{ value.principal }}</p>
            </div>
            <div class="text-primary text-small font-weight-medium d-none d-sm-block">Loan Limit : {{ value.user.loan_limit }}</div>
        </router-link>
    </div>
  </div>
</div>
</div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import axios from 'axios';
export default {

  components: {
      'pulse-loader' : PulseLoader
  },
    props: ['order', 'detailPath'],
    data() {
      return {
        loading: false,
        post: null,
      };
    },
    created: function() {
      this.loading = true;
      axios
        .get("http://credit.julla.co/v2/merchant/ck0sdt26r0005rar123ji3n0a/credit-requests")
        .then(res => {
          this.loading = false;
          this.post = res.data;
        })
    },
}
</script>
