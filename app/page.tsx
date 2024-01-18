"use client"
import { useState } from 'react';
import Issuer from "@/components/Issuer";
import Verifier from "@/components/Verifier";
import BlackLister from "@/components/BlackLister";

export default function Home() {
  const [view, setView] = useState('issuer'); // 'issuer', 'verifier', 'blacklister'

  const showIssuer = () => setView('issuer');
  const showVerifier = () => setView('verifier');
  const showBlackLister = () => setView('blacklister');

  return (
    <>
      {view === 'issuer' && <Issuer onVerify={showVerifier} onBlackList={showBlackLister} />}
      {view === 'verifier' && <Verifier onBack={showIssuer} onBlackList={showBlackLister} />} 
      {view === 'blacklister' && <BlackLister goToIssuer={showIssuer} goToVerifier={showVerifier} />}
    </>
  );
}
