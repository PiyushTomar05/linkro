import React from 'react';
import GenericPage from './GenericPage';

export default function Terms() {
    return (
        <GenericPage title="Terms of Service">
            <p className="text-lg mb-6 text-slate-500">Last updated: December 24, 2025</p>

            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">1. Acceptance of Terms</h2>
                    <p>By accessing or using Linkro, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">2. Use of Service</h2>
                    <p>You agree to use the service only for lawful purposes yourself and not to misuse the platform in any way.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">3. User Accounts</h2>
                    <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.</p>
                </section>
            </div>
        </GenericPage>
    );
}
