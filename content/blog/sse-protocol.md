---
title: SSE协议
date: '2025-10-07'
category: 技术
draft: false
---
> 前端向服务器发起一次请求，服务器多次向前端返回响应直到结束

# 客户端EventSource
> 仅能用于GET请求

# 客户端fetch
> 可使用POST完成SSE协议


关键词：response.body  `for await`  `TextDecoder` `chunk` `生成器`  

```js
  // 传入response.body,处理流式响应
  async function handleStreamResponse(response) {
    if (!response) return;

    const decoder = new TextDecoder();
    let accumulatedContent = ''; // 用于累积内容

    try {
      // 创建初始的 assistant 消息
      setIsFetching(true);
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      for await (const value of response) {
        const lines = decoder
          .decode(value, { stream: true })
          .split('\n')
          .map((chunk) => chunk.trim())
          .filter(Boolean);

        for (const line of lines) {
          if (line === 'data: [DONE]') {
            setIsFetching(false);
            return;
          }
          try {
            const json = JSON.parse(line.slice('data: '.length));
            const chunk = json.choices?.[0]?.delta?.content || '';
            // 状态更新
            setMessages((messages) => {
              const lastMessage = messages[messages.length - 1];
              if (lastMessage?.role !== 'assistant') return messages;

              return [
                ...messages.slice(0, -1),
                { ...lastMessage, content: lastMessage.content + chunk },
              ];
            });

            accumulatedContent += chunk;
          } catch (parseError) {
            console.error('解析响应数据失败:', parseError);
          }
        }
      }
    } catch (streamError) {
      console.error('流处理错误:', streamError);
      // 在流处理失败时，保留已经累积的内容
      setMessages((messages) => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.role !== 'assistant') return messages;

        return [
          ...messages.slice(0, -1),
          { ...lastMessage, content: accumulatedContent + '\n[响应中断]' },
        ];
      });
      showError('响应中断，请重试');
    }
  }
```
