"use client"
import { useState } from 'react';
import Issuer from "@/components/Issuer"
import Verifier from "@/components/Verifier"

export default function Home() {
  const [showVerifier, setShowVerifier] = useState(false);

  return (
    <>
      {showVerifier ? <Verifier onBack={() => setShowVerifier(false)} /> : <Issuer onVerify={() => setShowVerifier(true)} />}
    </>
  )
}
