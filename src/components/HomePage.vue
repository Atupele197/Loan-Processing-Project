<template>
  <HeaderView />
  <h1 v-if="username">Hello {{ username }}, Welcome on home page</h1>
</template>

<script>
import HeaderView from './HeaderView.vue';
export default {
  name: "HomePage",
  data() {
      return {
          username: ''
      };
  },
  components: {
      HeaderView
  },
  mounted() {
      // Check if the user information is present in localStorage
      let user = localStorage.getItem('user-info');
      
      // If no user data, redirect to SignUp page
      if (!user) {
          this.$router.push({ name: 'LoginPage' });
          return; // Exit the function to prevent further execution
      }

      // Parse the user data safely
      try {
          const userInfo = JSON.parse(user);
          this.username = userInfo?.username || ''; // Handle if name is undefined
      } catch (error) {
          console.error("Error parsing user data:", error);
          this.$router.push({ name: 'LoginPage' });
      }
  }
};
</script>
