import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const downloadPDF = ({ data, columns, title = 'Report', fileName = 'report.pdf', totalCount  }) => {
  const doc = new jsPDF();
  doc.text(title, 14, 10);

  autoTable(doc, {
    head: [columns.map(col => col.name)],
    body: data.map(row =>
      columns.map(col => row[col.index] ?? '')
    ),
    startY: 20,
    styles: { fontSize: 9 },
  });

  if (typeof totalCount === 'number') {
    const finalY = doc.lastAutoTable.finalY || 30;
    doc.setFontSize(12);
    doc.text(`Total Count: ${totalCount}`, 14, finalY + 10);
  }

  doc.save(fileName);
};