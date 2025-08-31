import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { generateInvoicePDF } from "../../utils/generateInvoicePDF.jsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

const OrderConfirmation = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="flex flex-col items-center mt-15 min-h-screen px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Order Found</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-2">Back to Home</Link>
      </div>
    );
  }

  // const handleDownloadInvoice = () => {
  //   const doc = new jsPDF();

  //   // --- Header: Company ---
  //   doc.setFontSize(20);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Mehrab Fashion House", 14, 20);

  //   doc.setFontSize(11);
  //   doc.setFont("helvetica", "normal");
  //   doc.text("Bantibazar, Araihazar, Narayanganj, Bangladesh", 14, 26);
  //   doc.text("Email: support@mehrabfashinhouse.com | Phone: 01845925526", 14, 32);

  //   // Invoice number & date
  //   doc.text(`Invoice No: ${order.invoiceNo}`, 150, 20);
  //   doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 150, 26);

  //   doc.setLineWidth(0.5);
  //   doc.line(14, 36, 196, 36); // underline

  //   // --- Customer Info ---
  //   doc.setFontSize(12);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Billing To:", 14, 45);
  //   doc.setFont("helvetica", "normal");
  //   doc.text(`${order.customer.name}`, 14, 51);
  //   doc.text(`${order.customer.address}`, 14, 57);
  //   doc.text(`Phone: ${order.customer.phone}`, 14, 63);
  //   doc.text(`Payment Method: ${order.paymentMethod}`, 14, 69);

  //   // --- Table ---
  //   const tableColumn = ["Product", "Qty", "Unit Price", "Total"];
  //   const tableRows = order.items.map((item) => [
  //     item.productName,
  //     item.quantity,
  //     item.productPrice.toFixed(2),
  //     (item.totalPrice || item.productPrice * item.quantity).toFixed(2),
  //   ]);

  //   autoTable(doc, {
  //     startY: 75,
  //     head: [tableColumn],
  //     body: tableRows,
  //     headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: "bold" },
  //     alternateRowStyles: { fillColor: [245, 245, 245] },
  //     styles: { fontSize: 10, cellPadding: 3 },
  //   });

  //   // --- Grand Total ---
  //   doc.setFontSize(12);
  //   doc.setFont("helvetica", "bold");
  //   doc.text(
  //     `Grand Total: BDT ${order.total.toFixed(2)}`,
  //     14,
  //     doc.lastAutoTable.finalY + 10
  //   );

  //   // --- Footer ---
  //   doc.setFontSize(10);
  //   doc.setFont("helvetica", "normal");
  //   doc.text(
  //     "Thank you for shopping with Mehrab Fashion House! Visit again.",
  //     14,
  //     doc.lastAutoTable.finalY + 20
  //   );
  //   doc.text(
  //     "Website: www.mehrab-fashion-house.com | Support: 01845925526",
  //     14,
  //     doc.lastAutoTable.finalY + 26
  //   );

  //   doc.save(`invoice_${order.invoiceNo}.pdf`);
  // };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce mx-auto" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          Thank you for your purchase. We've received your order and will process it shortly.
        </p>

        <button
          // onClick={handleDownloadInvoice}
          onClick={() => generateInvoicePDF(order)}
          className="mb-4 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold text-lg"
        >
          Download Invoice
        </button>

        <div className="flex gap-3 flex-wrap justify-center mt-4">
          <Link
            to="/dashboard/my-orders"
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition text-lg font-semibold text-center"
          >
            View My Orders
          </Link>
          <Link
            to="/"
            className="flex-1 sm:flex-none text-blue-600 hover:underline text-lg font-medium text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
