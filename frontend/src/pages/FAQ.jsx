import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronUp, FiArrowLeft } from "react-icons/fi";

export default function FAQ() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Hire-a-Helper?",
      answer: "Hire-a-Helper is a platform that connects people who need help with tasks to those who can provide assistance. Whether you need help with moving, cleaning, handyman work, or other services, you can find qualified helpers on our platform."
    },
    {
      question: "How do I create a task?",
      answer: "To create a task, navigate to the 'Add Task' page from the sidebar or navigation menu. Fill in the task details including title, description, category, location, and budget. Once submitted, your task will be visible to helpers who can apply to assist you."
    },
    {
      question: "How do I apply for a task?",
      answer: "Browse available tasks on the 'Requests' page. When you find a task you're interested in, click on it to view details and then click the 'Apply' button. The task owner will review your application and contact you if selected."
    },
    {
      question: "How are payments handled?",
      answer: "Payment terms are agreed upon between the task owner and helper. We recommend discussing payment details before starting any work. Always ensure you have a clear agreement about payment amount, method, and timing."
    },
    {
      question: "What if I have a problem with a task or helper?",
      answer: "If you encounter any issues, please contact our support team through the Settings page. We take user safety and satisfaction seriously and will work to resolve any disputes or concerns."
    },
    {
      question: "Can I cancel a task?",
      answer: "Yes, task owners can cancel tasks at any time. If you've already accepted a helper, please communicate with them about the cancellation. Helpers can also withdraw from tasks they've applied to."
    },
    {
      question: "How do I update my profile?",
      answer: "Go to the Settings page and navigate to the Profile section. You can update your display name, phone number, and profile picture. Changes are saved immediately."
    },
    {
      question: "How do notifications work?",
      answer: "You'll receive notifications when someone applies to your task, when your application is accepted, or when you receive messages. You can enable or disable notifications in the Settings page under App Settings."
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes, we take your privacy seriously. Your personal information is protected according to our Privacy Policy. We never share your data with third parties without your consent. For more details, please review our Privacy Policy."
    },
    {
      question: "How do I delete my account?",
      answer: "To delete your account, please contact our support team through the Settings page. We'll process your request and ensure all your data is removed according to our Privacy Policy."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg-app)]">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 lg:py-10">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] mb-4 transition-colors"
          >
            <FiArrowLeft />
            <span className="text-sm md:text-base">Back</span>
          </button>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-main mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-sm md:text-base text-text-muted">
            Find answers to common questions about Hire-a-Helper
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[var(--color-bg-card)] rounded-lg border border-[var(--color-border)] shadow-card overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 md:px-6 py-4 md:py-5 flex items-center justify-between text-left hover:bg-[var(--color-bg-input)] transition-colors"
              >
                <span className="text-sm md:text-base font-semibold text-text-main pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <FiChevronUp className="flex-shrink-0 text-[var(--color-primary)]" size={20} />
                ) : (
                  <FiChevronDown className="flex-shrink-0 text-[var(--color-primary)]" size={20} />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 md:px-6 pb-4 md:pb-5">
                  <p className="text-sm md:text-base text-text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-8 md:mt-10 p-4 md:p-6 bg-[var(--color-bg-card)] rounded-lg border border-[var(--color-border)] shadow-card">
          <h2 className="text-lg md:text-xl font-semibold text-text-main mb-2">
            Still have questions?
          </h2>
          <p className="text-sm md:text-base text-text-muted mb-4">
            If you couldn't find the answer you're looking for, please contact our support team.
          </p>
          <button
            onClick={() => navigate("/settings")}
            className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded text-sm md:text-base transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
