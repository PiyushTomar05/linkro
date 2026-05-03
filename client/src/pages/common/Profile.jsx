import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { uploadResume } from "../../api/agent";
import { uploadProfilePicture } from "../../api/users";
import { toast } from "react-hot-toast";

export default function Profile() {
    const { user, updateUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        role: user?.role || "",
        company: user?.company || "",
        skills: user?.skills || []
    });
    const [resumeData, setResumeData] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const fileInputRef = useRef(null);
    const photoInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate update
        toast.success("Profile updated successfully!");
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            toast.error("Please select an image file.");
            return;
        }

        setUploadingPhoto(true);
        try {
            const updatedUser = await uploadProfilePicture(file);
            updateUser(updatedUser);
            toast.success("Profile picture updated!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload profile picture.");
        } finally {
            setUploadingPhoto(false);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            await uploadResume(file);
            setResumeData(file.name);
            alert("Resume uploaded successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to upload resume.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-6 mb-8">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600 overflow-hidden border-4 border-white shadow-lg">
                            {user?.profilePicture ? (
                                <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                user?.name?.charAt(0)
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => photoInputRef.current?.click()}
                            disabled={uploadingPhoto}
                            className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-medium"
                        >
                            {uploadingPhoto ? '...' : 'Change'}
                        </button>
                        <input
                            type="file"
                            ref={photoInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
                        <p className="text-slate-500 capitalize">{user?.role}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        disabled
                        className="bg-slate-50 text-slate-500"
                    />
                    {user?.role === 'recruiter' && (
                        <Input
                            label="Company Name"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                    )}
                    {user?.role === 'agent' && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Skills (Comma separated)</label>
                            <input
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                                value={formData.skills}
                                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                placeholder="React, CSS, Node.js"
                            />
                        </div>
                    )}

                    {user?.role === 'agent' && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Resume / CV</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                >
                                    {uploading ? "Uploading..." : "Upload Resume"}
                                </Button>
                                {resumeData ? (
                                    <span className="text-sm text-slate-600">{resumeData}</span>
                                ) : user.resume ? (
                                    <span className="text-sm text-slate-600 truncate max-w-[200px]">{user.resume}</span>
                                ) : (
                                    <span className="text-sm text-slate-400">No resume uploaded</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                        </div>
                    )}

                    <div className="pt-4">
                        <Button type="submit">Save Changes</Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
