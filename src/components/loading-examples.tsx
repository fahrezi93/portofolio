"use client";

import React, { useState } from 'react';
import Loading from './loading';
import PageLoading from './page-loading';
import ButtonLoading from './button-loading';

const LoadingExamples: React.FC = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handlePageLoading = () => {
    setIsPageLoading(true);
    setTimeout(() => setIsPageLoading(false), 3000);
  };

  const handleButtonLoading = () => {
    setIsButtonLoading(true);
    setTimeout(() => setIsButtonLoading(false), 2000);
  };

  return (
    <PageLoading isLoading={isPageLoading} loadingText="Loading page content...">
      <div className="p-8 space-y-8">
        <h1 className="text-3xl font-bold">Loading Animation Examples</h1>
        
        {/* Basic Loading Component */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Loading Component</h2>
          <div className="border rounded-lg p-6 bg-card">
            <Loading size={80} text="Processing..." />
          </div>
        </div>

        {/* Button Loading Examples */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Button Loading States</h2>
          <div className="flex gap-4 flex-wrap">
            <ButtonLoading
              isLoading={isButtonLoading}
              onClick={handleButtonLoading}
              size="sm"
            >
              Small Button
            </ButtonLoading>
            
            <ButtonLoading
              isLoading={isButtonLoading}
              onClick={handleButtonLoading}
              size="md"
            >
              Medium Button
            </ButtonLoading>
            
            <ButtonLoading
              isLoading={isButtonLoading}
              onClick={handleButtonLoading}
              size="lg"
            >
              Large Button
            </ButtonLoading>
          </div>
        </div>

        {/* Page Loading Example */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Page Loading Overlay</h2>
          <ButtonLoading onClick={handlePageLoading}>
            Trigger Page Loading
          </ButtonLoading>
        </div>

        {/* Inline Loading Examples */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Inline Loading States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 bg-card">
              <h3 className="font-medium mb-2">Small Loader</h3>
              <Loading size={40} text="" />
            </div>
            
            <div className="border rounded-lg p-4 bg-card">
              <h3 className="font-medium mb-2">Medium Loader</h3>
              <Loading size={60} text="" />
            </div>
            
            <div className="border rounded-lg p-4 bg-card">
              <h3 className="font-medium mb-2">Large Loader</h3>
              <Loading size={80} text="" />
            </div>
          </div>
        </div>
      </div>
    </PageLoading>
  );
};

export default LoadingExamples;
