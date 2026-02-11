interface LandingProps {
  onStartTogether: () => void;
  onStartShare: () => void;
}

export default function Landing({ onStartTogether, onStartShare }: LandingProps) {
  return (
    <div className="landing">
      <div className="landing-content">
        <div className="landing-logo">
          <span className="logo-heart">&hearts;</span>
        </div>
        <h1 className="landing-title">궁합 테스트</h1>
        <p className="landing-subtitle">Date Drop Style Compatibility Test</p>
        <p className="landing-desc">
          50개의 가치관·라이프스타일 질문으로<br />
          두 사람의 호환성을 알아보세요.
        </p>

        <div className="landing-buttons">
          <button className="btn btn-primary" onClick={onStartTogether}>
            함께 테스트하기
            <span className="btn-sub">같은 기기에서 둘이 함께</span>
          </button>
          <button className="btn btn-secondary" onClick={onStartShare}>
            링크 보내기
            <span className="btn-sub">내가 먼저 답하고 링크 공유</span>
          </button>
        </div>

        <p className="landing-privacy">
          모든 데이터는 브라우저에서만 처리되며, 서버에 저장되지 않습니다.
        </p>
      </div>
    </div>
  );
}
