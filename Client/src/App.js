import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';



function App() {

  let [textareaContent, setTextareaContent] = useState("")
  const [update, setUpdate] = useState(true)

  const addNote = () => {
    if (!textareaContent) { return alert("Please write note") }
    if(textareaContent.length>500){ return alert("You can write maximun 500 words") }
    let options = {}

    //Taking a title form all texts of note

    let arrayOfDes = textareaContent.split("\n")

    if (arrayOfDes.length > 1 && arrayOfDes[0].length <= 20) {

      const [title, ...description] = arrayOfDes
      if (!description) { return alert("Write minimun two words to create a note...") }

      options.title = title
      options.description = description.join(" ")

    } else {

      let array = textareaContent.split(" ")
      const [title, ...description] = array

      if (!description) { return alert("Write minimun two words to create a note...") }

      if (title.length <= 20) {
        options.title = title
      } else {
        return alert("First world should be assumed as a title so it's maximum length should be 20 !")
      }
      options.description = description.join(" ")
    }
    let time = new Date()

    let currTime = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`

    options.createdAt = currTime;

    console.log(options)

    axios.post("http://localhost:5000/notes", options)
      .then(() => {
        alert("Data created succesfully")
        setTextareaContent("")
        setUpdate(false)
      }).catch((err) => console.log(err.message))

  }


  const [allNotes, setAllNotes] = useState([])



  useEffect(() => {
    setUpdate(true)
    axios.get("http://localhost:5000/notes")
      .then((res) =>{ console.log(res.data);setAllNotes(res.data)})
      .catch(err => console.log(err.message))
  }, [update])




  const deleteNotes = (i) => {
    axios.delete(`http://localhost:5000/notes/${i}`)
      .then(() => {
        alert("Delete Succesfully")
        setUpdate(false)
      })
      .catch(err => console.log(err.message))
  }

  return (
    <>
      <div id="navbar">
        <span>Notes</span>
      </div>

      <div id="inputBox">
        <textarea value={textareaContent} placeholder='Take a note...' onChange={(e) => setTextareaContent(e.target.value)} />
        <button onClick={addNote}>Add</button>
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
