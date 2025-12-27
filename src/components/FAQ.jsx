import { useState } from "react";
import { FaPlus, FaMinus, FaTshirt, FaTruck, FaMoneyBillWave } from "react-icons/fa";

const FAQ = () => {
  const categories = ["All", "Material", "Delivery", "Payment"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "পোশাকের মেটিরিয়াল কি ধরনের?",
      answer:
        "আমাদের থ্রী-পিছ সেটগুলো 100% কটন বা হালকা পলিয়েস্টার মিশ্রিত ফ্যাব্রিকে তৈরি। আরামদায়ক এবং দৈনন্দিন ব্যবহারের জন্য উপযুক্ত।",
      category: "Material",
      icon: <FaTshirt className="text-blue-500" />,
    },
    {
      question: "ডেলিভারি কতদিনে হবে?",
      answer:
        "ঢাকা শহরের ভেতরে 1-2 কর্মদিবসে, ঢাকার বাইরে সাধারণত 3-5 কর্মদিবসে ডেলিভারি হয়।",
      category: "Delivery",
      icon: <FaTruck className="text-green-500" />,
    },
    {
      question: "পেমেন্ট অপশন কি কি?",
      answer:
        "আমরা নগদ/ক্যাশ অন ডেলিভারি পেমেন্ট অপশন দেই।",
      category: "Payment",
      icon: <FaMoneyBillWave className="text-yellow-500" />,
    },
    {
      question: "এই থ্রী-পিছ পোশাকের মাপ কেমন?",
      answer:
        "আমাদের সব থ্রী-পিছ সেট স্ট্যান্ডার্ড সাইজে আসে। সাইজ চার্ট দেখুন প্রতিটি পণ্যের পেজে।",
      category: "Material",
      icon: <FaTshirt className="text-blue-500" />,
    },
    {
      question: "পোশাকের রঙ কি স্ক্রিনের মতোই আসবে?",
      answer:
        "আমরা যতটা সম্ভব আসল রঙ দেখানোর চেষ্টা করি, কিন্তু মনিটরের সেটিংস অনুযায়ী রঙের পার্থক্য হতে পারে।",
      category: "Material",
      icon: <FaTshirt className="text-blue-500" />,
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto my-1 px-4 font-sans mt-10">
      <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-4">
        প্রায়শই জিজ্ঞাসিত প্রশ্ন
      </h2>

      {/* Category Filter */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-0.5 rounded-full font-medium transition text-sm md:text-base ${
              activeCategory === cat
                ? "bg-primary-c text-white shadow-md"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition pb-3"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
            >
              <div className="flex items-center gap-3 text-gray-900 font-semibold text-lg md:text-lg">
                {faq.icon}
                {faq.question}
              </div>
              <span className="text-blue-600 text-xl md:text-2xl">
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </button>
            <div
              className={`px-5 pb-5 text-gray-700 text-sm md:text-base leading-relaxed transition-all duration-300 overflow-hidden ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
