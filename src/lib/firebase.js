import {
  initializeApp,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  // onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { 
  getFirestore, 
  collection, 
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

import { 
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject 
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAU0Ta8ZyJvb3griwsGlC-PcaqRNjHkMnM',
  authDomain: 'view-my-music.firebaseapp.com',
  projectId: 'view-my-music',
  storageBucket: 'view-my-music.appspot.com',
  messagingSenderId: '137287079012',
  appId: '1:137287079012:web:73908c3667805061763b71',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const store = getFirestore(app);
const storage = getStorage(app);
console.log(storage)


// 1.- SECCIÓN REGISTRO
// Registrando usuario con firebase

export const createUser = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error.message;
  }
};

// 2.- SECCIÓN HOME
// inicio de sesion correo y contraseña:
export const authSing = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error.message;
  }
};

// Observador
// export const authSesion = () => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//     } else {
//      }
//   });
// };
// inicio de sesion con google 
export const authGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(token,user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
};
// 3.- SECCIÓN WALL

//postear imagenes

export const upLoadImg = async (file) => {

  const storageRef = ref(storage, 'imagenes');
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  console.log(url)
  return url

};

export const DeletePost = async()=>{
  const desertRef = ref(storage, 'imagenes');
  await deleteObject(desertRef);
  const url = await getDownloadURL(desertRef)
  console.log(url)
  return url

}
// coleccion Descripcion del Posst:

// export const coleccionDescripcion =  (comentario) => {
//   addDoc(collection(store,'descripcion'), { comentario });
// };
// export const onGetTasksDescrip = (callback) =>
//   onSnapshot(collection(store, 'descripcion'), callback);



// export const deleteDescrip = (id) => deleteDoc(doc(store, 'descripcion', id));

// export const getDescrip = (id) => getDoc(doc(store, 'descripcion', id));

// export const updateDescrip = (id, newFields) =>
//   updateDoc(doc(store, 'descripcion', id), newFields);
  
//   export const obtenerDescripcion = () => {
//     getDocs(collection(store,'descripcion'));
//   };  

  //
  export {ref,getDownloadURL} 
  

// coleccion de comentarios
export const coleccionEvento =  (descripcion) => {
  const evento ={foto:'', descripcion:descripcion,likes:[],comentarios:[]}
  addDoc(collection(store,'eventos'), evento);
};
export const onGetTasks = (callback) =>
  onSnapshot(collection(store, 'comentarios'), callback);



export const deleteTask = (id) => deleteDoc(doc(store, 'comentarios', id));

export const getTask = (id) => getDoc(doc(store, 'comentarios', id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(store, 'comentarios', id), newFields);
  
  export const obtenerComentarios = () => {
    getDocs(collection(store,'comentarios'));
  };  

  //
  // export {ref,getDownloadURL} 