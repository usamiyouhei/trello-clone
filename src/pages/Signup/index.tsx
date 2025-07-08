import { Link,Navigate } from 'react-router-dom';
import './auth.css';
import { useState } from "react";
import { authRepository } from '../../modules/auth/auth.repository';
import { useAtom } from "jotai";
import { currentUserAtom } from "../../modules/auth/current-user.state";

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);


  const signup = async () => {
    if(name == '' || email == '' || password == '') return;
    try {
      const { user, token } = await authRepository.signup(name, email, password)
      localStorage.setItem('token',token);
      setCurrentUser(user);
      console.log(user, token);
    } catch (error) {
      console.error('ユーザー登録に失敗しました。', error);
    }
  };

  if(currentUser != null) return <Navigate to="/"/>


  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="signup-title">Sign up to continue</h1>
        <p className="signup-subtitle">
          Use your email or another service to continue
        </p>

        <div>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Full name" 
              required 
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email" 
              required 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input 
            type="password" 
            placeholder="Password" 
            required 
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="continue-button" 
            onClick={signup}
            disabled={name == '' || email == '' || password == ''}
            >
            Continue
          </button>
        </div>
        <p className="signin-link">
          ログインは <Link to="/signin">こちら</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
