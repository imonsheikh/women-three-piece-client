import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const QuestionsTab = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendQuestion = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hqeg6ig",   // 🔹 তোমার Service ID
        "template_21aqlmf", // 🔹 তোমার Template ID
        form.current,
        "L-b68LLQb_AUBM-fo" // 🔹 তোমার Public Key
      )
      .then(
        () => {
          setStatus("আপনার প্রশ্ন সফলভাবে পাঠানো হয়েছে!");
          form.current.reset();
          setTimeout(() => setStatus(""), 4000);
        },
        () => {
          setStatus(" প্রশ্ন পাঠানো ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
          setTimeout(() => setStatus(""), 4000);
        }
      );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md ">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        আপনার প্রশ্ন লিখুন
      </h3>

      <form ref={form} onSubmit={sendQuestion} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="আপনার নাম"
          required
          className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm shadow-sm focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="email"
          name="email"
          placeholder="আপনার ইমেইল"
          required
          className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm shadow-sm focus:ring-2 focus:ring-pink-400"
        />
        <textarea
          name="question"
          placeholder="আপনার প্রশ্ন লিখুন..."
          rows="3"
          required
          className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm shadow-sm focus:ring-2 focus:ring-pink-400"
        ></textarea>

        {status && (
          <div
            className={`p-2 rounded-md text-center text-sm font-medium ${
              status.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-primary-c text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary transition"
        >
          প্রশ্ন পাঠান
        </button>
      </form>
    </div>
  );
};

export default QuestionsTab;
