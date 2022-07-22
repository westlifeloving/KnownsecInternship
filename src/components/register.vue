<template>
    <div id="background">
      <div id="contain">
        <h1>
          <img
            src="http://test-cas.intra.jiasule.com/static/index/img/logo-ks.png"
            width="180"
            height="51"
            alt="知道创宇"
          />
        </h1>
        <el-form label-width="100px">
        <el-form-item prop="name">
          <span slot="label">
                <span style="color: white">用户名：</span>
              </span>
          <el-input prefix-icon="el-icon-user" style="width: 250px" type="text" v-model.trim="name"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span slot="label">
                <span style="color: white">密码：</span>
              </span>
          <el-input  prefix-icon="el-icon-menu" style="width: 250px" type="text" v-model.trim="password"></el-input>
        </el-form-item>
        <el-form-item prop="mail">
          <span slot="label">
                <span style="color: white">邮箱：</span>
              </span>
          <el-input  prefix-icon="el-icon-receiving" style="width: 250px" type="text" v-model.trim="mail"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="tel">
          <span slot="label">
                <span style="color: white">手机号：</span>
              </span>          
          <el-input prefix-icon="el-icon-phone" style="width: 250px" type="text" v-model.trim="tel"></el-input>
        </el-form-item>      
      </el-form>
       <el-button style="margin:20px 0 0 0;width: 250px" type="primary" @click.prevent="handlefinish">同意协议并注册</el-button>
       <el-button type="primary" @click.prevent="handlebacklogin">登陆通行证</el-button>
      </div>
    </div>
</template>

<script>
export default {
  name:'register',
  props: {
    msg: String,
  },
  data() {
    return {
      name: "",
      password: "",
      mail: "",
      tel: "",
    };
  },
  methods: {
    //点击完成按钮触发handlefinish
    handlefinish: function () {
      if (localStorage["name"] === this.name) {
        alert("用户名已存在"); //如果用户名已存在则无法注册
      } else if (this.name === "") {
        alert("用户名不能为空");
      } else {
        //将新用户信息存储到localStorage
        localStorage.setItem("name", this.name);
        localStorage.setItem("password", this.password);
        localStorage.setItem("mail", this.mail);
        localStorage.setItem("tel", this.tel);
        localStorage.setItem("s", "false");
        alert("注册成功");
        this.$router.replace("/Login"); //完成注册后跳转至登录页面
      }
    },
    handlebacklogin: function (){
      this.$router.replace("/Login");
    }
  },
};
</script>


<style scoped>
#background {
  width: 100%;
  height: 100%;
  background: linear-gradient(#1B7BC1,#53b2f9,#5CB4E4);
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  left: 0;
}
#contain {
  width: 400px;
  height: 560px;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 20px;
}
</style>