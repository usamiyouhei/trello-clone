import { Link } from 'react-router-dom';
import '../Signup/auth.css';
import { useState } from "react";
import { authRepository } from '../../modules/auth/auth.repository';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signin = async () => {
    if (email == '' || password == '') return;
    const { user, token } = await authRepository.signin(email, password);
    console.log(user, token);
    
  }

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
