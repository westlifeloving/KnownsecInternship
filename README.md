# 知道创宇实习创宇盾控制策略登陆页面以及策略的增删改项目（vue cli+vue router+element ui实现）

1.注册登陆功能通过localstorage实现

2.未点击保持登陆进入控制策略页面后再次刷新会登出回到登陆页面

3.点击保持登陆进入控制策略页面后再次刷新会停留在控制策略页面

4.控制策略页面包含有顶部，左侧导航栏和控制策略表单界面

5.用户详细数据会显示在顶部导航栏中

6.控制策略表单界面包含有新增策略，删除策略和修改策略的功能

7.控制策略表单数据使用数组形式保存在父组件中，避免出现父级数据在子级中修改的情况出现

8.点击新增策略和修改策略会弹出共用弹窗（使用子组件和elementui中的el-dialog实现）

9.父子组件之间的传值通过props和$emit实现

10.页面之间的跳转使用vue router实现

11.项目中使用了绝大多数element ui中的组件，所以使用的是完整引入没有使用按需引入


![image]

![image]

![image]

![image]

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
