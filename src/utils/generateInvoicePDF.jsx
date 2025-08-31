import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (order) => {
  const doc = new jsPDF();

  // --- Header ---
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Mehrab Fashion House", 14, 20);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Bantibazar, Araihazar, Narayanganj, Bangladesh", 14, 26);
  doc.text("Email: support@mehrabfashinhouse.com | Phone: 01845925526", 14, 32);

  // Invoice number & date
  doc.text(`Invoice No: ${order.invoiceNo}`, 150, 20);
  doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 150, 26);

  doc.setLineWidth(0.5);
  doc.line(14, 36, 196, 36);

  // --- Customer Info ---
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Billing To:", 14, 45);
  doc.setFont("helvetica", "normal");
  doc.text(`${order.customer.name}`, 14, 51);
  doc.text(`${order.customer.address}`, 14, 57);
  doc.text(`Phone: ${order.customer.phone}`, 14, 63);
  doc.text(`Payment Method: ${order.paymentMethod}`, 14, 69);

  // --- Table ---
  const tableColumn = ["Product", "Qty", "Unit Price", "Total"];
  const tableRows = order.items.map((item) => [
    item.productName,
    item.quantity,
    item.productPrice.toFixed(2),
    (item.totalPrice || item.productPrice * item.quantity).toFixed(2),
  ]);

  autoTable(doc, {
    startY: 75,
    head: [tableColumn],
    body: tableRows,
    headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    styles: { fontSize: 10, cellPadding: 3 },
  });

  // --- Grand Total ---
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Grand Total: BDT ${order.total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);

  // --- Footer ---
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for shopping with Mehrab Fashion House! Visit again.", 14, doc.lastAutoTable.finalY + 20);
  doc.text("Website: www.mehrab-fashion-house.com | Support: 01845925526", 14, doc.lastAutoTable.finalY + 26);

  doc.save(`invoice_${order.invoiceNo}.pdf`);
};
