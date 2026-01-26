import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, DocumentTextIcon, CheckBadgeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Button from './ui/Button';
import { Link } from 'react-router-dom';

export default function ApplicationModal({ isOpen, onClose, onApply, jobTitle, hasResume }) {
    const [coverLetter, setCoverLetter] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await onApply(coverLetter);
            onClose();
            setCoverLetter(""); // Reset on success
        } catch (error) {
            // Error handling should be done by parent or here if passed down
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all border border-slate-100">
                                <div className="flex justify-between items-start mb-4">
                                    <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-slate-900">
                                        Apply to {jobTitle}
                                    </Dialog.Title>
                                    <button onClick={onClose} className="text-slate-400 hover:text-slate-500">
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>
                                </div>

                                {!hasResume ? (
                                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
                                        <div className="flex gap-3">
                                            <ExclamationTriangleIcon className="w-6 h-6 text-amber-600 shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-amber-800 text-sm">Resume Missing</h4>
                                                <p className="text-sm text-amber-700 mt-1">You need to upload a resume to your profile before applying for jobs.</p>
                                                <Link to="/profile" onClick={onClose} className="text-sm font-bold text-amber-800 underline mt-2 block hover:text-amber-900">Go to Profile</Link>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3">
                                            <DocumentTextIcon className="w-6 h-6 text-indigo-600" />
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">Resume Attached</p>
                                                <p className="text-xs text-slate-500">Your default resume will be sent.</p>
                                            </div>
                                            <CheckBadgeIcon className="w-5 h-5 text-emerald-500 ml-auto" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Cover Letter (Optional)</label>
                                            <textarea
                                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 min-h-[120px]"
                                                placeholder="Introduce yourself and explain why you're a good fit..."
                                                value={coverLetter}
                                                onChange={(e) => setCoverLetter(e.target.value)}
                                            />
                                        </div>

                                        <div className="pt-2 flex justify-end gap-3">
                                            <Button type="button" variant="secondary" onClick={onClose} disabled={submitting}>Cancel</Button>
                                            <Button type="submit" loading={submitting}>Submit Application</Button>
                                        </div>
                                    </form>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
