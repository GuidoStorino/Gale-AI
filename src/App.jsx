import { useState, useEffect, useRef, useCallback } from 'react'
import { TOPICS } from './components/topics'
import RobotSVG from './components/RobotSVG'
import TopicButton from './components/TopicButton'
import DialogueBox from './components/DialogueBox'
import Particles from './components/Particles'

export default function App() {
  const [activeTopic, setActiveTopic] = useState(null)
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [dlReady, setDlReady] = useState(null)
  const [recording, setRecording] = useState(false)
  const [progress, setProgress] = useState(0)
  const [bubble, setBubble] = useState(false)
  const tiRef = useRef(null)
  const mrRef = useRef(null)
  const chRef = useRef([])
  const bubbleMsg = useRef(['Hola! Pregúntame algo 😊','Soy Gale-Ai! 💜','El gas es mi pasión! 🔥'][Math.floor(Math.random()*3)])

  useEffect(() => {
    const t = setTimeout(() => setBubble(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const stopAll = useCallback(() => {
    window.speechSynthesis.cancel()
    if (tiRef.current) clearInterval(tiRef.current)
    if (mrRef.current && mrRef.current.state === 'recording') {
      try { mrRef.current.stop() } catch(e) {}
    }
    setTyping(false); setSpeaking(false); setRecording(false); setProgress(0)
  }, [])

  const handleTopic = useCallback((topic) => {
    stopAll(); setActiveTopic(topic); setText(''); setDlReady(null); chRef.current = []
    const sc = topic.script; let i = 0; setTyping(true)
    tiRef.current = setInterval(() => {
      i++; setText(sc.slice(0, i)); setProgress(i / sc.length * 100)
      if (i >= sc.length) { clearInterval(tiRef.current); setTyping(false); setProgress(100) }
    }, 28)

    if ('speechSynthesis' in window) {
      const utt = new SpeechSynthesisUtterance(sc)
      utt.lang = 'es-AR'; utt.rate = 0.92; utt.pitch = 1.25
      const lv = () => {
        const vs = window.speechSynthesis.getVoices()
        const v = vs.find(x => x.lang === 'es-AR') || vs.find(x => x.lang.startsWith('es'))
        if (v) utt.voice = v
      }
      lv(); if (!window.speechSynthesis.getVoices().length) window.speechSynthesis.onvoiceschanged = lv
      setSpeaking(true)
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        const dest = ctx.createMediaStreamDestination()
        const rec = new MediaRecorder(dest.stream)
        mrRef.current = rec; chRef.current = []
        rec.ondataavailable = e => { if (e.data.size > 0) chRef.current.push(e.data) }
        rec.onstop = () => {
          if (chRef.current.length > 0) {
            const blob = new Blob(chRef.current, { type: 'audio/webm' })
            setDlReady({ blob, name: `gale-ai-${topic.id}.webm` })
          }
          setRecording(false)
        }
        rec.start(100); setRecording(true)
      } catch(e) {}
      utt.onend = () => { setSpeaking(false); if (mrRef.current?.state === 'recording') { try { mrRef.current.stop() } catch(e) {} } }
      utt.onerror = () => { setSpeaking(false); setRecording(false) }
      window.speechSynthesis.speak(utt)
    }
  }, [stopAll])

  useEffect(() => () => stopAll(), [stopAll])

  const handleDownload = () => {
    if (dlReady) {
      const url = URL.createObjectURL(dlReady.blob)
      Object.assign(document.createElement('a'), { href: url, download: dlReady.name }).click()
      URL.revokeObjectURL(url)
    } else if (activeTopic) {
      const blob = new Blob([activeTopic.script], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      Object.assign(document.createElement('a'), { href: url, download: `gale-ai-${activeTopic.id}.txt` }).click()
      URL.revokeObjectURL(url)
    }
  }

  const ad = activeTopic ? TOPICS.find(t => t.id === activeTopic.id) : null

  return (
    <>
      <Particles active={speaking} />
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'20px 16px 40px', minHeight:'100vh', position:'relative', zIndex:1 }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'20px' }}>
          <h1 style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'clamp(1.3rem,5vw,2rem)', fontWeight:900, background:'linear-gradient(135deg,#c084fc,#22d3ee)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', letterSpacing:'2px' }}>
            ⬡ GALE-AI ⬡
          </h1>
          <p style={{ color:'#9d7bca', fontSize:'.82rem', marginTop:'4px', fontWeight:600 }}>Tu asistente robótico de gas natural 💜</p>
        </div>

        {/* Main layout */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'24px', width:'100%', maxWidth:'520px' }}>

          {/* Buttons grid - mobile: 2x2, desktop: flanking robot */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', width:'100%' }}>
            {TOPICS.map(topic => (
              <TopicButton key={topic.id} topic={topic}
                active={activeTopic?.id === topic.id}
                onClick={() => handleTopic(topic)} />
            ))}
          </div>

          {/* Robot */}
          <div style={{ display:'flex', justifyContent:'center', width:'100%' }}>
            <div style={{ width:'min(250px,70vw)', height:'min(290px,80vw)', position:'relative' }}>
              {/* Speech bubble */}
              <div style={{
                position:'absolute', top:'-10px', right:'-18px',
                width:'min(160px,46vw)', opacity: bubble && !speaking ? 1 : 0,
                transform: bubble && !speaking ? 'scale(1)' : 'scale(0.8) translateY(10px)',
                transition:'all .4s cubic-bezier(.34,1.56,.64,1)', pointerEvents:'none',
              }}>
                <div style={{ background:'linear-gradient(135deg,#4c1d95,#7c3aed)', border:'2px solid #c084fc', borderRadius:'16px', padding:'10px 12px', fontSize:'.7rem', fontWeight:700, color:'#fff', lineHeight:1.4, position:'relative' }}>
                  {bubbleMsg.current}
                  <span style={{ position:'absolute', bottom:'-10px', left:'18px', borderTop:'6px solid #7c3aed', borderLeft:'6px solid transparent', borderRight:'6px solid transparent' }}/>
                </div>
              </div>
              <RobotSVG talking={speaking || typing} color={ad?.color} />
            </div>
          </div>

          {/* Dialogue */}
          <DialogueBox
            text={text} typing={typing} speaking={speaking}
            recording={recording} progress={progress}
            activeTopic={activeTopic} dlReady={dlReady}
            onStop={stopAll} onRepeat={() => activeTopic && handleTopic(activeTopic)}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </>
  )
}