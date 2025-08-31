import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const OrderConfirmation = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Order Found</h2>
        <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    );
  }

  // const generateInvoiceNumber = () => `INV-${Math.floor(Math.random() * 1000000)}`;

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // --- Header: Company + Logo ---
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Mehrab Fashion House", 14, 20);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Bantibazar, Araihazar, Narayanganj, Bangladesh", 14, 26);
    doc.text("Email: support@mehrabfashinhouse.com | Phone: 01845925526", 14, 32);

    // Invoice number & date
    // const invoiceNumber = generateInvoiceNumber();
    doc.text(`Invoice No: ${order.invoiceNo}`, 150, 20);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 150, 26);

    doc.setLineWidth(0.5);
    doc.line(14, 36, 196, 36); // underline

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
    doc.text(
      `Grand Total: BDT ${order.total.toFixed(2)}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    // --- Footer ---
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Thank you for shopping with Fashion Mehrab Fashion House! Visit again.",
      14,
      doc.lastAutoTable.finalY + 20
    );
    doc.text("Website: www.mehrab-fashion-house.com | Support: 01845925526", 14, doc.lastAutoTable.finalY + 26);

    // Save PDF
    doc.save(`invoice_${order.invoiceNo}.pdf`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
      <p className="text-gray-600 text-lg max-w-md mb-6">
        Thank you for your purchase. We've received your order and will process it shortly.
      </p>

      <button
        onClick={handleDownloadInvoice}
        className="mb-4 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold"
      >
        Download Invoice
      </button>

      <div className="flex gap-4 flex-wrap items-center justify-center">
        <Link
          to="/dashboard/my-orders"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition text-lg font-semibold"
        >
          View My Orders
        </Link>
        <Link
          to="/"
          className="text-blue-600 hover:underline text-lg font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
