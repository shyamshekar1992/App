"use client";

import React from "react";

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          Disclaimer & Liability
        </h1>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
            Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            pm2am GmbH & Co. KG assumes no liability or guarantee for the
            topicality, correctness, and completeness of the information
            provided. Furthermore, pm2am GmbH & Co. KG does not accept any
            liability for losses caused by the use or distribution of this
            information.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            pm2am GmbH & Co. KG reserves the right to amend or change the
            information at any time. All rights reserved: texts, images,
            graphics, and videos are protected by copyright and other
            intellectual property laws. The content of these websites may not be
            copied, distributed, modified, or reposted for commercial purposes
            without written agreement.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
            Links
          </h2>
          <p className="text-gray-700 leading-relaxed">
            pm2am GmbH & Co. KG assumes no liability for websites referred to by
            hyperlinks. We dissociate ourselves from all contents of these
            linked sites. pm2am GmbH & Co. KG has no influence and does not take
            over these contents.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            By judgment of 12 May 1998, the regional court of Hamburg decided
            that linking to external websites may require responsibility for
            their content. To prevent such responsibility, we explicitly
            distance ourselves from the contents of linked pages.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Responsibility lies solely with the operators of these sites.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
            No Written Warning Before Prior Contact
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Should you believe that the content or design of this site violates
            third-party rights or legal provisions, please contact us directly
            before taking legal action.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            We will immediately modify or remove any validly disputed content
            without the need for legal representation. We reject any costs
            incurred before prior contact and will file a counterclaim for
            violation of these provisions.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
            Contact Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any concerns, please contact us at:
          </p>
          <p className="text-gray-800 font-medium mt-2">
            ✉️ Email:{" "}
            <a
              href="mailto:travelagent@pm2amtrips.com"
              className="text-blue-600 hover:underline"
            >
              travelagent@pm2amtrips.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default DisclaimerPage;
