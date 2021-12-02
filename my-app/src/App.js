import React from 'react';
import LogoReact from './LogoReact';
import './App.css';
// import ES6 module >< CommonJS

function App() {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() =>{
    ref.current = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
    return () => {
      clearInterval(ref.current)
    }
  }, [])
  const renderText = () => {
    return(
      <p>
      Edit <code>src/App.js</code> and save to reload.
      </p>
    )
  }
  return (
    <div className="App">
      <header className="App-header">
        <LogoReact/>
        <p style={{
          color: 'red',
          textAlign: 'center',
          marginBottom: 40,
          borderBottom: '1px solid yellow'
        }}>
          {count}
        </p>
        
        {renderText()}
        <br />
        <p>{false ? 'true': 'false'}</p>
        <p>{(() => {
          return "đây là cái hàm"
        })()}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
