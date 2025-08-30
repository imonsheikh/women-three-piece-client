import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At <span className="font-semibold text-pink-600">Fashion Boutique</span>, 
            we celebrate the elegance and style of modern women. Our curated 
            collection of clothing blends timeless classics with contemporary trends, 
            offering pieces that empower, inspire, and enhance your individuality.
          </p>
        </div>

        {/* Features / Highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Premium Quality
            </h3>
            <p className="text-gray-600">
              We handpick every item to ensure exceptional quality and lasting comfort, so you can look and feel your best.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Trendy Collections
            </h3>
            <p className="text-gray-600">
              Stay ahead of the fashion curve with our seasonal collections that combine modern aesthetics with timeless elegance.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Customer Delight
            </h3>
            <p className="text-gray-600">
              Our mission is to provide a seamless shopping experience with attentive service, fast delivery, and hassle-free returns.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4">
            Discover the perfect outfit that speaks your personality.
          </p>
          <a
            href="/products"
            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-500 transition"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
