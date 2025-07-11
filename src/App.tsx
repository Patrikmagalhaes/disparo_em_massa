import FileInput from "./FileInput"
import VariableMessageEditor from "./VariableMessageEditor"

function App() {
 
  const planilha = [
    { nome: 'João', email: 'joao@email.com', idade: 25 },
    { nome: 'Maria', email: 'maria@email.com', idade: 30 }
  ];
  return (
    <>
     <h1>Hello World!</h1>
     <FileInput/>
     <h1>Mensagem</h1>
     <VariableMessageEditor jsonData={planilha}/>
    </>
  )
}

export default App