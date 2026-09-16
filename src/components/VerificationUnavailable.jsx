import React from 'react';
import { Link } from 'react-router-dom';

export default function VerificationUnavailable() {
  return <section className="max-w-xl mx-auto p-6 space-y-4">
    <h1 className="text-xl font-semibold">Verification unavailable</h1>
    <p>Authoritative verified learning and certificate issuance are disabled until assessment, privacy, appeals and verification release gates pass. No certificate or skill is verified by this prototype.</p>
    <Link to="/" className="text-primary underline">Return home</Link>
  </section>;
}
