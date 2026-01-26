import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 text-left">
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-lg">
                                L
                            </div>
                            <span className="text-xl font-bold text-slate-900">
                                Linkro
                            </span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Connecting talent with opportunity through a seamless, intelligent platform designed for the future of work.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Platform</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500">
                            <li><Link to="/register" className="hover:text-indigo-600 transition-colors">Find Jobs</Link></li>
                            <li><Link to="/register?role=recruiter" className="hover:text-indigo-600 transition-colors">Post a Job</Link></li>
                            <li><Link to="/register" className="hover:text-indigo-600 transition-colors">Browse Agents</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500">
                            <li><Link to="/how-it-works" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-indigo-600 transition-colors">Careers</Link></li>
                            <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500">
                            <li><Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
                    <p>&copy; {new Date().getFullYear()} Linkro Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
