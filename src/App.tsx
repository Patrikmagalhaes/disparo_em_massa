import { useState } from "react";
import FileInput from "./FileInput";
import VariableMessageEditor, { type DadoDaPlanilha } from "./VariableMessageEditor";

function App() {
  const [data, setData] = useState<DadoDaPlanilha[] | null>(null);

  return (
    <>
      <h1>Hello World!</h1>
      <FileInput onDataLoaded={setData} />
      <h1>Mensagem</h1>
      {data && <VariableMessageEditor jsonData={data} />}
    </>
  );
}

export default App;
