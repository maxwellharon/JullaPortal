<template>
  <div class="">

   <div  v-for="(value, key) in post.slice(0,1)" :key="key" id="app">
      <input type="text" :value="value.id"  />
   </div>
 </div>
</template>
<script>
import axios from 'axios'
   export default {
      name: "HelloWorld",
      props: {
         inputData: String
      },
      created: function() {
        this.loading = true;
        axios
          .get("http://credit.julla.co/v2/merchant/ck0sd2ydp0000rar12xkbgjpj/credit-requests")
          .then(res => {
            this.loading = false;
            this.post = res.data;
          })
      },
   };
</script>
