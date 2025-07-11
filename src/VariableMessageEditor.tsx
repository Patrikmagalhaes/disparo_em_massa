import React, { useEffect, useState } from 'react';

export interface DadoDaPlanilha {
  [key: string]: string | number;
}

export interface VariableMessageEditorProps {
  jsonData: DadoDaPlanilha[];
}

const VariableMessageEditor: React.FC<VariableMessageEditorProps> = ({ jsonData }) => {
  const [message, setMessage] = useState('');
  const [columns, setColumns] = useState<string[]>([]);
  const [usedVariables, setUsedVariables] = useState<string[]>([]);

  useEffect(() => {
    if (jsonData.length > 0) {
      setColumns(Object.keys(jsonData[0]));
    }
  }, [jsonData]);

  useEffect(() => {
    const variableRegex = /{{\s*([^{}]+?)\s*}}/g;
    const matches = message.matchAll(variableRegex);
    const variables: string[] = [];

    for (const match of matches) {
      const varName = match[1].trim();
      if (!variables.includes(varName)) {
        variables.push(varName);
      }
    }

    setUsedVariables(variables);
  }, [message]);

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h3>Variáveis disponíveis:</h3>
      <ul>
        {columns.map((col) => (
          <li key={col} style={{ color: 'green', fontWeight: 'bold' }}>
            {col}
          </li>
        ))}
      </ul>

      <h3>Digite sua mensagem:</h3>
      <textarea
        rows={5}
        cols={60}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ex: Olá {{nome}}, seu email é {{email}}"
        style={{ marginBottom: '20px' }}
      />

      {usedVariables.length > 0 && (
        <>
          <h4>Validação de variáveis:</h4>
          <ul>
            {usedVariables.map((variable) => {
              const isValid = columns.includes(variable);
              return (
                <li
                  key={variable}
                  style={{
                    color: isValid ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {isValid ? '✔' : '✖'} {'{{' + variable + '}}'}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default VariableMessageEditor;
