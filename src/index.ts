import app from './app';
import './database';

async function main() {
    await app.listen(app.get('port'));
    console.log('Servidor en puerto: ', app.get('port'));
}
main();
