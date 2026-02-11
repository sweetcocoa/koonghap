export interface Question {
  id: number;
  text: string;
  leftLabel: string;
  rightLabel: string;
  type: 'alignment' | 'complementary';
  isDealbreaker: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  weight: number;
  questions: Question[];
}

export const categories: Category[] = [
  {
    id: 'core-values',
    name: '핵심 가치 & 성격',
    nameEn: 'Core Values & Personality',
    emoji: '\u2728',
    weight: 0.15,
    questions: [
      { id: 1, text: '나는 야심 찬 목표를 세우고 이를 끝까지 추구하는 편이다.', leftLabel: '흘러가는 대로', rightLabel: '반드시 달성한다', type: 'alignment', isDealbreaker: false },
      { id: 2, text: '나는 처음 만나는 사람과도 쉽게 대화를 시작할 수 있다.', leftLabel: '매우 어렵다', rightLabel: '매우 쉽다', type: 'alignment', isDealbreaker: false },
      { id: 3, text: '나는 계획 없이 즉흥적으로 행동하는 것을 즐긴다.', leftLabel: '철저한 계획파', rightLabel: '완전한 즉흥파', type: 'alignment', isDealbreaker: false },
      { id: 4, text: '나는 감정 표현을 솔직하고 직접적으로 하는 편이다.', leftLabel: '속으로 삼킨다', rightLabel: '바로 표현한다', type: 'alignment', isDealbreaker: false },
      { id: 5, text: '어려운 상황에서 유머로 분위기를 풀 수 있는 능력이 중요하다.', leftLabel: '전혀 중요하지 않다', rightLabel: '매우 중요하다', type: 'alignment', isDealbreaker: false },
      { id: 6, text: '나는 경쟁적인 환경에서 동기부여를 받는다.', leftLabel: '전혀 아니다', rightLabel: '매우 그렇다', type: 'alignment', isDealbreaker: false },
      { id: 7, text: '약속 시간에 늦는 것은 상대방에 대한 무례라고 생각한다.', leftLabel: '전혀 아니다', rightLabel: '매우 그렇다', type: 'alignment', isDealbreaker: false },
    ],
  },
  {
    id: 'relationship-style',
    name: '관계 스타일',
    nameEn: 'How We Relate',
    emoji: '\uD83D\uDC95',
    weight: 0.20,
    questions: [
      { id: 8, text: '연인과 하루 종일 연락하며 지내고 싶다.', leftLabel: '각자의 시간 필요', rightLabel: '항상 연락하고 싶다', type: 'alignment', isDealbreaker: false },
      { id: 9, text: '여가 시간의 대부분을 연인과 함께 보내고 싶다.', leftLabel: '전혀 아니다', rightLabel: '매우 그렇다', type: 'alignment', isDealbreaker: false },
      { id: 10, text: '연인이 나를 지적으로 자극해주는 것이 중요하다.', leftLabel: '중요하지 않다', rightLabel: '매우 중요하다', type: 'alignment', isDealbreaker: false },
      { id: 11, text: '연인이 내 단점을 솔직하게 지적해주길 원한다.', leftLabel: '있는 그대로 받아줘', rightLabel: '적극적으로 지적해줘', type: 'alignment', isDealbreaker: false },
      { id: 12, text: "'사랑해'라는 말은 자주 해야 한다.", leftLabel: '행동으로 충분하다', rightLabel: '자주 말해야 한다', type: 'alignment', isDealbreaker: false },
      { id: 13, text: '갈등이 생겼을 때 바로 대화로 해결하는 것을 선호한다.', leftLabel: '시간을 두고 정리', rightLabel: '즉시 대화로 해결', type: 'alignment', isDealbreaker: false },
      { id: 14, text: '연인의 소셜미디어 활동에 대해 관심을 갖는 편이다.', leftLabel: '전혀 신경 안 쓴다', rightLabel: '매우 관심이 많다', type: 'alignment', isDealbreaker: false },
      { id: 15, text: '관계에서 서프라이즈나 깜짝 이벤트는 중요하다.', leftLabel: '전혀 중요하지 않다', rightLabel: '매우 중요하다', type: 'alignment', isDealbreaker: false },
    ],
  },
  {
    id: 'relationship-goals',
    name: '원하는 관계',
    nameEn: 'What We Want',
    emoji: '\uD83D\uDC8D',
    weight: 0.15,
    questions: [
      { id: 16, text: '나는 장기적이고 진지한 관계를 원한다.', leftLabel: '가벼운 만남 선호', rightLabel: '인생의 동반자를 찾고 싶다', type: 'alignment', isDealbreaker: true },
      { id: 17, text: '충만한 삶에는 아이를 갖는 것이 포함된다.', leftLabel: '관심 없다', rightLabel: '꼭 갖고 싶다', type: 'alignment', isDealbreaker: true },
      { id: 18, text: '결혼은 인생에서 반드시 해야 하는 것이다.', leftLabel: '전혀 아니다', rightLabel: '매우 그렇다', type: 'alignment', isDealbreaker: true },
      { id: 19, text: '상대방의 외모는 관계에서 중요한 요소이다.', leftLabel: '전혀 중요하지 않다', rightLabel: '매우 중요하다', type: 'alignment', isDealbreaker: false },
      { id: 20, text: '나와 비슷한 학력·커리어 수준의 사람과 만나고 싶다.', leftLabel: '전혀 상관없다', rightLabel: '매우 중요하다', type: 'alignment', isDealbreaker: false },
      { id: 21, text: '장거리 연애도 충분히 할 수 있다.', leftLabel: '절대 불가능', rightLabel: '충분히 가능하다', type: 'alignment', isDealbreaker: false },
    ],
  },
  {
    id: 'lifestyle',
    name: '라이프스타일',
    nameEn: 'How We Live',
    emoji: '\uD83C\uDF1F',
    weight: 0.10,
    questions: [
      { id: 22, text: '나는 아침형 인간이다.', leftLabel: '완전한 올빼미', rightLabel: '완전한 아침형', type: 'alignment', isDealbreaker: false },
      { id: 23, text: '나는 매우 활동적인 생활을 한다. (운동, 야외활동 등)', leftLabel: '전혀 아니다', rightLabel: '매우 그렇다', type: 'alignment', isDealbreaker: false },
      { id: 24, text: '미래를 위한 저축보다 현재의 즐거움을 위한 소비를 선호한다.', leftLabel: '철저한 저축파', rightLabel: '인생은 한 번뿐', type: 'alignment', isDealbreaker: false },
      { id: 25, text: '나는 비싼 취향을 가지고 있다.', leftLabel: '전혀 아니다', rightLabel: '매우 그렇다', type: 'alignment', isDealbreaker: false },
      { id: 26, text: '연인이 술을 마시는 것에 대해 편안하다.', leftLabel: '불편하다', rightLabel: '전혀 상관없다', type: 'alignment', isDealbreaker: false },
      { id: 27, text: '연인이 대마초를 피우는 것에 대해 편안하다.', leftLabel: '절대 안 된다', rightLabel: '전혀 상관없다', type: 'alignment', isDealbreaker: false },
      { id: 28, text: '연인이 (대마초 외) 약물을 사용하는 것에 대해 편안하다.', leftLabel: '절대 안 된다', rightLabel: '전혀 상관없다', type: 'alignment', isDealbreaker: false },
      { id: 29, text: '깔끔하게 정리된 공간에서 생활하는 것이 중요하다.', leftLabel: '어질러도 괜찮다', rightLabel: '반드시 깔끔해야 한다', type: 'alignment', isDealbreaker: false },
      { id: 30, text: '요리를 좋아하고 자주 하는 편이다.', leftLabel: '전혀 안 한다', rightLabel: '매일 직접 요리한다', type: 'alignment', isDealbreaker: false },
      { id: 31, text: '반려동물을 키우는 것(또는 키우고 싶은 것)에 대해 긍정적이다.', leftLabel: '관심 없다', rightLabel: '매우 좋아한다', type: 'alignment', isDealbreaker: false },
      { id: 32, text: '여행을 자주 다니는 것이 중요하다.', leftLabel: '집이 최고다', rightLabel: '가능한 한 자주 떠나고 싶다', type: 'alignment', isDealbreaker: false },
    ],
  },
  {
    id: 'politics',
    name: '정치·사회적 관점',
    nameEn: 'What We Think',
    emoji: '\uD83C\uDF0D',
    weight: 0.15,
    questions: [
      { id: 33, text: '사회는 전통적 가치를 보존해야 한다.', leftLabel: '전혀 동의하지 않는다', rightLabel: '매우 동의한다', type: 'alignment', isDealbreaker: true },
      { id: 34, text: '나는 현 정부/정치 체제를 지지한다.', leftLabel: '전혀 지지하지 않는다', rightLabel: '매우 지지한다', type: 'alignment', isDealbreaker: false },
      { id: 35, text: '정치적 성향이 다른 사람과도 연애할 수 있다.', leftLabel: '절대 불가능', rightLabel: '전혀 상관없다', type: 'alignment', isDealbreaker: false },
      { id: 36, text: '낙태에 대한 접근권은 무조건적으로 보장되어야 한다.', leftLabel: '전혀 동의하지 않는다', rightLabel: '매우 동의한다', type: 'alignment', isDealbreaker: true },
      { id: 37, text: '전통적 성 역할(남성=생계, 여성=가사)에 동의한다.', leftLabel: '전혀 동의하지 않는다', rightLabel: '매우 동의한다', type: 'alignment', isDealbreaker: true },
      { id: 38, text: '기후변화 대응은 개인의 불편함보다 우선되어야 한다.', leftLabel: '전혀 동의하지 않는다', rightLabel: '매우 동의한다', type: 'alignment', isDealbreaker: false },
      { id: 39, text: '부의 재분배를 위한 높은 세금에 찬성한다.', leftLabel: '전혀 아니다', rightLabel: '매우 그렇다', type: 'alignment', isDealbreaker: false },
    ],
  },
  {
    id: 'career',
    name: '커리어 & 미래',
    nameEn: 'Career & Future',
    emoji: '\uD83D\uDE80',
    weight: 0.10,
    questions: [
      { id: 40, text: '커리어 성장이 워라밸(Work-Life Balance)보다 우선이다.', leftLabel: '삶을 위해 일한다', rightLabel: '일을 위해 산다', type: 'alignment', isDealbreaker: false },
      { id: 41, text: '연인보다 내 커리어가 더 중요하다.', leftLabel: '전혀 아니다', rightLabel: '매우 그렇다', type: 'alignment', isDealbreaker: false },
      { id: 42, text: '자녀를 명문 학교에 보내는 것이 중요하다.', leftLabel: '전혀 중요하지 않다', rightLabel: '매우 중요하다', type: 'alignment', isDealbreaker: false },
      { id: 43, text: '자녀를 종교적으로 양육하는 것이 중요하다.', leftLabel: '전혀 중요하지 않다', rightLabel: '매우 중요하다', type: 'alignment', isDealbreaker: true },
      { id: 44, text: '은퇴 후 도시보다 자연 속에서 살고 싶다.', leftLabel: '도시가 좋다', rightLabel: '자연 속이 좋다', type: 'alignment', isDealbreaker: false },
    ],
  },
  {
    id: 'emotions',
    name: '감정 & 친밀감',
    nameEn: 'Emotions & Intimacy',
    emoji: '\uD83D\uDD25',
    weight: 0.15,
    questions: [
      { id: 45, text: '관계 초기에 신체적 접촉(손잡기, 포옹 등)을 빨리 시작하는 편이다.', leftLabel: '매우 천천히', rightLabel: '매우 빠르게', type: 'alignment', isDealbreaker: false },
      { id: 46, text: '성관계까지 얼마나 시간을 두는 편인가?', leftLabel: '첫 데이트부터', rightLabel: '결혼 후에', type: 'alignment', isDealbreaker: false },
      { id: 47, text: '친밀한 관계에서 나는 주도적인 편이다.', leftLabel: '수동적인 편', rightLabel: '주도적인 편', type: 'complementary', isDealbreaker: false },
      { id: 48, text: '상대방에 대한 감사와 애정 표현을 자주 하는 편이다.', leftLabel: '거의 안 한다', rightLabel: '매우 자주 한다', type: 'alignment', isDealbreaker: false },
      { id: 49, text: '나는 사랑에 빠지는 속도가 빠른 편이다.', leftLabel: '매우 느리다', rightLabel: '매우 빠르다', type: 'alignment', isDealbreaker: false },
      { id: 50, text: '연인 관계에서 정서적으로 취약한 모습을 보여줄 수 있어야 한다.', leftLabel: '보여줄 필요 없다', rightLabel: '반드시 보여줄 수 있어야 한다', type: 'alignment', isDealbreaker: false },
    ],
  },
];

export const allQuestions: Question[] = categories.flatMap(c => c.questions);
export const totalQuestions = allQuestions.length;
