'use strict'
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken')

const response = require('./../response');
const db = require('./../settings/db');
const config = require('./../config')

// exports.users = (req, res) => {
//    db.query('SELECT * FROM `list`, `users`', (error, rows, field) =>{
//        if(error){
//            response.status(400, error, res)
//        } else {
//            response.status(200, rows, res);
//        }
//    })
// };

exports.register = (req,res) =>{
    

    db.query("SELECT `id`, `email`, `name` FROM `users` WHERE `email` = '" + req.body.email + "'", (error,rows,fields) =>{
        if(error){
            response.status(400, error, res)
        }else if(typeof rows !== 'undefined' && rows.length > 0){
            console.log(rows);
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw =>{
                response.status(302, {message:`Пользователь с таким email - ${rw.email} уже существует`},res);
                return true
            })            
        }else{
            const email = req.body.email;
            const name = req.body.name;            
            const phone = req.body.phone;

            const salt = bcrypt.genSaltSync(15);
            const password = bcrypt.hashSync(req.body.password, salt);

            let sql_add = "INSERT INTO `users` (`name`, `email`, `phone`, `password`) VALUES('" + name+"', '" + email + "', '" + phone + "', '" + password + "')";

            db.query(sql_add, (error, result) =>{
                if(error){
                    response.status(400, error, res)
                }
                else{
                    response.status(200, {message:`Регистрация успешна`, result},res);
                }
            });
            
            
        }
    });

    
}
 exports.login = (req,res) => {
    
   db.query("SELECT `id`, `email`, `password` FROM `users` WHERE `email` = '" + req.body.email + "'", (error,rows,field) => {
        if(error){
            response.status(400, error, res)
        } else if(rows.length <= 0){
            response.status(401, {message:`Пользователь с  email - ${req.body.email} не найден`}, res)
        } else {
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                const password = bcrypt.compareSync(req.body.password, rw.password)
                if(password){
                    const token = jwt.sign({
                        userId: rw.id,
                        email: rw.email
                    }, config.jwt, {expiresIn: 120 *120});

                    response.status(200, {token: token}, res);
                } else {
                    response.status(401, {massage: `Пароль не верный`}, res);
                }
                return true;                
            })
            
        }
   });
    
}