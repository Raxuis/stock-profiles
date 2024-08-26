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
