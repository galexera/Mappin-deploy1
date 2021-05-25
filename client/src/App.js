import './App.css';
import Register  from "./components/Register";
import Login  from "./components/Login"
import React, { useState } from 'react'
import Map from "./components/Map"


function App() {
  const myStorage = window.localStorage 
  // const [currentUser,setcurrentUser] = useState(myStorage.getItem("user"));
  const [currentUser,setcurrentUser] = useState(null);
  const [showRegister,setshowRegister] = useState(false)
  const [showLogin,setshowLogin] = useState(true)
  const [showMap,setshowMap] = useState(false)

  const handlelogout = () => {
    setshowMap(false)
    myStorage.removeItem("user")
    setcurrentUser(null)
    setshowRegister(false)
    setshowLogin(true)
  }

  const handlelogin = () => {
    setshowRegister(false)
    setshowLogin(true)
  }

  const handleregister = () => {
    setshowLogin(false)
    setshowRegister(true)
  }
  return (
    <div className="App">
    {showMap && (<Map currentUser = {currentUser} />)}
     
    {showRegister && <Register setshowRegister = {setshowRegister}/>}
      {showLogin && <Login setshowLogin = {setshowLogin} myStorage = {myStorage} 
      setcurrentUser = {setcurrentUser} setshowMap = {setshowMap} />}


      {currentUser 
      ?
      (    <button className="button-logout" onClick={handlelogout}>Log out</button> ) 
      :
      (<div className="buttons">
      <button className="button-login" onClick={handlelogin}>Log in</button>
      <button className="button-register" onClick={handleregister}>Register</button>
      </div>)
      }   
    
    </div>
  );
}

export default App;
