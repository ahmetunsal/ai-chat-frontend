import React, { useState } from 'react'
import '../../assets/css/auth.css'
import { useNavigate } from 'react-router-dom';

function Login() {


  const [user, setUser] = useState({});
  const navigator = useNavigate();
  document.title = 'AhU | Login';



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

    fetch('http://localhost:3000/v1/auth/login', {
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
        alert('Login successful');
        localStorage.setItem('user', JSON.stringify(user));
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
            <h1>Login</h1>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input onChange={handleChange} autoComplete='off' type="email" name="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={handleChange} autoComplete='off' type="password" name="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="other-login">
            <span>
              Don't have an account? <a href="/register">Register</a>
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

export default Login