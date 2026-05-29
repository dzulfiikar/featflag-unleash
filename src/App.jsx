import './App.css'
import { useFlag } from '@unleash/proxy-client-react';



function App() {

  const googleSSOEnabled = useFlag('GoogleSSO');
  const microsoftSSOEnabled = useFlag('MicrosoftSSO');

  return (
    <div className="app-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="brand-logo">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1>Welcome To</h1>
          <h1>iHR Company</h1>
        </div>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>Work ID</label>
            <input type="text" placeholder="e.g. 12345" spellCheck="false" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="***" spellCheck="false" />
          </div>

          <button className="primary-button" type="button">Sign In</button>
        </form>

        {(googleSSOEnabled || microsoftSSOEnabled) && (
          <div className="divider">
            <span>or continue with</span>
          </div>
        )}

        {googleSSOEnabled ? (
          <>
            <GoogleLogin />
          </>
        ) : null}

        {microsoftSSOEnabled ? (
          <MicrosoftLogin />
        ) : null}
      </div>
    </div>
  )
}

const GoogleLogin = () => {
  return (
    <div className="sso-container">
      <button className="google-button" type="button">
        <svg className="google-icon" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Google
      </button>
    </div>
  );
};

const MicrosoftLogin = () => {
  return (
    <div className="sso-container">
      <button className="microsoft-button" type="button">
        <svg className="microsoft-icon" viewBox="0 0 21 21">
          <path fill="#f25022" d="M0 0h10v10H0z" />
          <path fill="#7fba00" d="M11 0h10v10H11z" />
          <path fill="#00a4ef" d="M0 11h10v10H0z" />
          <path fill="#ffb900" d="M11 11h10v10H11z" />
        </svg>
        Microsoft
      </button>
    </div>
  );
};

export default App
