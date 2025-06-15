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
            <h1 className="generator-title ">
              Password Generator
            </h1>

            <div className="mb-6">
              <div className="password-row">
                <input
                  type="text"
                  value={password}
                  readOnly
                  className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your secure password"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Password length: {length} characters
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="flex items-center">
                  <input
                    type="range"
                    min="4"
                    max="32"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="mr-2 w-full"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={() => setIncludeUppercase(!includeUppercase)}
                    className="mr-2 h-5 w-5"
                  />
                  Uppercase Letters
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={() => setIncludeLowercase(!includeLowercase)}
                    className="mr-2 h-5 w-5"
                  />
                  Lowercase Letters
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={() => setIncludeNumbers(!includeNumbers)}
                    className="mr-2 h-5 w-5"
                  />
                  Numbers
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={() => setIncludeSymbols(!includeSymbols)}
                    className="mr-2 h-5 w-5"
                  />
                  Symbols
                </label>
              </div>
            </div>

            <button
              onClick={generatePassword}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Generate Password
            </button>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="font-semibold mb-2">Password Strength Tips:</h2>
              <ul className="text-sm space-y-1 list-disc pl-5">
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
