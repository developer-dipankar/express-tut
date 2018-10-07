const mongoose = require('mongoose');
// MongoDB Connection
mongoose.Promise = global.Promise;
mongoose.connect(env.MONGO_URL, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.connection.once('open', ()=> console.log('MongoDB Connected'))
                    .on('error', (err)=> {
                      console.log('MongoDB Connection Failed');
                    });
