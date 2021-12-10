import React from 'react';
import clsx from 'clsx';
import Button from '../../component/Button';

function TaskList({ tasks,isChecked, handleChangeCB, handleDeleteTask }) {
  const clsList = clsx({
    'border': tasks.length > 0,
    'divide-y divide-gray-100 mt-8': true
  })
  
  console.log('render task list');

  return (
    <ul className={clsList}>
        {tasks.map((task, idx) => {
            const style = clsx({
            "line-through": isChecked === true,
            "mr-2 inline-flex items-center flex-grow":true
            })
          return (
            <li className="p-2 flex" key={idx}>
                <div className='px-2 py-3'>
                    <input onChange={handleChangeCB} type="checkbox" />
                </div>
                
              <div className={style}>
                {task.content}
              </div>
              <Button            
                label="Delete"     
                onClick={() => handleDeleteTask(idx)}
                variant="danger"
              />
            </li>
          )
        })}
      </ul>
  )
}

export default TaskList;