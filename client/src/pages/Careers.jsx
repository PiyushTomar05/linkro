import React from 'react';
import GenericPage from './GenericPage';

export default function Careers() {
    return (
        <GenericPage title="Join Our Team">
            <p className="text-lg mb-6">We are always looking for talented individuals to help us revolutionize the recruitment industry.</p>
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h3 className="font-bold text-indigo-900 mb-2">No Openings Currently</h3>
                <p>We don't have any open positions at the moment, but please check back later!</p>
            </div>
        </GenericPage>
    );
}
