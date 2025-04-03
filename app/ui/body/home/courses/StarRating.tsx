"use client";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange, size = 30 }) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  
  console.log("Component rendering with value:", value);
  console.log("Current hover value:", hoverValue);

  const getQuarterValue = (e: React.MouseEvent, starIndex: number) => {
    const { width, left } = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const percentage = offsetX / width;
    // Round to nearest quarter
    const quarterValue = Math.ceil(percentage * 4) / 4;
    const newValue = starIndex - 1 + quarterValue;
    console.log(`Star ${starIndex}, percentage: ${percentage}, quarterValue: ${quarterValue}, newValue: ${newValue}`);
    return newValue;
  };

  return (
    <div
      style={{ display: "flex", gap: "5px", cursor: "pointer" }}
      aria-label={`Rating: ${value} out of 5 stars`}
      role="radiogroup"
    >
      {[1, 2, 3, 4, 5].map((starIndex) => {
        // Use hover value if available, otherwise use the prop value
        const currentValue = hoverValue !== null ? hoverValue : value;
        
        // Calculate fill percentage for this star
        const fillLevel = Math.max(0, Math.min(1, currentValue - (starIndex - 1)));
        console.log(`Star ${starIndex}, fillLevel: ${fillLevel}`);
        
        // Create a unique ID for this star's gradient
        const gradientId = `star-${starIndex}-${Math.random().toString(36).substr(2, 9)}`;
        
        return (
          <svg
            key={starIndex}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            onMouseMove={(e) => {
              if (onChange){
                const newHoverValue = getQuarterValue(e, starIndex);
                setHoverValue(newHoverValue);
              }
            }}
            onMouseLeave={() => {
              if (onChange){
                setHoverValue(null);
                console.log("Mouse left, resetting hover value");
              }                 
            }}
            onClick={(e) => {
              const newValue = getQuarterValue(e, starIndex);
              console.log(`Clicked on star ${starIndex}, setting value to ${newValue}`);
              if (onChange) {
                onChange(newValue);
              }
            }}
            aria-label={`Rate ${starIndex} stars`}
            role="radio"
            aria-checked={Math.round(value) === starIndex}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                onChange?.(starIndex);
              }
            }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset={`${fillLevel * 100}%`} stopColor="gold" />
                <stop offset={`${fillLevel * 100}%`} stopColor="lightgray" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l2.8 6.6L22 9.2l-5 4.9 1.2 7-6.2-3.5-6.2 3.5 1.2-7-5-4.9 7.2-1L12 2z"
              fill={`url(#${gradientId})`}
              stroke="gold"
              strokeWidth="1"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;