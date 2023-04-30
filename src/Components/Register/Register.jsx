import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth'
import app from '../Firebase/Firebase.config';

const auth = getAuth(app)

const Register = () => {
    // const [email,setEmail]= useState('');
    const [error,setError] = useState('');
    const [success,setSeccuess] =useState('')
    
    const handleSubmit = (event)=>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        // console.log(email,password);
      //create user firebase

        createUserWithEmailAndPassword(auth,email,password)
        .then(res=>{
            const loggedUser= res.user;
            console.log(loggedUser);
            setError('');
            setSeccuess('Successfully register')
            event.target.reset();
            sendVerificationEmail(res.user)
            updateDisplayName(res.user,name)
        })
        .catch(error=>{
            console.error(error.message);
            setError(error.message)
            setSeccuess('')
        })
    }
    const sendVerificationEmail = user =>{
        sendEmailVerification(user)
        .then(result=>{
            console.log(result);
        })
    }


    const updateDisplayName= (user,name) =>{
        updateProfile(user,{
            displayName: name
        })
        .then(()=>{
            console.log('username update');
        })
        .catch(err=>{
            console.log(err);
        })

    }
    const handleEmailChange= (e)=>{

        // console.log(e.target.value);
        // setEmail(e.target.value)


    }
    const handlePasswordBlur = (e)=>{
        // console.log(e.target.value);

    }

    
    return (
        <div>
            <h2>Please Register </h2>
      
           <form on onSubmit={handleSubmit}>
            <input onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your email address' required/>
            <br />
            <br />
            <input type="name" name="name" id="name" placeholder='Your name ' required/>
            <br />
            <br />
            <input onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your password' />
            <br />
            <br />
            <input type="submit" value="submit" />
           </form>
           <p>{error}</p>
           <p>{success}</p>
        </div>
    );
};

export default Register;