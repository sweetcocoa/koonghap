import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fff5f5"/>
      <stop offset="50%" style="stop-color:#ffffff"/>
      <stop offset="100%" style="stop-color:#fff0f6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Heart -->
  <g transform="translate(600, 230) scale(3.5)">
    <path d="M0,30 A20,20,0,0,1,0,-10 A20,20,0,0,1,0,30 Z"
          transform="rotate(-45)"
          fill="#ff6b6b" opacity="0.9"/>
  </g>

  <!-- Title -->
  <text x="600" y="390" text-anchor="middle"
        font-family="sans-serif" font-weight="700" font-size="72" fill="#2d3436">
    궁합 테스트
  </text>

  <!-- Subtitle -->
  <text x="600" y="450" text-anchor="middle"
        font-family="sans-serif" font-weight="400" font-size="32" fill="#636e72">
    Date Drop Style Compatibility Test
  </text>

  <!-- Description -->
  <text x="600" y="520" text-anchor="middle"
        font-family="sans-serif" font-weight="400" font-size="26" fill="#b2bec3">
    50개 질문으로 알아보는 두 사람의 호환성
  </text>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile(join(__dirname, '..', 'public', 'og-image.png'));

console.log('og-image.png created');
