<template>
  <div class="nav">
    <div class="left-links">
      <router-link to="/" class="nav-link">Home</router-link>
      
      <!-- Loans Dropdown (Accessible by Loan Officer and Admin) -->
      <div v-if="isAdminOrLoanOfficer" class="dropdown">
        <span class="nav-link dropdown-toggle">Loan Application</span>
        <div class="dropdown-content">
          <router-link :to="{ name: 'LoanApplication' }" class="nav-link">Business Loan</router-link>
          <router-link :to="{ name: '' }" class="nav-link">Village Bank</router-link>
        </div>
      </div>

      <!-- Users Dropdown (Only visible for Admins) -->
      <div v-if="isAdmin" class="dropdown">
        <span class="nav-link dropdown-toggle">Users</span>
        <div class="dropdown-content">
          <router-link to="/AddUser" class="nav-link">Add User</router-link>
          <router-link to="/UpdateUser" class="nav-link">List Users</router-link>
        </div>
      </div>
    </div>

    <!-- Logout -->
    <a v-on:click="logout" href="#" class="nav-link logout">Logout</a>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: "HeaderView",
  setup() {
    const router = useRouter();

    // Get the user's role from localStorage
    const user = JSON.parse(localStorage.getItem("user-info"));

    // Check if the user is an Admin
    const isAdmin = user && user.role === "Admin";

    // Check if the user is a Loan Officer
    const isLoanOfficer = user && user.role === "Loan Officer";

    // Define a property for access control
    const isAdminOrLoanOfficer = isAdmin || isLoanOfficer;

    // Logout function
    const logout = () => {
      localStorage.clear();
      router.push({ name: "LoginPage" });
    };

    // Return the computed properties
    return { logout, isAdmin, isAdminOrLoanOfficer };
  }
};
</script>

<style scoped>
/* Ensure the body and html take full height */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* Navbar at the top */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #8B0000;
  padding: 10px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

/* Left side links */
.left-links {
  display: flex;
  align-items: center;
}

/* Common nav link styling */
.nav-link {
  color: #fff;
  padding: 10px 20px;
  text-align: center;
  font-size: 16px;
  text-decoration: none;
  margin: 0 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #f2f2f2;
  color: #333;
}

/* Dropdown styling */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #8B0000;
  min-width: 160px;
  z-index: 1;
  border-radius: 5px;
}

.dropdown-content .nav-link {
  display: block;
  padding: 12px 16px;
  border-radius: 0;
}

.dropdown:hover .dropdown-content {
  display: block;
}

/* Logout button styling */
.logout {
  color: #fff;
  padding: 10px 20px;
  text-align: center;
  font-size: 16px;
  text-decoration: none;
  margin: 0;
  border-radius: 5px;
}

.logout:hover {
  background-color: transparent;
  color: #ddd;
}
</style>
