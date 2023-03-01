const express = require ('express');
const noteController = require ('../controller/noteController');
const router =  express.Router();

router.get('/', noteController.getNotes, (req, res) => res.status(200).json(res.locals.getAll));

router.post('/search', noteController.searchNotes, (req, res) => res.status(200).json(res.locals.search));

router.post('/', noteController.createNote, (req, res) => res.status(200).json(res.locals.newNote));

router.put('/:id', noteController.editNote, (req, res) => res.status(200).json(res.locals.edit));

router.delete('/:id', noteController.deleteNote, (req, res) => res.status(200));


module.exports = router