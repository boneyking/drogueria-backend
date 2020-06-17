import {connect} from 'mongoose';

export async function startConnection(){
    await connect('mongodb://localhost/Drogueria', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('base de datos conectada');
}

