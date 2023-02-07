import {
  onGetTasks,
  coleccionComentarios,
  deleteTask,
  getTask,
  updateTask,
  upLoadImg,
  } from '../lib/firebase.js';

export const Wall = () => {
  const divWall = document.createElement('div');
  divWall.classList.add('contenedorMuro');
  divWall.innerHTML = /* html */`
  <div class="contenedorFoto"><img class="fotoPerfil" src="../img/perfil.png" id=fotoPerUs>
  <h1>Nombre de Usuario</h1>
</div>
<div class="contenedorPost">
  <textarea name="" id="" class="textPost" placeholder="Escribe una descripcion para tu publicacion..."></textarea>
  <input type='file' id='selecImg'> 
  <img class="fotoConcert" id="imagen">
  <span class='fileText'></span>
  <button id='publicar' class="btn-Publicar"> Publicar </button>
</div>
<button id="like" class="corazon"> </button>
<button id="entrada" class="ticket"></button>
<form id="formComentario" class="formComen">
  <textarea name="" id="textoComent" class="textPost" placeholder="escribe un comentario..."></textarea>
  <button id="comentar" class="enviarComentario"> Comentar </button>
</form>
<div id="contenedorComentario"></div>
<div class="bntsalir">
  <button id="cerrarSesion" class="salir">Cerrar sesion</button>
</div>
`;
  return divWall;
};

// Subir un Post:

window.addEventListener("DOMContentLoaded", async () => {
  const file = document.querySelector('#selecImg').files[0];
  const name= new Date() + '-' + file.name;
  
  const metadata = {
        contentType: 'image/jpeg'
      };
  const task = ref.child(name).put(file,metadata);
  task
  .then(snapshot=> snapshop.ref.getDownloadURL())
  .then (url=>{
   console.log(url)
   const image= document.querySelector('#imagen');
   image.src = url 
  })

   

 const btnPublicar = document.querySelector('#publicar');
 btnPublicar.addEventListener('click',() => {
    upLoadImg();
  }
  );
});

// Agregar, eliminar y editar comentario:
window.addEventListener("DOMContentLoaded", async () => {
  
  const divComentario = document.querySelector('#contenedorComentario');
  const formComent = document.querySelector('#formComentario');

  let editStatus = false;
  let id = "";
  
  onGetTasks((querySnapshot) => {
    divComentario.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();

      divComentario.innerHTML += `
      <div class="card card-body  border-primary">
    <p>${task.comentario}</p>
    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        🖉 Edit
      </button>
    </div>
  </div>`;
    });

    const btnsDelete = divComentario.querySelectorAll(".btn-delete");
       btnsDelete.forEach((btn) =>
       btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          console.log(dataset)
          await deleteTask(dataset.id);
        } catch (error) {
          console.log(error);
        }
        
      })
    );
    const btnsEdit = divComentario.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          formComent['textoComent'].value = task.comentario;

          editStatus = true; 
          id = doc.id;
          formComent['comentar'].innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
  

  formComent.addEventListener("submit", async (e) => {
    e.preventDefault();
    const description = formComent['textoComent'];
  
    try {
       if (!editStatus) {
        await coleccionComentarios(description.value);
      } else {
        await updateTask(id, {
          comentario: description.value,
          
        });
  
        editStatus = false;
        id = "";
        formComent['comentar'].innerText = "Save";
      }
      formComent.reset();
      // description.focus();
    } catch (error) {
      console.log(error);
    }
  });
});


