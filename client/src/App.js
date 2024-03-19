import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')
  const [priority, setPriority] = useState('')

  const loadTasks = async()=>{
    const response = await axios.get('http://localhost:5000/all-tasks');
    setTasks(response.data.data);
  }

  useEffect(()=>{
    loadTasks();
  },[])

  const addTask = async ()=>{
    const response = await axios.post('http://localhost:5000/create-task', {
      id: Math.floor(Math.random() * 1000),
      title: task,
      priority: priority
    })
    loadTasks();
  }

  return (
    <div className='container'>
      <h3>Todo List</h3>
      <div className='task-container'>
        {
          tasks.map((task, i)=>{
            const {id, title, priority} = task;

            return(
              <div className='task'>
                <div className='task-title'>{id}. {title}</div>
                <p className='task-priority'>{priority}</p>
                <button className='task-remove'>Remove</button>
              </div>
            )
          })
        }
      </div>
      <div className='input-con'>
        <input 
          type='text' 
          className='input-text'
          value={task}
          onChange={(e)=>{setTask(e.target.value)}}
        />
        <select 
          className='input-priority'
          value={priority}
          onChange={(e)=>{setPriority(e.target.value)}}
        >
            <option>Select</option>
            <option value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
        </select>
        <button type='button' className='add-btn' onClick={addTask}>Add</button>
      </div>
    </div>
  )
}

export default App
