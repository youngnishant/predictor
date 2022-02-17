import parseData from "./util";

export default function App() {
  return (
    <div className="App">
      <input type="file" accept=".csv,.xlsx,.xls" onChange={parseData} />
    </div>
  );
}
