export default function Particles({ active }) {
  const count = active ? 14 : 5
  const cols = ['#a855f7','#7c3aed','#22d3ee','#ec4899']
  return (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,overflow:'hidden'}}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} style={{
          position: 'absolute',
          borderRadius: '50%',
          bottom: '-20px',
          left: `${Math.random() * 100}%`,
          width: `${4 + Math.random() * 6}px`,
          height: `${4 + Math.random() * 6}px`,
          background: cols[i % 4],
          animation: `float-up ${4 + Math.random() * 6}s ${Math.random() * 4}s linear infinite`,
          opacity: 0,
        }} />
      ))}
      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(100vh) scale(0); opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(-20px) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  )
}