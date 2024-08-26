import { jsPDF } from "jspdf";

export const exportAsPDF = (data: any, filename: string) => {
  const doc = new jsPDF();
  doc.text(data, 10, 10);
  doc.save(filename);
};
