---
title: Pi Agent使用分享
date: '2026-09-21'
category: 技术
draft: false
---
## Pi

#### 基本
- control + g ：在记事本中编辑提示词
- control + l ： 快速打开模型列表
- shift+tab修改模型思考强度
- control + v : 粘贴图片
- 默认的追加提示词是引导，而不是排队。想要排队，使用option+回车发送提示词。排队的提示词可以按option+上箭头,拿回来修改

#### 会话管理
- `pi -c` 继续上次的会话
- `pi -r` 选择会话列
- `/compact` 手动压缩上下文
- `/new` 创建新的会话。**（使用agent时，清空好于压缩，完成一个任务后，尽量清空重开，保证AI注意力）**

>对话树
- 双击Esc或者`/tree`打开对话树。  ==使用对话树回退到节点并不会相应回退代码== 
- [x] ***（插件支持代码也回退？）***,
	- ==我自己写了个插件，让代码修改也可以同步回退，类似claude的/rewind命令==
	- https://github.com/soul-kk/tree-code-checkpoint.git
	- `pi install git:https://github.com/soul-kk/tree-code-checkpoint.git@v0.1.0`


### 插件
- pi-web-access ：联网搜索  `pi install npm:pi-web-access`
- /btw ： “对了，顺便问一句”   `pi install npm:@narumitw/pi-btw`
- /plan ： 计划模式   `pi install npm:@plannotator/pi-extension`
- /goal ： 目标模式     `pi install npm:pi-goal-x`
- mcp支持： `pi install npm:pi-mcp-adapter`
- 颜色主题定制： `pi install npm:awesome-pi-themes`

### skills
- playwright-cli  让agent获得浏览器自动化能力✅ :https://github.com/microsoft/playwright-cli


### 记忆
- 写agents.md ,让AI有跨session的“项目记忆”。 写在 `~/.pi/agent/agents.md`中的话，可以有“系统记忆”
