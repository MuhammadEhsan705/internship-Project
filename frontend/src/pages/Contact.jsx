import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div
        className="h-[350px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4)"
        }}
      >
        <div className="bg-black/60 w-full h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Contact <span className="text-yellow-400">Our Restaurant</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 text-center mb-12">

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2 text-yellow-500">
              Address
            </h3>
            <p className="text-gray-600">
              Main Food Street, Hazro City, Punjab Pakistan
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2 text-yellow-500">
              Phone
            </h3>
            <p className="text-gray-600">+92 311 5536830</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2 text-yellow-500">
              Email
            </h3>
            <p className="text-gray-600">restaurant@email.com</p>
          </div>

        </div>

        {/* Contact Section */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">
              Send us a <span className="text-yellow-500">Message</span>
            </h2>

            <form className="space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-yellow-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-yellow-500"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-yellow-500"
              ></textarea>

              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Send Message
              </button>

            </form>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=hazro%20punjab&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[400px]"
              loading="lazy"
            ></iframe>
          </div>

        </div>

      </div>

      {/* Restaurant Image Section */}
      <div className="mt-16">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
          alt="restaurant"
          className="w-full h-[350px] object-cover"
        />
      </div>

    </div>
  );
};

export default Contact;