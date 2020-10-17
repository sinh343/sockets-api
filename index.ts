import SocketIo from "socket.io";
import ioOut from "socket.io-client";
import Express from "express";
import http from "http";

const app = Express();

app.get("/", (req, res) => {
    console.log("test");
    res.sendStatus(200);
});

const server = http.createServer(app);

server.listen(3001, () => {
    console.log("listening on 3001");
});
const io = SocketIo(server);

io.on("connection", socket => {
    console.log(`socket id ${socket.id} connected...`);

    socket.on("disconnect", (data: string) => {
        console.log(`disconnected id: ${socket.id}`);
    });
    socket.on("fire", (data: string) => {
        console.log(`${socket.id} sent a value of: ${data}`);
        socket.emit("updateFire", data);
    });
});


// const io = SocketIo(3000);

// io.on("connect", () => {
//     console.log("socket connected");
// })