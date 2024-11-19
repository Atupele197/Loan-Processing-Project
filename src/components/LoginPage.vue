<template>
    <img class="logo" src="../assets/logo.jpg" />
    <h1 class="form-title">Loan Automation System</h1>
    <div class="login">
      <div class="input-group" :class="{ 'focused': usernameFocused || username.length > 0 }">
        <i class="fa-solid fa-user icon"></i>
        <input 
          type="text" 
          v-model="username" 
          @focus="usernameFocused = true" 
          @blur="usernameFocused = false" 
          required 
        />
        <label>Enter Username</label>
      </div>
      <div class="input-group" :class="{ 'focused': passwordFocused || password.length > 0 }">
        <i class="fa-solid fa-lock icon"></i>
        <input 
          type="password" 
          v-model="password" 
          @focus="passwordFocused = true" 
          @blur="passwordFocused = false" 
          required 
        />
        <label>Enter Password</label>
      </div>
      <button @click="Login">Login</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "LoginPage",
    data() {
      return {
        username: '',
        password: '',
        usernameFocused: false,
        passwordFocused: false,
        errorMessage: ''
      };
    },
    methods: {
      async Login() {
        try {
          if (!this.username || !this.password) {
            this.errorMessage = "Please fill in all fields";
            return;
          }
          const result = await axios.get(
            `http://localhost:3000/user?username=${this.username}&password=${this.password}`
          );
          if (result.status === 200 && result.data.length > 0) {
            const user = result.data[0];
            if (user.mustChangePassword) {
              const newPassword = prompt("You must change your password. Enter a new password:");
              const confirmNewPassword = prompt("Confirm your new password:");
  
              if (newPassword === confirmNewPassword) {
                await axios.put(`http://localhost:3000/user/${user.id}`, {
                  ...user,
                  password: newPassword,
                  mustChangePassword: false, // Reset the flag
                });
                alert("Password changed successfully.");
              } else {
                this.errorMessage = "Passwords do not match.";
                return;
              }
            }
            localStorage.setItem("user-info", JSON.stringify(user));
            this.$router.push({ name: 'HomePage' });
          } else {
            this.errorMessage = "Invalid username or password";
          }
        } catch (error) {
          this.errorMessage = "An error occurred while logging in";
        }
      }
    },
  };
  </script>
  