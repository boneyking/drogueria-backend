import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/index';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';
import bodyParser from 'body-parser';
import winston from 'winston';

// inicializacion
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);
app.use(bodyParser.json());

const io = require('socket.io')(process.env.PORT || 8081);

io.on('connection', (socket: any) => {
	winston.log('Socket conectado: ', socket.id);
});

// routes
app.get('/', (req, res) => {
	res.send(`API en http:localhost:/api${app.get('port')}`);
});

app.use('/api', indexRoutes);

// funciones
function obtenerSocket() {
	return io;
}

module.exports.obtenerSocket = () => {
	return io;
};

export default app;
