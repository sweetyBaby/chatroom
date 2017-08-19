# chatroom

## 技术栈
* 前后端分离开发
* 前端使用react全家桶，包括react-router，redux,使用css modules
* 后端使用Node.js开发，基于express框架, MongoDB数据库
* 使用webpack打包
* 使用websocket做消息推送

## 基础功能
* 注册登录
* 用户私聊
* 兼容移动端

##安装

```
git clone git@github.com:mumu-xi/chatroom.git
```
```
npm install
```
```
npm run build
```
```
npm run server
```
## 接口文档
用户登录
```
Post  json  /localhost:8181/api/user/login
请求示例：
{
   "username":"xxx123456",
   "password": "111222aaa"
 }
成功返回示例：
{
    "message": "登录成功",
    "data": user,
    "result": true,
}
失败返回示例：
{
    "message": err,
    "data": null,
    "result": false,
}
errType=['用户名不存在', '密码错误', '用户已被禁']
```


用户注册
```
Post  json  /localhost:8181/api/user/register
请求示例：
{
   "username":"xxx123456",
   "password": "111222aaa"
}
成功返回示例：
{
    "message": "注册成功",
    "data": null,
    "result": true,
}
失败返回示例：
{
    "message": "输入不合法",
    "data": null,
    "result": false,
}
```
用户注册唯一性验证
```
get  json  /localhost:8181/api/user/exist
请求示例：
{
   "username":"xxx123456",
}
成功返回示例(用户不存在)：
{
    "result": true,
}
失败返回示例(用户已存在)：
{
    "result": false,
}
```
拉取用户列表
```
get  json  /localhost:8181/api/users
请求示例：
{
   "userId":1,
}
成功返回示例(用户不存在)：
{
    "message": "拉取用户列表成功",
    "data": [
        { "username": "semo", "userId": "2" },
        { "username": "melody", "userId": 3},
    ],
    count: 2,
    result: true
}
失败返回示例：
{
    "message": 拉取用户列表失败,
    "data": [],
    result: false
}
```
