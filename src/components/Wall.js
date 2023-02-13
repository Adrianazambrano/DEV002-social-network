import {
  onGetTasks,
  coleccionEvento,
  deleteTask,
  getTask,
  updateTask,
  upLoadImg,
  
  } from '../lib/firebase.js';
 
 export const  Wall =  () => {
  const divWall = document.createElement('div');
  divWall.classList.add('contenedorMuro');
  divWall.innerHTML = /* html */`
  <div class="contenedorFoto"><img class="fotoPerfil" src="../img/perfil.png" id=fotoPerUs>
    <h1>Nombre de Usuario</h1>
  </div>
  <section class="modal hidden" id='ventanaModal'>
    <div class="contenedorPost flex">
    <button class="btn-close">⨉</button>
      <form id="formPublicacion" class="formPost">
      <textarea name="" id="postDescription" class="textPost"
        placeholder="Escribe una descripcion para tu publicacion..."></textarea>
        <input type='file' id='selecImg'>
      <img class="fotoConcert" id="imagen" />
      <button id='publicar' class="btn-Publicar"> Publicar </button>
    </form>
    <div id='contenedorComentario' class='divDescriComentario'></div>
    </div>
  </section>
  <div class="overlay hidden"></div>
  <button class="btn btn-open" id='openModal'>Agregar un Post</button>
  <button id='eliminarPost' class="btn-Eliminar"> Eliminar Publicacion </button>
  <button id="like" class="corazon"> </button>
  <button id="entrada" class="ticket"></button>
  <form id="formComentario" class="formComen">
    <textarea name="" id="textoComent" class="textPost" placeholder="escribe un comentario..."></textarea>
    <button id="comentar" class="enviarComentario"> Comentar </button>
  </form>
  <div id="contenedorComenPost"></div>
  <div class="bntsalir">
    <button id="cerrarSesion" class="salir">Cerrar sesion</button>
  </div>
`;
  return divWall;
};



// Ventana Modal:
window.addEventListener("DOMContentLoaded", async () => {

const modal = document.querySelector("#ventanaModal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector("#openModal");
const closeModalBtn = document.querySelector(".btn-close");
console.log(openModalBtn)

openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
})
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

});



// Subir un Post:
window.addEventListener("DOMContentLoaded", async () => {

   const contenedorPostUser = document.querySelector('.contenedorPost')
   const btnPublicar = contenedorPostUser.querySelectorAll(".btn-Publicar");
   const textoPost = document.getElementById('postDescription');
   console.log (textoPost)
    btnPublicar.forEach((btn) => {
    btn.addEventListener('click', async () => {
    const file = document.querySelector('#selecImg').files[0];
    if (file == null) {
      alert('No has seleccionado un archivo');
    } else {
      //Descripcion de la publicacion:
      const divComentario = document.querySelector('#contenedorComentario');
      const formPublicacionUser = document.querySelector('#formPublicacion');
      
      let editStatus = false;
      let id = "";

      onGetTasksDescrip((querySnapshot) => {
        divComentario.innerHTML = "";

        querySnapshot.forEach((doc) => {
          const task = doc.data();

          divComentario.innerHTML += `
      <div class="divComentarios ">
    <p class='comentUser'>${task.comentarioDescrip}</p>
    <div class='divBotones'>
      <button class="btnDeleteComen" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-secondary btnEditDescrip" data-id="${doc.id}">
        🖉 Edit
      </button>
    </div>
  </div>`;
        });

        const btnsDeleteDescrip = divComentario.querySelectorAll("btnDeleteComen");
        btnsDeleteDescrip.forEach((btn) =>
          btn.addEventListener("click", async ({ target: { dataset } }) => {
            try {
              console.log(dataset)
              await deleteDescrip(dataset.id);
            } catch (error) {
              console.log(error);
            }

          })
        );
        const btnEdit = divComentario.querySelectorAll(".btnEditDescrip");
        btnEdit.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            try {
              const doc = await getDescrip(e.target.dataset.id);
              const task = doc.data();
              formPublicacionUser['textoPost'].value = task.comentario;

              editStatus = true;
              id = doc.id;
              formPublicacionUser['publicar'].innerText = "Update";
            } catch (error) {
              console.log(error);
            }
          });
        });
  });
  

  formPublicacionUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    const descriptionUser = formPublicacionUser['textoPost'];
  
    try {
       if (!editStatus) {
        await coleccionDescripcion(descriptionUser.value);
      } else {
        await updateDescrip(id, {
          comentario: descriptionUser.value,
          
        });
  
        editStatus = false;
        id = "";
        formPublicacionUser['publicar'].innerText = "Save";
      }
      formPublicacionUser.reset();
      // description.focus();
    } catch (error) {
      console.log(error);
    }
  });

      // subir foto : 
      const imagenUser = await upLoadImg(file);
      const imagenPost = document.querySelector('#imagen')
      imagenPost.setAttribute('src', imagenUser);
      
    }

  });
});
  const bntEliminar= document.querySelector('#eliminarPost')
    bntEliminar.addEventListener('click', async () => {
      DeletePost();
  })
});

//Comentario de la Publicacion: Agregar, eliminar y editar comentario...
window.addEventListener("DOMContentLoaded", async () => {
  
  const divComentarioUser = document.querySelector('#contenedorComenPost');
  const formComent = document.querySelector('#formComentario');

  let editStatus = false;
  let id = "";
  
  onGetTasks((querySnapshot) => {
    divComentarioUser.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();

      divComentarioUser.innerHTML += `
      <div class="divComentarios ">
    <p class='comentUser'>${task.comentario}</p>
    <div class='divBotones'>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        🖉 Edit
      </button>
    </div>
  </div>`;
    });

    const btnsDelete = divComentarioUser.querySelectorAll(".btn-delete");
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
    const btnsEdit = divComentarioUser.querySelectorAll(".btn-edit");
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
        await coleccionEvento(description.value);
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


