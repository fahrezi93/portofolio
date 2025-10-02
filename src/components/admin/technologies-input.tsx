"use client";

import { useState, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TechnologiesInputProps {
  value: string[];
  onChange: (technologies: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function TechnologiesInput({
  value = [],
  onChange,
  placeholder = "Add technology...",
  className = ""
}: TechnologiesInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Common technologies for suggestions
  const commonTechnologies = [
    'React', 'TypeScript', 'JavaScript', 'Next.js', 'Tailwind CSS',
    'Node.js', 'Express.js', 'Python', 'Flask', 'Django',
    'HTML', 'CSS', 'Sass', 'Vue.js', 'Angular',
    'Firebase', 'Supabase', 'PostgreSQL', 'MongoDB', 'MySQL',
    'Git', 'Docker', 'AWS', 'Vercel', 'Netlify',
    'Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Sketch',
    'After Effects', 'Premiere Pro', 'Cinema 4D', 'Blender'
  ];

  // Filter suggestions based on input and exclude already added
  const suggestions = commonTechnologies.filter(tech => 
    tech.toLowerCase().includes(inputValue.toLowerCase()) &&
    !value.includes(tech) &&
    inputValue.length > 0
  ).slice(0, 6);

  const addTechnology = (tech: string) => {
    const trimmedTech = tech.trim();
    if (trimmedTech && !value.includes(trimmedTech)) {
      onChange([...value, trimmedTech]);
      setInputValue('');
    }
  };

  const removeTechnology = (techToRemove: string) => {
    onChange(value.filter(tech => tech !== techToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTechnology(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      // Remove last technology if input is empty and backspace is pressed
      removeTechnology(value[value.length - 1]);
    }
  };

  const handleSuggestionClick = (tech: string) => {
    addTechnology(tech);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Technologies Tags */}
      <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-3 bg-muted border border-border rounded-lg">
        <AnimatePresence>
          {value.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium"
            >
              <span>{tech}</span>
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input Field */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
          placeholder={value.length === 0 ? placeholder : "Add more..."}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
        />

        {/* Add Button */}
        {inputValue.trim() && (
          <Button
            type="button"
            size="sm"
            onClick={() => addTechnology(inputValue)}
            className="h-6 px-2 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        )}
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {isInputFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-card border border-border rounded-lg p-2 shadow-lg"
          >
            <div className="text-xs text-muted-foreground mb-2 px-2">
              Suggestions:
            </div>
            <div className="flex flex-wrap gap-1">
              {suggestions.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleSuggestionClick(tech)}
                  className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  {tech}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper Text */}
      <div className="text-xs text-muted-foreground">
        💡 Type and press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> or <kbd className="px-1 py-0.5 bg-muted rounded text-xs">,</kbd> to add. Click suggestions or type custom technologies.
      </div>

      {/* Quick Add Popular Technologies */}
      {value.length === 0 && !isInputFocused && (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Quick add popular technologies:</div>
          <div className="flex flex-wrap gap-1">
            {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Python'].map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => addTechnology(tech)}
                className="px-2 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors"
              >
                + {tech}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
