interface SharedLandingProps {
  senderName: string;
  onStart: () => void;
}

export default function SharedLanding({ senderName, onStart }: SharedLandingProps) {
  return (
    <div className="shared-landing">
      <div className="shared-landing-card">
        <div className="shared-landing-icon">&hearts;</div>
        <h2>{senderName}님이<br />궁합 테스트를 보냈어요!</h2>
        <p>
          50개의 질문에 답하면<br />
          두 사람의 호환성 결과를 확인할 수 있어요.
        </p>
        <button className="btn btn-primary btn-full" onClick={onStart}>
          답변 시작하기
        </button>
      </div>
    </div>
  );
}
