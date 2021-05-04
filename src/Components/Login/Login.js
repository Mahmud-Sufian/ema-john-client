import firebase from "firebase/app";
import "firebase/auth"; 
import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { userContext } from "../../App";
import firebaseConfig from "./firebase.config";
import './Login.css';
 
 
// login-form-pHero---firebase auth name (personal)

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function Login() {  
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

  const [loggedIn, setLoggedIn] = useContext(userContext);
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  })

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordLength = e.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = (isPasswordLength && isPasswordHasNumber);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = "";
          setUser(newUserInfo);
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = { ...user };
        newUserInfo.success = true;
        newUserInfo.error = ""; 
        setLoggedIn(newUserInfo);
        setUserToken();
        history.replace(from);
        setUser(newUserInfo);
      })
      .catch(error => {
        const newUserInfo = { ...user };
        newUserInfo.success = false;
        newUserInfo.error = error.message;
        setUser(newUserInfo);
        });
    }

    if(!user.email || !user.password){
      const newUserInfo = {...user}
      newUserInfo.error = <p>invalid email or password</p> ;
      setUser(newUserInfo);
       
    }
  }

  const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
       sessionStorage.setItem('token', idToken)
    }).catch(function(error) {
      // Handle error
    });
  }

  return (
    <div className="App">
      
      <form class="form" onSubmit={handleSubmit}>
        <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
        <label htmlFor="newUser">Create Account</label>
        <br/>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name" />}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
        <br />
        <input type="submit"  value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: 'red', textAlign:'center'}}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green', textAlign:'center'}}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>
      }
      
    </div>
  );
}

export default Login;
