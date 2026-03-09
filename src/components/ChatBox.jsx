import { useState, useRef, useEffect } from 'react'
import './ChatBox.css'

export default function ChatBox({ onSpeakingChange, onNewMessage }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const speak = (text) => {
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = 'es-AR'
    utt.rate = 0.92
    utt.pitch = 1.2
    const voices = window.speechSynthesis.getVoices()
    const v = voices.find(x => x.lang === 'es-AR') || voices.find(x => x.lang.startsWith('es'))
    if (v) utt.voice = v
    utt.onstart = () => onSpeakingChange(true)
    utt.onend   = () => onSpeakingChange(false)
    utt.onerror = () => onSpeakingChange(false)
    window.speechSynthesis.speak(utt)
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const newMessages = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    onSpeakingChange(false)

    try {
      const res = await fetch('https://gale-ai.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      const reply = data.content || 'Ups, algo salió mal. ¡Intentá de nuevo!'
      const updated = [...newMessages, { role: 'assistant', content: reply }]
      setMessages(updated)
      speak(reply)
      onNewMessage?.()
    } catch {
      const errMsg = '¡Che, parece que me desconecté! Intentá de nuevo en un momento 🔧'
      setMessages(m => [...m, { role: 'assistant', content: errMsg }])
      speak(errMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chatbox">
      {/* Historial */}
      <div className="chat-history">
        {messages.length === 0 && (
          <div className="chat-welcome">
            <p>¡Hola! Soy <strong>Gale-Ai</strong> 🤖💜</p>
            <p>Preguntame sobre nuestros reguladores de gas, o lo que quieras 😄</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.role}`}>
            {msg.role === 'assistant' && (
              <span className="chat-avatar">🤖</span>
            )}
            <div className="chat-bubble">{msg.content}</div>
            {msg.role === 'user' && (
              <span className="chat-avatar">👤</span>
            )}
          </div>
        ))}
        {loading && (
          <div className="chat-msg assistant">
            <span className="chat-avatar">🤖</span>
            <div className="chat-bubble chat-typing">
              <span/><span/><span/>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input-row">
        <input
          className="chat-input"
          type="text"
          placeholder="Escribí tu pregunta..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={loading}
        />
        <button
          className="chat-send"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          {loading ? '...' : '➤'}
        </button>
      </div>
    </div>
  )
}