import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import Footer from '../components/Footer';

export default function GenericPage({ title, children }) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
            <PublicNavbar />
            <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">{title}</h1>
                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
