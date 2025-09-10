import Link from 'next/link';
import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 lg:px-16 bg-gray-200">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Terms and Conditions</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Introduction</h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to <strong>BFSZone</strong>. 
          The term ‘BFSzone’ or ‘us’ or ‘we’ refers to the owner of the website.
          By accessing and using this
          website, you agree to the terms and conditions outlined below. Please read them carefully. If you do not agree with these terms,
          you should not use our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Definitions</h2>
        <p className="text-gray-700 leading-relaxed">
          - <strong>&quot;Customer,&quot; &quot;you,&quot; or &quot;your&quot;</strong> refers to the individual purchasing courses or using the website.<br />
          - <strong>&quot;Services&quot;</strong> refers to the basketball courses, training materials, and other related services provided through our platform.<br />
          - <strong>&quot;Products&quot;</strong> refers to the digital content, including videos, guides, and training modules sold on our website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Use of Services</h2>
        <p className="text-gray-700 leading-relaxed">
          By using our services, you agree to provide accurate information during registration or course purchase, maintain the
          confidentiality of your account and password, and use the services for personal educational purposes only.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Payment Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          Payments are securely processed through Razorpay. All prices are listed in [rupees] and are subject to change without notice. Payment methods include Credit/Debit Cards, UPI, Net Banking, and Wallets.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Refund and Cancellation Policy</h2>
        <p className="text-gray-700 leading-relaxed">
          We offer a [4]-day refund policy from the date of purchase. 
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. User Conduct</h2>
        <p className="text-gray-700 leading-relaxed">
          You agree not to share or distribute the course content. Violations of this rule may result in account termination and legal actions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Intellectual Property</h2>
        <p className="text-gray-700 leading-relaxed">
          All content on this website is the property of [BFSZone] and is protected by copyright laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Privacy Policy</h2>
        <p className="text-gray-700 leading-relaxed">
          Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Limitation of Liability</h2>
        <p className="text-gray-700 leading-relaxed">
          We are not liable for any damages that arise from your use of our services. Our maximum liability will not exceed the amount paid by you for the course.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">10. Governing Law</h2>
        <p className="text-gray-700 leading-relaxed">
          These terms are governed by the laws of [Indian government]. Any disputes will be resolved in the courts of [jaipur, Rajasthan].
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">11. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions, contact us at:
          <br />
          Email: <a href="mailto:saurabhbadaya24@gmail.com" className="text-blue-500">saurabhbadaya24@gmail.com</a>
          <br />
          Phone: <a href="tel:+91 861-938-1856" className="text-blue-500">+91 861-938-1856</a>
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

export default TermsAndConditions;