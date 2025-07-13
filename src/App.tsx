import { useState } from "react";
import FileInput from "./FileInput";
import VariableMessageEditor, { type DadoDaPlanilha } from "./VariableMessageEditor";

function App() {
  const [data, setData] = useState<DadoDaPlanilha[] | null>(null);

  return (
    <>
     
      <FileInput onDataLoaded={setData} />

      {data && <VariableMessageEditor jsonData={data} />}
    </>
  );
}

export default App;
