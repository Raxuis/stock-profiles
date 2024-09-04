import { jsPDF } from "jspdf";

export const exportAsPDF = (data: any, filename: string) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
    floatPrecision: 16,
  });

  const pageHeight = doc.internal.pageSize.height;
  const margin = 10;
  const textLines = doc.splitTextToSize(data, doc.internal.pageSize.width - margin * 2);

  let y = margin;

  textLines.forEach((line: string) => {
    if (y + 10 > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += 10;
  });

  doc.save(filename);
};

export const exportAsCSV = (data: any, filename: string) => {
  console.log(data);
  // Ensure data is an array
  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return;
  }

  // Convert array of objects to array of arrays
  const csvData = data.map((row: any) => Object.values(row)).map((rowArray: any) => rowArray.join(",")).join("\n");

  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
