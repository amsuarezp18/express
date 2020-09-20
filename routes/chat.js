var express = require('express');
var router = express.Router();

const Message = require('../models/messages');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/messages', function(req, res, next) {
    Message.findAll().then((result) =>{
        res.send(result);
    });
    
  });
  

module.exports = router;
