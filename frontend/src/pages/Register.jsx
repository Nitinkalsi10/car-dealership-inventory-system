import React, { useState } from 'react';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Register = ({ onNavigateLogin, onRegisterSuccess }) => {
    const { register, loading } = useAuth();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const errs = {};
        if (!formData.name.trim()) errs.name = 'Full name is required';
        if (!formData.email.trim()) errs.email = 'Email address is required';
        if (!formData.password) errs.password = 'Password is required';
        if (formData.password && formData.password.length < 6) {
            errs.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            errs.confirmPassword = 'Passwords do not match';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await register({
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
            });

            if (response && response.success) {
                showToast({
                    type: 'success',
                    title: 'Account Created',
                    message: 'Please sign in with your email and password.',
                });
                if (onRegisterSuccess) onRegisterSuccess();
                else onNavigateLogin();
            }
        } catch (err) {
            showToast({
                type: 'error',
                title: 'Registration Failed',
                message: err.message || 'Could not register account',
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-800 rounded-lg border border-slate-700 p-8 space-y-6">
                {/* Brand Header */}
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto">
                        C
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white">Create Account</h1>
                    <p className="text-xs text-slate-400 font-medium">Join dealership portal</p>
                </div>

                {/* Register Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Full Name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        icon={User}
                        error={errors.name}
                        required
                        className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                    />

                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        icon={Mail}
                        error={errors.email}
                        required
                        className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        icon={Lock}
                        error={errors.password}
                        required
                        className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                    />

                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        icon={Lock}
                        error={errors.confirmPassword}
                        required
                        className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                    />

                    <Button type="submit" variant="primary" isLoading={loading} className="w-full py-3 text-sm font-bold mt-2">
                        Register Account
                    </Button>
                </form>

                {/* Footer Navigation */}
                <div className="text-center pt-2">
                    <p className="text-xs text-slate-400">
                        Already have an account?{' '}
                        <button
                            onClick={onNavigateLogin}
                            className="font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 hover:underline cursor-pointer"
                        >
                            <ArrowLeft className="w-3 h-3" /> Back to Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
