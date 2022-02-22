# private-chat-client

#### 介绍

[安卓机可以直接下载apk，安装即可使用](http://1.116.67.83:4000/file/private-chat.apk) （若下载地址无法使用，那说明我的服务器过期了）

测试账号:firechildren/123   以及  admin/123

如果想要通过源码来运行项目，建议先了解uniapp运行编译流程。

这是个仿qq的聊天软件,前端技术使用的是uniapp，安卓端与ios端样式都做了兼容。后端代码请跳转到另一个[代码仓库（https://gitee.com/private-chat/private-chat-server）](https://gitee.com/private-chat/private-chat-server)

目前该项目已经完成了点对点的实时聊天以及实时的好友添加



#### 项目依赖安装

1. 下载编译器hbuilderx 

2. 在hbilderx里安装sass插件

3. npm 安装依赖  package.json 文件中就只有一个依赖：crypto-js 。该依赖是用来加密用的，但是目前前端登录用的还是明文传输。

#### 项目配置

###### 安卓端与ios端运行配置：

config/base/config-info.js 文件里更改配置，配置文件的属性已经加上了对应注释。

###### H5端运行配置：

manifest.json 文件里拉到最后面，更改h5->devServer->proxy->/api->target属性，该属性对应着url地址

#### 效果截图

![输入图片说明](intro/login.PNG)

![输入图片说明](intro/recent.PNG)

![输入图片说明](intro/chat-room.PNG)

![输入图片说明](intro/user-info.PNG)


#### 热更新维护操作

1. 修改mainifest.json文件中 App的应用版本名称（x.x.x）与应用版本号（xxx）。x代表int类型
2. 版本修改完毕之后，点击发行-> 原生App-制作应用wgt包
3. 将打包出的wgt后缀文件通过 接口 http://ip:port/test/upload 将文件上传上去 请求方法post form-data方式，参数名file
4. sys_version表中新建一条数据，数据version填App的应用版本名称；versionCode填应用版本号，wgtUrl填刚才文件上传后得到的文件url
5. 用户进入应用后，我的->设置下方有一个当前版本:x.x.x的按钮，点击即可热更新


#### 后续开发目标

1. 注册/用户信息编辑功能
2. 可发送表情/图片
3. 群聊功能
4. 消息推送（既消息通知）




