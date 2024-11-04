<template>
   <div class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/AddUser">Add User</router-link>
    <router-link to="/UpdateUser">Update User</router-link>
    <a v-on:click="logout" href="#">Logout</a>
   </div>
</template>

<script>
import router from '@/routers';

   export default {
    name:"HeaderView",
    methods:{
        logout(){
            localStorage.clear();
            this.$router.push({name:"LoginPage"})
        },
        components:{
            router
        }
    }
   }
</script>

<style>
.nav{
    background: darkred;
    overflow: hidden;
}
.nav a{
    float: left;
    color: #f2f2f2f2;
    padding: 14px 16px;
    text-align: center;
    font-size: 17px;
    text-decoration: none;
    margin-right: 5px;
}
.nav a:hover{
    background: #ddd;
    color: #333;
}
</style>
