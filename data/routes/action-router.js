const express = require('express');
const router = express.Router();

const Actions = require('../helpers/actionModel.js');

router.use(express.json());

router.post('/', (req, res) => {
    
    const actionData = req.body;

    if (!actionData.description) {
        res
        .status(400)
        .json({errorMessage: "Please provide a description"});
    } else {
        Actions.insert(actionData)
        .then(action =>{
            res.status(201).json(action)
        })
        .catch(
            error => {
                console.log('error', error);
                res
                .status(500)
                .json({ errorMessage: "There was an error while saving the action to the database"});
            }); 
    
    }

});

router.get('/', (req, res) => {

    Actions.get()
        .then(action => {
        res.status(200).json(action);
        })
        .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the actions',
        });
        });
    });

    router.get('/:id', (req, res) => {
        Actions.get(req.params.id)
        .then(action => {
          if (action) {
            res.status(200).json(action);
          } else {
            res.status(404).json({ message: 'action not found' });
          }
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: 'Error retrieving the action',
          });
        });
      });

      router.delete('/:id', (req, res) => {
        Actions.remove(req.params.id)
         .then(count => {
           if (count > 0) {
             res.status(200).json({ message: 'action deleted' });
           } else {
             res.status(404).json({ message: 'The action could not be found' });
           }
         })
         .catch(error => {
           console.log(error);
           res.status(500).json({
             message: 'Error removing the action',
           });
         });
       });

       router.put('/:id', (req, res) => {
        const changes = req.body;
       Actions.update(req.params.id, changes)
        .then(action => {
          if (!action) {
            res.status(404).json({ message: 'The action could not be found' });
          } else if(!changes.description || !changes.notes){
            res.status(400).json({ message: "update notes or description"})
          } else {
            res.status(200).json(action);
          }
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: 'Error updating the action',
          });
        });
      });

module.exports = router;