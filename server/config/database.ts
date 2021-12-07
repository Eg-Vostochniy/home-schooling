const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI

mongoose.connect(URI, {
    useNewUrlParser: true
}, (err: any) => {
    if (err) throw err
    console.log('Mongo connected')
})