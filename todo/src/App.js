import React from 'react';

import FormAddTask from './component/FormAddTask/FormAddTask';
import TaskList from './component/TaskList';

function App() {
  const [tasks, setTasks] = React.useState(() => {
    const storedTasks = localStorage.getItem('tasks');

    if (!storedTasks) {
      return []
    }

    return JSON.parse(storedTasks)
  })
  const [count, setCount] = React.useState(tasks.filter(task => !task.isCompleted).length)
  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const handleAddTask = (text) => {
    setTasks(preTasks => [...preTasks, { content: text, isCompleted: false }]);
    setCount(count+1)
}

  const [check, setCheck] = React.useState()
  console.log(count);
  const handleChangeCB = e => {
       let isChecked = e.target.checked;
      console.log(isChecked);
      if(isChecked){
          setCount(count-1)
          setCheck(true)
      }
      if(!isChecked){
        setCount(count+1)
        setCheck(false)
      }
  }

  const handleDeleteTask = React.useCallback(
    (deleteIdx) => {
      setTasks(preTasks => preTasks.filter((_, currentIdx) => currentIdx !== deleteIdx));
    }  
  ,[]);

  const title = React.useMemo(() => {
    return count > 0 ? `There is ${count} tasks to done` : 'All tasks is done';
  },[tasks, count]);
  
  return (
    <div className="container mx-auto">
      <FormAddTask handleAddTask={handleAddTask} />
      <div className="my-2">{title}</div>
      <TaskList tasks={tasks} isChecked={check} handleChangeCB={handleChangeCB} handleDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default App;