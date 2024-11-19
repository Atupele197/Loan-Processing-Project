<template>
  <HeaderView />
  <div class="edit-user-container">
    <div class="edit-user-card">
      <h2>Edit User</h2>
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <input
            id="firstName"
            v-model="user.firstName"
            type="text"
            placeholder="First Name"
          />
        </div>

        <div class="form-group">
          <input
            id="lastName"
            v-model="user.lastName"
            type="text"
            placeholder="Last Name"
          />
        </div>

        <div class="form-group">
          <input
            id="username"
            v-model="user.username"
            type="text"
            placeholder="Username"
          />
        </div>

        <div class="form-group">
          <input
            id="email"
            v-model="user.email"
            type="email"
            placeholder="Email"
          />
        </div>

        <!-- Role Dropdown -->
        <div class="form-group">
          <select v-model="user.role" id="role">
            <option value="" disabled selected>Select Role</option>
            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
          </select>
        </div>

        <!-- Business Unit Dropdown -->
        <div class="form-group">
          <select v-model="user.businessUnit" id="businessUnit">
            <option value="" disabled selected>Select Business Unit</option>
            <option v-for="unit in businessUnits" :key="unit" :value="unit">{{ unit }}</option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-save">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
import axios from 'axios';

export default {
  name: 'EditUser',
  components: {
    HeaderView,
  },
  props: ['id'],
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        role: '',  // Added for role selection
        businessUnit: '', // Added for business unit selection
      },
      roles: ['Admin', 'Loan Officer', 'Supervisor'], // Example role options
      businessUnits: ['Henderson', 'Balaka', 'Mangochi', 'Lilongwe'], // Example business unit options
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`http://localhost:3000/user/${this.id}`);
      this.user = response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },
  methods: {
    async updateUser() {
      try {
        await axios.put(`http://localhost:3000/user/${this.id}`, this.user);
        alert('User updated successfully!');
        this.$router.push({ name: 'UpdateUser' });
      } catch (error) {
        console.error('Failed to update user:', error);
        alert('Failed to update user.');
      }
    },
  },
};
</script>

<style scoped>
/* Container Styling */
.edit-user-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* Card Styling */
.edit-user-card {
  background: #ffffff;
  padding: 40px;
  width: 100%;
  max-width: 800px;
  min-width: 400px;
  border-radius: 10px;
  box-shadow: none;
}

/* Heading Styling */
.edit-user-card h2 {
  margin-bottom: 20px;
  font-size: 26px;
  color: #333;
  text-align: center;
}

/* Form Group Styling */
.form-group {
  margin-bottom: 20px;
}

/* Input and Select Field Styling */
.form-group input, .form-group select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  height: 45px;
}

.form-group input::placeholder {
  color: #aaa;
  font-size: 14px;
}

/* Input and Select Field Focus */
.form-group input:focus, .form-group select:focus {
  border-color: #007bff;
  outline: none;
}

/* Form Actions Styling */
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

/* Button Styling */
.btn-save {
  width: 100%;
  padding: 12px 15px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  height: 45px;
}

.btn-save:hover {
  background-color: #388e3c;
}
</style>
