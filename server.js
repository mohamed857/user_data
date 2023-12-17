const express = require('express');

const userRoute  = require('./routes/user')
const cors = require('cors');

require('./config/connect.js')

const app = express();
app.use(express.json);
app.use(cors());


app.use('/user',userRoute);

app.post('/add',()=>{
    
})

app.listen(3000,()=>{
    console.log('server work');
});