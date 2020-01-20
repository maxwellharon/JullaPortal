<template>
<div>
<div  id="app"  >
  <p  v-if="loading"><pulse-loader :loading="loading" color="#00a0ff" :size="size"></pulse-loader>
</p>
  <div v-else>
  <div v-for="(value, key ) in post.reverse()" :key="key"   >
        <b-card class="card">
    <!-- <div class="pl-2 d-flex flex-grow-1 min-width-zero" > -->
        <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center" >
          <router-link to="/app/pages/product/details" >
          <p><img :src="value.user.image_url" class="list-thumbnail responsive border-0" alt="image" /></p>
        </router-link>
          <router-link :to="{ path: '/details/' + value.user.id }" >
              <h3 class="list-item-heading"><b>Name :</b> {{ value.user.name }}</h3>
          </router-link>
            <!-- <p class="list-item-heading mb-0 truncate"  v-for="val in report">{{val._id}}</p> -->

            <p class="mb-0 text-muted "><b>Email : </b>{{ value.user.email }}</p>
            <p class="mb-0 text-muted "><b>Time : </b>{{ value.created_on | moment }}</p>
            <p class="mb-0 text-muted text-small  w-sm-100"><b>ID : </b>{{value.user.national_id}}</p>


            <div class="w-15 w-sm-100">
                <b-badge pill variant="success">{{ value.merchant.status }}</b-badge>
            </div>
        </div>
      <!-- </div> -->
      </b-card>
    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios';
import TableList from './TableList'
import moment from 'moment'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


export default {
  name: "ThumbListItem",

  components: {
    'table-list': TableList,
    'pulse-loader' : PulseLoader
  },

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
      .get("http://credit.julla.co/v2/merchant/ck0sdt26r0005rar123ji3n0a/credit-requests")
      .then(res => {
        this.loading = false;
        this.post = res.data;
      })
  },
    props: ['data', 'selectedItems', 'order'],
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
          let uri = "credit.julla.co/v2/credit-requests?starting_after=ck584tr6l000k08r18d8z4ulv" + this.$route.params.id;
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
  },
  filters: {
  moment: function (date) {
    return moment(date).format('h:mm:ss a');
  }
}
}
</script>

<style scoped>
.card{
  padding: 10px;
  padding-bottom: 10px
}
</style>
