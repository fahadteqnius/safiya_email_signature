import './App.css';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/firebase';
import EmailSignature from './email_signature';

function App() {
  const logIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        console.log(user);
      })
      .catch((err) => {
        const error = err.message;
        setErrorMessage(error);
      });
  };

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setErrorMessage("");
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully!");
    } catch (error) {
      const friendlyMessage = getFriendlyErrorMessage(error.code);
      setErrorMessage(friendlyMessage);
      console.error("Error signing in:", error.code, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  function getFriendlyErrorMessage(errorCode) {
    switch (errorCode) {
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-credential":
        return "Incorrect Credentials. Please try again.";
      case "auth/user-not-found":
        return "No user found with this email. Please check the email entered.";
      case "auth/invalid-email":
        return "Invalid email address. Please enter a valid email.";
      case "auth/user-disabled":
        return "This account has been disabled. Please contact support.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      default:
        return "Failed to sign in. Please try again.";
    }
  }

  if (authLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div>
          <EmailSignature logout={logout} />
        </div>
      ) : (
        <div className="App">
          <header className="App-header"></header>
          <body>
            <form onSubmit={handleSubmit} className="form-container">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 138.47 147.99'%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cpath class='cls-1' d='M53.85,0H84.69c17.8,48.9,35.64,97.87,53.78,147.7-7.66,0-14.61.05-21.56-.06-.76,0-1.61-.79-2.23-1.4-14.17-13.87-27.56-28.36-36.91-46.11-3.15-6-4.62-12.21-2.94-19.39l29.85,9.51V81.7L74.45,62.18c0-6.45,0-13,0-19.6,0-4.54-2.26-7.47-5.8-7.66-3.74-.19-6.39,2.74-6.47,7.51-.11,6.43,0,12.86,0,19.39l-31,19v8.53l30.05-8.83c.46,5.47.85,10.31-1.48,15.15-6.38,13.25-15.44,24.55-25.26,35.29-4.55,5-9.29,9.79-14.25,14.34A11.39,11.39,0,0,1,14,147.78c-4.27.39-8.59.11-13.95.11Z' fill='%23e51e25'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                alt="Safiya Travels"
                width="100"
                height="100"
              />
              <input
                type="email"
                id="email"
                className="form-inputtt"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                className="form-inputtt"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <button type="submit" className="form-button" onClick={logIn}>
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </body>
        </div>
      )}
    </div>
  );
}

export default App;
