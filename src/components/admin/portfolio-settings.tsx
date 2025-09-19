"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  User, 
  Mail, 
  Globe, 
  Github, 
  Linkedin,
  Twitter,
  Instagram,
  Palette,
  Settings,
  Shield,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BaseField {
  key: string;
  label: string;
  type: string;
}

interface TextFieldType extends BaseField {
  type: 'text' | 'email' | 'url' | 'textarea';
  placeholder: string;
  icon?: React.ComponentType<any>;
}

interface ToggleFieldType extends BaseField {
  type: 'toggle';
  description: string;
}

interface ColorFieldType extends BaseField {
  type: 'color';
  description: string;
}

type FieldType = TextFieldType | ToggleFieldType | ColorFieldType;

export function PortfolioSettings() {
  const [settings, setSettings] = useState({
    // Personal Info
    name: 'Fahrezi',
    email: 'fahrezi@example.com',
    bio: 'Full-stack Developer & UI/UX Designer passionate about creating amazing digital experiences.',
    location: 'Indonesia',
    
    // Social Links
    website: 'https://fahrezi.dev',
    github: 'https://github.com/fahrezi',
    linkedin: 'https://linkedin.com/in/fahrezi',
    twitter: 'https://twitter.com/fahrezi',
    instagram: 'https://instagram.com/fahrezi',
    
    // Portfolio Settings
    showGithubStats: true,
    showComments: true,
    allowCommentUploads: true,
    moderateComments: false,
    
    // Theme Settings
    primaryColor: '#3b82f6',
    darkMode: true,
    
    // Notifications
    emailNotifications: true,
    commentNotifications: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('Settings saved successfully!');
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const sections: Array<{
    title: string;
    icon: React.ComponentType<any>;
    fields: FieldType[];
  }> = [
    {
      title: 'Personal Information',
      icon: User,
      fields: [
        { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' } as TextFieldType,
        { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' } as TextFieldType,
        { key: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell visitors about yourself...' } as TextFieldType,
        { key: 'location', label: 'Location', type: 'text', placeholder: 'City, Country' } as TextFieldType,
      ]
    },
    {
      title: 'Social Links',
      icon: Globe,
      fields: [
        { key: 'website', label: 'Website', type: 'url', placeholder: 'https://yourwebsite.com', icon: Globe } as TextFieldType,
        { key: 'github', label: 'GitHub', type: 'url', placeholder: 'https://github.com/username', icon: Github } as TextFieldType,
        { key: 'linkedin', label: 'LinkedIn', type: 'url', placeholder: 'https://linkedin.com/in/username', icon: Linkedin } as TextFieldType,
        { key: 'twitter', label: 'Twitter', type: 'url', placeholder: 'https://twitter.com/username', icon: Twitter } as TextFieldType,
        { key: 'instagram', label: 'Instagram', type: 'url', placeholder: 'https://instagram.com/username', icon: Instagram } as TextFieldType,
      ]
    },
    {
      title: 'Portfolio Features',
      icon: Settings,
      fields: [
        { key: 'showGithubStats', label: 'Show GitHub Statistics', type: 'toggle', description: 'Display GitHub activity and repository stats' } as ToggleFieldType,
        { key: 'showComments', label: 'Enable Comments Section', type: 'toggle', description: 'Allow visitors to leave comments' } as ToggleFieldType,
        { key: 'allowCommentUploads', label: 'Allow Profile Photo Uploads', type: 'toggle', description: 'Let users upload profile photos with comments' } as ToggleFieldType,
        { key: 'moderateComments', label: 'Moderate Comments', type: 'toggle', description: 'Require approval before comments are published' } as ToggleFieldType,
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      fields: [
        { key: 'primaryColor', label: 'Primary Color', type: 'color', description: 'Main accent color for your portfolio' } as ColorFieldType,
        { key: 'darkMode', label: 'Dark Mode Default', type: 'toggle', description: 'Set dark mode as the default theme' } as ToggleFieldType,
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      fields: [
        { key: 'emailNotifications', label: 'Email Notifications', type: 'toggle', description: 'Receive email updates about your portfolio' } as ToggleFieldType,
        { key: 'commentNotifications', label: 'Comment Notifications', type: 'toggle', description: 'Get notified when someone leaves a comment' } as ToggleFieldType,
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Portfolio Settings</h2>
        <p className="text-muted-foreground">Customize your portfolio appearance and functionality</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {sections.map((section, sectionIndex) => {
          const IconComponent = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-sm border border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <IconComponent className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.fields.map((field) => {
                  return (
                    <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {field.label}
                      </label>
                      
                      {(field.type === 'text' || field.type === 'email' || field.type === 'url') ? (
                        <div className="relative">
                          {(field as TextFieldType).icon && React.createElement((field as TextFieldType).icon!, {
                            className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
                          })}
                          <input
                            type={field.type}
                            value={settings[field.key as keyof typeof settings] as string}
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                            placeholder={(field as TextFieldType).placeholder}
                            className={`w-full ${(field as TextFieldType).icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                          />
                        </div>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          value={settings[field.key as keyof typeof settings] as string}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          placeholder={(field as TextFieldType).placeholder}
                          rows={3}
                          className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
                        />
                      ) : field.type === 'color' ? (
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={settings[field.key as keyof typeof settings] as string}
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                            className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                          />
                          <input
                            type="text"
                            value={settings[field.key as keyof typeof settings] as string}
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                            className="flex-1 px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                          />
                        </div>
                      ) : field.type === 'toggle' ? (
                        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{field.label}</p>
                            <p className="text-sm text-muted-foreground mt-1">{(field as ToggleFieldType | ColorFieldType).description}</p>
                          </div>
                          <button
                            onClick={() => handleInputChange(field.key, !settings[field.key as keyof typeof settings])}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings[field.key as keyof typeof settings] 
                                ? 'bg-primary' 
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings[field.key as keyof typeof settings] 
                                  ? 'translate-x-6' 
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ) : null}
                      
                      {field.type === 'color' && (
                        <p className="text-xs text-muted-foreground mt-1">{(field as ColorFieldType).description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-8"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
