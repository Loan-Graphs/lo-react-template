'use client';

import React from 'react';

export interface OptionGridOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface OptionGridProps {
  options: OptionGridOption[];
  selected: string;
  onSelect: (id: string) => void;
  columns?: number;
}

export default function OptionGrid({ options, selected, onSelect, columns = 3 }: OptionGridProps) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {options.map((opt) => {
        const isSelected = opt.id === selected;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border p-3 transition-all cursor-pointer
              ${isSelected
                ? 'border-blue-500 bg-blue-50 text-blue-600'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
              }`}
            style={{ minHeight: '76px' }}
          >
            <div className="w-6 h-6 flex items-center justify-center">{opt.icon}</div>
            <span className={`text-[10px] font-medium text-center leading-tight ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
