# private-chat-client

#### 介绍
私人聊天的客户端

#### 软件架构
消息结构
{
	statusCode: "状态码",
	content: "消息内容 除了部分状态码外，均规定为 json"
}

ChatMessage结构如下
{
	createdTime: "2021-11-23T20:10:10" //消息发送的时间，由后端生成
	file: null // 如果消息类型为3或者为4的时候有用 ，文件字段
	id: "03e788cf4c5611ec837b0242ac110004" //消息id 会自动生成
	message: "开始测试" //消息内容
	msgType: 1 //消息类型
	senderId: "1" //发送者
	targetId: null //目标id
	targetType: 0 //目标类型 如果为1代表人对人，2代表群聊
}

#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
