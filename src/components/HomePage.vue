<template>
     <HeaderView />
    <h1>Hello {{name}}, Welcome on home page</h1>
</template>
<script>
import HeaderView from './HeaderView.vue';
export default {
    name: "HomePage",
    data(){
       return {
        name:''
       }
    },
    components:{
      HeaderView
    },
    mounted(){
        let user = localStorage.getItem('user-info');
        this.name = JSON.parse(user).name;
        if(!user){
          this.$router.push({name:'SignUp'})
        }       
       }
}
</script>