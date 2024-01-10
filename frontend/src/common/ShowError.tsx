import React from 'react';

const showError: React.FC = (fieldErrors: any) => {
  return (
    <div>
      {Object.keys(fieldErrors).map((fieldName, index) => (
        <p key={index} style={{ color: 'red' }}>
          {fieldErrors[fieldName]}
        </p>
      ))}
    </div>
  );
};

export default showError;
