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

/* GET Messages */
router.get('/api/messages', function(req, res, next) {
    Message.findAll().then((result) =>{
        res.send(result);
    });
    
  });

/* GET by Ts Message */
router.get('/api/messages/:id', (req, res) => {
    Message.findByPk(req.params.id).then((response) => {
        if( response === null){
            return res
                .status(404)
                .send('The message you are trying to find does not exist');
        }
        res.send(response);
    });
});

/* POST Message */
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
router.delete('/api/messages/delete/:id', (req, res) => {
    Message.destroy({
        where: {
            id: req.params.id
        }
    }).then( (result) => res.json(result) )
});



module.exports = router;
