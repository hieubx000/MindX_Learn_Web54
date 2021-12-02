import React from 'react';
import logo from './logo.svg'
import './Logo.css'

class LogoReact extends React.Component{
render()
{
    return <img src={logo} className="App-logo" alt="logo" />;
}
}

export default LogoReact;
