import createHttpError from 'http-errors';

import Note from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { tag, search, page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;
  let noteQuery = Note.find();

  if (tag) {
    noteQuery.where('tag').equals(tag);
  }

  if (search) {
    noteQuery = noteQuery.find({ $text: { $search: search } });
  }

  const [totalNotes, notes] = await Promise.all([
    noteQuery.clone().countDocuments(),
    noteQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);

  res.status(201).json(newNote);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const deleteContactById = await Note.findByIdAndDelete(noteId);
  if (!deleteContactById) throw createHttpError(404, 'Note not found');

  res.status(200).json(deleteContactById);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const updateContactById = await Note.findByIdAndUpdate(noteId, req.body, {
    new: true,
  });
  if (!updateContactById) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(updateContactById);
};
