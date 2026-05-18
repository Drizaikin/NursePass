"use client";

import { useState } from 'react';

interface Flashcard {
  id: number;
  front: string;
  back: string;
  category: string;
}

const sampleFlashcards: Flashcard[] = [
  {
    id: 1,
    front: "What is the normal range for adult blood pressure?",
    back: "Systolic: 90-120 mmHg\nDiastolic: 60-80 mmHg\n\nHypertension is diagnosed when BP is consistently ≥140/90 mmHg",
    category: "Medical-Surgical"
  },
  {
    id: 2,
    front: "List the 5 stages of grief (Kübler-Ross model)",
    back: "1. Denial\n2. Anger\n3. Bargaining\n4. Depression\n5. Acceptance\n\nNote: Not everyone experiences all stages or in this order",
    category: "Psychiatric Nursing"
  },
  {
    id: 3,
    front: "What are the APGAR score components?",
    back: "A - Appearance (skin color)\nP - Pulse (heart rate)\nG - Grimace (reflex irritability)\nA - Activity (muscle tone)\nR - Respiration\n\nScored 0-2 for each, total 0-10",
    category: "Maternal & Child"
  },
  {
    id: 4,
    front: "Define Primary, Secondary, and Tertiary prevention",
    back: "Primary: Prevent disease before it occurs (vaccination, health education)\n\nSecondary: Early detection and treatment (screening, regular check-ups)\n\nTertiary: Manage established disease to prevent complications (rehabilitation, chronic disease management)",
    category: "Community Health"
  },
  {
    id: 5,
    front: "What are the 6 Rights of Medication Administration?",
    back: "1. Right Patient\n2. Right Drug\n3. Right Dose\n4. Right Route\n5. Right Time\n6. Right Documentation\n\nSome add: Right Reason, Right Response, Right to Refuse",
    category: "Pharmacology"
  }
];

export default function FlashcardsPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set());
  const [difficultCards, setDifficultCards] = useState<Set<number>>(new Set());

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📚' },
    { id: 'medical', name: 'Medical-Surgical', icon: '🏥' },
    { id: 'psychiatric', name: 'Psychiatric Nursing', icon: '🧠' },
    { id: 'maternal', name: 'Maternal & Child', icon: '👶' },
    { id: 'community', name: 'Community Health', icon: '🏘️' },
    { id: 'pharmacology', name: 'Pharmacology', icon: '💊' }
  ];

  const currentCard = sampleFlashcards[currentCardIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCardIndex < sampleFlashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleMastered = () => {
    const newMastered = new Set(masteredCards);
    newMastered.add(currentCard.id);
    setMasteredCards(newMastered);
    
    // Remove from difficult if it was there
    const newDifficult = new Set(difficultCards);
    newDifficult.delete(currentCard.id);
    setDifficultCards(newDifficult);
    
    handleNext();
  };

  const handleDifficult = () => {
    const newDifficult = new Set(difficultCards);
    newDifficult.add(currentCard.id);
    setDifficultCards(newDifficult);
    handleNext();
  };

  const progressPercentage = ((currentCardIndex + 1) / sampleFlashcards.length) * 100;

  return (
    <div className="view active">
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 className="card-title" style={{ marginBottom: '4px' }}>🗂️ Flashcards</h2>
            <p style={{ fontSize: '13px', color: 'var(--mid)' }}>
              Card {currentCardIndex + 1} of {sampleFlashcards.length}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
            <div>
              <span style={{ color: 'var(--mid)' }}>Mastered: </span>
              <strong style={{ color: 'var(--green)' }}>{masteredCards.size}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--mid)' }}>Difficult: </span>
              <strong style={{ color: 'var(--amber)' }}>{difficultCards.size}</strong>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div style={{ height: '6px', background: 'var(--border)', borderRadius: 'var(--r-full)', marginTop: '12px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            background: 'var(--teal)',
            width: `${progressPercentage}%`,
            transition: 'width 0.3s'
          }}></div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '8px 16px',
              border: `1.5px solid ${selectedCategory === cat.id ? 'var(--teal)' : 'var(--border)'}`,
              borderRadius: 'var(--r-full)',
              background: selectedCategory === cat.id ? 'var(--teal-light)' : 'var(--white)',
              color: 'var(--dark)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Flashcard */}
      <div style={{ perspective: '1000px', marginBottom: '20px' }}>
        <div
          onClick={handleFlip}
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '400px',
            cursor: 'pointer',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front of card */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'var(--white)',
            border: '2px solid var(--teal)',
            borderRadius: 'var(--r-lg)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '400px'
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--teal)',
              textTransform: 'uppercase',
              letterSpacing: '.05em',
              marginBottom: '24px'
            }}>
              {currentCard.category}
            </div>
            <div style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--dark)',
              lineHeight: 1.5,
              marginBottom: '32px'
            }}>
              {currentCard.front}
            </div>
            <div style={{
              fontSize: '13px',
              color: 'var(--mid)',
              fontStyle: 'italic'
            }}>
              Click to reveal answer
            </div>
          </div>

          {/* Back of card */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'var(--teal)',
            border: '2px solid var(--teal)',
            borderRadius: 'var(--r-lg)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            transform: 'rotateY(180deg)',
            minHeight: '400px'
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--amber)',
              textTransform: 'uppercase',
              letterSpacing: '.05em',
              marginBottom: '24px'
            }}>
              Answer
            </div>
            <div style={{
              fontSize: '16px',
              color: 'var(--white)',
              lineHeight: 1.8,
              whiteSpace: 'pre-line'
            }}>
              {currentCard.back}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          onClick={handlePrevious}
          disabled={currentCardIndex === 0}
          className="btn btn-outline"
          style={{
            padding: '12px 24px',
            opacity: currentCardIndex === 0 ? 0.5 : 1,
            cursor: currentCardIndex === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          ← Previous
        </button>
        
        <button
          onClick={handleFlip}
          className="btn btn-dark"
          style={{ padding: '12px 24px' }}
        >
          {isFlipped ? '🔄 Flip Back' : '🔄 Flip Card'}
        </button>

        <button
          onClick={handleNext}
          disabled={currentCardIndex === sampleFlashcards.length - 1}
          className="btn btn-outline"
          style={{
            padding: '12px 24px',
            opacity: currentCardIndex === sampleFlashcards.length - 1 ? 0.5 : 1,
            cursor: currentCardIndex === sampleFlashcards.length - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Next →
        </button>
      </div>

      {/* Mastery Buttons */}
      {isFlipped && (
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={handleDifficult}
            style={{
              padding: '12px 24px',
              border: '2px solid var(--amber)',
              borderRadius: 'var(--r-full)',
              background: 'var(--amber-light)',
              color: 'var(--amber-dark)',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            😓 Still Learning
          </button>
          
          <button
            onClick={handleMastered}
            style={{
              padding: '12px 24px',
              border: '2px solid var(--green)',
              borderRadius: 'var(--r-full)',
              background: '#DFFBF1',
              color: 'var(--green)',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ✅ Mastered
          </button>
        </div>
      )}

      {/* Info Card */}
      <div className="card" style={{ marginTop: '20px', background: 'var(--teal-light)', border: '1px solid var(--teal)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ fontSize: '24px' }}>💡</div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--dark)', marginBottom: '6px' }}>
              Spaced Repetition Learning
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--dark)', lineHeight: 1.6 }}>
              Cards marked as "Still Learning" will appear more frequently. Mastered cards will be shown less often to optimize your study time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
