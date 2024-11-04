<template>
     <HeaderView />
    <h1>Hello User, Add User</h1>
</template>
<script>
import HeaderView from './HeaderView.vue';
export default {
    name: "AddUser",
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