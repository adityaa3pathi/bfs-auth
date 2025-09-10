import Link from 'next/link';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-10 px-4 bg-gray-200 md:px-8 lg:px-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Information We Collect</h2>
        <p className="text-gray-700 leading-relaxed">
          We may collect two types of information from you:
        </p>
        <ul className="list-disc ml-8 text-gray-700 leading-relaxed">
          <li><strong>Personal Information</strong>: This includes your name, email, payment details, and any other personal information you provide when registering or purchasing courses.</li>
          <li><strong>Non-Personal Information</strong>: Technical data such as IP address, browser type, and your behavior on our site.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. How We Use Your Information</h2>
        <p className="text-gray-700 leading-relaxed">
          We use the information we collect to:
        </p>
        <ul className="list-disc ml-8 text-gray-700 leading-relaxed">
          <li>Process and manage your course purchases.</li>
          <li>Provide customer support and communicate with you regarding your purchases.</li>
          <li>Improve our website and services by analyzing user behavior.</li>
          <li>Send you promotional offers and updates with your consent.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Sharing Your Information</h2>
        <p className="text-gray-700 leading-relaxed">
          We will not sell or share your personal information with third parties, except in the following cases:
        </p>
        <ul className="list-disc ml-8 text-gray-700 leading-relaxed">
          <li><strong>Service Providers</strong>: We may share your information with third-party service providers who help us operate the website and process payments.</li>
          <li><strong>Legal Requirements</strong>: We may disclose your information if required by law to comply with legal obligations or protect our rights.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Cookies</h2>
        <p className="text-gray-700 leading-relaxed">
          We use cookies to improve your experience on our website. Cookies are small text files that store information about your preferences. You can disable cookies in your browser settings, but it may affect how the website functions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Data Security</h2>
        <p className="text-gray-700 leading-relaxed">
          We take reasonable precautions to protect your personal information. While no system is completely secure, we implement appropriate measures to safeguard your data from unauthorized access.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Your Rights</h2>
        <p className="text-gray-700 leading-relaxed">
          You have the following rights regarding your personal information:
        </p>
        <ul className="list-disc ml-8 text-gray-700 leading-relaxed">
          <li><strong>Access</strong>: You can request access to the personal information we hold about you.</li>
          <li><strong>Correction</strong>: You can request corrections if any information is inaccurate.</li>
          <li><strong>Deletion</strong>: You can request the deletion of your personal data, subject to legal retention requirements.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Changes to This Privacy Policy</h2>
        <p className="text-gray-700 leading-relaxed">
          We reserve the right to update this Privacy Policy from time to time. Any changes will be posted on this page, so we encourage you to review it periodically.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about this Privacy Policy or how we handle your data, you can contact us at:
          <br />
          <strong>Email</strong>: <a href="mailto:saurabhbadaya24@gmail.com" className="text-blue-500">saurabhbadaya24@gmail.com</a>
          <br />
          <strong>Phone</strong>: <a href="tel:91 861-938-1856" className="text-blue-500">91 861-938-1856</a>
        </p>
      </section>

      <div className="text-center mt-10">
      <Link href={"/"}>
        <button className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-900">
          Back to Home
        </button>
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;