"use client";

import { useState } from 'react';

const faqs = {
  General: [
    { question: "How do I update my billing information?", answer: "You can update your billing info in the profile section." },
    { question: "How do I reset my password?", answer: "You can reset your password by clicking 'Forgot Password' on the login page." },
  ],
  Support: [
    { question: "How can I contact customer support?", answer: "You can contact customer support via email or live chat." },
    { question: "What is the response time for support?", answer: "Our response time is within 24 hours." },
  ],
  Others: [
    { question: "How do I find my purchase history?", answer: "You can find your purchase history in the orders section of your account." },
    { question: "How do I update my profile information?", answer: "To update your profile, navigate to the settings page." },
  ],
};

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState('General');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index); // Toggle the clicked question
  };

  return (
    <section className="py-24 bg-gray-900 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h6 className="text-lg text-pink-500 font-medium mb-2">FAQs</h6>
          <h2 className="text-5xl font-bold leading-[3.25rem] text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">Frequently Asked Questions</h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          {['General', 'Support', 'Others'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 text-lg font-medium rounded-lg mx-2 ${activeTab === tab ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-900'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Accordion Group */}
        <div className="accordion-group" data-accordion="default-accordion">
          {faqs[activeTab].map((faq, index) => (
            <div
              key={index}
              className={`accordion py-8 px-6 border-b border-solid border-gray-200 transition-all duration-500 rounded-2xl ${
                openQuestion === index ? 'bg-white text-blue-900' : 'bg-transparent hover:bg-indigo-50'
              }`}
            >
              <button
                className="accordion-toggle group inline-flex items-center justify-between leading-8 text-purple-700 w-full transition duration-500 text-left"
                onClick={() => toggleQuestion(index)}
              >
                <h5>{faq.question}</h5>
                <svg
                  className={`transition transform duration-500 ${openQuestion === index ? 'rotate-180' : 'rotate-0'}`}
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <div
                className={`accordion-content w-full px-0 overflow-hidden transition-max-height duration-500 ease-in-out ${
                  openQuestion === index ? 'max-h-[250px]' : 'max-h-0'
                }`}
              >
                <p className="text-base text-gray-900 leading-6 mt-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
