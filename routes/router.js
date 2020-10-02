const express = require('express')
const router = express.Router()

const Db2 = require('../data/helpers/projectModel')

//CRUD

// CREATE -- (POST)
router.post('/', (req, res) => {
    Db2.insert(req.body)
      .then(obj => {
        res.status(201).json({data: obj});
      })
      .catch(err => {
        res.status(500).json({
            message: 'unable to post'
        });
      })
  });
  // GET -- (READ)
  router.get('/:id', (req, res) => {
    Db2.get(req.params.id)
    .then(id => {
        if(id) {
            res.status(200).json(id)
        } else {
            res.status(404).json({
                message: 'the project with that ID cannot be found'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'the information couldnt be found'
        })
    })
})

router.get('/actions/:id', (req, res) => {
    Db2.getProjectActions(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: 'project doesnt exist'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'The actions information could not be retrieved.'
            })
        })
})
// PUT (UPDATE)
router.put('/:id', (req,res) => {
    Db2.update(req.params.id, req.body)
    .then(id => {
        if(id) {
            res.status(200).json(id)
        } else {
            res.status(404).json({
                message: 'that ID cant be found'    
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'error updating'
        })
    })
})

//DELETE
router.delete('/:id', (req, res) => {
    Db2.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({
                message: 'ID in database destroyed.'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error destroying'
        })
    })
})




//MIDDLEWARE
// function checkReq (req, res, next) {
//     console.log(req.body);
//     if (!req.body){
//       return res.status(400).json({message: 'Missing project data.'})
//     } else if (!req.body.name) {
//       return res.status(400).json({message: 'Missing required name field.'});
//     } else if (!req.body.description) {
//       return res.status(400).json({message: 'Missing required description field.'});
//     } else {
//         next();
//     }
  
//   }
  
//   function checkID(req, res, next){
//     Db2.get(req.params.id)
//       .then(project => {
//         console.log(project);
//         if (project) {
//           req.project = project;
//           return next();
//         } else {
//         return res.status(404).json({message: 'Project not found.'});
//         }
//       })
//       .catch(err => {
//         return res.status(400).json({message: 'Invalid Project ID.'});
//       })
//   }

module.exports = router