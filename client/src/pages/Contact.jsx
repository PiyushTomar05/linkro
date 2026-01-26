import React from 'react';
import GenericPage from './GenericPage';
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function Contact() {
    return (
        <GenericPage title="Contact Us">
            <p className="text-lg mb-8">Have questions? We'd love to hear from you.</p>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <EnvelopeIcon className="w-8 h-8 text-indigo-600 mb-4" />
                    <h3 className="font-bold text-slate-900 mb-2">Email Us</h3>
                    <p className="text-slate-500">support@linkro.com</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <MapPinIcon className="w-8 h-8 text-indigo-600 mb-4" />
                    <h3 className="font-bold text-slate-900 mb-2">Visit Us</h3>
                    <p className="text-slate-500">123 Innovation Drive, Tech City, TC 90210</p>
                </div>
            </div>
        </GenericPage>
    );
}
