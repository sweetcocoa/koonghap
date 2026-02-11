import { useState } from 'react';
import { categories, totalQuestions } from '../data/questions';

interface SurveyProps {
  personName: string;
  onComplete: (answers: Record<number, number>) => void;
}

export default function Survey({ personName, onComplete }: SurveyProps) {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showIncomplete, setShowIncomplete] = useState(false);

  const category = categories[currentCategory];
  const totalCategories = categories.length;
  const progress = ((currentCategory) / totalCategories) * 100;

  const isLastPage = currentCategory === totalCategories - 1;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setShowIncomplete(false);
  };

  const handleNext = () => {
    if (!isLastPage) {
      setCurrentCategory(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (allAnswered) {
      onComplete(answers);
    } else {
      setShowIncomplete(true);
    }
  };

  const handlePrev = () => {
    if (currentCategory > 0) {
      setCurrentCategory(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowIncomplete(false);
    }
  };

  const unansweredInCategory = category.questions.filter(q => answers[q.id] === undefined);

  return (
    <div className="survey">
      <div className="survey-header">
        <div className="survey-person">{personName}님의 답변</div>
        <div className="survey-progress-bar">
          <div className="survey-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="survey-progress-text">
          {answeredCount}/{totalQuestions} 완료
        </div>
      </div>

      <div className="survey-category-header">
        <span className="category-emoji">{category.emoji}</span>
        <div>
          <h2 className="category-name">{category.name}</h2>
          <p className="category-name-en">{category.nameEn}</p>
        </div>
        <span className="category-count">{currentCategory + 1}/{totalCategories}</span>
      </div>

      <div className="questions-list">
        {category.questions.map((q, idx) => (
          <div key={q.id} className="question-card">
            <div className="question-number">Q{q.id}</div>
            <p className="question-text">{q.text}</p>
            <div className="likert-labels">
              <span className="likert-label-left">{q.leftLabel}</span>
              <span className="likert-label-right">{q.rightLabel}</span>
            </div>
            <div className="likert-scale">
              {[1, 2, 3, 4, 5, 6, 7].map(v => (
                <button
                  key={v}
                  className={`likert-btn ${answers[q.id] === v ? 'selected' : ''}`}
                  onClick={() => handleAnswer(q.id, v)}
                  aria-label={`${v}점`}
                  tabIndex={idx * 7 + v}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showIncomplete && (
        <div className="survey-incomplete">
          아직 응답하지 않은 문항이 {totalQuestions - answeredCount}개 있어요.
          {unansweredInCategory.length > 0 && (
            <span> (이 페이지: {unansweredInCategory.map(q => `Q${q.id}`).join(', ')})</span>
          )}
        </div>
      )}

      <div className="survey-nav">
        <button
          className="btn btn-ghost"
          onClick={handlePrev}
          disabled={currentCategory === 0}
        >
          이전
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={isLastPage && !allAnswered && showIncomplete}
        >
          {isLastPage ? '완료' : '다음'}
        </button>
      </div>
    </div>
  );
}
