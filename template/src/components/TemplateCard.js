import React from 'react';
import './index.css';

function TemplateCard({ id, title }) {
  return (
    <div
      className="template-card"
      style={{
        padding: 'var(--spacing-md)',
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--spacing-sm)',
        boxShadow: 'var(--shadow-md)',
        fontSize: 'var(--font-size-base)',
      }}
    >
      {title}
    </div>
  );
}

export default TemplateCard;
