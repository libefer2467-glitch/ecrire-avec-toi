/*
  PLACEHOLDER del logo de la UMSS.
  Reemplazar por el logo OFICIAL: coloca el archivo en /public/umss-logo.png
  (o .svg) y sustituye este SVG por:
      <img src="/umss-logo.png" alt="Universidad Mayor de San Simón" ... />
*/
export function UmssLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 110"
      className={className}
      role="img"
      aria-label="Logo de la Universidad Mayor de San Simón (placeholder)"
    >
      <path
        d="M50 4 L92 18 V56 C92 82 72 100 50 106 C28 100 8 82 8 56 V18 Z"
        fill="#7a1f1f"
        stroke="#c9a227"
        strokeWidth="3"
      />
      <path
        d="M50 12 L84 23 V55 C84 76 68 92 50 97 C32 92 16 76 16 55 V23 Z"
        fill="#fbf6ec"
      />
      <text
        x="50"
        y="46"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="700"
        fontSize="26"
        fill="#7a1f1f"
      >
        UMSS
      </text>
      <text
        x="50"
        y="66"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="8.5"
        fill="#5c554a"
      >
        San Simón
      </text>
      <rect x="30" y="74" width="40" height="3" rx="1.5" fill="#c9a227" />
    </svg>
  );
}
