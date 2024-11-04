import HomePage from "./components/HomePage.vue";
import SignUp from "./components/SignUp.vue";
import LoginPage from "./components/LoginPage.vue";
import AddUser from "./components/AddUser.vue";
import UpdateUser from "./components/UpdateUser.vue";
import{createRouter,createWebHistory} from 'vue-router'

const routes=[
    {
        name: "HomePage",
        component:HomePage,
        path:'/'
    },
    {
        name: "SignUp",
        component:SignUp,
        path:'/sign-up'
    },
    {
        name: "LoginPage",
        component:LoginPage,
        path:'/LoginPage'
    },
    {
        name: "AddUser",
        component:AddUser,
        path:'/AddUser'
    },
    {
        name: "UpdateUser",
        component:UpdateUser,
        path:'/UpdateUser'
    }
    
];

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router;