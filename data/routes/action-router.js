const express = require('express');
const router = express.Router();

const Actions = require('../helpers/actionModel.js');

router.use(express.json());

router.get('/', (req, res) => {

    Actions.get(req.params)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the posts',
        });
      });
    });

module.exports = router;