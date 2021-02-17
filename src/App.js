import { useState } from "react";
import Translator from "./components/Translator";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  return (
    <div className="container mx-auto p-5 my-10 bg-white shadow text-center flex flex-col items-center">
      <h1>Translate text from English to Spanish</h1>
      <input
        name="word"
        aria-label="word-input"
        placeholder="Type some text"
        className="p-2 w-2/4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text && <Translator text={text} />}
    </div>
  );
}

export default App;
