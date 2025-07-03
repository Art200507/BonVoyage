// Function to generate SVG placeholder for hotels
export const generateHotelPlaceholder = () => {
    return `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hotelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#e2e8f0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#cbd5e1;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#hotelGrad)"/>
      <path d="M200,100 L300,180 L100,180 Z" fill="#94a3b8"/>
      <rect x="140" y="140" width="120" height="120" fill="#94a3b8"/>
      <rect x="170" y="180" width="20" height="30" fill="#e2e8f0"/>
      <rect x="210" y="180" width="20" height="30" fill="#e2e8f0"/>
      <text x="50%" y="85%" font-family="Arial" font-size="16" fill="#475569" text-anchor="middle">
        Hotel Preview
      </text>
    </svg>
  `;
};

// Function to generate SVG placeholder for places
export const generatePlacePlaceholder = () => {
    return `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="placeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#e2e8f0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#cbd5e1;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#placeGrad)"/>
      <circle cx="200" cy="120" r="40" fill="#94a3b8"/>
      <path d="M200,80 L220,140 L180,140 Z" fill="#64748b"/>
      <path d="M160,180 C160,140 240,140 240,180" stroke="#94a3b8" stroke-width="4" fill="none"/>
      <text x="50%" y="85%" font-family="Arial" font-size="16" fill="#475569" text-anchor="middle">
        Place Preview
      </text>
    </svg>
  `;
};

export const generatePlaceholderImage = (text = '✈️') => {
    // Create a base64 encoded SVG with a gradient background
    const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f97316;stop-opacity:0.1"/>
          <stop offset="100%" style="stop-color:#f97316;stop-opacity:0.2"/>
        </linearGradient>
        <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="#f97316" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <rect width="100%" height="100%" fill="url(#pattern)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="48" fill="#f97316">${text}</text>
    </svg>
  `;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const generateAvatarPlaceholder = () => {
    // Create a base64 encoded SVG for avatar placeholder
    const svg = `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f97316" opacity="0.1"/>
      <circle cx="20" cy="15" r="7" fill="#f97316" opacity="0.8"/>
      <path d="M8 35 C8 25 32 25 32 35" fill="#f97316" opacity="0.8"/>
    </svg>
  `;

    return btoa(svg);
}; 