import { categories, type Category } from '../data/questions';

export interface CategoryResult {
  category: Category;
  score: number;
  rawScore: number;
  hasDealbreaker: boolean;
  dealbreakerQuestions: number[];
  questionScores: { questionId: number; score: number; diff: number }[];
}

export interface CompatibilityResult {
  totalScore: number;
  categoryResults: CategoryResult[];
  topMatches: { questionId: number; score: number }[];
  topDifferences: { questionId: number; score: number; diff: number }[];
}

function questionScore(
  a: number,
  b: number,
  type: 'alignment' | 'complementary',
): number {
  const diff = Math.abs(a - b);
  if (type === 'complementary') {
    return diff / 6;
  }
  return 1 - diff / 6;
}

export function calculateCompatibility(
  answersA: Record<number, number>,
  answersB: Record<number, number>,
): CompatibilityResult {
  const categoryResults: CategoryResult[] = [];
  const allScores: { questionId: number; score: number; diff: number }[] = [];

  for (const category of categories) {
    const questionScores: { questionId: number; score: number; diff: number }[] = [];
    let hasDealbreaker = false;
    const dealbreakerQuestions: number[] = [];

    for (const q of category.questions) {
      const a = answersA[q.id];
      const b = answersB[q.id];
      if (a === undefined || b === undefined) continue;

      const score = questionScore(a, b, q.type);
      const diff = Math.abs(a - b);
      questionScores.push({ questionId: q.id, score, diff });

      if (q.isDealbreaker && diff >= 5) {
        hasDealbreaker = true;
        dealbreakerQuestions.push(q.id);
      }
    }

    const rawScore =
      questionScores.length > 0
        ? questionScores.reduce((sum, qs) => sum + qs.score, 0) / questionScores.length
        : 0;

    const finalScore = hasDealbreaker ? rawScore * 0.7 : rawScore;

    categoryResults.push({
      category,
      score: finalScore,
      rawScore,
      hasDealbreaker,
      dealbreakerQuestions,
      questionScores,
    });

    allScores.push(...questionScores);
  }

  const totalScore =
    categoryResults.reduce((sum, cr) => sum + cr.category.weight * cr.score, 0) * 100;

  const sorted = [...allScores].sort((a, b) => b.score - a.score);
  const topMatches = sorted.slice(0, 3).map(s => ({ questionId: s.questionId, score: s.score }));
  const topDifferences = [...allScores]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map(s => ({ questionId: s.questionId, score: s.score, diff: s.diff }));

  return { totalScore, categoryResults, topMatches, topDifferences };
}

export function getCategoryComment(score: number, categoryId: string): string {
  const comments: Record<string, Record<string, string>> = {
    'core-values': {
      high: '핵심 가치관과 성격이 잘 맞아요!',
      mid: '가치관에서 일부 차이가 있지만, 서로 이해할 수 있는 범위예요.',
      low: '가치관 차이가 크네요. 대화를 통해 서로를 이해해보세요.',
    },
    'relationship-style': {
      high: '관계에서 원하는 방식이 비슷해요!',
      mid: '연애 스타일에 약간의 차이가 있어요. 조율이 필요할 수 있어요.',
      low: '연애 스타일이 꽤 달라요. 서로의 차이를 존중하는 게 중요해요.',
    },
    'relationship-goals': {
      high: '미래에 대한 기대가 일치해요!',
      mid: '원하는 관계의 방향에 일부 차이가 있어요.',
      low: '관계에 대한 기대가 많이 달라요. 진지한 대화가 필요해요.',
    },
    'lifestyle': {
      high: '생활 방식이 잘 맞아서 함께 지내기 편할 거예요!',
      mid: '라이프스타일에 약간의 차이가 있지만, 충분히 맞춰갈 수 있어요.',
      low: '생활 방식이 꽤 달라요. 서로의 공간과 시간을 존중해주세요.',
    },
    'politics': {
      high: '사회적 관점이 비슷해서 깊은 대화를 나누기 좋아요!',
      mid: '정치·사회적 관점에 차이가 있어요. 열린 마음으로 대화해보세요.',
      low: '정치·사회적 관점이 많이 달라요. 서로의 입장을 경청하는 게 중요해요.',
    },
    'career': {
      high: '커리어와 미래에 대한 생각이 잘 맞아요!',
      mid: '미래에 대한 계획이 약간 다르지만, 함께 조율할 수 있어요.',
      low: '미래에 대한 비전이 많이 달라요. 타협점을 찾아보세요.',
    },
    'emotions': {
      high: '감정적으로 깊이 연결될 수 있어요!',
      mid: '친밀감 표현 방식에 약간의 차이가 있어요.',
      low: '감정 표현과 친밀감에 대한 기대가 많이 달라요.',
    },
  };

  const cat = comments[categoryId];
  if (!cat) return '';

  if (score >= 0.7) return cat.high;
  if (score >= 0.4) return cat.mid;
  return cat.low;
}

export function getOverallComment(score: number): string {
  if (score >= 85) return '환상의 궁합이에요! 서로에게 완벽한 파트너가 될 수 있어요.';
  if (score >= 70) return '아주 잘 맞는 편이에요! 약간의 차이는 관계를 더 풍성하게 만들어줄 거예요.';
  if (score >= 55) return '꽤 괜찮은 궁합이에요. 서로의 차이를 이해하면 좋은 관계가 될 수 있어요.';
  if (score >= 40) return '차이가 있는 부분이 있지만, 노력하면 충분히 극복할 수 있어요.';
  return '많은 부분에서 차이가 있네요. 하지만 서로를 이해하려는 노력이 있다면 어떤 관계든 가능해요.';
}
