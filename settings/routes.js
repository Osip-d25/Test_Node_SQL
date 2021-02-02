'use strict'

module.exports = (app) => {
    const passport = require('passport');
    const itemController = require('./../Controller/itemController');
    const usersConrloller = require('./../Controller/userController');
    // const listController = require('./../Controller/listController')

    app
        .route('/api/users')
        .get(/*passport.authenticate('jwt', {session:false}), */itemController.infoItems);

    app
        .route('/api/register')
        .post(usersConrloller.register);
    
    app
        .route('/api/login')
        .get(usersConrloller.login);

    app 
        .route('api/items')
        .post(itemController.addTitle)    

}