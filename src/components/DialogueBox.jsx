export default function DialogueBox({ text, typing, speaking, recording, progress, activeTopic, dlReady, onStop, onRepeat, onDownload }) {
  return (
    <div style={{ width: '100%' }}>
      <div style={{
        background: 'linear-gradient(135deg, #1a1030, #241848)',
        border: '2px solid #7c3aed',
        borderRadius: '20px',
        padding: '20px',
        minHeight: '120px',
        boxShadow: '0 0 30px rgba(124,58,237,0.2)',
      }}>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.58rem', color: '#a855f7', letterSpacing: '2px', marginBottom: '10px' }}>
          💬 GALE-AI DICE:
        </div>
        <div style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.6, minHeight: '60px' }}>
          {text
            ? <>{text}{typing && <span style={{ display:'inline-block', width:'2px', height:'1em', background:'#c084fc', marginLeft:'2px', verticalAlign:'text-bottom', animation:'cblink 0.6s step-end infinite' }}/>}</>
            : <span style={{ color: '#9d7bca', fontStyle: 'italic', fontSize: '0.83rem' }}>Aprieta un botón y te cuento todo sobre el gas! 🤖💜</span>
          }
        </div>

        {text && (
          <div style={{ height: '3px', background: '#241848', borderRadius: '10px', overflow: 'hidden', marginTop: '12px' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #7c3aed, #22d3ee)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '14px' }}>
          {(speaking || typing) && (
            <button onClick={onStop} style={btnStyle('#ec4899', 'transparent')}>⏹ Detener</button>
          )}
          {activeTopic && !typing && !speaking && (
            <button onClick={onDownload} style={btnStyle('#c084fc', 'linear-gradient(135deg,#7c3aed,#a855f7)')}>
              ⬇️ {dlReady ? 'Descargar audio (.webm)' : 'Descargar texto (.txt)'}
            </button>
          )}
          {activeTopic && (
            <button onClick={onRepeat} style={btnStyle('#7c3aed', 'transparent')}>🔄 Repetir</button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.73rem', color: '#9d7bca', fontWeight: 600, marginTop: '8px', flexWrap: 'wrap' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: speaking ? '#22c55e' : '#9d7bca', boxShadow: speaking ? '0 0 8px rgba(34,197,94,0.8)' : 'none' }} />
          {speaking ? '🎙️ Gale-Ai está hablando...' : typing ? '✍️ Escribiendo...' : activeTopic ? '✅ Listo' : '💤 En espera...'}
          {recording && <span style={{ background: 'rgba(236,72,153,0.2)', border: '1px solid #ec4899', borderRadius: '50px', padding: '3px 10px', color: '#ec4899', fontSize: '0.68rem' }}>⏺ REC</span>}
        </div>
      </div>
      <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', padding: '10px 14px', fontSize: '0.73rem', color: '#9d7bca', textAlign: 'center', lineHeight: 1.5, marginTop: '8px' }}>
        💡 Audio en <em>.webm</em> (Chrome/Edge). Para convertir a MP4: <a href="https://cloudconvert.com" target="_blank" style={{ color: '#c084fc' }}>CloudConvert</a> (gratis)
      </div>
      <style>{`@keyframes cblink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}

function btnStyle(borderColor, bg) {
  return {
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '10px 16px', borderRadius: '50px',
    border: `2px solid ${borderColor}`,
    background: bg, color: bg === 'transparent' ? borderColor : 'white',
    fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.78rem',
    cursor: 'pointer',
  }
}