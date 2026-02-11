import { useState } from 'react';
import { encodeSharedData, getShareUrl } from '../utils/sharing';

interface ShareLinkProps {
  personName: string;
  answers: Record<number, number>;
  onBack: () => void;
}

export default function ShareLink({ personName, answers, onBack }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);

  const encoded = encodeSharedData(personName, answers);
  const url = getShareUrl(encoded);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('textarea');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '궁합 테스트',
          text: `${personName}님이 궁합 테스트를 보냈어요! 답변하고 결과를 확인해보세요.`,
          url,
        });
      } catch {
        // User cancelled share
      }
    }
  };

  return (
    <div className="share-page">
      <div className="share-card">
        <div className="share-icon">&hearts;</div>
        <h2>{personName}님의 답변 완료!</h2>
        <p>아래 링크를 상대방에게 공유해주세요.</p>
        <p className="share-desc">상대방이 답변을 완료하면 궁합 결과를 볼 수 있어요.</p>

        <div className="share-url-box">
          <div className="share-url-text">{url.length > 80 ? url.slice(0, 80) + '...' : url}</div>
        </div>

        <div className="share-buttons">
          <button className="btn btn-primary btn-full" onClick={handleCopy}>
            {copied ? '복사됨!' : '링크 복사'}
          </button>
          {typeof navigator.share === 'function' && (
            <button className="btn btn-secondary btn-full" onClick={handleShareNative}>
              공유하기
            </button>
          )}
        </div>

        <button className="btn btn-ghost" onClick={onBack} style={{ marginTop: '1rem' }}>
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
}
