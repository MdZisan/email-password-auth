import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react';
import app from '../Firebase/Firebase.config';

const auth = getAuth(app)

const Login = () => {
     
    const emailRef =  useRef();

     const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
// console.log(email,password);




signInWithEmailAndPassword(auth,email,password)
.then(result=>{
    const loggedUser = result.user;
    console.log(loggedUser);
})
.catch(error=>{
    console.log(error.message);
})
     }
const handleRestPassword =()=>{
const email= emailRef.current.value;
if(!email){
    alert('please input email')
    return;
}

sendPasswordResetEmail(auth,email)
.then(result=>{
    alert('check your email')
})
.catch(error=>{
    console.log(error.message);
})
}



    return (
        <div className="container">
            <h2>Please LOgin </h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" name='email' ref={emailRef} className="form-control" id="email" placeholder="Enter your email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' className="form-control" id="password" placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <p>Forget your password? <button onClick={handleRestPassword} className='btn btn-link'>Rest</button></p>
      </form>
    </div>
    );
};

export default Login;