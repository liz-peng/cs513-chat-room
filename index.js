let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

//render html and css 
app.get("/", (req, res) => {
    res.render("index.ejs");
});

io.sockets.on("connection", (socket) => {
	//if user connect
    socket.on("user", user => {
        socket.user = user;
        console.log(socket.user + " connect");
        io.emit("is online", socket.user + " is online.</i>");
    });

    //if user disconnet
    socket.on("disconnect", (user) => {
    	console.log(socket.user + " disconnect");
        io.emit("is online", socket.user + " is offline.</i>");
    })

    //user's message
    socket.on("chat message", (message) => {
    	console.log(socket.user + " sent: " + message);
        io.emit("chat message", "<strong>" + socket.user + "</strong>: " + message);
    });
});


let server = http.listen(3000, () => {
    console.log("App is running on localhost:3000");
});