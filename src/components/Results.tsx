import { allQuestions } from '../data/questions';
import {
  calculateCompatibility,
  getCategoryComment,
  getOverallComment,
} from '../utils/scoring';

interface ResultsProps {
  nameA: string;
  nameB: string;
  answersA: Record<number, number>;
  answersB: Record<number, number>;
  onRestart: () => void;
}

function CircularGauge({ score }: { score: number }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 75) return '#ff6b6b';
    if (s >= 50) return '#ffa94d';
    return '#868e96';
  };

  return (
    <div className="gauge-container">
      <svg className="gauge-svg" viewBox="0 0 160 160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#f1f3f5"
          strokeWidth="12"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 80 80)"
          className="gauge-fill"
        />
      </svg>
      <div className="gauge-text">
        <span className="gauge-number">{Math.round(score)}</span>
        <span className="gauge-percent">%</span>
      </div>
    </div>
  );
}

function getQuestionText(id: number): string {
  return allQuestions.find(q => q.id === id)?.text ?? '';
}

export default function Results({ nameA, nameB, answersA, answersB, onRestart }: ResultsProps) {
  const result = calculateCompatibility(answersA, answersB);

  return (
    <div className="results">
      <div className="results-header">
        <h1>{nameA} &amp; {nameB}</h1>
        <p className="results-subtitle">궁합 결과</p>
      </div>

      <div className="results-gauge-section">
        <CircularGauge score={result.totalScore} />
        <p className="results-overall-comment">{getOverallComment(result.totalScore)}</p>
      </div>

      <div className="results-categories">
        <h3>카테고리별 호환성</h3>
        {result.categoryResults.map(cr => (
          <div key={cr.category.id} className="category-result">
            <div className="category-result-header">
              <span className="category-result-emoji">{cr.category.emoji}</span>
              <span className="category-result-name">{cr.category.name}</span>
              <span className="category-result-score">
                {Math.round(cr.score * 100)}%
              </span>
            </div>
            <div className="category-bar">
              <div
                className={`category-bar-fill ${cr.hasDealbreaker ? 'dealbreaker' : ''}`}
                style={{ width: `${cr.score * 100}%` }}
              />
            </div>
            {cr.hasDealbreaker && (
              <div className="dealbreaker-warning">
                &#9888; 이 카테고리에서 큰 차이가 발견되었어요
              </div>
            )}
            <p className="category-comment">
              {getCategoryComment(cr.score, cr.category.id)}
            </p>
          </div>
        ))}
      </div>

      <div className="results-highlights">
        <div className="highlight-section">
          <h3>&#x1F91D; 가장 잘 맞는 항목</h3>
          {result.topMatches.map(m => (
            <div key={m.questionId} className="highlight-item match">
              <span className="highlight-q">Q{m.questionId}</span>
              <span className="highlight-text">{getQuestionText(m.questionId)}</span>
              <span className="highlight-score">{Math.round(m.score * 100)}%</span>
            </div>
          ))}
        </div>

        <div className="highlight-section">
          <h3>&#x26A1; 가장 다른 항목</h3>
          {result.topDifferences.map(d => (
            <div key={d.questionId} className="highlight-item diff">
              <span className="highlight-q">Q{d.questionId}</span>
              <span className="highlight-text">{getQuestionText(d.questionId)}</span>
              <span className="highlight-score">{Math.round(d.score * 100)}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="results-detail">
        <h3>&#x1F4CA; 문항별 상세 비교</h3>
        {result.categoryResults.map(cr => (
          <div key={cr.category.id} className="detail-category">
            <h4>{cr.category.emoji} {cr.category.name}</h4>
            <div className="detail-questions">
              {cr.questionScores.map(qs => {
                const q = allQuestions.find(qq => qq.id === qs.questionId)!;
                return (
                  <div key={qs.questionId} className="detail-question">
                    <div className="detail-question-text">
                      <span className="detail-q-num">Q{qs.questionId}</span>
                      {q.text}
                    </div>
                    <div className="detail-answers">
                      <div className="detail-answer">
                        <span className="detail-name">{nameA}</span>
                        <div className="detail-dots">
                          {[1, 2, 3, 4, 5, 6, 7].map(v => (
                            <span
                              key={v}
                              className={`detail-dot ${answersA[qs.questionId] === v ? 'active-a' : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="detail-answer">
                        <span className="detail-name">{nameB}</span>
                        <div className="detail-dots">
                          {[1, 2, 3, 4, 5, 6, 7].map(v => (
                            <span
                              key={v}
                              className={`detail-dot ${answersB[qs.questionId] === v ? 'active-b' : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="detail-labels">
                      <span>{q.leftLabel}</span>
                      <span>{q.rightLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="results-footer">
        <button className="btn btn-primary btn-full" onClick={onRestart}>
          다시 테스트하기
        </button>
      </div>
    </div>
  );
}
