import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const GetInTouch = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hqeg6ig", // replace with your EmailJS service ID
        "template_21aqlmf", // replace with your EmailJS template ID
        form.current,
        "L-b68LLQb_AUBM-fo" // replace with your EmailJS public key
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          form.current.reset();
          setTimeout(() => setStatus(""), 4000);
        },
        () => {
          setStatus("❌ Failed to send message. Please try again.");
          setTimeout(() => setStatus(""), 4000);
        }
      );
  };

  return (
    <div>
      <section
        className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 dark:bg-gray-800 rounded-2xl"
        id="contact"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-5">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Contact Info */}
            <div className="p-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 shadow-2xl rounded-2xl border h-full transition hover:shadow-xl">
              <ul className="space-y-8">
                {/* Address */}
                <li className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-pink-600 text-2xl mt-1" />
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      Our Address
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Bantibazar, Araihazar, Narayanganj
                    </p>
                  </div>
                </li>

                {/* Phone */}
                <li className="flex items-start gap-4">
                  <FaPhoneAlt className="text-blue-600 text-2xl mt-1" />
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      Call Us
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      01845925526
                    </p>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-start gap-4">
                  <FaEnvelope className="text-green-600 text-2xl mt-1" />
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      Email Us
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      support@fashionboutique.com
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact Form */}
            <div className="card h-fit w-full p-6 md:p-10 bg-white dark:bg-gray-700 shadow-2xl rounded-2xl border hover:shadow-xl transition">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Send Us a Message
              </h2>
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:ring-2 focus:ring-primary-c placeholder-gray-500 dark:placeholder-gray-200"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:ring-2 focus:ring-primary-c placeholder-gray-500 dark:placeholder-gray-200"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  required
                  className="w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:ring-2 focus:ring-primary-c placeholder-gray-500 dark:placeholder-gray-200"
                ></textarea>

                {status && (
                  <div
                    className={`p-3 rounded-md text-center text-sm font-medium ${
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
                  className="w-full bg-primary-c text-white px-6 py-3 rounded-md font-semibold hover:bg-secondary-c transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Full width Google Map */}
        <div className="mt-3 w-full h-[400px]">
          <iframe
            title="google-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.643684280661!2d90.59857271498177!3d23.812348984557664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755d35a7c12345%3A0x123456789abcdef!2sAraihazar%2C%20Narayanganj!5e0!3m2!1sen!2sbd!4v1695678901234"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default GetInTouch;
