interface TransitionProps {
  personAName: string;
  onReady: () => void;
}

export default function Transition({ personAName, onReady }: TransitionProps) {
  return (
    <div className="transition-page">
      <div className="transition-card">
        <div className="transition-check">&#10003;</div>
        <h2>{personAName}님의 답변이 완료되었어요!</h2>
        <p>이제 상대방에게 기기를 넘겨주세요.</p>
        <p className="transition-note">
          {personAName}님의 답변은 안전하게 저장되었습니다.
        </p>
        <button className="btn btn-primary btn-full" onClick={onReady}>
          상대방 답변 시작
        </button>
      </div>
    </div>
  );
}
