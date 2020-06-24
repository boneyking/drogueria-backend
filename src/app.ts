import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/index';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

// inicializacion
const app = express();


// settings
app.set('port', process.env.PORT || 4000);
const http = require('http').Server(app);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);


const io = require('socket.io')(8081);

io.on('connection', (socket:any) => {
    console.log('usuario conectado al socket');
    socket.emit('bienvenido', 'holanda');
})

// routes
app.get('/', (req, res) => {
    res.send(`API en http:localhost:/api${app.get('port')}`);
});

app.use('/api', indexRoutes);


export default app;