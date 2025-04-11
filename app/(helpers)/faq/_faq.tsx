import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MdAdd } from "react-icons/md";
export type IFAQ = {
  head: string;
  text: string;
};
export default function Faq({ head, text }: IFAQ) {
  return (
    <Disclosure as="div" className="text-sm md:text-base ">
      <DisclosureButton className="group flex w-full items-center justify-between border-1 border-black rounded-xl p-2 md:p-6">
        <span className="text-left font-medium text-black group-data-[hover]:text-black/80">
          {head}
        </span>
        <MdAdd className="size-5 md:size-8 fill-black group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
      </DisclosureButton>
      <DisclosurePanel className="p-2 md:p-6 mt-2 font-[275px] text-left text-gray-600">
        {text}
      </DisclosurePanel>
    </Disclosure>
  );
}

export const faqs: IFAQ[] = [
  {
    head: "What courses are available on the LMS platform?",
    text: "Our platform offers a wide range of courses covering various nursing topics, including pharmacology, patient care, medical-surgical nursing, and more. We regularly update our catalog with new content.",
  },
  {
    head: "How do I enroll in a course?",
    text: "Simply create an account, browse the course catalog, and click 'Enroll' on the course you'd like to take. You'll then be guided through the payment process (if applicable) and gain access to the course materials.",
  },
  {
    head: "Are the courses accredited?",
    text: "Many of our courses are accredited and offer continuing education units (CEUs). Check the course description for specific accreditation details.",
  },
  {
    head: "Can I access the courses on my mobile device?",
    text: "Yes, our platform is mobile-responsive, allowing you to access course materials on your smartphone or tablet.",
  },
  {
    head: "What technical requirements are needed to access the platform?",
    text: "You'll need a stable internet connection and a modern web browser (Chrome, Firefox, Safari, or Edge) to access our platform. Most devices and operating systems are compatible.",
  },
  {
    head: "How long do I have access to a course?",
    text: "Access duration varies by course. Some courses offer lifetime access, while others have a limited access period. Check the course description for specific details.",
  },
  {
    head: "Is there a community forum or discussion board?",
    text: "Yes, we have community forums and discussion boards where you can interact with instructors and fellow learners, ask questions, and share insights.",
  },
  {
    head: "How do I get a certificate of completion?",
    text: "Upon successful completion of a course, you'll receive a certificate of completion, which you can download and print.",
  },
  {
    head: "What payment methods are accepted?",
    text: "We accept major credit cards (Visa, MasterCard, American Express) and PayPal.",
  },
  {
    head: "Can I get a refund if I'm not satisfied with a course?",
    text: "We have a refund policy. Please refer to our terms and conditions for details on eligibility and the refund process.",
  },
  {
    head: "How can I contact technical support?",
    text: "You can contact our technical support team via email or through the support form on our website. We aim to respond to all inquiries within 24 hours.",
  },
  {
    head: "Are there any prerequisites for the courses?",
    text: "Some advanced courses may have prerequisites. Check the course description for any required background knowledge or qualifications.",
  },
  {
    head: "Can I download course materials?",
    text: "Some courses allow you to download materials, such as PDFs or lecture slides. Check the course details for download availability.",
  },
  {
    head: "How often is the content updated?",
    text: "We regularly update our content to reflect the latest industry standards and best practices in nursing.",
  },
  {
    head: "Are there practice quizzes and assessments?",
    text: "Yes, most courses include practice quizzes and assessments to help you reinforce your learning and test your knowledge.",
  },
  {
    head: "Can I track my progress?",
    text: "Our platform provides progress tracking tools, allowing you to monitor your course completion and performance.",
  },
  {
    head: "Do you offer group discounts for institutions?",
    text: "Yes, we offer group discounts for institutions and organizations. Please contact our sales team for more information.",
  },
  {
    head: "How do I reset my password?",
    text: "You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions sent to your email.",
  },
  {
    head: "Are there live webinars or virtual classes?",
    text: "Some courses include live webinars or virtual classes, providing interactive learning experiences. Check the course schedule for details.",
  },
  {
    head: "How do I provide feedback on a course?",
    text: "You can provide feedback on a course through the course review section or by contacting our support team.",
  },
];
