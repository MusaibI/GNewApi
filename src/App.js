import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import { router } from "./config/config";
import Search from "./components/Search/Search";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SignIn from "./components/SignIn/SignIn";
import { auth } from "./config/firebase";

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      {user && <NavBar />}
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
                {router.map((path) => (
                  <Route
                    exact
                    key={path.key}
                    path={path.path}
                    element={
                      <News
                        key={path.key}
                        newscategory={path.category}
                        country={path.country}
                      />
                    }
                  />
                ))}
                <Route path="/search/:query" element={<Search />} />
              </Routes>
            </PrivateRoute>
          }
        />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
