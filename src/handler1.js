const {nanoid} = require("nanoid");
const notes1 = require("./notes1");

const addNoteHandler =(request, h) => {
    const {title, tags, body} = request.payload;
    const id = nanoid(16);
    
    const createAt = new Date().toISOString();
    const updateAt = createAt;
    
    const newNote ={
        title, tags, body, id, createAt, updateAt
    }
    notes1.push(newNote);
    const isSuccess = notes1.filter((note) => note.id === id).length > 0;
    if (isSuccess) {
        const response = h.response ({
            status : 'success',
            message : 'Catatan berhasil ditambahkan',
            data : {
                noteId : id,
            },
        });
        response.code(201);
        return response;
    };
    
    const response = h.response({
        status : 'fail',
        message : 'catatan gagal ditambahkan',
    })
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes1,
  },
});


const getNoteByIdHandler = (request, h) => {
  const { id } = request.params
  const note = notes1.filter((n) => n.id === id)[0]
 
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note
      }
    }
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  })
  response.code(404)
  return response
}


const editNoteByIdHandler =(request,h)=> {
    const {id} = request.params;
    const {title, tags, body} = request.payload;
    const updateAt = new Date().toISOString();
    const index = notes1.findIndex((note) => note.id === id);
    
    if (index!== -1) {
        notes1[index]={
            ...notes1[index],
            title, tags, body, updateAt,
        };
        
        const response = h.response({
           status : 'success',
           message : 'Catatan berhasil diperbarui',
        });
        
        response.code(200);
        return response;
    }
    
    const response = h.response({
       status : 'gagal', 
       message : 'catatan gagal dimasukkan',
    });
    response.code(404);
    return response;
    
    
};

const deleteNoteByIdHandler = (request,h) => {
    const {id} = request.params;
    const index =notes1.findIndex((note) => note.id === id);
    
    if (index !== -1) {
        notes1.splice(index,1);
        const response = h.response ({
            status : 'success',
            message : "Catatan berhasil dihapus",
        });
        response.code(200);
        return response;
    };
    
    const response = h.response({
       status :'gagal', 
       message : 'data gagal dihapus',
    });
    response.code(400);
    return response;
};

module.exports ={ addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};
