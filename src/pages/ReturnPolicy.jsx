import React, { useState } from "react";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
  const [lang, setLang] = useState("en"); // "en" বা "bn"

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Language Toggle */}
        <div className="flex justify-end mb-6 space-x-2">
          <button
            onClick={() => setLang("en")}
            className={`px-4 py-2 rounded font-medium ${
              lang === "en" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang("bn")}
            className={`px-4 py-2 rounded font-medium ${
              lang === "bn" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            বাংলা
          </button>
        </div>

        {lang === "en" ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Return Policy</h1>

            <p className="text-gray-700 mb-4">
              At <strong>Mehrab Fashion House</strong>, your satisfaction matters to us. 
              If you receive a product that is defective, damaged, torn, or differs from the product image, you are eligible for a replacement.
            </p>

            <p className="text-gray-700 mb-4">
              Please contact us via WhatsApp at <strong>01845925526</strong> within 72 hours of receiving the item, providing details and pictures if necessary.
            </p>

            <p className="text-gray-700 mb-4">
              Returns due to a change of mind are the responsibility of the customer, including shipping costs. 
              For defective or damaged products caused by us, <strong>Mehrab Fashion House</strong> will cover the return shipping charges.
            </p>

            <p className="text-gray-700 mb-4">
              We are committed to ensuring that all our customers receive products in excellent condition and will guide you through the replacement process.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">রিটার্ন পলিসি</h1>

            <p className="text-gray-700 mb-4">
              <strong>Mehrab Fashion House</strong> এ আমরা চাই আপনি আপনার পণ্য নিয়ে সন্তুষ্ট থাকুন। 
              যদি পণ্যটি ক্ষতিগ্রস্ত, ছেঁড়া, বা ছবির সাথে মিল না থাকে, তাহলে আপনি নতুন পণ্য প্রাপ্তির জন্য আবেদন করতে পারবেন।
            </p>

            <p className="text-gray-700 mb-4">
              পণ্য গ্রহণের ৭২ ঘণ্টার মধ্যে আমাদের WhatsApp এ <strong>01845925526</strong> নম্বরে জানাতে হবে। 
              সমস্যার বিস্তারিত এবং প্রয়োজনে ছবি সংযুক্ত করুন।
            </p>

            <p className="text-gray-700 mb-4">
              শুধুমাত্র নিজের ইচ্ছায় রিটার্ন বা এক্সচেঞ্জ করতে হলে শিপিং খরচ গ্রাহককে বহন করতে হবে। 
              তবে, যদি পণ্য আমাদের দোষে ক্ষতিগ্রস্ত বা ত্রুটিপূর্ণ হয়, তাহলে <strong>Mehrab Fashion House</strong> শিপিং খরচ বহন করবে।
            </p>

            <p className="text-gray-700 mb-4">
              আমরা নিশ্চিত করি যে সকল গ্রাহক আমাদের থেকে পণ্য ভাল অবস্থায় পাবেন এবং রিটার্ন বা এক্সচেঞ্জ প্রক্রিয়ায় সম্পূর্ণ সহযোগিতা পাবেন।
            </p>
          </>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:underline font-medium"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
