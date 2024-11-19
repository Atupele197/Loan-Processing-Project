<template>
  <HeaderView />
  <h1>Hello User, Add User</h1>
  <div class="register">
    <!-- First Name and Last Name Inputs -->
    <input type="text" v-model="firstName" placeholder="Enter First Name" />
    <span v-if="errors.firstName" class="error">{{ errors.firstName }}</span>
    
    <input type="text" v-model="lastName" placeholder="Enter Last Name" />
    <span v-if="errors.lastName" class="error">{{ errors.lastName }}</span>
    
    <!-- Username and Email Inputs -->
    <input type="text" v-model="name" placeholder="Enter Username" />
    <span v-if="errors.name" class="error">{{ errors.name }}</span>
    
    <input type="text" v-model="email" placeholder="Enter Email" />
    <span v-if="errors.email" class="error">{{ errors.email }}</span>
    
    <!-- Password Input -->
    <input type="password" v-model="password" placeholder="Enter Password" />
    <span v-if="errors.password" class="error">{{ errors.password }}</span>
    
    <!-- Business Unit Dropdown -->
    <select v-model="businessUnit">
      <option disabled value="">Select Business Unit</option>
      <option>Henderson</option>
      <option>Balaka</option>
      <option>Mangochi</option>
      <option>Lilongwe</option>
    </select>
    <span v-if="errors.businessUnit" class="error">{{ errors.businessUnit }}</span>
    
    <!-- Role Dropdown -->
    <select v-model="role">
      <option disabled value="">Select Role</option>
      <option>Admin</option>
      <option>Loan Officer</option>
      <option>Supervisor</option>
    </select>
    <span v-if="errors.role" class="error">{{ errors.role }}</span>
    
    <!-- Submit Button -->
    <button v-on:click="signUp">Submit</button>
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
import axios from 'axios';

export default {
  name: "AddUser",
  components: {
    HeaderView
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      name: '',
      email: '',
      password: '',
      businessUnit: '',
      role: '',
      errors: {}
    };
  },
  methods: {
    async signUp() {
      // Reset previous errors
      this.errors = {};

      // Form validation
      if (!this.firstName) {
        this.errors.firstName = "First name is required.";
      }
      if (!this.lastName) {
        this.errors.lastName = "Last name is required.";
      }
      if (!this.name) {
        this.errors.name = "Username is required.";
      }
      if (!this.email) {
        this.errors.email = "Email is required.";
      } else if (!this.isValidEmail(this.email)) {
        this.errors.email = "Please enter a valid email address.";
      }
      if (!this.password) {
        this.errors.password = "Password is required.";
      } else if (this.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters.";
      }
      if (!this.businessUnit) {
        this.errors.businessUnit = "Business Unit is required.";
      }
      if (!this.role) {
        this.errors.role = "Role is required.";
      }

      // If there are no errors, submit the form
      if (Object.keys(this.errors).length === 0) {
        const userData = {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.name,
          email: this.email,
          password: this.password,
          businessUnit: this.businessUnit,
          role: this.role
        };

        try {
          // Send POST request with Axios using async/await
          const response = await axios.post('http://localhost:3000/user', userData);
          
          // Successfully posted data to API
          console.log('User data posted:', response.data);
          
          // Store the data in localStorage
          localStorage.setItem('user', JSON.stringify(userData));

          // Optionally, redirect or notify the user
          alert('User successfully added!');
        } catch (error) {
          // Handle errors (e.g., network issues, server errors)
          console.error('There was an error!', error);
          alert('Failed to add user, please try again.');
        }
      }
    },

    // Email validation helper function
    isValidEmail(email) {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(email);
    }
  }
};
</script>

<style scoped>
/* Style your form */
.register {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
  margin: auto;
}

input, select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  font-size: 0.9rem;
}
</style>
