const express = require('express')
const router = express.Router()
const Db = require('../data/helpers/actionModel')

router.put('/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(() => {
            res.status(200).json({ data: req.body })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'cannot update'
            })
        })
})

router.get('/', (req, res) => {
    Db.get()
        .then(action => {
            res.status(200).json( action )
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'cant retrieve that'
            })
        })
})

router.get('/:id', (req, res) => {
    Db.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'cant retrieve from server'
            })
        })
})

router.post('/projects/:id', (req, res) => {
    Db.insert({ ...req.body, project_id: req.params.id })
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'unable to post.'
            })
        })
})

router.delete('/:id', (req, res) => {
    Db.remove(req.params.id)
        .then(() => {
            res.status(200).json({
                message: 'ID destroyed'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'cannot destroy'
            })
        })
})

module.exports = router