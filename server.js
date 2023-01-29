require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
/*const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); //?
app.use(bodyParser.json());*/

mongoose.set('strictQuery', true);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

//client
const io = new Server(server, {
	cors: {
		//origin: 'http://localhost:3000',
		origin: 'https://client-new.onrender.com',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	//console.log(`User connected: ${socket.id}`);

	socket.on('join_room', (data) => {
		socket.join(data);
	});

	socket.on('send_message', (data) => {
		socket.to(data.room).emit('receive_message', data);
		//socket.broadcast.emit('receive_message', data);
	});

	socket.on('close', () => {
		console.log('close');
	});

	socket.on('disconnect', () => {
		console.log('disconnected');
	});

	socket.on('disconnection', () => {
		console.log('disconnection');
	});
});

//backend server
server.listen(5000, () => {
	console.log('Server started on port 5000');
});

app.use(express.json());
const bloksRouter = require('./routes/codeBlocksRouter');
app.use(bloksRouter);
