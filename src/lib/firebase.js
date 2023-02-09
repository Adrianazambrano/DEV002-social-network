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

// let fileText = document.querySelector('.fileText')
// let fileItem;
// let fileName;
// fileItem = e.target.files[0];
// fileName = fileItem.name;
// fileText.innerHTML = fileName;
// const storageRef = ref(storage,'images/');
// export const upLoadImg = uploadBytes(file,storageRef).then((snapshot) => {
 
//  console.log('Uploaded a blob or file!');
// });

export const upLoadImg = (file) => {
  
  const storageRef = ref(storage);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
  
  return storageRef
 
//   const metadata = {
//     contentType: 'image/jpeg'
//   };
//   const storageRef = ref(storage, 'images/' + file.name);
//   const uploadTask = uploadBytesResumable(storageRef, file, metadata);
//   () => {
//     // Upload completed successfully, now we can get the download URL
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//     });
//   }
// };

  
//   const task = ref.child(name).put(file,metadata);
//   task
//   .then(snapshot=> snapshop.ref.getDownloadURL(image))
//   .then (url=>{
//    console.log(url)
   
//    image.src = url 
//   })

};
  

// coleccion de comentarios
export const coleccionComentarios =  (comentario) => {
  addDoc(collection(store,'comentarios'), { comentario });
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
  export {ref} 