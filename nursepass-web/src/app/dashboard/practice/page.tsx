"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  unit: string;
}

// Sample questions - in production, these would come from your database
const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "A patient with diabetes mellitus type 2 is prescribed metformin. What is the primary mechanism of action of this medication?",
    options: [
      "Stimulates insulin secretion from pancreatic beta cells",
      "Decreases hepatic glucose production and increases insulin sensitivity",
      "Delays carbohydrate absorption in the small intestine",
      "Increases glucose excretion through the kidneys"
    ],
    correctAnswer: 1,
    explanation: "Metformin works primarily by decreasing hepatic glucose production and increasing peripheral insulin sensitivity. It does not stimulate insulin secretion.",
    unit: "Pharmacology"
  },
  {
    id: 2,
    question: "A nurse is caring for a postpartum client who delivered 2 hours ago. Which finding requires immediate intervention?",
    options: [
      "Lochia rubra with small clots",
      "Fundus firm at umbilicus level",
      "Saturating one pad per hour",
      "Mild cramping during breastfeeding"
    ],
    correctAnswer: 2,
    explanation: "Saturating one pad per hour indicates excessive bleeding (postpartum hemorrhage) and requires immediate intervention. Normal lochia flow should saturate less than one pad in 2-3 hours.",
    unit: "Maternal & Child Health"
  },
  {
    id: 3,
    question: "Which intervention is most appropriate for a patient experiencing an acute asthma attack?",
    options: [
      "Administer oral corticosteroids",
      "Position patient in supine position",
      "Administer short-acting beta-2 agonist via nebulizer",
      "Encourage deep breathing exercises"
    ],
    correctAnswer: 2,
    explanation: "Short-acting beta-2 agonists (like salbutamol) via nebulizer provide rapid bronchodilation and are the first-line treatment for acute asthma attacks.",
    unit: "Medical-Surgical Nursing"
  },
  {
    id: 4,
    question: "A community health nurse is planning a health education session on malaria prevention. Which strategy should be prioritized?",
    options: [
      "Annual malaria vaccination campaigns",
      "Use of insecticide-treated bed nets (ITNs)",
      "Monthly prophylactic antimalarial medication",
      "Indoor residual spraying only during rainy season"
    ],
    correctAnswer: 1,
    explanation: "Insecticide-treated bed nets (ITNs) are the most cost-effective and evidence-based intervention for malaria prevention, especially in endemic areas.",
    unit: "Community Health"
  },
  {
    id: 5,
    question: "A patient with schizophrenia is prescribed haloperidol. Which side effect should the nurse monitor for most closely?",
    options: [
      "Hyperglycemia",
      "Extrapyramidal symptoms (EPS)",
      "Hypertension",
      "Urinary retention"
    ],
    correctAnswer: 1,
    explanation: "Haloperidol is a typical antipsychotic with high risk for extrapyramidal symptoms including dystonia, akathisia, and tardive dyskinesia. Close monitoring is essential.",
    unit: "Psychiatric Nursing"
  }
];

export default function PracticePage() {
  const supabase = createClient();
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);

  const units = [
    { id: 'all', name: 'All Units', icon: '📚' },
    { id: 'pharmacology', name: 'Pharmacology', icon: '💊' },
    { id: 'maternal', name: 'Maternal & Child Health', icon: '👶' },
    { id: 'medsurg', name: 'Medical-Surgical Nursing', icon: '🏥' },
    { id: 'community', name: 'Community Health', icon: '🏘️' },
    { id: 'psychiatric', name: 'Psychiatric Nursing', icon: '🧠' }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setScore(prev => ({ ...prev, total: prev.total + 1 }));
    }

    // Update user stats in database
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (profile) {
          await supabase.from('profiles').update({
            questions_answered: (profile.questions_answered || 0) + 1,
            average_score: Math.round(((profile.average_score * profile.questions_answered) + (isCorrect ? 100 : 0)) / (profile.questions_answered + 1)),
            xp_points: (profile.xp_points || 0) + (isCorrect ? 10 : 5)
          }).eq('id', user.id);
        }
      }
    } catch (error) {
      console.error('Error updating stats:', error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleStartPractice = () => {
    setIsStarted(true);
    setCurrentQuestionIndex(0);
    setScore({ correct: 0, total: 0 });
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  if (!isStarted) {
    return (
      <div className="view active">
        <div className="card" style={{ marginBottom: '20px' }}>
          <h2 className="card-title" style={{ marginBottom: '8px' }}>📚 Practice MCQs</h2>
          <p style={{ color: 'var(--mid)', fontSize: '14px' }}>Select a unit to focus on, or practice all units together.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          {units.map(unit => (
            <div
              key={unit.id}
              onClick={() => setSelectedUnit(unit.id)}
              style={{
                padding: '20px',
                border: selectedUnit === unit.id ? '2px solid var(--teal)' : '1px solid var(--border)',
                borderRadius: 'var(--r)',
                background: selectedUnit === unit.id ? 'var(--teal-light)' : 'var(--white)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{unit.icon}</div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--dark)', marginBottom: '4px' }}>{unit.name}</h3>
              <p style={{ fontSize: '12px', color: 'var(--mid)' }}>
                {unit.id === 'all' ? `${sampleQuestions.length} questions` : `${sampleQuestions.filter(q => q.unit.toLowerCase().includes(unit.id)).length} questions`}
              </p>
            </div>
          ))}
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <button onClick={handleStartPractice} className="btn btn-primary" style={{ padding: '14px 32px' }}>
            Start Practice Session →
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="view active">
      {/* Progress header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '13px', color: 'var(--mid)' }}>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--dark)', marginTop: '4px' }}>{currentQuestion.unit}</h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--teal)' }}>{score.correct}/{score.total}</div>
            <div style={{ fontSize: '12px', color: 'var(--mid)' }}>Score</div>
          </div>
        </div>
        <div style={{ height: '6px', background: 'var(--border)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--teal)', width: `${progressPercentage}%`, transition: 'width 0.3s' }}></div>
        </div>
      </div>

      {/* Question card */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--dark)', lineHeight: 1.6 }}>
            {currentQuestion.question}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {currentQuestion.options.map((option, index) => {
            let borderColor = 'var(--border)';
            let backgroundColor = 'var(--white)';
            
            if (showExplanation) {
              if (index === currentQuestion.correctAnswer) {
                borderColor = 'var(--green)';
                backgroundColor = '#DFFBF1';
              } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
                borderColor = 'var(--red)';
                backgroundColor = '#FFE8E8';
              }
            } else if (selectedAnswer === index) {
              borderColor = 'var(--teal)';
              backgroundColor = 'var(--teal-light)';
            }

            return (
              <div
                key={index}
                onClick={() => handleAnswerSelect(index)}
                style={{
                  padding: '16px',
                  border: `2px solid ${borderColor}`,
                  borderRadius: 'var(--r)',
                  background: backgroundColor,
                  cursor: showExplanation ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: `2px solid ${borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                  flexShrink: 0,
                  background: selectedAnswer === index ? borderColor : 'transparent',
                  color: selectedAnswer === index ? 'white' : 'var(--mid)'
                }}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span style={{ fontSize: '14px', color: 'var(--dark)' }}>{option}</span>
              </div>
            );
          })}
        </div>

        {showExplanation && (
          <div style={{
            padding: '16px',
            background: selectedAnswer === currentQuestion.correctAnswer ? '#DFFBF1' : '#FFF3DC',
            border: `1px solid ${selectedAnswer === currentQuestion.correctAnswer ? 'var(--green)' : 'var(--amber)'}`,
            borderRadius: 'var(--r)',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '20px' }}>{selectedAnswer === currentQuestion.correctAnswer ? '✅' : '💡'}</span>
              <strong style={{ fontSize: '14px', color: 'var(--dark)' }}>
                {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Explanation'}
              </strong>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--dark)', lineHeight: 1.6 }}>
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="btn btn-primary"
              style={{
                opacity: selectedAnswer === null ? 0.5 : 1,
                cursor: selectedAnswer === null ? 'not-allowed' : 'pointer'
              }}
            >
              Submit Answer
            </button>
          ) : (
            <>
              {currentQuestionIndex < questions.length - 1 ? (
                <button onClick={handleNextQuestion} className="btn btn-primary">
                  Next Question →
                </button>
              ) : (
                <button onClick={() => setIsStarted(false)} className="btn btn-primary">
                  Finish Session
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
