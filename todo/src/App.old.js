import React from 'react'
import clsx from 'clsx'
function App() {
  const [text, setText] = React.useState("")
  const [tasks, setTasks] = React.useState(() => {
    const storedTasks = localStorage.getItem('tasks');

    if(!storedTasks) {
      return []
    }
    return JSON.parse(storedTasks)
  })

  React.useEffect(() => {
    document.title = 'Todo React App'
  }, [])

  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = () => {
    if(text){
      setTasks(preTasks => {
        return [...preTasks, {content: text, isCompleted: false}]
      })
      setText('')
    }
  }

  const handleDeleteTasks = (deleteIdx) => {
    setTasks(preTasks => preTasks.filter((_, currentIdx) => currentIdx !== deleteIdx));
  }

  const handleChangeInput = e => {
    const value = e.target.value;
    setText(value);
  }

  const clsList = clsx({
    'border': tasks.length > 0,
    "divide-y divide-gray-100 mt-8": true
  })
  console.log("render");
  return (
    <div className="container mx-auto">
      <div className="mt-3 flex">
        <div className="flex-grow">
          <input className="w-full h-full px-2 border rounded"
           value={text}
           onKeyPress={e => {
            if(e.key ==='Enter') {
              handleAddTask();
            }
            }}
           onChange={handleChangeInput}
           placeholder="Enter new task" />
        </div>
        <button 
        onClick={handleAddTask}
        className="px-3 py-2 text-white bg-blue-500">
        Add</button>
      </div>
      <ul className={clsList}>
        {tasks.map((task, idx) => {
          return(
            <li className='p-2 flex' key={idx}>
              <div className='flex-col px-3 py-2'>
                <input type="checkbox"/>
              </div>
              <div className='nr-2 inline-flex items-center flex-grow'>
                {task.content}
              </div>
              <button 
              onClick={() => handleDeleteTasks(idx)}
              className='px-3 py-2 text-white bg-red-500'>
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
