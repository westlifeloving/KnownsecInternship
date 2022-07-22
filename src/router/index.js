import Vue from "vue";
import VueRouter from "vue-router";
import controlMenu from "@/components/controlMenu.vue";
import login from "@/components/login.vue";
Vue.use(VueRouter);

const routes = [
  {
  //将根目录默认为login
    path:"/",
    redirect:{
      name:"login"
    }
  },
  {
    path: "/controlMenu",
    name: "controlMenu",
    component: controlMenu,
  },
  {
    path: "/login",
    name: "login",
    component:login
    
  }
  ,{
    path: "/register",
    name: "register",
    component: () =>
      import("@/components/register.vue")
  }
];

const router = new VueRouter({
  mode:'history',
  routes
});

router.beforeEach((to,from,next)=>
{
  //登录及注册页面可以直接进入,而主页面需要分情况
  if(to.path=='/login')
  {
    next();
    console.log(localStorage.s);
  }
  else if(to.path=='/register')
  {
    next();
  }
  else
  {
    if(from.path=="/login")//从登录页面可以直接通过登录进入主页面
    {
      next();
    }
    else{
    	//从/进入,如果登录状态是true，则直接next进入主页面
	      if(localStorage.s === "true")
		    {
		      next();
		      console.log(localStorage['s'])
		    }
	    else {//如果登录状态是false，那么跳转至登录页面,需要登录才能进入主页面
	      next('/login');
	      console.log("需要登录")
	    }
    }
  }
})
export default router;

