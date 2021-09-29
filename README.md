# Socketio-Client

![Socket.io Chat Room Demo](/demo.gif)

這是一個使用 **Create React App** 搭配 **[Material-ui](https://material-ui.com/)** 建立的前端專案，專門用來提供前端專案聊天室的功能，使用 [Socket.io](https://socket.io/) 與後端專案搭配製作出聊天室。

基本功能為：

1. 建立聊天室

2. 聊天室/頻道 分群聊天 - [Socket.io Rooms](https://socket.io/docs/v4/rooms/#default-room)

3. 可接受公告全體推播，可透過前端打 **API**。

---

## 使用方法

```
1. $ git clone https://github.com/RexHung0302/Socketio-Client.git

2. $ cd Socketio-Client // 或你 clone 下來的專案名稱

3. npm i / yarn i // 使用 docker 可跳過

4. npm start // 或是 docker build & run
```

**如果在本地跑，請把 `src/pages/index/index.tsx` 的 basename="/Socketio-Client" 拿掉，不然會倒到錯誤的頁面，這是為了讓專案能在 Github 上順利跑才加的**

---

## 備註

1. 這個專案僅提供實驗性質，請勿使用在盈利或者工作上，因作者不保證功能無瑕疵或者有任何 **Bug**，請自行承擔風險。

---

## 相關介紹文章

[【筆記】Socket，Websocket，Socket.io 的差異](https://leesonhsu.blogspot.com/2018/07/socketwebsocketsocketio.html)

[用 Socket.io 做一個即時聊天室吧！（直播筆記）](https://creativecoding.in/2020/03/25/%E7%94%A8-socket-io-%E5%81%9A%E4%B8%80%E5%80%8B%E5%8D%B3%E6%99%82%E8%81%8A%E5%A4%A9%E5%AE%A4%E5%90%A7%EF%BC%81%EF%BC%88%E7%9B%B4%E6%92%AD%E7%AD%86%E8%A8%98%EF%BC%89/)
