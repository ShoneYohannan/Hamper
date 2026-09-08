import React from 'react';

export default function WhatsAppIcon({ 
  className = 'w-4 h-4', 
  variant = 'default',
  bubbleColor,
  phoneColor,
  fill,
  ...props 
}) {
  // Default: Authentic WhatsApp green bubble (#25D366) + crisp white telephone (#FFFFFF)
  let bg = '#25D366';
  let fg = '#FFFFFF';

  if (variant === 'white' || fill === 'white' || fill === '#ffffff' || fill === '#fff') {
    bg = '#FFFFFF';
    fg = '#25D366';
  }

  if (bubbleColor) bg = bubbleColor;
  if (phoneColor) fg = phoneColor;

  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      {...props}
    >
      {/* WhatsApp Vibrant Speech Bubble */}
      <path 
        fill={bg} 
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2z" 
      />
      {/* WhatsApp Telephone Handset */}
      <path 
        fill={fg} 
        d="M17.47 14.38c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.24-.24-.59-.49-.51-.68-.52l-.58-.01c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.12 3.24 5.15 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9-.07.58-.3 1.78-1.09 2.03-2.14.25-1.05.25-1.96.18-2.14-.08-.19-.28-.29-.58-.44z" 
      />
    </svg>
  );
}
