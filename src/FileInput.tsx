import React from "react";
import * as XLSX from "xlsx";
import type { DadoDaPlanilha } from "./VariableMessageEditor"; // 👈 importa o tipo

interface Props {
  onDataLoaded: (data: DadoDaPlanilha[]) => void;
}

function FileInput({ onDataLoaded }: Props) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      if (!result || !(result instanceof ArrayBuffer)) return;

      const workbook = XLSX.read(result, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      // Faz o cast para o tipo certo
      const sheetData = XLSX.utils.sheet_to_json(sheet) as DadoDaPlanilha[];
      onDataLoaded(sheetData);
    };

    reader.readAsArrayBuffer(file);
  };

  return <input type="file" onChange={handleFileUpload} />;
}

export default FileInput;
