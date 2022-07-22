<template>
  <div id="background">
    <div class="container">
      <el-form action="">
        <h1>
          <img
            src="http://test-cas.intra.jiasule.com/static/index/img/logo-ks.png"
            width="180"
            height="51"
            alt="知道创宇"
          />
        </h1>
        <div class="form">
          <div class="item">
            <el-form-item prop="name">
              <span slot="label">
                <span style="color: white">用户名：</span>
              </span>
              <el-input
                prefix-icon="el-icon-user"
                style="width: 60%; margin: 0 0 0 20px"
                type="text"
                name="username"
                v-model.trim="name"
                placeholder="请输入用户名"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- v-model把输入的值传输给name变量 -->
          </div>
          <div class="item">
            <el-form-item prop="password">
              <span slot="label">
                <span style="color: white">密码：</span>
              </span>
              <el-input
                prefix-icon="el-icon-menu"
                style="width: 60%; margin: 0 0 10px 34px"
                type="password"
                name="password"
                v-model.trim="password"
                placeholder="请输入密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>
          <div class="keep">
            <el-radio
              style="margin: 0 10px 20px -70px"
              v-model="radioCode"
              @click.native.prevent="handlesave"
              :label="true"
              >保持登录</el-radio
            >
          </div>
        </div>
      </el-form>
      <el-button
        style="margin: 0 10px 20px 25px"
        type="primary"
        @click.prevent="handlelogin"
        >登录</el-button
      >
      <!-- v-on点击按钮触发handlelogin方法 -->
      <el-button type="primary" @click.prevent="handleregister">立即注册</el-button>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "", //姓名，用v-model绑定监听，将输入的字符串赋值给name变量
      password: "", //密码
      st: "false", //false为不保存登录
      radioCode: false,
    };
  },
  methods: {
    handlelogin: function () {
      if (
        this.name === localStorage["name"] &&
        this.password === localStorage["password"]
      ) {
        this.$router.replace("/controlMenu"); //如果输入的名字以及密码正确路由跳转至个人页面
      } else if (this.name === "") {
        //名字为空
        alert("用户名不为空");
      } else if (this.password === "") {
        //密码为空
        alert("密码不为空");
      } else {
        alert("账号不存在，请注册后登录"); //查无此号
      }
    },
    handleregister: function () {
      this.$router.replace("/register"); //点击注册按钮，跳转至注册页面
    },
    //点击保持登录状态触发handlesave
    handlesave: function (el) {
      this.st = "true"; //修改登录状态为true
      localStorage.setItem("s", this.st);
      console.log(localStorage.s);
      this.radioCode = !this.radioCode;
    },
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

.container {
  width: 480px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 20px;
  margin-top: 10px;
}

.item {
  color: white;
  margin-left: 15%;
  margin-top: 35px;
  font-size: 20px;
  text-align: left;
}
.item label {
  float: left;
  width: 5em;
  margin-right: 1em;
  text-align: right;
}

::v-deep .el-radio__label {
  color: aliceblue;
}
</style>
