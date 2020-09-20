var express = require('express');
var router = express.Router();

const Joi = require('joi');
const Message = require('../models/messages');
const { response } = require('express');

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
router.post('/api/messages/', (req, res) => {
    Message.create({
        title: req.body.title,
        content: req.body.content
    }).then( (result) => res.json(result) );
});

/* UPDATE Message */ 
module.exports = router;
