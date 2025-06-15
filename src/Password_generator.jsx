import { useState, useCallback } from "react";

function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = "";
    let newPassword = "";

    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      alert("Please select at least one character type");
      return;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    setCopied(false);
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="main-center">
      <div className="password-generator-container">
        <h1 className="generator-title">Password Generator</h1>
        <div>
          <div className="password-row">
            <input
              type="text"
              value={password}
              readOnly
              className="password-input"
              placeholder="Your secure password"
            />
            <button
              onClick={copyToClipboard}
              className="copy-btn"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="length-label">
            Password length: {length} characters
          </div>
        </div>
        <div className="slider-row">
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>
        <div className="options-grid">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            Uppercase Letters
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            Lowercase Letters
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            Numbers
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            Symbols
          </label>
        </div>
        <button
          onClick={generatePassword}
          className="generate-btn"
        >
          Generate Password
        </button>
        <div className="tips-box">
          <h2 className="tips-title">Password Strength Tips:</h2>
          <ul className="tips-list">
            <li>Use at least 12 characters</li>
            <li>Include a mix of character types</li>
            <li>Avoid common words or patterns</li>
            <li>Don't reuse passwords across sites</li>
          </ul>
        </div>
      </div>
    </div>
  
  );
}

export default PasswordGenerator;
