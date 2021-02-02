'use strict'



const response = require('./../response');
const db = require('./../settings/db');


exports.infoItems = (req, res) => {
    db.query('SELECT `id_item`, `title`, `price`, `image`, `id_user`, `name`, `email`, `phone`  FROM `list`, `users`', (error, rows, field) =>{
        if(error){
            response.status(400, error, res)
        } else {
            response.status(200, rows, res);
        }
    })
 };

 exports.addTitle = (req,res) =>{
            const title = req.body.title;
            const price = req.body.price;            
            const image = req.body.image;
            const user = req.body.user;

         

            let sql_add = "INSERT INTO `list` ( `title`, `price`, `image`, `id_user`) VALUES('" + title +"', '" + price + "', '" + image + "', '" + user + "')";

            db.query(sql_add, (error, result) =>{
                if(error){
                    response.status(400, error, res)
                }
                else{
                    response.status(200, {message:`Объявление добавлено`, result},res);
                }
            });
            
            
        }
   

    
