import { useState } from 'react';
import './loginreg.css';

export default function LoginReg() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        licenseNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log('Login:', { email: formData.email, password: formData.password });
        } else {
            console.log('Register:', formData);
        }
        setFormData({ email: '', password: '', name: '', licenseNumber: '' });
    };

    return (
        <div className="container">
            <div className="form-box">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="licenseNumber"
                                placeholder="Medical License Number"
                                value={formData.licenseNumber}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                </form>
                <p>
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
}