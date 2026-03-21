import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';
import { authenticate } from "../middleware/authenticate.js";

export const noteRouter = Router();

noteRouter.use(authenticate);

noteRouter.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

noteRouter.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

noteRouter.post('/notes', celebrate(createNoteSchema), createNote);

noteRouter.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

noteRouter.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);