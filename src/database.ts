import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config/config';
import logger from './utils/logger';


const dbOptions: ConnectionOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};

mongoose.connect(config.DB.URI, dbOptions);
const connection = mongoose.connection;

connection.once('open', () => {
	logger.info('MongoDB conectado!');
});

connection.on('error', (error) => {
	logger.error(error);
	process.exit(0);
});
