import app from './app';
import './database';
import logger from './utils/logger';


async function main() {
    await app.listen(app.get('port'));
    logger.info(`Servidor en puerto: ${app.get('port')}`);
}
main();
