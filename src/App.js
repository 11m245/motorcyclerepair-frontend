import { createContext } from "react";
import "./App.css";
import { Home } from "./pages/Home";

function App() {
  const apiContext = createContext();
  const serverUrl = "http://localhost:4000";
  const clientUrl = "http://localhost:3000";
  const contextObj = { serverApi: serverUrl, clientUrl };

  return (
    <div className="App">
      <div className="project-container">
        <apiContext.Provider value={contextObj}>
          <Home />
        </apiContext.Provider>
      </div>
    </div>
  );
}

export default App;
