const Instance = require('../model/models')

const noteController = {
  //creates new note in DB
  async createNote(req, res, next) {
    console.log('this is createNote Controller');
    const { note, createdAt } = req.body;
    try {
      const data = await Instance.create({
        note: note,
        createdAt: createdAt,
      });
      res.locals.newNote = data;
      console.log('this is data', data);
      return next();
    } catch (err) {
      next({
        log: `error in createForm: ERROR: ${err}`,
        message: { err: 'Express error handler caught in createForm' },
      });
    }
  },

  //fetch notes from DB
  async getNotes(req, res, next) {
    try {
      const data = await Instance.find();
      res.locals.getAll = data;
      console.log('this is from controller', data);
      return next();
    } catch (err) {
      next({
        log: `error in getAllClient: ERROR: ${err}`,
        message: { err: 'Express error handler caught in getNotes' },
      });
    }
  },

  //search notes from DB
  async searchNotes(req, res, next) {
    const { note } = req.body;
    console.log('this is from search', note);
    //case insensitive, partial search
    try {
      const data = await Instance.find({
        note: { $regex: note, $options: 'i' },
      });
      console.log('returned data', data);
      res.locals.search = data;
      return next();
    } catch (err) {
      next({
        log: `error in searchNotes: ERROR: ${err}`,
        message: { err: 'Express error handler caught in searchNotes' },
      });
    }
  },

  //delete note from DB
  async deleteNote(req, res, next) {
    
    const id = req.params.id;
    console.log('this is id', id)
    try {
      const data = await Instance.findOneAndDelete({ _id: id });
      res.locals.delete = data;
      console.log('this is deleted', data);
      return next();
    } catch (err) {
      next({
        log: `error in deleteNote: ERROR: ${err}`,
        message: { err: 'Express error handler caught in deleteNotes' },
      });
    }
  },

  //edit note from DB
  async editNote(req, res, next) {
    const id = req.params.id;
    const { note } = req.body;
    try {
      const data = await Instance.findByIdAndUpdate(
        id,
        { note: note },
        {
          new: true,
        }
      );
      res.locals.edit = data;
      return next();
    } catch (err) {
      next({
        log: `error in editNote: ERROR: ${err}`,
        message: { err: 'Express error handler caught in editNote' },
      });
    }
  },
};

module.exports = noteController;
