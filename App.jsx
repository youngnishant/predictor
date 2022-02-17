import parseData from "./util";
import { useState } from "react";
export default function App() {
  const [file, setFile] = useState(null);
  return (
    <>
      <div className="App">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button onClick={() => parseData(file)}>Check</button>
    </>
  );
}
