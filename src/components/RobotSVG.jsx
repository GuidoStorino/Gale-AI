import './RobotSVG.css'

export default function RobotSVG({ talking, color }) {
  const c = color || '#7c3aed'
  const lc = color || '#a855f7'
  return (
    <svg className={`rsvg${talking ? ' tk' : ''}`} viewBox="0 0 280 340" fill="none">
      <defs>
        <radialGradient id="bg1" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#9d5cf6"/><stop offset="100%" stopColor="#4c1d95"/>
        </radialGradient>
        <radialGradient id="fg1" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#b87cf8"/><stop offset="100%" stopColor="#6d28d9"/>
        </radialGradient>
        <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d0a1a"/><stop offset="100%" stopColor="#1e1040"/>
        </linearGradient>
        <filter id="gl"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <clipPath id="scp"><rect x="98" y="205" width="84" height="44" rx="8"/></clipPath>
      </defs>
      <ellipse cx="140" cy="330" rx="60" ry="8" fill="rgba(0,0,0,.4)"/>
      <g className="rbg">
        <rect x="100" y="295" width="80" height="20" rx="10" fill="#3b0764"/>
        <rect x="115" y="310" width="50" height="12" rx="6" fill="#2e0650"/>
        <g className="vh">
          <rect x="120" y="280" width="40" height="8" rx="4" fill={c}/>
          <rect x="136" y="270" width="8" height="18" rx="4" fill={lc}/>
        </g>
        <rect x="80" y="170" width="120" height="120" rx="30" fill="url(#bg1)"/>
        <rect x="88" y="178" width="50" height="40" rx="15" fill="rgba(255,255,255,.08)"/>
        <rect x="90" y="272" width="100" height="15" rx="8" fill="#3b0764"/>
        <rect x="98" y="205" width="84" height="44" rx="8" fill="url(#sg1)" stroke={c} strokeWidth="2"/>
        <g clipPath="url(#scp)">
          {[0,1,2,3].map(row => (
            <g key={row} className="scl" style={{ animationDelay: `${row * 0.5}s` }}>
              {[0,1,2,3,4,5].map(col => (
                <rect key={col} x={104+col*25} y={212+row*8} width={row%2===0?18:12} height="3" rx="1.5"
                  fill={[c,'#22d3ee',lc,'#ec4899'][row]} opacity="0.6"/>
              ))}
            </g>
          ))}
        </g>
        <g className="al">
          <rect x="44" y="148" width="36" height="70" rx="18" fill="url(#bg1)"/>
          <circle cx="62" cy="222" r="14" fill={c}/><circle cx="62" cy="222" r="8" fill={lc} opacity=".5"/>
        </g>
        <g className="ar">
          <rect x="200" y="148" width="36" height="70" rx="18" fill="url(#bg1)"/>
          <circle cx="218" cy="222" r="14" fill={c}/><circle cx="218" cy="222" r="8" fill={lc} opacity=".5"/>
        </g>
        <rect x="120" y="130" width="40" height="20" rx="10" fill="#3b0764"/>
        <rect x="75" y="55" width="130" height="90" rx="30" fill="url(#fg1)"/>
        <ellipse cx="120" cy="72" rx="35" ry="15" fill="rgba(255,255,255,.12)"/>
        <rect x="75" y="55" width="130" height="90" rx="30" fill="none" stroke={c} strokeWidth="2" opacity=".5"/>
        <rect x="136" y="25" width="8" height="35" rx="4" fill="#3b0764"/>
        <circle className="ant" cx="140" cy="22" r="6" fill="#22d3ee" filter="url(#gl)"/>
        <rect x="94" y="88" width="34" height="24" rx="12" fill="#0d0a1a"/>
        <g className="eb">
          <circle className="ep" cx="111" cy="100" r="7" fill={c} filter="url(#gl)"/>
          <circle cx="111" cy="100" r="4" fill="white"/>
          <circle cx="107" cy="96" r="2" fill="rgba(255,255,255,.5)"/>
        </g>
        <rect x="152" y="88" width="34" height="24" rx="12" fill="#0d0a1a"/>
        <g className="eb" style={{ animationDelay: '.1s' }}>
          <circle className="ep" cx="169" cy="100" r="7" fill={c} filter="url(#gl)"/>
          <circle cx="169" cy="100" r="4" fill="white"/>
          <circle cx="165" cy="96" r="2" fill="rgba(255,255,255,.5)"/>
        </g>
        <g className="mi">
          <path d="M 115 122 Q 140 136 165 122" stroke={c} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        </g>
        <g className="mt">
          <ellipse cx="140" cy="128" rx="18" ry="9" fill="#0d0a1a" stroke={c} strokeWidth="2"/>
          <ellipse cx="140" cy="130" rx="12" ry="5" fill="#ec4899" opacity=".6"/>
        </g>
        <circle cx="82" cy="100" r="5" fill="#3b0764" stroke={c} strokeWidth="1.5"/>
        <circle cx="198" cy="100" r="5" fill="#3b0764" stroke={c} strokeWidth="1.5"/>
        <circle cx="82" cy="118" r="3" fill={c} opacity=".7"/>
        <circle cx="198" cy="118" r="3" fill="#22d3ee" opacity=".7"/>
        <circle cx="90" cy="190" r="6" fill={c} opacity=".5"/>
        <circle cx="190" cy="190" r="6" fill="#22d3ee" opacity=".5"/>
      </g>
    </svg>
  )
}