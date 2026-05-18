export default function FlashcardsPage() {
  return (
    <div className="view active">
      <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗂️</div>
        <h2 className="card-title" style={{ fontSize: '24px', marginBottom: '8px' }}>Flashcards</h2>
        <p style={{ color: 'var(--mid)', maxWidth: '400px', margin: '0 auto' }}>Review high-yield terms using spaced repetition. The flashcard deck is currently being compiled.</p>
      </div>
    </div>
  );
}
