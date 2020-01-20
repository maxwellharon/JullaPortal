<template>
<div>
  <div class="col-md-12" id="app" style="resize: horizontal; overflow: hidden;">
    <Responsive></Responsive>
    <!-- <piaf-breadcrumb /> -->
    <div class="separator mb-5"></div>
    <b-row>
      <div class="col-md-6" id="app">
        <div class="container" >
          <b-colxx sm="12">
            <b-card-text>
              <p v-if="loading"><pulse-loader :loading="loading" color="#00a0ff" :size="size"></pulse-loader></p>
              <div v-else>
                <div v-for="(value, key) in post.slice(0,1)" :key="key" >
              <p  class="font-weight-bold">ID Number</p>
              <h3>
                {{value.user.national_id}}
              </h3>
              <br />
              <h6  class="font-weight-bold">Phone Number</h6>
              <h6>
                {{value.user.contact}}
              </h6>
              <br />
              <h6  class="font-weight-bold">Loan Limit</h6>
              <h6>
                {{value.user.loan_limit}}
              </h6>
              <br />
              <h6  class="font-weight-bold">Loan Status</h6>
              <h6>
                {{value.merchant.status}}
              </h6>
              <h6 class="font-weight-bold">Requested Amount </h6>
              <h6>{{ value.principal }}</h6>
              <br />
              <h6  class="font-weight-bold">Email</h6>
              <h6>
                {{value.user.email}}
              </h6>
              <br />


              <!-- <p class="font-weight-bold">Elementum Ultrices</p>
              <b-table borderless :items="tableItems" /> -->
            </div>
          </div>
            </b-card-text>
          </b-colxx>
        </div>
      </div>
    <div class="col-md-6">

      <div class="container" id="app">
        <p v-if="loading"><pulse-loader :loading="loading" color="#00a0ff" :size="size"></pulse-loader></p>
        <div v-else>
          <div v-for="(value, key) in post.slice(0,1)" :key="key" >
        <b-card class="mb-4" no-body>
            <b-card-body>
                <img src="/assets/img/profile-placeholder.png" class="list-thumbnail responsive border-0" alt="image" />
                  <p class="font-weight-bold"> Name </p>
                  <h3>{{ value.user.name }}</h3>
                  <p class="mb-0 text-muted "><b>Created on : </b>{{ value.created_on | moment }}</p>
                  <p class="mb-0 text-muted "><b>Merchant : </b>{{ value.merchant.name}}</p>
                  <p>{{value.confirmation_token}}</p>
                  <p>{{value.id}}</p>
                  <br />
            </b-card-body>
        </b-card>
      </div>
    </div>
      </div>
    </div>
</b-row>
  </div>
  <div class="col-md-12">
    <div class="d-flex justify-content-center">
      <b-colxx xxs="6" xl="8" class="col-left" id="app">
         <form @submit.prevent="submitForm" class="form" v-for="(value, key) in post.slice(0,1)" :key="key">
          <b-card class="mb-8">
              <p>Accept or Decline request</p>
              <!-- <b-card class="mb-4" :title="$t('input-groups.buttons-with-dropdowns')" > -->
          <b-input-group class="mb-3" >
            <select class="ui dropdown" v-model="product_category">
              <option v-model="product_category">Select Item</option>
              <option v-model="product_category">TV's and Electronics</option>
              <option v-model="product_category">Phones and Tablets</option>
              <option v-model="product_category">Laptops and Computers</option>
              <option v-model="product_category">Home Appliances</option>
              <option v-model="product_category">Baby Products</option>
              <option v-model="product_category">Gaming Accessories</option>
              <option v-model="product_category">Automobile Electronics and Accessories</option>
            </select>
              <b-form-input id="name" type="text" v-model="product_name" for="product_name"/>
          </b-input-group>
      <!-- </b-card> -->
              <b-input-group prepend="Enter OTP" class="mb-6" size="sm" type="text" >
                <b-form-input v-model="otp" for="otp" ></b-form-input>
            </b-input-group>
            <!-- <form ref="form" class="form-horizontal" @submit.prevent="submitBid">
              <div class="form-group">
                <label for="bid"></label>
                <input name="bid" type="text" :value="value.id">
              </div>
              <div class="form-group">
                <input class="btn btn-success" type="submit" value="Bieden!">
              </div>
            </form> -->
            <!-- <sample-component v-model="id"/> -->
            <!-- <input v-model="email"> -->
            <b-input-group prepend="id" class="mb-6" size="sm" type="text" >
              <input v-model="id"/>
          </b-input-group>
            <b-input-group prepend="token" class="mb-6" size="sm" type="text" >
              <input v-model="token" prepend="token"/>
          </b-input-group>
            <!-- <p>{{ id }}</p> -->


            <b-input-group prepend="Serial Number" class="mb-6" size="sm" type="text" >
              <b-form-input v-model="serial_no" for="serial_number"></b-form-input>
          </b-input-group>
              <b-button variant="success" size="lg" class="flex-grow-1 mr-1" type="submit" :class="[name ? activeClass : '']" v-on:click="alertDisplay">Accept</b-button>
              <!-- <b-button variant="danger" size="lg" class="flex-grow-1 mr-1" :class="[name ? activeClass : '']" type="submit" >Decline</b-button> -->
              <form  @submit.prevent="declineRequest" class="flex-grow-2 mr-2">
                <input hidden v-model="id" value="hdwsjksk">
              <input hidden token:value.id >
                <b-button variant="danger" size="lg" class="flex-grow-1 mr-1"  type="submit" v-on:click="alertDisplayy">Decline</b-button>
              </form>
              <!-- <div>
      <h3>Data retrieved from server:</h3>
      <p v-if="success"> {{ success }}</p>
      <pre>{{ response }}</pre>
    </div> -->
          </b-card>
        </form>
      </b-colxx>
    </div>

  </div>
</div>
</template>

<script>
import 'semantic-ui-css/semantic.min.css'
import Responsive from '../../../../components/Pages/Responsive'
import GlideComponentThumbs from '../../../../components/Carousel/GlideComponentThumbs'
import CommentWithLikes from '../../../../components/Pages/CommentWithLikes'
import QuestionAnswer from '../../../../components/Pages/QuestionAnswer'
import GalleryDetail from '../../../../components/Pages/GalleryDetail'
import axios from 'axios'
import moment from 'moment'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import sampleComponent from '../../../../components/Pages/sampleComponent'
import Swal from 'sweetalert2'




import {
    detailImages,
    detailThumbs
} from "../../../../data/carouselItems";
import {
    commentWithLikesData
} from "../../../../data/comments"
import {
    detailsQuestionsData
} from "../../../../data/questions";

export default {
  prop: ['hidden'],
  model: {
      prop: 'hidden',
      event: 'blur'
  },
    components: {
        'sample-component': sampleComponent,
        'glide-component-thumbs': GlideComponentThumbs,
        'comment-with-likes': CommentWithLikes,
        'question-answer': QuestionAnswer,
        'gallery-detail': GalleryDetail,
        'responsive': Responsive,
        'pulse-loader' : PulseLoader
    },
    data() {
        return {
            id: '',
            token: '',
            otp: '',
            product_category: '',
            serial_no: '',
            product_name: '',
            activeClass: 'active',
            errors: [],
            loading: false,
            post: null,
            isModalVisible: false,
            isLoad: false,
            detailImages,
            detailThumbs,
            tableItems: [{
                    id: 1,
                    first_name: 'Mark',
                    last_name: 'Otto',
                    username: '@mdo'
                },
                {
                    id: 2,
                    first_name: 'Jacob',
                    last_name: 'Thornton',
                    username: '@fat'
                },
                {
                    id: 3,
                    first_name: 'Lary',
                    last_name: 'the Bird',
                    username: '@twitter'
                }
            ],
            commentWithLikesData,
            detailsQuestionsData,
        }
    },
    methods: {
      alertDisplay() {

        // $swal function calls SweetAlert into the application with the specified configuration.
        this.$swal('Status :', 'Transaction accepted',);
      },
      alertDisplayy() {

        // $swal function calls SweetAlert into the application with the specified configuration.
        this.$swal('Status :', 'Transaction declined',);
      },
      submitForm() {
        axios.post('http://credit.julla.co/v1/credit-requests/confirm', {
          id: this.id,
          token: this.token,
          otp: this.otp,
          product_category: this.product_category,
          serial_no: this.serial_no,
          product_name: this.product_name
        }).then(response => {
          this.response = response.data
          response.data.slice(0,1).reverse()
          this.success = 'Data saved successfully';
          this.response = JSON.stringify(response, null, 2)
        }).catch(error => {
          this.response = 'Error: ' + error.response.status
          // console.log(this.response)
        })
        this.id = '';
        this.token = '';
        this.otp = '';
        this.product_category = '';
        this.serial_no = '';
        this.product_name = '';
      },
  declineRequest() {
    axios.post('http://credit.julla.co/v1/credit-requests/ + "{{value.id}}" + /cancel? + "{{value.user.confirmation_token}}" ', {
      id: this.id,
      token: this.token


    }).then(response => {
      // console.log(response);
      // this.response = response.data
      this.success = 'Data saved successfully';
      this.response = JSON.stringify(response, null, 2)
    }).catch(error => {
      this.response = 'Error: ' + error.response.status
    })
    this.id = '';
    this.token = '';

  }
},
filters: {
moment: function (date) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}
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
    mounted() {
        setTimeout(() => {
            this.isLoad = true
        }, 50)
    }
}
</script>
<style media="screen" scoped>
.form{
  margin-bottom : 20px
}
.mb-6 {
  margin-bottom: 10px;
}
.flex-grow-2 {
  margin-left: 160px;
  margin-top: -46px;
}

  .flex-grow-1 {
    margin-left: 80px;
    margin-top: 10px;
  }

  $primary: #5968d7;

#app {
  display: flex;
  justify-content: center;
  font-family: 'Work Sans', sans-serif;
}

/* form {
  width: 500px;
  padding: 10px 40px;
  label {
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 0.03em;
    font-weight: bold;
  }
  input, textarea {
    border: 1px solid #ccc;
    color: #333;
    width: calc(100% - 30px);
  }
  input, textarea, button {
    border-radius: 4px;
    padding: 8px 15px;
    font-family: 'Work Sans', sans-serif;
    font-weight: 300;
  }
  div {
    margin: 20px 0;
  }
}

button {
  color: white;
  border: none;
  width: calc(100% - 30px);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: #ccc;
  cursor: pointer;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  transition: 0.25s all ease;
  &:hover {
    transform: translateY(2px);
  }
}

.active {
  background: $primary;
}

pre-content {
  width: 500px;
} */
</style>
