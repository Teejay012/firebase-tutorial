import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { db, auth, storage } from './config/firebase';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, } from 'firebase/firestore';
import { async } from '@firebase/util';
import { ref, uploadBytes } from 'firebase/storage';

function App() {

  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  const [titleUpdate, setTitleUpdate] = useState("");

  const [fileUpload, setFileUpload] = useState(null);

  const movieCollectionRef = collection(db, "movies")

  const getMovieList = async ()=>{
    try{
      const data = await getDocs(movieCollectionRef);
      const filtereddata = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setMovieList(filtereddata)
    } catch (err){
      console.error(err)
    }
  };

  const deleteMovie = async (id)=>{
    const movieDoc = doc(db, "movies", id);
    try{
      await deleteDoc(movieDoc);
    }catch (err){
      console.error(err);
      alert("can't delete")
    }
  };

  const updateMovieTitle = async (id)=>{
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: titleUpdate });
  };

  const uploadFile = async ()=>{
    if(!fileUpload) return;
    const filesFOlderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFOlderRef, fileUpload);
    }catch(err){
      console.error(err)
    }
  }


  useEffect(()=>{
    getMovieList();
  }, []);

  const onSubmitMovie = async ()=>{
    try{
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        recievedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid
      });

      getMovieList();
    }catch(err){
      console.error(err)
    }
  };

  

  return (
    <div className="App">
      <Auth />

      <div>
        <input
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> Received an Oscar</label>
        <button onClick={onSubmitMovie}> Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{color: movie.recievedAnOscar ? "green" : "red"}}> {movie.title} </h1>
            <p> {movie.releaseDate} </p>
            <button onClick={()=> deleteMovie(movie.id)}>Delete</button>

            <input placeholder='Update Title' onChange={(e) => setTitleUpdate(e.target.value)}/>

            <button onClick={()=> updateMovieTitle(movie.id)}>Update</button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files)} />
        <button onClick={uploadFile}> Upload File </button>
      </div>
    </div>
  );
}

export default App;
