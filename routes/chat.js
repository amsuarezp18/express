var express = require("express");
var router = express.Router();

const Joi = require("joi");
const Message = require("../models/messages");
const { response } = require("express");
const bodyParser = require("body-parser");
const { where } = require("sequelize");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET Messages work*/
router.get("/api/messages", function (req, res, next) {
  Message.findAll().then((result) => {
    res.send(result);
  });
});

/* GET by Ts Message work */
router.get("/api/messages/:ts", (req, res, next) => {
  
    let messageTs = req.params.ts;
    Message.findOne({
      where: {
        ts: messageTs,
      },
    }).then((message) => {
        try{
            if (message === null) {
                return res.status(404).json({
                    status: 'error',
                    message: 'The given message does not exist',
                })
            }
            res.json(message);
            next()
        } catch (error) {
          next(error)
        }
    });
});

/* POST Message work*/
router.post("/api/messages/create", (req, res, next) => {
  try {
    Message.create({
      message: req.body.message,
      author: req.body.author,
      ts: req.body.ts,
    }).then((response) => {
      res.send("Mensaje creado");
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

/* UPDATE Message work */
router.put("/api/messages", (req, res, next) => {
  
    let messageTs = req.body.ts;
    let newData = req.body;

    Message.findOne({
      where: {
        ts: messageTs,
      },
    }).then((response) => {
        try{
            if (response === null) {
                return res.status(404).json({
                    status: 'error',
                    message: 'The given message does not exist',
                })
            }
            response.update(newData)
            .then(newMessage =>{
                try{
                    res.json(newMessage)
                }catch (error) {
                    next(error)
                  }
                
            })
            next()
        } catch (error) {
          next(error)
        }
      
    });
});

/* DELETE Message */
router.delete("/api/messages/delete/:ts", (req, res, next) => {
  
    let messageTs = req.params.ts;

    Message.destroy({
      where: {
        ts: messageTs,
      },
    }).then((response) => {
        try{
            console.log(response)
            if (response === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'The given message does not exist',
                })
            }
            res.send("El mensaje fue eliminado");
            next()
        } catch (error) {
          next(error)
        }
        
    });
  
});



module.exports = router;
