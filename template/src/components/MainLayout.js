import React, { useState } from 'react';

const templates = [
  'Subjective',
  'Objective',
  'Assessment & Plan',
  'Findings',
  'Diagnosis',
  'Treatment',
  'Recovery', 
  'Objective', 
  'Assessment & Plan',
  'Treatment', 
];

const templateDetails = {
  Subjective: [
    {
      title: 'Subjective',
      content: ['Toothache for a few days'],
    },
    {
      title: 'History of Presenting Complaints',
      content: ['Toothache present for a few days'],
    },
    {
      title: 'Extra Oral Examination',
      content: ['Not performed'],
    },
    {
      title: 'Intra Oral Examination',
      content: ['Tenderness around molar', 'Swollen gums'],
    },
    {
      title: 'Radiographic Findings',
      content: ['X-ray planned to confirm extent of infection'],
    },
    {
      title: 'Diagnosis',
      content: ['Suspected tooth diseases'],
    },
  ],
};

function MainLayout() {
  const [activeTemplate, setActiveTemplate] = useState('Subjective');

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Template</h2>
        <input type="text" placeholder="Search Templates" />
        <div className="template-list">
          {templates.map((template) => (
            <div
              key={template}
              className={`template-item ${
                activeTemplate === template ? 'active' : ''
              }`}
              onClick={() => setActiveTemplate(template)}
            >
              {template}
            </div>
          ))}
          {/* Edit Button */}
          <button className="sidebar-edit-button">
            <img
            />
            Edit
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="content">
        <div className="content-header">
        <h2>
            Root Canal
            <i className="info-icon">i</i>
          </h2>
          <div className="action-buttons">
            <button>Resume</button>
             <button className="delete-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="delete-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a2 2 0 012-2h4a2 2 0 012 2m-6 0h6"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="content-body">
          {templateDetails[activeTemplate]?.map((section, index) => (
            <div key={index} className="content-section">
              <h3>{section.title}</h3>
              <ul>
                {section.content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-buttons">
          <button>Send Referral</button>
          <button>Save Note</button>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;