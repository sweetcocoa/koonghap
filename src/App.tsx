import { useState } from 'react';
import Landing from './components/Landing';
import NameInput from './components/NameInput';
import Survey from './components/Survey';
import Transition from './components/Transition';
import ShareLink from './components/ShareLink';
import SharedLanding from './components/SharedLanding';
import Results from './components/Results';
import { getSharedDataFromUrl, getResultDataFromUrl, type SharedData, type SharedResultData } from './utils/sharing';

type Step =
  | 'landing'
  | 'name-a'
  | 'survey-a'
  | 'transition'
  | 'share-link'
  | 'name-b'
  | 'survey-b'
  | 'results'
  | 'shared-landing'
  | 'shared-name-b'
  | 'shared-survey-b'
  | 'shared-results';

type Mode = 'together' | 'share';

interface PersonData {
  name: string;
  answers: Record<number, number>;
}

interface InitialState {
  step: Step;
  sharedData: SharedData | null;
  resultData: SharedResultData | null;
  personA: PersonData;
  personB: PersonData;
}

function getInitialState(): InitialState {
  const resultData = getResultDataFromUrl();
  if (resultData) {
    window.history.replaceState({}, '', window.location.pathname);
    return {
      step: 'results' as Step,
      sharedData: null,
      resultData,
      personA: { name: resultData.nameA, answers: resultData.answersA },
      personB: { name: resultData.nameB, answers: resultData.answersB },
    };
  }

  const data = getSharedDataFromUrl();
  if (data) {
    window.history.replaceState({}, '', window.location.pathname);
    return {
      step: 'shared-landing' as Step,
      sharedData: data,
      resultData: null,
      personA: { name: data.name, answers: data.answers },
      personB: { name: '', answers: {} },
    };
  }

  return {
    step: 'landing' as Step,
    sharedData: null,
    resultData: null,
    personA: { name: '', answers: {} },
    personB: { name: '', answers: {} },
  };
}

const initial = getInitialState();

export default function App() {
  const [step, setStep] = useState<Step>(initial.step);
  const [mode, setMode] = useState<Mode>('together');
  const [personA, setPersonA] = useState<PersonData>(initial.personA);
  const [personB, setPersonB] = useState<PersonData>(initial.personB);
  const [sharedData, setSharedData] = useState<SharedData | null>(initial.sharedData);

  const handleRestart = () => {
    setStep('landing');
    setMode('together');
    setPersonA({ name: '', answers: {} });
    setPersonB({ name: '', answers: {} });
    setSharedData(null);
  };

  switch (step) {
    case 'landing':
      return (
        <Landing
          onStartTogether={() => {
            setMode('together');
            setStep('name-a');
          }}
          onStartShare={() => {
            setMode('share');
            setStep('name-a');
          }}
        />
      );

    case 'name-a':
      return (
        <NameInput
          label="첫 번째 사람"
          subtitle="이름 또는 닉네임을 입력하세요"
          onSubmit={(name) => {
            setPersonA(prev => ({ ...prev, name }));
            setStep('survey-a');
          }}
        />
      );

    case 'survey-a':
      return (
        <Survey
          personName={personA.name}
          onComplete={(answers) => {
            setPersonA(prev => ({ ...prev, answers }));
            if (mode === 'share') {
              setStep('share-link');
            } else {
              setStep('transition');
            }
          }}
        />
      );

    case 'transition':
      return (
        <Transition
          personAName={personA.name}
          onReady={() => setStep('name-b')}
        />
      );

    case 'share-link':
      return (
        <ShareLink
          personName={personA.name}
          answers={personA.answers}
          onBack={handleRestart}
        />
      );

    case 'name-b':
      return (
        <NameInput
          label="두 번째 사람"
          subtitle="이름 또는 닉네임을 입력하세요"
          onSubmit={(name) => {
            setPersonB(prev => ({ ...prev, name }));
            setStep('survey-b');
          }}
        />
      );

    case 'survey-b':
      return (
        <Survey
          personName={personB.name}
          onComplete={(answers) => {
            setPersonB(prev => ({ ...prev, answers }));
            setStep('results');
          }}
        />
      );

    case 'results':
      return (
        <Results
          nameA={personA.name}
          nameB={personB.name}
          answersA={personA.answers}
          answersB={personB.answers}
          onRestart={handleRestart}
        />
      );

    case 'shared-landing':
      return (
        <SharedLanding
          senderName={sharedData?.name ?? personA.name}
          onStart={() => setStep('shared-name-b')}
        />
      );

    case 'shared-name-b':
      return (
        <NameInput
          label="당신의 이름"
          subtitle={`${personA.name}님과의 궁합을 확인해보세요`}
          onSubmit={(name) => {
            setPersonB(prev => ({ ...prev, name }));
            setStep('shared-survey-b');
          }}
        />
      );

    case 'shared-survey-b':
      return (
        <Survey
          personName={personB.name}
          onComplete={(answers) => {
            setPersonB(prev => ({ ...prev, answers }));
            setStep('shared-results');
          }}
        />
      );

    case 'shared-results':
      return (
        <Results
          nameA={personA.name}
          nameB={personB.name}
          answersA={personA.answers}
          answersB={personB.answers}
          onRestart={handleRestart}
        />
      );
  }
}
