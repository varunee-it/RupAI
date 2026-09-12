import React from 'react';

export const PremiumBackground: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      {...props}
    >
      <defs>
        {/* Blur Filters */}
        <filter id="glow-heavy" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="60" />
        </filter>
        <filter id="glow-medium" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="15" />
        </filter>
        <filter id="glass-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" />
        </filter>

        {/* Gradients */}
        <radialGradient id="bg-glow-tr" cx="85%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#D6E6FF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#F7FBFF" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="bg-glow-br" cx="90%" cy="85%" r="50%">
          <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#0B2C72" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#F7FBFF" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="bg-glow-tl" cx="15%" cy="15%" r="40%">
          <stop offset="0%" stopColor="#E8F2FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F7FBFF" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="lavender-glow" cx="60%" cy="85%" r="40%">
          <stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F7FBFF" stopOpacity="0" />
        </radialGradient>

        {/* Curve Divider Gradient */}
        <linearGradient id="wave-divider-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.15" />
          <stop offset="40%" stopColor="#2563EB" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0B2C72" stopOpacity="0.75" />
        </linearGradient>

        {/* Glass Card Gradients */}
        <linearGradient id="glass-card-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.08" />
        </linearGradient>

        <linearGradient id="glass-card-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#D6E6FF" stopOpacity="0.05" />
        </linearGradient>

        <linearGradient id="glass-border" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
        </linearGradient>

        {/* Chart Gradient */}
        <linearGradient id="chart-area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
        </linearGradient>

        {/* 3D Rupee Gradients */}
        <linearGradient id="rupee-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>

        <linearGradient id="pedestal-top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#E8F2FF" stopOpacity="0.75" />
        </linearGradient>

        <linearGradient id="cuboid-face" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0B2C72" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* BASE BACKGROUND */}
      <rect width="1600" height="900" fill="#F7FBFF" />

      {/* RADIAL LIGHT BLOBS */}
      <rect width="1600" height="900" fill="url(#bg-glow-tr)" />
      <rect width="1600" height="900" fill="url(#bg-glow-br)" />
      <rect width="1600" height="900" fill="url(#bg-glow-tl)" />
      <rect width="1600" height="900" fill="url(#lavender-glow)" />

      {/* ELEGANT CURVED WAVE SEPARATOR (Separates Left 65% from Right 35%) */}
      <path
        d="M 980 -50 C 1150 200, 920 450, 1120 700 C 1220 825, 1380 880, 1650 920 L 1650 -50 Z"
        fill="url(#wave-divider-grad)"
      />

      {/* DECORATIVE FLOWING WAVES (Lower Right) */}
      <path
        d="M 920 900 C 1100 780, 1300 820, 1600 710 L 1600 900 Z"
        fill="#2563EB"
        fillOpacity="0.18"
      />
      <path
        d="M 1020 900 C 1220 750, 1400 780, 1600 660 L 1600 900 Z"
        fill="#FFFFFF"
        fillOpacity="0.15"
      />
      <path
        d="M 1150 900 C 1300 810, 1450 830, 1600 780 L 1600 900 Z"
        fill="#C7D2FE"
        fillOpacity="0.2"
      />

      {/* LIGHTING AMBIENT GLOWS FOR ARTWORK */}
      <circle cx="1320" cy="300" r="180" fill="#38BDF8" fillOpacity="0.25" filter="url(#glow-heavy)" />
      <circle cx="1280" cy="650" r="160" fill="#2563EB" fillOpacity="0.3" filter="url(#glow-heavy)" />

      {/* GLASS PANEL 3 (Back-most rotated panel) */}
      <g transform="translate(1220, 160) rotate(12)">
        <rect
          width="260"
          height="420"
          rx="36"
          fill="url(#glass-card-grad-2)"
          stroke="url(#glass-border)"
          strokeWidth="1.5"
        />
      </g>

      {/* GLASS PANEL 2 (Middle rotated panel) */}
      <g transform="translate(1160, 120) rotate(-6)">
        <rect
          width="250"
          height="400"
          rx="36"
          fill="url(#glass-card-grad-1)"
          stroke="url(#glass-border)"
          strokeWidth="1.5"
        />
      </g>

      {/* MAIN GLASS PANEL 1 (Front Card Content) */}
      <g transform="translate(1120, 100)">
        {/* Card Body */}
        <rect
          width="320"
          height="440"
          rx="36"
          fill="url(#glass-card-grad-1)"
          stroke="url(#glass-border)"
          strokeWidth="2"
          shadow-lg="true"
        />

        {/* Heading Typography inside Card */}
        <text x="36" y="64" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="24" fill="#0B2C72" letterSpacing="-0.5">
          Smarter
        </text>
        <text x="36" y="92" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="24" fill="#2563EB" letterSpacing="-0.5">
          Banking
        </text>
        <text x="36" y="132" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="22" fill="#0B2C72" letterSpacing="-0.5">
          Brighter
        </text>
        <text x="36" y="160" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="22" fill="#1D4ED8" letterSpacing="-0.5">
          Bharat
        </text>

        {/* Upward Glowing Line Chart */}
        <g transform="translate(36, 195)">
          {/* Chart Fill Area */}
          <path
            d="M 0,90 Q 60,70 120,40 T 240,10 L 240,100 L 0,100 Z"
            fill="url(#chart-area-grad)"
          />
          {/* Chart Line */}
          <path
            d="M 0,90 Q 60,70 120,40 T 240,10"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* 5 Data Points */}
          <circle cx="0" cy="90" r="4" fill="#2563EB" />
          <circle cx="60" cy="70" r="4" fill="#2563EB" />
          <circle cx="120" cy="40" r="4" fill="#00F0FF" />
          <circle cx="180" cy="25" r="4" fill="#00F0FF" />
          {/* Final Glowing White Point */}
          <circle cx="240" cy="10" r="8" fill="#FFFFFF" filter="url(#glow-soft)" />
          <circle cx="240" cy="10" r="5" fill="#FFFFFF" />
        </g>

        {/* Floating Glass Note Bubble */}
        <g transform="translate(32, 335)">
          <rect
            width="256"
            height="64"
            rx="20"
            fill="#FFFFFF"
            fillOpacity="0.45"
            stroke="url(#glass-border)"
            strokeWidth="1.5"
          />
          <text x="20" y="28" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="13" fill="#0B2C72">
            Small steps
          </text>
          <text x="20" y="46" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="13" fill="#2563EB">
            towards big goals
          </text>

          {/* 2 Tiny Golden Sparkles */}
          <path
            d="M 215,22 L 217,28 L 223,30 L 217,32 L 215,38 L 213,32 L 207,30 L 213,28 Z"
            fill="#F59E0B"
          />
          <path
            d="M 232,36 L 233,40 L 237,41 L 233,42 L 232,46 L 231,42 L 227,41 L 231,40 Z"
            fill="#F59E0B"
            fillOpacity="0.8"
          />
        </g>
      </g>

      {/* BOTTOM HERO OBJECT: GLOWING 3D RUPEE ON PEDESTAL */}
      <g transform="translate(1250, 600)">
        {/* Reflection Underneath */}
        <ellipse cx="60" cy="180" rx="90" ry="18" fill="#1D4ED8" fillOpacity="0.2" filter="url(#glow-medium)" />

        {/* Blue Cuboid Platform */}
        <path
          d="M -30,140 L 150,140 L 120,170 L -60,170 Z"
          fill="url(#cuboid-face)"
        />
        <path
          d="M -60,170 L 120,170 L 120,180 L -60,180 Z"
          fill="#0B2C72"
        />

        {/* White Circular Pedestal */}
        <ellipse cx="45" cy="138" rx="80" ry="24" fill="url(#pedestal-top)" stroke="#FFFFFF" strokeWidth="2" />
        <ellipse cx="45" cy="142" rx="72" ry="20" fill="#2563EB" fillOpacity="0.15" />

        {/* Ambient Glow behind Rupee */}
        <circle cx="45" cy="65" r="50" fill="#60A5FA" fillOpacity="0.5" filter="url(#glow-heavy)" />

        {/* 3D Rupee Symbol */}
        <g transform="translate(15, 10)">
          {/* Shadow/Back 3D depth layer */}
          <text
            x="2"
            y="92"
            fontFamily="Inter, sans-serif"
            fontWeight="900"
            fontSize="96"
            fill="#0B2C72"
            fillOpacity="0.5"
          >
            ₹
          </text>
          {/* Front Gradient 3D Rupee */}
          <text
            x="0"
            y="90"
            fontFamily="Inter, sans-serif"
            fontWeight="900"
            fontSize="96"
            fill="url(#rupee-grad)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            filter="drop-shadow(0px 8px 16px rgba(37,99,235,0.4))"
          >
            ₹
          </text>
        </g>
      </g>

      {/* FOOTER TEXT (Bottom-Right) */}
      <text
        x="1560"
        y="865"
        textAnchor="end"
        fontFamily="Inter, sans-serif"
        fontWeight="700"
        fontSize="12"
        letterSpacing="1.5"
        fill="#FFFFFF"
        fillOpacity="0.65"
      >
        POWERED BY AI  •  BUILT FOR A BRIGHTER TOMORROW
      </text>
    </svg>
  );
};

export default PremiumBackground;
