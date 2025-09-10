"use client";

import { useState, useEffect } from "react";
import { Button } from "./button";
import { X, ExternalLink, Download } from "lucide-react";
import Image from "next/image";

interface ImagePreviewModalProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  downloadUrl?: string;
  externalUrl?: string;
}

export function ImagePreviewModal({ 
  src, 
  alt, 
  title, 
  description, 
  children, 
  downloadUrl, 
  externalUrl 
}: ImagePreviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) {
    return (
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal Content */}
      <div className="relative max-w-4xl w-full h-[90vh] m-4 bg-background rounded-lg overflow-hidden shadow-2xl">
        <div className="relative w-full h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur">
            <div className="flex-1">
              {title && (
                <h3 className="font-semibold text-lg">{title}</h3>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {downloadUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(downloadUrl, '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              )}
              {externalUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(externalUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Image Container */}
          <div className="flex-1 relative bg-muted/20 flex items-center justify-center p-4">
            <div className="relative max-w-full max-h-full">
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                quality={95}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
