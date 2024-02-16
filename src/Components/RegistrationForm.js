import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const RegistrationForm = () => {

    const navigate = useNavigate();
    const [formdata, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [passwordError, setPasswordError] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formdata,
            [name]: value,
        });
    };
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordPattern.test(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        

        // Validate email
        if (!validateEmail(formdata.email)) {
            alert('Please enter a valid email');
            return;
        }

        // Validate password
        if (!validatePassword(formdata.password)) {
            setPasswordError(
                'Password must be 8 characters long and contain at least one letter and one number'
            );
            return;
        } else {
            setPasswordError('');
        }

        try {
            const response = await fetch('https://flask-apidelivery.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata),
            });

            if (response.ok) {
                setRegistrationStatus('success');
                navigate('/login');
            } else {
                const data = await response.json();
                console.log(data.message);
                setRegistrationStatus('failure');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };
     return (
        <div>
            <section className="picture">
                <form className="registration-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputUsername">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputUsername"
                            placeholder="Enter username"
                            name="username"
                            value={formdata.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter email"
                            name="email"
                            value={formdata.email}
                            onChange={handleChange}
                            required
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
                            value={formdata.password}
                            onChange={handleChange}
                            required 
                        />
                        {passwordError && <p className="error-message">{passwordError}</p>}
                    </div>
                    <button type="submit" className="btns">
                        Submit
                    </button>
                    {registrationStatus === 'success' && (
                        <p className="success-message">Successful registration! Please proceed to login.</p>
                    )}
                    {registrationStatus === 'failure' && (
                        <p className="error-message">Registration failed. Please try again.</p>
                    )}
                    <div>
                        <small className="text-muted">
                            Already have an account? <a href="/login">Login</a>
                        </small>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default RegistrationForm;
