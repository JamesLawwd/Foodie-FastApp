import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleInput = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.status === 200) {
                // Successful login
                console.log(data.message);
                navigate("/account");
            } else {
                // Invalid credentials
                console.log(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    return (
        <div>
            <section className="picture1">
                <form className="registration-form" onSubmit={handleInput}>
                    <div className="form-group">
                        <label htmlFor="exampleInputUsername">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputUsername"
                            aria-describedby="usernameHelp"
                            placeholder="Enter username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btns">Login</button>
                    <div>
                        <small className="accounts">
                            <p className='white-text'>Don't have an account? <a class="ml-2" href='/register'> Register</a> </p>
                        </small>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default LoginForm;
