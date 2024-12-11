import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../../config/firebase";

const SignIn = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome</h1>
        <button style={styles.button} onClick={handleGoogleSignIn}>
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "rgb(41, 47, 51)",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#1c1f22",
    padding: "40px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
  title: {
    color: "#ffffff",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    background: "#db4437",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default SignIn;
