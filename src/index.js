const express = require('express');

const app = express();

app.use(require('cors'));

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`listen on port ${process.env.PORT || 3000}`);
})