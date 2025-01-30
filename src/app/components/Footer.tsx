"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Footer = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert("Thank you for subscribing!");
          formik.resetForm();
        } else {
          alert("Failed to subscribe. Please try again.");
        }
      } catch (error) {
        console.error("Error subscribing:", error);
        alert("An error occurred. Please try again.");
      }
    },
  });

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center px-6 space-y-8 md:space-y-0">
        {/* Contact Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-cyan-400">Contact</h2>
          <p className="flex items-center space-x-2 text-gray-300">
            <span className="text-cyan-400">✉️</span>
            <span>bavariatravels@shri.com</span>
          </p>
          <p>
            <a href="#" className="text-cyan-400 hover:underline">
              Contact Us
            </a>
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-cyan-400 text-xl hover:text-cyan-300 transition duration-300"
            >
              &#xf09a;
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-cyan-400 text-xl hover:text-cyan-300 transition duration-300"
            >
              &#xf16d;
            </a>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">Newsletter</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-300"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Your First Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-300"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Your Last Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.lastName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-cyan-400 text-gray-900 py-2 px-4 rounded-lg font-bold hover:bg-cyan-500 transition duration-300"
            >
              Get Newsletter
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
