type LogoProps = {
  className?: string;
  size?: number;
  showWordmark?: boolean;
};

export function Logo({ className = "", size = 40, showWordmark = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="YUEJIN"
        role="img"
      >
        <defs>
          <linearGradient id="yjGold" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f4dfad" />
            <stop offset="0.45" stopColor="#c9a24a" />
            <stop offset="1" stopColor="#8e6c30" />
          </linearGradient>
          <linearGradient id="yjRed" x1="21" y1="20" x2="43" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b53333" />
            <stop offset="1" stopColor="#731616" />
          </linearGradient>
          <linearGradient id="yjGoldV" x1="32" y1="10" x2="32" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e7c983" />
            <stop offset="1" stopColor="#8e6c30" />
          </linearGradient>
          <filter id="gMark" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Outer coin ring */}
        <circle cx="32" cy="32" r="29" stroke="url(#yjGold)" strokeWidth="1" opacity="0.85" />
        <circle cx="32" cy="32" r="25.5" stroke="url(#yjGold)" strokeWidth="0.5" opacity="0.3" />
        {/* Inner hexagonal frame */}
        <path
          d="M32 12L49.3 22V42L32 52L14.7 42V22Z"
          stroke="url(#yjGold)"
          strokeWidth="0.8"
          opacity="0.5"
          fill="none"
        />
        {/* Core diamond */}
        <path
          d="M32 19L43 26.5V39.5L32 47L21 39.5V26.5Z"
          stroke="url(#yjGoldV)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="url(#yjRed)"
          fillOpacity="0.2"
          filter="url(#gMark)"
        />
        {/* Internal structure — Y letterform abstraction */}
        <path
          d="M26 24L32 31L38 24"
          stroke="url(#yjGold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line x1="32" y1="31" x2="32" y2="42" stroke="url(#yjGold)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Center dot */}
        <circle cx="32" cy="31" r="2" fill="url(#yjGold)" opacity="0.9" />
      </svg>
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-[0.22em] text-aurix-text">
            YUEJIN
          </span>
          <span className="text-[10px] font-medium tracking-[0.18em] text-aurix-gold/80">
            Wealth gaming
          </span>
        </div>
      )}
    </div>
  );
}
