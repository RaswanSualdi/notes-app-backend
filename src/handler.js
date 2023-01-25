const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
  const { title, body, tags } = req.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNotes = {
    id, title, body, tags, createdAt, updatedAt,
  };

  notes.push(newNotes);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'catatan berhasil ditambahkan',
      data: { noteId: id },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal menambahkan data',

  });

  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((n) => n.id === id);
  //   console.log(index);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diupdate',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'Fail',
    message: 'Catatan Gagal diupdate',
  });
  response.code(400);
  return response;
};
const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Success delete data',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'fail to delete data',
  });

  response.code(400);
  return response;
};
module.exports = {
  addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler,
};
