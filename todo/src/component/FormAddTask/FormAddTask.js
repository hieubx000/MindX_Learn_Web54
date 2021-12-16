import React from 'react';
// import { usePosition } from 'use-position';
import { useDebounce } from 'use-debounce';

import Button from '../Button';
import useSyncLocalStorage from "../../hooks/useSyncLocalStorage"


function FormAddTask({ handleAddTask }) {
  // const{
  //   latitude,
  //   longitude,
  //   speed,
  //   timestamp,
  //   accuracy,
  //   heading,
  //   error, 
  // } = usePosition()

  const [text, setText] = useSyncLocalStorage('todo:text', '')
  const inputRef = React.useRef(null);

  const [deboundValue] = useDebounce(text, 3000);
  console.log('1',text, deboundValue);

  React.useEffect(() => {
    //fetch(deboundValue)
  }, [deboundValue])

  React.useEffect(() => {
    inputRef.current.focus();
  },[]);

  const onAddTask = () => {
    if (text) {
      setText('');
      handleAddTask(text);
    }
  }

  const handleChangeInput = e => {
    const value = e.target.value;
    setText(value);
  }

  return (
    <div className="mt-3 flex">
    <div className="flex-grow">
    {/* <code>
      latitude: {latitude}<br/>
      longitude: {longitude}<br/>
      speed: {speed}<br/>
      timestamp: {timestamp}<br/>
      accuracy: {accuracy && `${accuracy} meters`}<br/>
      heading: {heading && `${heading} degrees`}<br/>
      error: {error}
    </code> */}
      <input
        ref={inputRef}
        className="w-full h-full px-2 border rounded"
        value={text}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            onAddTask();
          }
        }}
        onChange={handleChangeInput}
        placeholder="Enter new task" 
      />
    </div>
    <Button onClick={onAddTask} label="Add" />
  </div>
  )
}

export default FormAddTask;