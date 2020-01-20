<template>
<div class="d-flex flex-row mb-3" id="app">
  <p v-if="loading">Loading...</p>
  <div v-else>
    <div v-for="(value, key , user) in post.data" :key="key" :user="user">
    <router-link tag="a" :to="detailPath" class="d-block position-relative">
        <img :src="order.img" :alt="order.title" class="list-thumbnail border-0" />
        <b-badge :variant="order.statusColor" pill class="position-absolute badge-top-right">{{value.merchant.status}}</b-badge>
    </router-link>
    <div class="pl-3 pt-2 pr-2 pb-2">
        <router-link tag="a" :to="detailPath">
            <p class="list-item-heading">Name : {{ value.user.name }}</p>
            <div class="pr-4">
                <p class="text-muted mb-1 text-small">Julla Score : {{ value.user.julla_score }}</p>
            </div>
            <div class="text-primary text-small font-weight-medium d-none d-sm-block">Loan Limit : {{ value.user.loan_limit }}</div>
        </router-link>
    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "TableList",

  data() {
    return {
      loading: false,
      post: null,
    };
  },
  mounted: function() {
    this.getReport();
  },
  created: function() {
    this.loading = true;
    axios
      .get("https://856a2db5.ngrok.io/v2/credit-requests")
      .then(res => {
        this.loading = false;
        this.post = res.data;
      })
  },
    props: ['selectedItems', 'order'],
    methods: {
        toggleItem(event, itemId) {
            this.$emit('toggle-item', event, itemId)
        },
        profile() {
            this.signOut().then(() => {
                this.$router.push('../../../../product/Details.vue')
            })
        },
        getReport() {
          let uri = "https://856a2db5.ngrok.io/v2/credit-requests" + this.$route.params.id;
          axios.get(uri).then(response => {
            this.report = response.data;
            console.log(response.data)
          });
        }
    },
    computed: {
    filteredUsers: function() {
      return this.users.slice(0, 10)
    }
  }
}
</script>
