import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../hooks/useAppContext";

const { ipcRenderer } = window.require("electron");

function App() {
  const [appState] = useContext(AppContext);
  const [mainProcessMsg, setMainProcessMsg] = useState("");

  useEffect(() => {
    ipcRenderer.on("mainProcessEvent", (event, data) => {
      console.log("mainProcessEvent was captured by Renderer process !");
      setMainProcessMsg(data);
    });
  });

  return (
    <main className="App">
      <h1>Electron Create-React-App Starter</h1>
      <h4>{appState.message}</h4>
      <h4>{mainProcessMsg}</h4>
      <button
        onClick={() => {
          ipcRenderer.send("rendererEvent", "Hello from App.js");
        }}
      >
        Triger Main Event
      </button>
    </main>
  );
}

export default App;
