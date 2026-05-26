import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logoutFirebase } from "../firebase";

export default function Login() {
  const { isFr, setUser, user } = useApp();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleGoogleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setError('');
    
    try {
      const firebaseUser = await signInWithGoogle();
      const isAdmin = firebaseUser.email === 'pritomhamid.ph@gmail.com' || firebaseUser.email === 'pritomhamid.ph@gamil.com';
      setUser({ 
        role: isAdmin ? 'admin' : 'customer', 
        username: firebaseUser.displayName || (isAdmin ? 'Admin' : 'Customer') 
      });
      navigate('/');
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        const inIframe = window.self !== window.top;
        if (inIframe) {
          setError(isFr ? "Le popup a été bloqué. Veuillez ouvrir l'application dans un nouvel onglet (icône en haut à droite)." : "Sign-in popup was blocked or closed. Please try opening the app in a new tab using the icon in the top right.");
        } else {
          setError(isFr ? "Connexion annulée." : "Sign-in was cancelled.");
        }
      } else if (err.code === 'auth/unauthorized-domain') {
        setError("Unauthorized domain. Please add this app URL to the Authorized Domains in your Firebase Console Authentication settings.");
      } else {
        setError((isFr ? "Échec de connexion Google: " : "Google Sign-In failed: ") + err.message);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutFirebase();
    setUser(null);
    navigate('/');
  };

  const handleAdminLogin = () => {
    if (password === '12345678') {
      setUser({ role: 'admin', username: 'Admin' });
      navigate('/');
    } else {
      setError(isFr ? "Mot de passe incorrect." : "Incorrect password.");
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-noir flex items-center justify-center pt-32 px-6">
        <div className="max-w-md w-full bg-obsidian border border-white/10 p-12 text-center glow-card">
          <h2 className="font-display text-4xl italic text-mist mb-6">
            {isFr ? "Bienvenue," : "Welcome,"} {user.username}
          </h2>
          {user.role === 'admin' && (
            <button onClick={() => navigate('/admin')} className="w-full bg-gold text-noir font-accent uppercase tracking-widest text-xs py-4 hover:bg-bone transition-colors mb-4">
               Dashboard
            </button>
          )}
          <button onClick={handleLogout} className="w-full border border-white/20 text-bone hover:border-gold hover:text-gold font-accent uppercase tracking-widest text-xs py-4 transition-colors">
             {isFr ? "Déconnexion" : "Logout"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noir flex items-center justify-center pt-32 px-6">
      <div className="max-w-md w-full bg-obsidian border border-white/10 p-12 glow-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
        
        <h2 className="font-display text-4xl md:text-5xl italic text-mist mb-8 text-center">
          {isFr ? "Connexion" : "Login"}
        </h2>
        
        {error && <div className="text-red-500 font-body text-xs mb-6 text-center">{error}</div>}
        
        <button disabled={isLoggingIn} onClick={handleGoogleLogin} className={`w-full bg-white text-black font-accent uppercase tracking-[0.2em] text-xs py-5 transition-colors mt-4 flex items-center justify-center gap-2 ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}>
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
          </svg>
          {isLoggingIn ? (isFr ? "Connexion..." : "Signing in...") : (isFr ? "Se connecter avec Google" : "Sign in with Google")}
        </button>

        <div className="mt-8 pt-8 border-t border-white/10">
          <h3 className="text-mist text-sm uppercase tracking-widest text-center mb-4">
            {isFr ? "Accès Administrateur" : "Admin Access"}
          </h3>
          <input
            type="password"
            placeholder={isFr ? "Mot de passe" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-white/20 text-white font-body px-4 py-3 mb-4 focus:outline-none focus:border-gold transition-colors"
          />
          <button onClick={handleAdminLogin} className="w-full bg-transparent border border-gold text-gold font-accent uppercase tracking-[0.2em] text-xs py-4 hover:bg-gold hover:text-black transition-colors">
            {isFr ? "Connexion Admin" : "Admin Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
