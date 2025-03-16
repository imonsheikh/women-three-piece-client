import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle.jsx';

const GetInTouch = () => {
    return (
        <div> 
            <SectionTitle heading={'Get in Touch'}></SectionTitle>
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
                            <div className="h-full pr-6">
                                <ul className="mb-6 md:mb-0">
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-c text-white">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Our Boutique</h3>
                                            <p className="text-gray-600 dark:text-gray-300">456 Fashion Street, New York, NY</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-c text-white">
                                            <i className="fas fa-phone"></i>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Call Us</h3>
                                            <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-c text-white">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Email Us</h3>
                                            <p className="text-gray-600 dark:text-gray-300">support@fashionboutique.com</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="card h-fit max-w-6xl p-5 md:p-12 bg-white shadow-lg rounded-lg">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900">Send Us a Message</h2>
                                <form id="contactForm">
                                    <div className="mb-6">
                                        <input type="text" id="name" placeholder="Your Name" className="mb-3 w-full rounded-md border border-gray-300 py-2 px-4 shadow-sm focus:ring-pink-500" />
                                        <input type="email" id="email" placeholder="Your Email" className="mb-3 w-full rounded-md border border-gray-300 py-2 px-4 shadow-sm focus:ring-pink-500" />
                                        <textarea id="message" placeholder="Your Message" rows="5" className="w-full rounded-md border border-gray-300 py-2 px-4 shadow-sm focus:ring-pink-500"></textarea>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="w-full bg-primary-c text-white px-6 py-3 rounded-md hover:bg-secondary-c">Send Message</button>
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