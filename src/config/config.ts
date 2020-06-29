export default {
    jwtSecret: process.env.JWT_SECRET || 'onBNqUO4oHqCGeDw2swQQXNMKNQPJEmWm2Uq1jwPeoWxZVR1xYMJxFCuW1vKOna',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/Drogueria',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    },
    CLAVEMAGICA: 'Admindev001'
}