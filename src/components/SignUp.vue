<script>
import axios from 'axios'
    export default {
        name: 'SignUp',
        data(){
            return{
                name: '',
                email: '',
                password: ''
            }
        },
        methods:{
            async signUp(){
                let result = await axios.post("userhttp://localhost:3000/",{
                    name:this.name,
                    password:this.password,
                    email:this.email
                });

                console.warn(result);
                if(result.status==201){
                    localStorage.setItem("user-info",JSON.stringify(result.data))
                    this.$router.push({name:'HomePage'})
                }
            }
        },

        mounted(){
        let user = localStorage.getItem('user-info');
        if(user){
          this.$router.push({name:'HomePage'})
        }       
       }
    }

    

</script>

<template>
    <img class="logo" src="../assets/logo.jpg">
    <h1 class="form-title">Loan Automation System</h1>
    <div class="register">
        <input type="text" v-model="name" placeholder="Enter Username">
        <input type="text" v-model="email" placeholder="Enter Email">
        <input type="password" v-model="password" placeholder="Enter Password">
        <button v-on:click="signUp">Sign Up</button>
    </div>
    <p>
        <router-link to="LoginPage">Login</router-link>
    </p>
</template>



<style>
   
</style>