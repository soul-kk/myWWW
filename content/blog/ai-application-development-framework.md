---
title: "AI应用开发认识框架"
date: "2025-10-24"
category: "技术"
draft: false
---

# 框架
![AI 应用开发框架概览](/blog/ai-application-development-framework/ai-development-framework.png)

![AI 编程和智能体关系示意](/blog/ai-application-development-framework/ai-agent-relationship.png)
![AI 应用技术栈示意](/blog/ai-application-development-framework/ai-application-stack.png)

# 一些AI技术名词
## LLM
大语言模型，large language model，有”思考“的能力
- 它的本质是一个**概率预测机器**：给定一段话，它预测下一个最可能出现的字（Token）是什么。
- context  prompt  memory
- 常见应用：chat bot对话机器人
> eg：豆包、chatgpt的基础功能


## Agent
用户与LLM中加的一个中间层，减少对话次数，赋予AI ”办事“ 的能力（比如联网搜索、查看文件）
- 核心要素：思考能力（LLM）、规划、记忆、工具的调用

## RAG（检索增强生成）
RAG 是一种技术框架，它在 LLM 回答问题之前，先从外部知识库（如 PDF、数据库、维基百科）中**检索**出相关的最新信息，然后把这些信息和你的问题一起喂给模型，让模型参考着给出答案。
> eg: **企业内部知识库**

## MCP
*agent* 与 *各种工具* 之间的一个**规范**，让Agent更好的使用各种工具

## workflow
一套AI工作流程，通过编程进行一定的固化，使得输出更加快速稳定可靠

## Skill
- 本质是**prompt加载器**，核心文件为`SKILL.md`
