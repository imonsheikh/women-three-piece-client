import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const GetInTouch = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hqeg6ig", 
        "template_21aqlmf", 
        form.current,
        "L-b68LLQb_AUBM-fo" 
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
    <section
      className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-2xl"
      id="contact"
    >
      {/* Heading */}
      <div className="text-center pt-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 tracking-wide">
          Contact Us
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          Have questions or need assistance? We’re here to help. Fill out the
          form below or reach out directly via email or phone.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8" >
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Contact Info */}
          <div className="p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 shadow-md rounded-xl border h-full">
            <ul className="space-y-6">
              {/* Address */}
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-pink-600 text-xl mt-1" />
                <div>
                  <h3 className="mb-1 text-base font-semibold text-gray-900">
                    Our Address
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Bantibazar, Araihazar, Narayanganj
                  </p>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="mb-1 text-base font-semibold text-gray-900">
                    Call Us
                  </h3>
                  <p className="text-gray-700 text-sm">01845925526</p>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-green-600 text-xl mt-1" />
                <div>
                  <h3 className="mb-1 text-base font-semibold text-gray-900">
                    Email Us
                  </h3>
                  <p className="text-gray-700 text-sm">
                    support@fashionboutique.com
                  </p>
                </div>
              </li>
              {/* Email */}
              <li className="flex items-start gap-3">
                <FaWhatsapp className="text-green-600 text-xl mt-1" />
                <div>
                  <h3 className="mb-1 text-base font-semibold text-gray-900">
                    WhatsUp Us
                  </h3>
                  <p className="text-gray-700 text-sm">
                    01845925526
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="card h-fit w-full p-6 bg-white shadow-md rounded-xl border">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Send Us a Message
            </h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="3"
                required
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-400"
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
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Smaller Google Map */}
      <div className="mt-6 w-full h-[250px] sm:h-[300px]">
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
  );
};

export default GetInTouch;
