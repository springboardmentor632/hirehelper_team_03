import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function TermsAndConditions() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing and using Hire-a-Helper, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform."
      ]
    },
    {
      title: "2. Description of Service",
      content: [
        "Hire-a-Helper is a platform that connects individuals seeking task assistance ('Task Owners') with individuals providing services ('Helpers'). We facilitate connections but are not a party to any agreements between users."
      ]
    },
    {
      title: "3. User Accounts",
      content: [
        "To use our platform, you must:",
        "• Be at least 18 years old",
        "• Provide accurate and complete information",
        "• Maintain the security of your account credentials",
        "• Notify us immediately of any unauthorized access",
        "• Be responsible for all activities under your account"
      ]
    },
    {
      title: "4. User Responsibilities",
      content: [
        "Users agree to:",
        "• Use the platform only for lawful purposes",
        "• Provide accurate task descriptions and requirements",
        "• Communicate respectfully with other users",
        "• Complete tasks as agreed upon",
        "• Pay for services as agreed",
        "• Not engage in fraudulent, abusive, or harmful activities"
      ]
    },
    {
      title: "5. Task Posting and Applications",
      content: [
        "Task Owners are responsible for:",
        "• Providing clear and accurate task descriptions",
        "• Setting reasonable expectations and budgets",
        "• Reviewing helper applications fairly",
        "• Communicating clearly about task requirements",
        "",
        "Helpers are responsible for:",
        "• Applying only to tasks they can complete",
        "• Providing accurate information about their skills",
        "• Completing tasks to the agreed standard",
        "• Communicating promptly with task owners"
      ]
    },
    {
      title: "6. Payments",
      content: [
        "Payment terms are agreed upon directly between Task Owners and Helpers. Hire-a-Helper is not responsible for payment disputes. We recommend:",
        "• Agreeing on payment terms before work begins",
        "• Using secure payment methods",
        "• Documenting payment agreements",
        "• Resolving disputes amicably"
      ]
    },
    {
      title: "7. Prohibited Activities",
      content: [
        "Users may not:",
        "• Post illegal, dangerous, or inappropriate tasks",
        "• Misrepresent their identity or qualifications",
        "• Harass, abuse, or discriminate against other users",
        "• Spam or send unsolicited communications",
        "• Violate any applicable laws or regulations",
        "• Interfere with the platform's operation"
      ]
    },
    {
      title: "8. Intellectual Property",
      content: [
        "All content on the platform, including text, graphics, logos, and software, is the property of Hire-a-Helper or its licensors. Users retain ownership of content they post but grant us a license to use it for platform operations."
      ]
    },
    {
      title: "9. Limitation of Liability",
      content: [
        "Hire-a-Helper provides the platform 'as is' and is not liable for:",
        "• The quality, safety, or legality of tasks or services",
        "• The accuracy of user-provided information",
        "• Disputes between users",
        "• Any damages arising from platform use",
        "Users interact at their own risk and are responsible for their own safety."
      ]
    },
    {
      title: "10. Indemnification",
      content: [
        "Users agree to indemnify and hold harmless Hire-a-Helper from any claims, damages, or expenses arising from their use of the platform or violation of these terms."
      ]
    },
    {
      title: "11. Account Termination",
      content: [
        "We reserve the right to suspend or terminate accounts that violate these terms. Users may also delete their accounts at any time through the Settings page."
      ]
    },
    {
      title: "12. Changes to Terms",
      content: [
        "We may modify these terms at any time. Continued use of the platform after changes constitutes acceptance. We will notify users of significant changes."
      ]
    },
    {
      title: "13. Dispute Resolution",
      content: [
        "Users are encouraged to resolve disputes directly. If unable to resolve, users may contact our support team. We are not obligated to mediate disputes but may assist when appropriate."
      ]
    },
    {
      title: "14. Governing Law",
      content: [
        "These terms are governed by applicable local laws. Any legal disputes will be resolved in the appropriate jurisdiction."
      ]
    },
    {
      title: "15. Contact Information",
      content: [
        "For questions about these Terms and Conditions, please contact us through the Settings page or email support@hireahelper.com"
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
            Terms & Conditions
          </h1>
          <p className="text-sm md:text-base text-text-muted mb-2">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-sm md:text-base text-text-muted">
            Please read these terms carefully before using Hire-a-Helper.
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
                    paragraph && (
                      <p
                        key={pIndex}
                        className={`text-sm md:text-base text-text-muted leading-relaxed ${
                          paragraph.startsWith('•') ? 'ml-4' : ''
                        }`}
                      >
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-[var(--color-bg-card)] rounded-lg border border-[var(--color-border)] shadow-card">
          <p className="text-sm md:text-base text-text-muted text-center">
            By using Hire-a-Helper, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
