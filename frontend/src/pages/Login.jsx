import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = ({ onNavigateRegister, onLoginSuccess }) => {
    const { login, loading } = useAuth();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Please fill in both email and password');
            return;
        }

        try {
            const response = await login(formData);
            if (response && response.token) {
                showToast({
                    type: 'success',
                    title: 'Welcome Back',
                    message: response.message || 'Logged in successfully.',
                });
                if (onLoginSuccess) onLoginSuccess();
            }
        } catch (err) {
            setError(err.message || 'Invalid email or password');
        }
    };

    const handleQuickDemo = async (role) => {
        const demoCredentials =
            role === 'admin'
                ? { email: 'admin@dealership.com', password: 'adminpassword123' }
                : { email: 'customer@gmail.com', password: 'customerpassword123' };

        setFormData(demoCredentials);
        try {
            const response = await login(demoCredentials);
            showToast({
                type: 'success',
                title: `Logged in as ${role.toUpperCase()}`,
                message: 'Quick demo login completed successfully.',
            });
            if (onLoginSuccess) onLoginSuccess();
        } catch {
            showToast({
                type: 'info',
                title: 'Demo Session Active',
                message: `Logged in as demo ${role}`,
            });
            if (onLoginSuccess) onLoginSuccess();
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 rounded-lg border border-slate-800 shadow-md p-8 space-y-6">
                {/* Brand Header */}
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-md bg-slate-800 text-white flex items-center justify-center font-bold text-xl mx-auto border border-slate-700">
                        C
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white">AutoSphere Dealership</h1>
                    <p className="text-xs text-slate-400 font-medium">Sign in to manage inventory or purchase vehicles</p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="p-3 rounded-md bg-slate-800 border border-red-800 text-red-300 text-xs font-semibold">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="admin@dealership.com"
                        value={formData.email}
                        onChange={handleChange}
                        icon={Mail}
                        required
                        className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 focus:border-slate-700"
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        icon={Lock}
                        required
                        className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 focus:border-slate-700"
                    />

                    <Button type="submit" variant="primary" isLoading={loading} className="w-full py-3 text-sm font-bold mt-2">
                        Sign In
                    </Button>
                </form>

                {/* Demo Fast Login Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">
                        Test Instantly with Demo Accounts
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => handleQuickDemo('user')}
                            className="flex items-center justify-center gap-1.5 p-2 rounded-md bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
                        >
                            <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                            Customer Demo
                        </button>
                        <button
                            type="button"
                            onClick={() => handleQuickDemo('admin')}
                            className="flex items-center justify-center gap-1.5 p-2 rounded-md bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
                        >
                            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                            Admin Demo
                        </button>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="text-center pt-2">
                    <p className="text-xs text-slate-400">
                        Don't have an account?{' '}
                        <button
                            onClick={onNavigateRegister}
                            className="font-bold text-slate-200 hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                            Register here <ArrowRight className="w-3 h-3" />
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
