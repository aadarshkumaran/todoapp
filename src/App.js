import { useEffect, useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import './App.css';

function App() {
  let [toggle, setToggle] = useState(false)//toggle color change between buttons
  let [list, setList] = useState([])//display all todo list
  let [title, setTitle] = useState("")//add new title
  let [description, setDescription] = useState("")//add new title
  let [completed,setCompleted] = useState([])

  let handleAdd = () => {
    let newTask = {
      title: title,
      description: description,
    }

    let copyTask = [...list]
    copyTask.push(newTask)
    setList(copyTask)

    //here in setList we have set useState as an array but if you want to store
    //it should be in the form of object, 
    //in that case we need to stringify the array by using JSON.stringify
    //that implicitly converts array into object
    localStorage.setItem('todolist', JSON.stringify(copyTask))
  }

  let handleDelete = (index) =>{
    let copiedTask = [...list]
    copiedTask.splice(index,1)
    localStorage.setItem('todolist',JSON.stringify(copiedTask))
    setList(copiedTask)
  }

  let handleDeleteCompleted = (index) =>{
    let copiedCompletedTask = [...completed]
    copiedCompletedTask.splice(index,1)
    localStorage.setItem('completedtodolist',JSON.stringify(copiedCompletedTask))
    setCompleted(copiedCompletedTask)
  }

  let handleComplete = (index)=>{
    let now = new Date()
    let dd = now.getDate()
    let mm = now.getMonth()+1
    let yyyy = now.getFullYear()
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds()
    let completedTime = dd+"-"+mm+"-"+yyyy+" at "+h+":"+m+":"+s

    let filteredTodo = {
      ...list[index],
      completedTime : completedTime
    }

    let copyCompleted = [...completed]
    copyCompleted.push(filteredTodo)
    setCompleted(copyCompleted)
    handleDelete(index)
    localStorage.setItem('completedtodolist', JSON.stringify(copyCompleted))
  }

  useEffect(()=>{
    let fetchTodo = JSON.parse(localStorage.getItem(`todolist`))
    let fetchCompleted = JSON.parse(localStorage.getItem(`completedtodolist`))
    if(fetchTodo) setList(fetchTodo) // if any todos are present, display all todos
    if(fetchCompleted) setCompleted(fetchCompleted) // if any completed todos are present, display all of these
    
  },[])

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="todo-container">
        <div className="layer1">
          <div className="title-label"><label>Title</label></div>
          <div className="title">
            <div className="title-input"><input type="text" placeholder='Enter the title' value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          </div>
          <div className="description-label"><label>Description</label></div>
          <div className="description">
            <div className="description-input"><input type="text" placeholder='Enter the description' value={description} onChange={(e) => setDescription(e.target.value)} /></div>
          </div>
          <div className="add-button"><button onClick={handleAdd}>Add</button> </div>
        </div>
        <hr color='black' />
        <div className="layer2">
          {/* Conditional Rendering for Toggle between buttons */}
          <button className={`toggle ${toggle === false && 'active'}`} onClick={() => setToggle(false)}>Todo</button>
          <button className={`toggle ${toggle === true && 'active'}`} onClick={() => setToggle(true)}>Completed</button>
        </div>
        <div className="layer3">
          {
            toggle === false &&
            list.map((data, index) => (
              <div className="todo-list" key={index}>
                <div className="todo-content">
                  <h3>{data.title}</h3>
                  <p>{data.description}</p>
                </div>
                <div className="todo-buttons">
                  <DeleteOutlineOutlinedIcon id='delete' onClick={()=>handleDelete(index)} />
                  <DoneOutlineOutlinedIcon id='done' onClick={()=>handleComplete(index)} />
                </div>
              </div>
            ))
          }
          {
            toggle === true &&
            completed.map((data, index) => (
              <div className="todo-list" key={index}>
                <div className="todo-content">
                  <h3>{data.title}</h3>
                  <p>{data.description}</p>
                  <span>Completed on: {data.completedTime}</span>
                </div>
                <div className="todo-buttons">
                  <DeleteOutlineOutlinedIcon id='delete' onClick={()=>handleDeleteCompleted(index)} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
