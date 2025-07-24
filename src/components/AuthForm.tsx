import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

interface AuthFormProps {
  noMargin?: boolean;
}
const AuthForm: React.FC<AuthFormProps> = ({ noMargin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    if (isLogin) {
      // Login
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else {
        if (data && data.user) {
          console.log('[LOGIN] Usuario autenticado UUID:', data.user.id);
        }
        setSuccess('¡Inicio de sesión exitoso!');
        navigate('/dashboard');
      }
    } else {
      // Signup
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setSuccess('¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen animate-fade-in">
      <div className={`relative max-w-sm w-full ${noMargin ? '' : 'mt-16'} p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl flex flex-col items-center`}>
        <img src="/arkusnexus-logo.png" alt="Logo" className="h-12 w-12 mb-2" />
        <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800 dark:text-white">
          {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-center mb-6 text-base">Bienvenido de nuevo, accede a tu cuenta para continuar.</p>
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm focus:shadow-lg"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm focus:shadow-lg"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            disabled={loading}
          >
            {loading ? 'Cargando...' : isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </button>
          {error && <div className="text-red-600 dark:text-red-400 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 dark:text-green-400 text-sm text-center">{success}</div>}
        </form>
      </div>
      <div className="w-full flex flex-col items-center mt-8">
        <div className="w-full border-t border-gray-200 dark:border-gray-700 my-2"></div>
        <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline text-base mt-2">¿No tienes cuenta? Regístrate</Link>
      </div>
    </div>
  );
};

export default AuthForm; 