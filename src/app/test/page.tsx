'use client';

import React, { useEffect, useState } from 'react';

const DisplayEnv: React.FC = () => {
  const [envVariables, setEnvVariables] = useState({
    appName: '',
    apiUrl: '',
  });

  useEffect(() => {
    // Load environment variables into state
    setEnvVariables({
      appName: process.env.NEXT_PUBLIC_BASE_GITUSER || 'DefaultApp',
      apiUrl: process.env.NEXT_PUBLIC_BASE_GITPASS || 'https://default.example.com',
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Environment Variables</h1>
      <p>
        <strong>App Name:</strong> {envVariables.appName}
      </p>
      <p>
        <strong>API URL:</strong> {envVariables.apiUrl}
      </p>
    </div>
  );
};

export default DisplayEnv;
