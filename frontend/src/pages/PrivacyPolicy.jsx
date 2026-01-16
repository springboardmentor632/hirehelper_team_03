import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        "We collect information that you provide directly to us, including:",
        "• Personal identification information (name, email address, phone number)",
        "• Profile information (profile picture, display name)",
        "• Task-related information (task descriptions, locations, budgets)",
        "• Communication data (messages between users)",
        "• Account credentials (encrypted passwords)"
      ]
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "We use the information we collect to:",
        "• Provide, maintain, and improve our services",
        "• Process transactions and send related information",
        "• Send you technical notices and support messages",
        "• Respond to your comments and questions",
        "• Monitor and analyze trends and usage",
        "• Detect, prevent, and address technical issues"
      ]
    },
    {
      title: "3. Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:",
        "• With other users as necessary to facilitate task matching and communication",
        "• With service providers who assist us in operating our platform",
        "• When required by law or to protect our rights and safety",
        "• In connection with a business transfer (merger, acquisition, etc.)"
      ]
    },
    {
      title: "4. Data Security",
      content: [
        "We implement appropriate technical and organizational measures to protect your personal information:",
        "• Encryption of sensitive data in transit and at rest",
        "• Regular security assessments and updates",
        "• Access controls and authentication mechanisms",
        "• Secure data storage and backup procedures"
      ]
    },
    {
      title: "5. Your Rights",
      content: [
        "You have the right to:",
        "• Access your personal information",
        "• Correct inaccurate or incomplete data",
        "• Request deletion of your account and data",
        "• Opt-out of certain communications",
        "• Export your data in a portable format"
      ]
    },
    {
      title: "6. Cookies and Tracking",
      content: [
        "We use cookies and similar tracking technologies to:",
        "• Remember your preferences and settings",
        "• Analyze how you use our platform",
        "• Improve user experience",
        "You can control cookie preferences through your browser settings."
      ]
    },
    {
      title: "7. Third-Party Links",
      content: [
        "Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies."
      ]
    },
    {
      title: "8. Children's Privacy",
      content: [
        "Our services are not intended for users under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately."
      ]
    },
    {
      title: "9. Changes to This Policy",
      content: [
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last Updated' date. Your continued use of our services after changes become effective constitutes acceptance of the updated policy."
      ]
    },
    {
      title: "10. Contact Us",
      content: [
        "If you have questions about this Privacy Policy, please contact us through the Settings page or email us at support@hireahelper.com"
      ]
    }
  ];

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
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-text-muted mb-2">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-sm md:text-base text-text-muted">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>

        {/* Content */}
        <div className="bg-[var(--color-bg-card)] rounded-lg border border-[var(--color-border)] shadow-card p-4 md:p-6 lg:p-8">
          <div className="space-y-6 md:space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="border-b border-[var(--color-border)] last:border-b-0 pb-6 last:pb-0">
                <h2 className="text-lg md:text-xl font-semibold text-text-main mb-3 md:mb-4">
                  {section.title}
                </h2>
                <div className="space-y-2">
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={`text-sm md:text-base text-text-muted leading-relaxed ${
                        paragraph.startsWith('•') ? 'ml-4' : ''
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-[var(--color-bg-card)] rounded-lg border border-[var(--color-border)] shadow-card">
          <p className="text-sm md:text-base text-text-muted text-center">
            By using Hire-a-Helper, you agree to the terms outlined in this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
