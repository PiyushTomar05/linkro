import React from 'react';
import GenericPage from './GenericPage';

export default function Privacy() {
    return (
        <GenericPage title="Privacy Policy">
            <p className="text-lg mb-6 text-slate-500">Last updated: December 24, 2025</p>

            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">1. Information We Collect</h2>
                    <p>We collect information you provide directly to us when you create an account, update your profile, or communicate with us. This includes your name, email, phone number, and professional details.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">2. How We Use Your Information</h2>
                    <p>We use the information we collect to provide, maintain, and improve our services, to match candidates with recruiters, and to communicate with you.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">3. Data Security</h2>
                    <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
                </section>
            </div>
        </GenericPage>
    );
}
