import { Router } from 'express';

import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

const noteRouter = Router();

noteRouter.get('/notes', getAllNotes);

noteRouter.get('/notes/:noteId', getNoteById);

noteRouter.post('/notes', createNote);

noteRouter.delete('/notes/:noteId', deleteNote);

noteRouter.patch('/notes/:noteId', updateNote);

export default noteRouter;