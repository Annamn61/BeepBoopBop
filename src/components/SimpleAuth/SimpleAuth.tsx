import { useState } from 'react';
import './SimpleAuth.css'

interface SimpleAuthProps {
    checkPassword: (password: string | null) => void;
}

export const SimpleAuth = ({checkPassword}: SimpleAuthProps) => {
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        checkPassword(password);
    }

    return(
    <div className="auth"> 
    <form onSubmit={handleSubmit}>
          <input type='password' autoFocus className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </form>
      </div>
    )
}