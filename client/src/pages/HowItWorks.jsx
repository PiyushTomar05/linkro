import React from 'react';
import { Link } from 'react-router-dom';
import {
    UserGroupIcon,
    BriefcaseIcon,
    CheckBadgeIcon,
    ArrowRightIcon,
    MagnifyingGlassIcon,
    PaperAirplaneIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import PublicNavbar from '../components/PublicNavbar';

const StepCard = ({ number, title, description, icon: Icon, colorClass }) => (
    <div className="relative pl-10 md:pl-0 group">
        <div className={`
      md:w-14 md:h-14 w-10 h-10 rounded-2xl flex items-center justify-center 
      text-white font-bold text-lg absolute left-0 md:left-1/2 md:-translate-x-1/2 
      ${colorClass} shadow-lg shadow-indigo-200 z-10 transition-transform duration-300 group-hover:scale-110
    `}>
            {number}
        </div>
        <div className="md:w-1/2 md:ml-auto md:pl-12 pb-16 relative border-l-2 md:border-l-0 border-slate-100 md:border-none last:border-0 pl-10">
            {/* Connector line for mobile */}
            <div className="absolute left-[-21px] top-10 bottom-0 w-0.5 bg-slate-100 md:hidden"></div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${colorClass.replace('bg-', 'bg-opacity-10 text-')}`}>
                    <Icon className={`w-7 h-7 ${colorClass.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-500 leading-relaxed">{description}</p>
            </div>
        </div>
    </div>
);

const RightStepCard = ({ number, title, description, icon: Icon, colorClass }) => (
    <div className="relative pl-10 md:pl-0 group">
        <div className={`
        md:w-14 md:h-14 w-10 h-10 rounded-2xl flex items-center justify-center 
        text-white font-bold text-lg absolute left-0 md:left-1/2 md:-translate-x-1/2 
        ${colorClass} shadow-lg shadow-indigo-200 z-10 transition-transform duration-300 group-hover:scale-110
      `}>
            {number}
        </div>
        <div className="md:w-1/2 md:mr-auto md:pr-12 pb-16 relative border-l-2 md:border-l-0 border-slate-100 md:border-none last:border-0 pl-10 md:pl-0 text-right">
            {/* Connector line for mobile */}
            <div className="absolute left-[-21px] top-10 bottom-0 w-0.5 bg-slate-100 md:hidden"></div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 md:items-end md:flex md:flex-col">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 md:ml-auto ${colorClass.replace('bg-', 'bg-opacity-10 text-')}`}>
                    <Icon className={`w-7 h-7 ${colorClass.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-500 leading-relaxed">{description}</p>
            </div>
        </div>
    </div>
);


export default function HowItWorks() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <PublicNavbar />

            {/* Header */}
            <div className="relative bg-slate-900 pt-40 pb-32 text-white text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                {/* Blobs */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-600 rounded-full blur-[128px] opacity-50"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-600 rounded-full blur-[128px] opacity-50"></div>

                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight">How Linkro Works</h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
                        We've simplified the hiring ecosystem. Whether you're hiring or hunting, our process is transparent, efficient, and effective.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100">

                    {/* For Recruiters Section */}
                    <div className="mb-32">
                        <div className="text-center mb-20">
                            <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 font-semibold tracking-wide uppercase text-xs mb-4">Recruiters</span>
                            <h2 className="text-4xl font-bold text-slate-900">Simplify Your Hiring</h2>
                        </div>

                        <div className="relative">
                            {/* Central line for desktop */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-200 to-transparent -z-10"></div>

                            <RightStepCard
                                number="1"
                                title="Post a Job"
                                description="Create detailed job listings with requirements, salary range, and specific skills needed. It takes less than 5 minutes."
                                icon={BriefcaseIcon}
                                colorClass="bg-indigo-600"
                            />

                            <StepCard
                                number="2"
                                title="Agents Submit Candidates"
                                description="Trusted agents in our network review your job and submit their best-fit pre-vetted candidates tailored to your needs."
                                icon={UserGroupIcon}
                                colorClass="bg-indigo-600"
                            />

                            <RightStepCard
                                number="3"
                                title="Review & Shortlist"
                                description="Access a curated list of applications. detailed profiles, resumes, and agent notes to make data-driven decisions."
                                icon={CheckBadgeIcon}
                                colorClass="bg-indigo-600"
                            />
                        </div>
                    </div>

                    {/* For Agents Section */}
                    <div>
                        <div className="text-center mb-20">
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 font-semibold tracking-wide uppercase text-xs mb-4">Agents</span>
                            <h2 className="text-4xl font-bold text-slate-900">Empower Your Talent</h2>
                        </div>

                        <div className="relative">
                            {/* Central line for desktop */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-200 to-transparent -z-10"></div>

                            <RightStepCard
                                number="1"
                                title="Browse Exclusive Jobs"
                                description="Access a wide range of job openings from top companies and recruiters that are looking for agency talent."
                                icon={MagnifyingGlassIcon}
                                colorClass="bg-blue-600"
                            />

                            <StepCard
                                number="2"
                                title="Submit Your Candidates"
                                description="Match your talent pool to open roles and submit applications directly with your professional endorsement."
                                icon={PaperAirplaneIcon}
                                colorClass="bg-blue-600"
                            />

                            <RightStepCard
                                number="3"
                                title="Track Progress"
                                description="Get real-time updates on application status, schedule interviews, and communicate directly with recruiters."
                                icon={ChatBubbleLeftRightIcon}
                                colorClass="bg-blue-600"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-white py-32 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-50 -z-10"></div>

                <h2 className="text-4xl font-bold text-slate-900 mb-8">Ready to transform your workflow?</h2>
                <Link
                    to="/register"
                    className="inline-flex items-center px-10 py-5 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                    Join Linkro Today
                    <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Link>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <div className="mb-4 md:mb-0">
                        <span className="font-bold text-slate-900 text-lg">Linkro</span>
                        <span className="mx-4">|</span>
                        &copy; {new Date().getFullYear()} Linkro Inc.
                    </div>
                </div>
            </footer>
        </div>
    );
}
