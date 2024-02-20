import React, { useState } from 'react'
import '../../assets/css/auth.css'
import { Link, useNavigate } from 'react-router-dom';

function Register() {


  const [user, setUser] = useState({});
  const navigator = useNavigate();
  document.title = 'AhU | Register';


  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { email, password } = user;

    if (!email || !password) {
      return alert('All fields are required');
    }

    fetch('http://localhost:3000/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          return alert(data.error);
        }
        alert('Register successful');
        localStorage.setItem('user', JSON.stringify(data.user));
        navigator('/chat');
      })
      .catch(err => console.log(err));

  }

  return (
    <div className='login'>
      <div className="fifty-container">
        <div className="logo">
          <img src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2155550380/settings_images/31bbc3-428-1e5d-e8b-27bb7c5fc_ae0d67ae-4311-4a74-83c7-e83544cd373c.png" alt="logo" />
        </div>
      </div>
      <div className="fifty-container">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input onChange={handleChange} autoComplete='off' type="email" name="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input onChange={handleChange} autoComplete='off' type="text" name="username" placeholder="Username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={handleChange} autoComplete='off' type="password" name="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="passRep">Password Repeat</label>
              <input onChange={handleChange} autoComplete='off' type="password" name="passRep" placeholder="Password Repeat" />
            </div>
            <div className="form-group">
              <button type="submit">Register</button>
            </div>
          </form>
          <div className="other-login">
            <span>
              Already have an account? <Link to="/login">Login</Link>
            </span>
            {
              /**
               * <hr />
                <span>
                  OR SIGN IN WITH
                </span>
                <div className="logins">
                  <div className="google">
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google" />
                  </div>
                </div>
               */
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register