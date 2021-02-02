const express = require('express');
const app = express();
const port = process.env.PORT || 3006;
const bodyParser = require('body-parser');
const passport = require('passport');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./middleware/passport')
    
const rot = require('./settings/routes');
rot(app);

app.listen(port,() =>{
    console.log(`App listen on port ${port}`);
});