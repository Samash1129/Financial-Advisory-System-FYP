// LogoAnimation.js
import React from 'react';
import './LogoAnimation.css';

const LogoAnimation = ({ animateDiagonal = true }) => {
  return (
    <div className="logo-animation-container">
<svg width="850" height="1281" viewBox="0 0 1228 1081" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect className={animateDiagonal ? "diagonal-stretch1" : ""} width="62.7662" height="170.129" rx="31.3831" transform="matrix(0.864087 0.503342 -0.501368 0.865234 656.665 498.205)" fill="url(#paint0_linear_609_236)"/>
<rect className={animateDiagonal ? "diagonal-stretch2" : ""} width="64.6262" height="191.824" rx="32.3131" transform="matrix(0.864087 0.503342 -0.501368 0.865234 601.644 403)" fill="url(#paint1_linear_609_236)"/>
<rect width="60.0071" height="61.2761" rx="30.0036" transform="matrix(0.864087 0.503342 -0.501368 0.865234 497.722 591.22)" fill="url(#paint2_linear_609_236)"/>
<rect width="60.0071" height="61.2761" rx="30.0036" transform="matrix(0.864087 0.503342 -0.501368 0.865234 708.776 591.221)" fill="url(#paint3_linear_609_236)"/>
<defs>
<linearGradient id="paint0_linear_609_236" x1="31.3831" y1="0" x2="31.3831" y2="170.129" gradientUnits="userSpaceOnUse">
<stop stop-color="#4FE9C7"/>
<stop offset="0.515625" stop-color="#35D8DF"/>
<stop offset="1" stop-color="#0ACBF9"/>
</linearGradient>
<linearGradient id="paint1_linear_609_236" x1="32.3131" y1="0" x2="32.3131" y2="191.824" gradientUnits="userSpaceOnUse">
<stop offset="0.0677083" stop-color="#80F5A7"/>
<stop offset="0.510417" stop-color="#5DE9C0"/>
<stop offset="1" stop-color="#33DFE1"/>
</linearGradient>
<linearGradient id="paint2_linear_609_236" x1="30.0036" y1="-2.28262e-07" x2="28.2085" y2="89.3992" gradientUnits="userSpaceOnUse">
<stop stop-color="#11CDF3"/>
<stop offset="1" stop-color="#21D5E6"/>
</linearGradient>
<linearGradient id="paint3_linear_609_236" x1="30.0036" y1="-2.28262e-07" x2="28.2085" y2="89.3992" gradientUnits="userSpaceOnUse">
<stop stop-color="#0DCEF6"/>
<stop offset="1" stop-color="#21D5E6"/>
</linearGradient>
</defs>
</svg>

    </div>
  );
};

export default LogoAnimation;
