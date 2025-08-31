import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Inside your Checkout component
const handleDownloadInvoice = () => { 
  const carts = usecarts()
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Invoice", 14, 22);

  doc.setFontSize(12);
  doc.text(`Customer: ${formData.name}`, 14, 32);
  doc.text(`Phone: ${formData.phone}`, 14, 38);
  doc.text(`Address: ${formData.address}`, 14, 44);
  doc.text(`Payment Method: Cash on Delivery`, 14, 50);
  doc.text(`Date: ${new Date().toLocaleString()}`, 14, 56);

  // Table data
  const tableColumn = ["Product", "Qty", "Unit Price", "Total"];
  const tableRows = [];

  carts.forEach((item) => {
    const rowData = [
      item.name,
      item.quantity,
      item.productPrice.toFixed(2),
      (item.totalPrice || item.productPrice * item.quantity).toFixed(2),
    ];
    tableRows.push(rowData);
  });

  doc.autoTable({
    startY: 65,
    head: [tableColumn],
    body: tableRows,
  });

  doc.text(`Grand Total: BDT ${total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);

  doc.save(`invoice_${new Date().getTime()}.pdf`);
};
