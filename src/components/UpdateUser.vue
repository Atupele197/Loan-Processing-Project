<template>
  <div>
    <HeaderView />

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <table class="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Business Unit</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.businessUnit }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button @click="editUser(user)" class="edit-btn">Edit</button>
              <button @click="deleteUser(user.id)" class="delete-btn">Delete</button>
              <button @click="resetPassword(user)" class="reset-btn">Reset Password</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="users.length === 0" class="no-data">No users found</div>
    </div>
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
import axios from 'axios';

export default {
  name: "UpdateUser",
  components: {
    HeaderView
  },
  data() {
    return {
      users: [],
      loading: true,
    };
  },
  async mounted() {
    await this.fetchUsers();
  },
  methods: {
    // Fetch users from the API
    async fetchUsers() {
      try {
        const user = localStorage.getItem('user-info');
        if (!user) {
          this.$router.push({ name: 'SignUp' });
          return;
        }
        const response = await axios.get("http://localhost:3000/user");
        this.users = response.data || [];
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.loading = false;
      }
    },

    // Edit user handler
    editUser(user) {
      this.$router.push({ name: 'EditUser', params: { id: user.id } });
    },

    // Delete user handler
    async deleteUser(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          await axios.delete(`http://localhost:3000/user/${userId}`);
          this.users = this.users.filter(user => user.id !== userId);
          alert("User deleted successfully!");
        } catch (error) {
          console.error("Error deleting user:", error);
          alert("Failed to delete user.");
        }
      }
    },

    // Reset Password Handler
    async resetPassword(user) {
      const newPassword = prompt("Enter the new default password (e.g., 'defaultPassword123'):");
      const confirmPassword = prompt("Confirm the new default password:");

      if (newPassword && confirmPassword && newPassword === confirmPassword) {
        try {
          await axios.put(`http://localhost:3000/user/${user.id}`, {
            ...user,
            password: newPassword,
            mustChangePassword: true, // Flag to force password change on login
          });
          alert(`Password for ${user.username} has been reset successfully.`);
        } catch (error) {
          console.error("Error resetting password:", error);
          alert("Failed to reset password.");
        }
      } else {
        alert("Passwords do not match. Please try again.");
      }
    },
  }
};
</script>

<style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
}
.user-table th, .user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.reset-btn {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
.reset-btn:hover {
  background-color: #e68a00;
}
</style>
