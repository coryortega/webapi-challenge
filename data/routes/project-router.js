const express = require('express');
const router = express.Router();

const Projects = require('../helpers/projectModel.js');

router.use(express.json());

router.post('/', (req, res) => {
    
    const postData = req.body;

    if (!postData.name || !postData.description) {
        res
        .status(400)
        .json({errorMessage: "Please provide title and contents for the posts"});
    } else {
        Projects.insert(postData)
        .then(post =>{
            res.status(201).json(post)
        })
        .catch(
            error => {
                console.log('error', error);
                res
                .status(500)
                .json({ errorMessage: "There was an error while saving the post to the database"});
            }); 
    
    }

});

router.get('/', (req, res) => {

    Projects.get(req.params)
        .then(projects => {
        res.status(200).json(projects);
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