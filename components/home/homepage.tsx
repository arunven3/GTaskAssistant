"use client";

import React from "react";
import { useLoading } from "@/contexts/LoadingContext";
import { Button, Card } from "flowbite-react";
import { Theme } from "@/components/theme/ThemeProvider";
import { useRouter } from "next/navigation";

export const Homepage = () => {
  const { showLoading } = useLoading();
  const router = useRouter();

  const signIn = () => {
    // showLoading();
    router.push("/login");
  };

  const features = [
    {
      title: "AI-Powered Task Management",
      description:
        "Leverage advanced AI to organize, prioritize, and complete your tasks efficiently.",
      icon: "🤖",
    },
    {
      title: "Google Calendar Integration",
      description:
        "Seamlessly sync your tasks with Google Calendar for better scheduling and reminders.",
      icon: "📅",
    },
    {
      title: "Intelligent Chat Assistant",
      description:
        "Chat with our AI assistant to get help with planning, research, and task execution.",
      icon: "💬",
    },
    {
      title: "Document Embedding & Search",
      description:
        "Upload documents and search through them using advanced RAG technology.",
      icon: "📄",
    },
    {
      title: "Secure & Private",
      description:
        "Your data is encrypted and stored securely. We prioritize your privacy.",
      icon: "🔒",
    },
    {
      title: "Cross-Platform Access",
      description:
        "Access your tasks from any device - desktop, mobile, or web.",
      icon: "🌐",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      content:
        "PTaskAssistant has revolutionized how I manage my projects. The AI suggestions are spot-on!",
    },
    {
      name: "Mike Chen",
      role: "Entrepreneur",
      content:
        "The calendar integration saves me hours every week. Highly recommended!",
    },
    {
      name: "Emily Davis",
      role: "Student",
      content:
        "Perfect for organizing my study schedule and assignments. The chat feature is incredibly helpful.",
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Sign Up & Connect",
      description:
        "Create your account and integrate with Google Calendar and other tools.",
      icon: "🔗",
    },
    {
      step: 2,
      title: "Add Your Tasks",
      description:
        "Input your tasks, deadlines, and priorities. Our AI will help organize them.",
      icon: "📝",
    },
    {
      step: 3,
      title: "Chat & Collaborate",
      description:
        "Use our intelligent chat assistant for planning, research, and task execution.",
      icon: "💬",
    },
    {
      step: 4,
      title: "Track & Optimize",
      description:
        "Monitor progress, get insights, and continuously improve your productivity.",
      icon: "📊",
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Up to 100 tasks",
        "Basic AI chat",
        "Google Calendar sync",
        "Mobile access",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$2",
      period: "per month",
      features: [
        "Unlimited tasks",
        "Advanced AI features",
        "Document embedding",
        "Priority support",
        "Team collaboration",
      ],
      buttonText: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "Dedicated support",
        "Advanced analytics",
        "SLA guarantees",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "How secure is my data?",
      answer:
        "We use end-to-end encryption and follow industry best practices to ensure your data remains private and secure.",
    },
    {
      question: "Can I integrate with other calendar apps?",
      answer:
        "Currently, we support Google Calendar integration. We're working on adding support for other calendar services.",
    },
    {
      question: "What AI models do you use?",
      answer:
        "We use state-of-the-art language models like Llama and Snowflake Arctic Embed for our AI features.",
    },
    {
      question: "Is there a mobile app?",
      answer:
        "Yes! Our web app is fully responsive and works great on mobile devices. Native apps are in development.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-20 dark:from-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mb-6 text-5xl leading-tight font-bold md:text-6xl">
            Welcome to{" "}
            <span className="text-blue-600 dark:text-blue-400">
              PTaskAssistant
            </span>
          </h1>
          <p className="mb-8 text-xl text-gray-600 md:text-2xl dark:text-gray-300">
            Your intelligent digital brain for staying organized, focused, and
            productive. Manage tasks, integrate calendars, and get AI-powered
            assistance all in one place.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              onClick={() => router.push("/register")}
              size="lg"
              className="bg-blue-600 px-8 py-3 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Get Started Free
            </Button>
            <Button
              onClick={signIn}
              size="lg"
              color="light"
              className="px-8 py-3"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 px-4 py-20 dark:bg-gray-800">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Powerful Features
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-gray-200 bg-white text-center transition-shadow hover:shadow-lg dark:border-gray-600 dark:bg-gray-700"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white px-4 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 text-6xl">{step.icon}</div>
                <div className="mb-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Step {step.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="bg-gray-50 px-4 py-20 dark:bg-gray-800">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
                10,000+
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-300">
                Active Users
              </div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
                1M+
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-300">
                Tasks Completed
              </div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
                99.9%
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-300">
                Uptime
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Pricing Section */}
      <section className="bg-white px-4 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Choose Your Plan
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`text-center transition-shadow hover:shadow-lg ${
                  plan.popular
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700"
                }`}
              >
                {plan.popular && (
                  <div className="mb-4">
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    /{plan.period}
                  </span>
                </div>
                <ul className="mb-6 text-left">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="mb-2 flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <span className="mr-2 text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() =>
                    plan.name === "Enterprise" ? null : router.push("/register")
                  }
                  size="lg"
                  className={`w-full ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      : ""
                  }`}
                  color={plan.popular ? "primary" : "light"}
                >
                  {plan.buttonText}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="bg-gray-50 px-4 py-20 dark:bg-gray-800">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white">
            What Our Users Say
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-600 dark:bg-gray-700"
              >
                <p className="mb-4 text-gray-600 italic dark:text-gray-300">
                  "{testimonial.content}"
                </p>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="bg-white px-4 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-6 dark:border-gray-700"
              >
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-100 to-indigo-100 px-4 py-20 dark:from-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-4xl justify-center justify-items-center text-center">
          <h2 className="mb-6 text-4xl font-bold">
            Ready to Boost Your Productivity?
          </h2>
          <p className="mb-8 text-xl">
            What Our Users Say Join thousands of users who have transformed
            their task management with PTaskAssistant.
          </p>
          <Button
            onClick={() => router.push("/register")}
            size="lg"
            color="light"
            className="bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 px-4 py-8 text-white dark:bg-gray-900">
        <div className="mx-auto max-w-6xl text-center">
          <p>&copy; 2024 PTaskAssistant. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
