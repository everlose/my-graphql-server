// 引入mongoose模块
import mongoose from 'mongoose'
import config from '../config'

// 同步引入 info model和 studen model
require('./schema/info')
require('./schema/student')

// 链接mongodb
export const database = () => {
    mongoose.set('debug', true)

    mongoose.connect(config.dbPath, {
        useMongoClient: true
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose default connection disconnected');
    })
    mongoose.connection.on('error', err => {
        console.log(`Mongoose default connection error: ${err}`);
    })

    mongoose.connection.on('connected', async () => {
        console.log(`Mongoose default connection connected to ${config.dbPath}`);
    })
}
