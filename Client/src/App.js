import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';



function App() {

  let [textareaContent, setTextareaContent] = useState("")
  const [update, setUpdate] = useState(true)
  const [allNotes, setAllNotes] = useState([])


  /*Function to create a note to database with validations and with title and time......*/

  const addNote = () => {

    if (!textareaContent) { return alert("Please write note") }
    if (textareaContent.length > 500) { return alert("You can write maximun 500 words") }

    let options = {}              //To store title description and time

    // If title given by user the it take that word as a title 
    // but if title is not given by the user then it assume first word as a title

    let arrayOfDes = textareaContent.split("\n")

    if (arrayOfDes.length > 1 && arrayOfDes[0].length <= 20) {          //if title givem

      const [title, ...description] = arrayOfDes

      if (!description) { return alert("Write minimun two words to create a note...") }

      options.title = title
      options.description = description.join(" ")

    } else {                                                            //if title not given

      let array = textareaContent.split(" ")
      const [title, ...description] = array

      if (!description) { return alert("Write minimun two words to create a note...") }

      if (title.length <= 20) {
        options.title = title
      } else {
        return alert("First world should be assumed as a title so it's maximum length should be 20 !")
      }
      options.description = textareaContent
    }

    let time = new Date()

    let currTime = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`

    options.createdAt = currTime;

    axios.post("http://localhost:5000/notes", options)               //create note request 
      .then(() => {
        alert("Data created succesfully")
        setTextareaContent("")
        setUpdate(false)
      }).catch((err) => alert(err.message))

  }


  /*Function to read data (notes) from database....*/

  useEffect(() => {
    setUpdate(true)
    axios.get("http://localhost:5000/notes")
      .then((res) => { setAllNotes(res.data.data) })
      .catch((err) => alert(err.message))
  }, [update])


  /*Function to delete a notes from database....*/

  const deleteNotes = (i) => {
    let bool = window.confirm("Are you confirm to delete")
    if (bool) {
      axios.delete(`http://localhost:5000/notes/${i}`)
        .then(() => { setUpdate(false) })
        .catch((err) => alert(err.message))
    }
  }


  return (
    <>
      <div id="navbar">
        <span onClick={() => window.location.reload()}>Notes</span>
      </div>

      <div id="inputBox">
        <textarea value={textareaContent} placeholder='Take a note...' onChange={(e) => setTextareaContent(e.target.value)} />
        <button onClick={addNote} >Add</button>
      </div>

      <div id="allNotesBigBox">

        {allNotes.map((x, i) => {
          return <div className="notesBox" key={i}>
            <span className='title'>{x.title}</span>

            <div className="textarea">
              <p>{x.description}</p>
            </div>

            <span>{x.createdAt}</span>

            <i onClick={() => deleteNotes(x.id)} className="fa-solid fa-trash"></i>
          </div>
        })}
      </div>
    </>
  );
}

export default App;
