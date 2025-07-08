import { Link,Navigate } from 'react-router-dom';
import '../Signup/auth.css';
import { useState } from "react";
import { authRepository } from '../../modules/auth/auth.repository';
import { useAtom } from "jotai";
import { currentUserAtom } from "../../modules/auth/current-user.state";


function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom)


  const signin = async () => {
    if (email == '' || password == '') return;
    try {
      const { user, token } = await authRepository.signin(email, password);
    localStorage.setItem('token',token);
    setCurrentUser(user)
    console.log(user, token);
    } catch (error) {
      console.error('ログインに失敗しました。', error);
      
    }
    
  }

  if(currentUser != null) return <Navigate to="/" />


  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="signup-title">Sign in</h1>
        <p className="signup-subtitle">メールアドレスでログインしてください</p>

        <div>
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
            onClick={signin}
            disabled={email == '' || password == ''}
          >
            Continue
          </button>
        </div>
        <p className="signin-link">
          ユーザー登録は<Link to="/signup">こちら</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
