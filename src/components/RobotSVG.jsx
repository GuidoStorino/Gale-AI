import './RobotSVG.css'
import galeImg from '../assets/gale-ai-robot.png'

export default function RobotSVG({ talking }) {
  return (
    <div className={`robot-wrapper${talking ? ' tk' : ''}`}>

      {/* Imagen PNG real del robot */}
      <img
        src={galeImg}
        alt="Gale-Ai"
        className="robot-img"
        draggable={false}
      />

      {/* Halo de glow iridiscente detrás */}
      <div className="robot-halo" />

      {/* Overlay de boca animada — se superpone sobre la cara */}
      <div className={`mouth-overlay${talking ? ' talking' : ''}`}>
        <svg viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Boca idle: sonrisa */}
          <g className="m-smile">
            <path
              d="M 10 8 Q 30 22 50 8"
              stroke="#f472b6"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>
          {/* Boca hablando: elipse abierta */}
          <g className="m-open">
            <ellipse cx="30" cy="13" rx="16" ry="10"
              fill="#1a0a2e" stroke="#f472b6" strokeWidth="2.5"/>
            <ellipse cx="30" cy="15" rx="10" ry="6"
              fill="#f472b6" opacity="0.45"/>
          </g>
        </svg>
      </div>

      {/* Partículas de energía al hablar */}
      {talking && (
        <div className="energy-particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`ep ep-${i}`} />
          ))}
        </div>
      )}

    </div>
  )
}
