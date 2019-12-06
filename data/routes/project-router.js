const express = require('express');
const router = express.Router();

const Projects = require('../helpers/projectModel.js');

router.use(express.json());

router.post('/', (req, res) => {
    
    const projectData = req.body;

    if (!projectData.name || !projectData.description) {
        res
        .status(400)
        .json({errorMessage: "Please provide name and description for the project"});
    } else {
        Projects.insert(projectData)
        .then(project =>{
            res.status(201).json(project)
        })
        .catch(
            error => {
                console.log('error', error);
                res
                .status(500)
                .json({ errorMessage: "There was an error while saving the project to the database"});
            }); 
    
    }

});

router.get('/', (req, res) => {

    Projects.get()
        .then(projects => {
        res.status(200).json(projects);
        })
        .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the projects',
        });
        });
    });

    router.get('/:id/actions', (req, res) => {

        Projects.getProjectActions(req.params.id)
            .then(projects => {
            res.status(200).json(projects);
            })
            .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the actions for the project',
            });
            });
        });

    router.get('/:id', (req, res) => {
        Projects.get(req.params.id)
        .then(project => {
          if (project) {
            res.status(200).json(project);
          } else {
            res.status(404).json({ message: 'project not found' });
          }
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: 'Error retrieving the project',
          });
        });
      });

      router.delete('/:id', (req, res) => {
        Projects.remove(req.params.id)
         .then(count => {
           if (count > 0) {
             res.status(200).json({ message: 'project deleted' });
           } else {
             res.status(404).json({ message: 'The project could not be found' });
           }
         })
         .catch(error => {
           console.log(error);
           res.status(500).json({
             message: 'Error removing the project',
           });
         });
       });

       router.put('/:id', (req, res) => {
        const changes = req.body;
       Projects.update(req.params.id, changes)
        .then(project => {
          if (!project) {
            res.status(404).json({ message: 'The project could not be found' });
          } else if(!changes.name || !changes.description){
            res.status(400).json({ message: "update name or description"})
          } else {
            res.status(200).json(project);
          }
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: 'Error updating the project',
          });
        });
      });

module.exports = router;