import React, { useRef, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle.jsx';
import emailjs from '@emailjs/browser';

const GetInTouch = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_hqeg6ig',      // replace with your EmailJS service ID
        'template_21aqlmf',     // replace with your EmailJS template ID
        form.current,
        'L-b68LLQb_AUBM-fo'       // replace with your EmailJS public key
      )
      .then(
        () => {
          setStatus('Message sent successfully!');
          form.current.reset();
        },
        () => {
          setStatus('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <div>
      <SectionTitle heading={'Get in Touch'} />
      <section className="bg-pink-100 dark:bg-gray-800 rounded-2xl" id="contact">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-4 text-center">
            <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
              Let's Connect
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              Have questions about our latest collections? We'd love to hear from you!
            </p>
          </div>

          <div className="flex items-stretch justify-center">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="h-full pr-6">
                <ul className="mb-6 md:mb-0">
                  <li className="flex mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-c text-white">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">Our Boutique</h3>
                      <p className="text-gray-600 dark:text-gray-300">456 Fashion Street, New York, NY</p>
                    </div>
                  </li>
                  <li className="flex mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-c text-white">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">Call Us</h3>
                      <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-c text-white">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">Email Us</h3>
                      <p className="text-gray-600 dark:text-gray-300">support@fashionboutique.com</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Contact Form */}
              <div className="card h-fit max-w-6xl p-5 md:p-12 bg-white shadow-lg rounded-lg">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Send Us a Message</h2>
                <form ref={form} onSubmit={sendEmail}>
                  <div className="mb-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="mb-3 w-full rounded-md border border-gray-300 py-2 px-4 shadow-sm focus:ring-pink-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      className="mb-3 w-full rounded-md border border-gray-300 py-2 px-4 shadow-sm focus:ring-pink-500"
                    />
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="5"
                      required
                      className="w-full rounded-md border border-gray-300 py-2 px-4 shadow-sm focus:ring-pink-500"
                    ></textarea>
                  </div>

                  {status && (
                    <p className="text-center text-sm text-green-600 mb-3">{status}</p>
                  )}

                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full bg-primary-c text-white px-6 py-3 rounded-md hover:bg-secondary-c"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInTouch;
