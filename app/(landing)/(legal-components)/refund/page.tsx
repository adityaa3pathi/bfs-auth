import Link from 'next/link';
import React from 'react';

const RefundCancellationPolicy = () => {
  return (
    <div className="container mx-auto py-10 px-4 bg-gray-200 md:px-8 lg:px-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Refund & Cancellation Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Eligibility for Refunds</h2>
        <p className="text-gray-700 leading-relaxed">
          You may be eligible for a refund under the following conditions:
        </p>
        <ul className="list-disc ml-8 text-gray-700 leading-relaxed">
          <li><strong>Non-Delivery of the Course</strong>: If the course you purchased has not been assigned or made accessible to you within <strong>[1 day]</strong> from the date of purchase.</li>
          <li><strong>Duplicate Payment</strong>: If you accidentally paid for the same course more than once, we will issue a full refund for the duplicate transaction upon verification.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Non-Eligibility for Refunds</h2>
        <p className="text-gray-700 leading-relaxed">
          Refunds will <strong>not</strong> be provided in the following cases:
        </p>
        <ul className="list-disc ml-8 text-gray-700 leading-relaxed">
          <li><strong>Change of Mind</strong>: Once you have accessed or downloaded any part of the digital content.</li>
          <li><strong>Incomplete Progress</strong>: If you fail to complete or choose not to finish the course.</li>
          <li><strong>Technical Issues</strong>: Refunds will not be issued for technical issues on your end, such as poor internet or incompatible devices.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. How to Request a Refund</h2>
        <p className="text-gray-700 leading-relaxed">
          If you meet the eligibility criteria for a refund, follow these steps:
        </p>
        <ul className="list-decimal ml-8 text-gray-700 leading-relaxed">
          <li>Submit a refund request by contacting our support team at <a href="mailto:saurabhbadaya24@gmail.com" className="text-blue-500">saurabhbadaya24@gmail.com</a> within <strong>[X days]</strong> of purchase.</li>
          <li>Include your order details, the issue, and any proof of duplicate payment if applicable.</li>
          <li>We will review your request within <strong>[4 business days]</strong>. If approved, a refund will be processed to your original method of payment.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Cancellation of Subscriptions</h2>
        <p className="text-gray-700 leading-relaxed">
          If the course is part of a subscription model:
        </p>
        <ul className="list-disc ml-8 text-gray-700 leading-relaxed">
          <li><strong>Subscription Cancellations</strong>: You may cancel at any time; however, no refunds will be issued for the current billing period.</li>
          <li><strong>Auto-Renewal</strong>: Subscriptions will automatically renew unless canceled 24 hours before the end of the billing cycle.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about this policy, please contact us:
          <br />
          <strong>Email</strong>: <a href="mailto:saurabhbadaya24@gmail.com" className="text-blue-500">saurabhbadaya24@gmail.com</a>
          <br />
          <strong>Phone</strong>: <a href="tel:+91 861-938-1856" className="text-blue-500">+91 861-938-1856</a>
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

export default RefundCancellationPolicy;