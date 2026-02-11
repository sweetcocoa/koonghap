import { useState } from 'react';

interface NameInputProps {
  label: string;
  subtitle?: string;
  onSubmit: (name: string) => void;
}

export default function NameInput({ label, subtitle, onSubmit }: NameInputProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="name-input-page">
      <div className="name-input-card">
        <h2>{label}</h2>
        {subtitle && <p className="name-subtitle">{subtitle}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="name-field"
            placeholder="이름 또는 닉네임"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            maxLength={20}
          />
          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={!name.trim()}
          >
            시작하기
          </button>
        </form>
      </div>
    </div>
  );
}
