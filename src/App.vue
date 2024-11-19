<template>
<router-view />
</template>

<script>




export default {
  name: 'App',
 
}
</script>

<style>
/* Body and general styles */
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f7f7f7;
}

#app {
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}

.logo {
    width: 310px;
    height: 70px;
    margin: 20px auto;
}

.form-title {
    font-family: 'Times New Roman', Times, serif;
    font-size: 25px;
    color: darkred;
    margin-bottom: 20px;
}

/* Login container styling */
.login {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Input group styling */
.input-group {
    position: relative;
    width: 100%;
    margin-bottom: 30px;
}

.input-group input {
    width: 100%;
    height: 40px;
    padding: 10px 40px; /* Space for the icon */
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s ease;
}

.input-group input:focus {
    border-color: darkred;
}

/* Icon styling */
.input-group .icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
    font-size: 18px;
    pointer-events: none;
}

/* Floating label styling */
.input-group label {
    position: absolute;
    left: 40px; /* Space for the icon */
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
    font-size: 16px;
    pointer-events: none;
    transition: 0.2s ease all;
    background-color: #fff;
    padding: 0 5px;
}

/* Focused state for floating label */
.input-group.focused label,
.input-group input:not(:placeholder-shown) ~ label {
    top: -10px;
    font-size: 12px;
    color: darkred;
}

/* Button styling */
.login button {
    width: 100%;
    height: 40px;
    background-color: darkred;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.login button:hover {
    background-color: #b22222;
}

/* Error message styling */
.error-message {
    color: darkred;
    font-size: 14px;
    margin-top: 10px;
}

/* Sign-up link styling */
p {
    margin-top: 20px;
}

p a {
    color: darkred;
    text-decoration: none;
    font-weight: bold;
}

p a:hover {
    text-decoration: underline;
}

</style>