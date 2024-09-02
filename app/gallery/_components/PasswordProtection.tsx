"use client";

import { useState, useEffect } from "react";
import styles from "./PasswordProtection.module.css";

export default function PasswordProtection({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuthentication = async () => {
      const storedPassword = localStorage.getItem("password");
      if (storedPassword) {
        await handleAuthentication(storedPassword);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleAuthentication = async (pwd: string) => {
    setError("");
    try {
      const response = await fetch("/api/validate-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      const { isValid } = await response.json();
      setIsAuthenticated(isValid);
      if (isValid) {
        localStorage.setItem("password", pwd);
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleAuthentication(password);
  };

  if (isAuthenticated === null) {
    // Show a loading state or return null
    return null; // or return <LoadingSpinner />
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Enter the password to view this gallery</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
