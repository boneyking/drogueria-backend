export default {
    jwtSecret: process.env.JWT_SECRET || 'tokensupersecreto',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/Drogueria',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
}