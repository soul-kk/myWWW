---
title: "前端工程化体系"
date: "2025-08-05"
category: "技术"
draft: false
---

> [!NOTICE]
> _前端工程化的目标是通过**自动化、标准化和最佳实践**，解放双手提高人效、降低因频繁人工干预而导致出现问题的可能性，以及实现对项目性能的多方面优化_

![前端工程化体系概览](/blog/frontend-engineering-system/frontend-engineering-overview.png)

# 构建工具

## webpack
参考： [webpack知识体系](https://juejin.cn/post/7023242274876162084?searchId=20231023113543D1EFDBF3068E3C30F5BD)
- 主要配置：入口文件、 输出文件、 模块loader规则、 plugin插件、开发服务器、优化
- 常见配置
	参考[webpack配置react项目（掘金）](https://juejin.cn/post/7255955134131404860#heading-6)
	- html插件
	- css插件与配置
	- 静态资源打包配置
	- 支持es6，（babel-loader系列）
	- 集成react
	- 开发服务器：模块热更新
	- 引入typescript
**⚠️注意：** Loader 的执行顺序是固定从后往前

### 插件汇总
- 借助插件 [webpack-bundle-analyzer](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwebpack-bundle-analyzer "https://www.npmjs.com/package/webpack-bundle-analyzer") 我们可以直观的看到打包结果中，文件的体积大小、各模块依赖关系、文件是够重复等问题，极大的方便我们在进行项目优化的时候，进行问题诊断。

### 资源配置
> webpack5 新增资源模块(asset module)，允许使用资源文件（字体，图标等）而无需配置额外的 loader。

资源模块支持以下四个配置：

> 1. `asset/resource` 将资源分割为单独的文件，并导出 url，类似之前的 file-loader 的功能.
> 2. `asset/inline` 将资源导出为 dataUrl 的形式，类似之前的 url-loader 的小于 limit 参数时功能.
> 3. `asset/source` 将资源导出为源码（source code）. 类似的 raw-loader 功能.
> 4. `asset` 会根据文件大小来选择使用哪种类型，当文件小于 8 KB（默认） 的时候会使用 asset/inline，否则会使用 asset/resource



## Vite 🆚 webpack
- vite：  
快、性能高
	- 直接利用浏览器对 ES Module 的支持，按需加载，无需预打包。
	- 打包器基于go编写
- webpack：
慢、生态支持完善
	- 先扫描、打包所有代码，再启动服务器。
	- 打包器基于js编写

## rollup
[rollup](https://juejin.cn/post/6869551115420041229?searchId=202310231659514266DDF79D5A3F5A8346#heading-3)
### 与webpack对比
- **rollup**
	- 与`Webpack`偏向于应用打包的定位不同，`rollup.js`更专注于`Javascript`类库打包。
	- 优点：使用**更简单**，`tree-shaking`和`es6`支持好
- webpack
	- 支持**热重载**（HMR），代码分割，**静态资源**支持良好，插件生态丰富，适合开发应用使用

## 模块化
参考文章： https://juejin.cn/post/7147365025047379981
发展历程导图 https://www.processon.com/view/link/61c938021e0853641513e7e0

| 区别              | cjs            | esm                                     |
| --------------- | -------------- | --------------------------------------- |
| require/import时 | **值的拷贝**（当下的值） | 变量本身的**引用**（live binding)，且为**只读**，不可修改 |


# 转译工具
## babel
> 参考 https://juejin.cn/post/6844903743121522701
### 使用方式
1. 使用单体文件 (standalone script)
2. 命令行 (cli)
3. 构建工具的插件 (webpack 的 babel-loader, rollup 的 rollup-plugin-babel)。
后两者常见，但这三种方式只有入口不同而已，调用的 babel 内核，处理方式都是一样的

### 运行方式和插件
babel 总共分为三个阶段：解析，转换，生成。
- babel需要配置插件才能运作，插件分两类
	- 语法插件： 负责解析语法
	- 转译插件： 负责转换并输出
- 使用方法：将插件的名字写在.babelrc中，然后`npm i`进行安装

### preset
一个个配置插件过于繁琐，preset应运而生（一组插件的集合）。
- preset 分为以下几种：
	1. 官方内容，目前包括 ==env==, react, flow, minify 等。这里最重要的是 env，后面会详细介绍。
	2. stage-x，这里面包含的都是当年最新规范的草案，每年更新。
	3. es201x, latest。 （因为更加灵活的 env 的出现，已经废弃。）
- 简略情况下，插件和 preset 只要列出字符串格式的名字即可。但如果某个 preset 或者插件需要一些配置项(或者说参数)，就需要把自己先变成数组。第一个元素依然是字符串，表示自己的名字；第二个元素是一个对象，即配置对象。

### 执行顺序
- Plugin 会运行在 Preset 之前。
- Plugin 会从前到后顺序执行。
- Preset 的顺序则 **刚好相反**(从后向前)。

preset 的逆向顺序主要是为了保证向后兼容，因为大多数用户的编写顺序是 `['es2015', 'stage-0']`。这样必须先执行 `stage-0` 才能确保 babel 不报错。因此我们编排 preset 的时候，也要注意顺序，**其实只要按照规范的时间顺序列出即可。**

### env
如果不写任何配置项，env 等价于 latest。env核心目的是通过配置得知目标环境的特点，只做必要的转换，提升构建性能
```json
{
	"presets":[
		["@babel/preset-env", {
			"targets": {
				"node": "6.10",
				"browsers": ["last 2 versions", "safari >= 7"]
			}
		}],
		"stage-2"
	]
}
```


### 其他配套工具
https://juejin.cn/post/6844903743121522701#heading-15
- babel-cli : 命令行工具，安装了 `babel-cli` 就能够在命令行中使用 `babel` 命令来编译文件。
	- babel-register
	- **babel-polyfill**
- babel-node
- **babel-runtime 和 babel-plugin-transform-runtime (重点)**
	- 把帮助类方法从每次使用前定义改为统一 `require`，精简代码
- **babel-loader**：用在webpack中，需要在 webpack 这边配置一下



## AST
[掘金参考文章](https://juejin.cn/post/7155151377013047304?searchId=202310201428043E156BF285B13E15D1B6#heading-8)





---
# 配置 ESLint、prettier
```bash
npm install eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import --save-dev
```

创建`.eslintrc.cjs`文件：
```js
module.exports = {  
env: {  
browser: true,  
es2021: true,  
},  
extends: [  
'eslint:recommended',  
'plugin:react/recommended',  
'plugin:react-hooks/recommended',  
'plugin:import/errors',  
'plugin:import/warnings',  
'prettier',  
],  
parserOptions: {  
ecmaFeatures: {  
jsx: true,  
},  
ecmaVersion: 12,  
sourceType: 'module',  
},  
plugins: ['react', 'react-hooks', 'import'],  
rules: {   
'react/prop-types': 'off', // Disable prop-types rule if you're using TypeScript  
},  
settings: {  
react: {  
version: 'detect',  
},  
},  
};
```

创建.prettierrc文件
```json
{
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "es5",
  "endOfLine": "auto"
}
```
创建.prettierignore
```txt
dist
build
coverage
node_modules
.git
*.log
```
更新脚本package.json
```json
"scripts": {  
"lint": "eslint .",  
"format": "prettier --write ."  
}
```
创建.vscode/settings.json
```json
{  
"editor.formatOnSave": true,  
"editor.codeActionsOnSave": {  
"source.fixAll.eslint": true  
},  
"eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]  
}
```

# 前端静态部署
### 使用Netlify:
将前端项目`npm run build`后，构建出的dist（包含html、js）部署到netlify
- dist中加入netlify.toml
```
[[redirects]]
from = '/*'
to = "/index.html"
status = 200
```

## 使用Vercel
vercel中链接github仓库。github中有代码变动时，自动CD、build、部署dist


# 杂
## 常用命令

| 命令            | 操作                                                           | 可选配置                        |
| ------------- | ------------------------------------------------------------ | --------------------------- |
| `npm install` | 根据package.json安装所有需要的依赖，默认包括`dependencies`与`devDependencies` |                             |
| `npm i xxx`   | 安装指定依赖                                                       | `-D`: 安装到`devDependencies`中 |
|               |                                                              |                             |
- npm install 遇到peer错误时，加上--legacy-peer-deps可忽略版本冲突导致install失败（需谨慎）

**npx**
> `npx` 是随 `npm` 一起安装的一个工具，主要用于执行 Node.js 包，而不需要全局安装这些包。

## 常用依赖库
- **lodash** : 包含了大量的工具函数，如深拷贝、、、
- react-hook-form 处理react中表单的提交
- recharts图表
- 出bug时，白屏处理/错误提示： react-error-boundaries
- 国际化： i18n

## package.json
**`package.json`**
> 管理项目的 **元数据** 和 **依赖**，包括项目名称、版本、依赖的库、脚本等。
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "jest": "^26.0.0"
  },
  "scripts": {
    "start": "node app.js",
    "test": "jest"
  }
}
```
**`package-lock.json`**
> 锁定项目的 **依赖版本**，确保每次安装依赖时获取相同的版本，以保证不同环境中的一致性。
