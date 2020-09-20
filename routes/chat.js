var express = require('express');
var router = express.Router();

const Joi = require('joi');
const Message = require('../models/messages');
const { response } = require('express');
const bodyParser = require('body-parser');
const { where } = require('sequelize');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET Messages work*/
router.get('/api/messages', function(req, res, next) {
    Message.findAll().then((result) =>{
        res.send(result);
    });
    
  });

/* GET by Ts Message work */
router.get('/api/messages/:ts', (req, res) => {
   let messageTs = req.params.ts
   Message.findOne({
       where: {
           ts: messageTs
       }
   }).then( message => {
       res.json(message)
   });
});

/* POST Message work*/
router.post('/api/messages/create', (req, res) => {
    console.log(req.body);
    Message.create({
        message: req.body.message,
        author: req.body.author,
        ts: req.body.ts
    }).then((response) =>{
        res.send("Mensaje creado");
    });
});

/* UPDATE Message */ 
router.put('/api/messages/update/:id', (req, res) =>{
    Message.update({
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id
        }
      }).then( (result) => res.json(result) );
});

/* DELETE Message */
router.delete('/api/messages/delete/:ts', (req, res) => {
    console.log(req.body);
    Message.destroy({
        where: {
            ts: req.body.ts
        }
    }).then( (result) => {
        res.send("Mensaje Borrado");
    });
});



module.exports = router;
