import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRightIcon, BriefcaseIcon, UserGroupIcon, StarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import PublicNavbar from '../components/PublicNavbar';
import Footer from '../components/Footer';

export default function LandingPage() {
    const [stats, setStats] = useState({
        companies: 0,
        candidates: 0,
        placements: 0,
        satisfaction: 98
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/stats');
                setStats(res.data);
            } catch (err) {
                console.error('Failed to fetch stats', err);
                // Fallback or keep defaults
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-indigo-500 selection:text-white font-sans text-slate-900">
            <PublicNavbar />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-5xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600 mb-8 animate-[fadeIn_0.5s_ease-out]">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Revolutionizing Recruitment
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1] animate-[slideUp_0.5s_ease-out]">
                            Connect Unique <br />
                            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
                                Talent with Opportunity
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-500 mb-10 leading-relaxed animate-[slideUp_0.7s_ease-out]">
                            Linkro bridges the gap between ambitious professionals, recruitment agents, and world-class companies. The future of hiring is here.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-[slideUp_0.9s_ease-out]">
                            <Link
                                to="/register?role=recruiter"
                                className="group px-8 py-4 rounded-full bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                Start Hiring
                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/register"
                                className="px-8 py-4 rounded-full bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                Find Jobs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase mb-3">Ecosystem</h2>
                        <h3 className="text-4xl font-bold text-slate-900 mb-6">Empowering Everyone</h3>
                        <p className="text-lg text-slate-500">
                            Whether you're an agent, recruiter, or admin, Linkro provides the specialized tools you need to succeed in the modern job market.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <BriefcaseIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">For Agents</h3>
                            <p className="text-slate-500 leading-relaxed mb-6">
                                Manage candidate pools, track applications in real-time, and get insights into job market trends.
                            </p>
                            <ul className="space-y-3">
                                {['Real-time tracking', 'Candidate pools', 'Market insights'].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm text-slate-600">
                                        <CheckCircleIcon className="w-5 h-5 text-blue-500 mr-2" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1">
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                <UserGroupIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">For Recruiters</h3>
                            <p className="text-slate-500 leading-relaxed mb-6">
                                Post jobs, filter candidates effectively, and streamline your hiring pipeline with ease.
                            </p>
                            <ul className="space-y-3">
                                {['Job posting', 'Smart filtering', 'Pipeline management'].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm text-slate-600">
                                        <CheckCircleIcon className="w-5 h-5 text-indigo-500 mr-2" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1">
                            <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                                <StarIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Admin Control</h3>
                            <p className="text-slate-500 leading-relaxed mb-6">
                                Complete oversight of the platform with detailed logs, analytics, and user management.
                            </p>
                            <ul className="space-y-3">
                                {['User management', 'System logs', 'Detailed analytics'].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm text-slate-600">
                                        <CheckCircleIcon className="w-5 h-5 text-violet-500 mr-2" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500 rounded-full blur-[100px] opacity-30"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-500 rounded-full blur-[100px] opacity-30"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divider-x">
                        <div className="p-4">
                            <div className="text-5xl font-black mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{stats.companies}+</div>
                            <div className="text-slate-400 font-medium tracking-wide uppercase text-sm">Companies</div>
                        </div>
                        <div className="p-4">
                            <div className="text-5xl font-black mb-2 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{stats.candidates}+</div>
                            <div className="text-slate-400 font-medium tracking-wide uppercase text-sm">Candidates</div>
                        </div>
                        <div className="p-4">
                            <div className="text-5xl font-black mb-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">{stats.placements}</div>
                            <div className="text-slate-400 font-medium tracking-wide uppercase text-sm">Placements</div>
                        </div>
                        <div className="p-4">
                            <div className="text-5xl font-black mb-2 bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">{stats.satisfaction}%</div>
                            <div className="text-slate-400 font-medium tracking-wide uppercase text-sm">Satisfaction</div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
