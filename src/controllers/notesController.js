import createHttpError from 'http-errors';

import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { tag, search, page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;
  let noteQuery = Note.find({ userId: req.user._id });

  if (tag) {
    noteQuery.where('tag').equals(tag);
  }

  if (search) {
    noteQuery = noteQuery.find({ $text: { $search: search }, userId: req.user._id });
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
  const note = await Note.findOne({ _id: noteId, userId: req.user._id });
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const newNote = await Note.create({...req.body, userId: req.user._id,});

  res.status(201).json(newNote);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const deletedNote = await Note.findOneAndDelete({ 
    _id: noteId, 
    userId: req.user._id 
  });
  if (!deletedNote) throw createHttpError(404, 'Note not found');

  res.status(200).json(deletedNote);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const updatedNote = await Note.findByIdAndUpdate({_id: noteId, userId: req.user._id}, req.body, {
    returnDocument: 'after',
  });
  if (!updatedNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(updatedNote);
};
