export default function TopicButton({ topic, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'linear-gradient(135deg, #1a1030, #241848)',
      border: `2px solid ${active ? topic.color : 'rgba(124,58,237,0.3)'}`,
      borderRadius: '16px',
      padding: '15px 10px',
      cursor: 'pointer',
      color: '#f0e6ff',
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 700,
      fontSize: '0.85rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      boxShadow: active ? `0 0 20px ${topic.color}66, 0 8px 24px rgba(124,58,237,0.4)` : 'none',
      transform: active ? 'translateY(-3px) scale(1.02)' : 'none',
    }}>
      <span style={{ fontSize: '1.7rem' }}>{topic.icon}</span>
      <span style={{ lineHeight: 1.2 }}>{topic.label}</span>
    </button>
  )
}