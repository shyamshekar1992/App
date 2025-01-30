"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";

const ContactUs = () => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      trip: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      trip: Yup.string().required("Please select a trip"),
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone must be numeric")
        .required("Phone is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values) => {
      if (!captchaVerified) {
        alert("Please verify CAPTCHA");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const result = await response.json();
        if (response.ok) {
          setSubmissionMessage("Your message has been sent successfully!");
          formik.resetForm();
        } else {
          setSubmissionMessage(result.error || "Failed to submit the form.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmissionMessage("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex flex-col md:flex-row bg-blue-100 p-8">
      {/* Form Section */}
      <div className="bg-blue-500 text-white rounded-lg p-6 flex-1 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Leave your comment:</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Trip Dropdown */}
          <div>
            <label htmlFor="trip" className="block text-sm font-semibold">
              Select a Trip
            </label>
            <select
              id="trip"
              name="trip"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={formik.values.trip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">-- Select a Trip --</option>
              <option value="Trip 1">Trip 1</option>
              <option value="Trip 2">Trip 2</option>
              <option value="Trip 3">Trip 3</option>
            </select>
            {formik.touched.trip && formik.errors.trip && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.trip}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Your Phone"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.message && formik.errors.message && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
            )}
          </div>

          {/* CAPTCHA */}
          <div>
            <ReCAPTCHA
              sitekey="6LfprMYqAAAAAAukcV4viD25RFDze3UAm1XyvJvJ"
              onChange={(value) => setCaptchaVerified(!!value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg font-bold transition duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {submissionMessage && (
          <p className="text-white mt-4 text-center">{submissionMessage}</p>
        )}
      </div>

      {/* Contact Details Section */}
      <div className="bg-blue-900 text-white p-6 flex-1 shadow-lg">
        <h2 className="text-xl font-bold">Contact Us</h2>
        <p>Email Address: <a href="mailto:travelagent@pm2amtrips.com" className="text-blue-300">travelagent@pm2amtrips.com</a></p>
        <p>Hotline: DE: +49 202 519 84 969</p>
        <p>Skype: ID pm2amstudenttrips</p>
        <p>Facebook Page: <a href="https://www.facebook.com/pm2am.trips" className="text-blue-300">facebook.com/pm2am.trips</a></p>
      </div>
    </div>
  );
};

export default ContactUs;
