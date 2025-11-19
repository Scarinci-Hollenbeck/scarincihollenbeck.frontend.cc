import AttorneyPrintPage from 'components/pages/AttorneyPrintPage';
import React from 'react';

const ProfilePrint = ({ isRenderPdf, setIsPrintReady, printData }) => {
  if (!isRenderPdf) return null;

  return (
    <AttorneyPrintPage {...printData} onReady={() => setIsPrintReady(true)} />
  );
};

export default ProfilePrint;
