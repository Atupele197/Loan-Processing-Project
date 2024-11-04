<template>
     <HeaderView />
    <h1>Hello User, Update User</h1>
</template>
<script>
import HeaderView from './HeaderView.vue';
export default {
    name: "UpdateUser",
    components:{
      HeaderView
    },
    mounted(){
        let user = localStorage.getItem('user-info');
        if(!user){
          this.$router.push({name:'SignUp'})
        }       
       }
}
</script>