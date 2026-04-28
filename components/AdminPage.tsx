import React, { useState } from 'react';
import type { PortfolioData, Achievement, Skill } from '../types';
import Card from './Card';
import NeonButton from './Button';
import AnimatedBackground from './AnimatedBackground';
import { PlusIcon, TrashIcon, EditIcon, CameraIcon, TargetIcon, SparklesIcon } from 'lucide-react';

interface AdminPageProps {
  data: PortfolioData;
  onUpdateProfileImage: (file: File) => Promise<void>;
  onAddAchievement: (achievement: Omit<Achievement, 'id'>, imageFile?: File) => Promise<void>;
  onUpdateAchievement: (achievement: Achievement, imageFile?: File) => Promise<void>;
  onDeleteAchievement: (id: string) => Promise<void>;
  onAddSkill: (skill: Omit<Skill, 'id'>) => Promise<void>;
  onDeleteSkill: (id: string) => Promise<void>;
  onUpdateSkill: (skill: Skill) => Promise<void>;
  onUpdateNotes: (notes: string) => Promise<void>;
  onDeleteTeacherFeedback: (id: string) => Promise<void>;
}

const AdminPage: React.FC<AdminPageProps> = ({ 
    data, 
    onUpdateProfileImage,
    onAddAchievement,
    onUpdateAchievement,
    onDeleteAchievement,
    onAddSkill,
    onDeleteSkill,
    onUpdateSkill,
    onUpdateNotes,
    onDeleteTeacherFeedback,
}) => {
    const { profile, achievements, skills, personalNotes, teacherFeedback } = data;

    const [newAchievement, setNewAchievement] = useState({ title: '', description: ''});
    const [newAchievementFile, setNewAchievementFile] = useState<File | null>(null);

    const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
    const [editingAchievementFile, setEditingAchievementFile] = useState<File | null>(null);
    const [achievementToDelete, setAchievementToDelete] = useState<Achievement | null>(null);

    const [newSkillName, setNewSkillName] = useState('');
    const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
    const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
    const [editingSkillName, setEditingSkillName] = useState('');
    const [notes, setNotes] = useState(personalNotes);

    const [profilePreview, setProfilePreview] = useState<string | null>(null);
    const [isUploadingProfile, setIsUploadingProfile] = useState(false);

    const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Local preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            setIsUploadingProfile(true);
            try {
                await onUpdateProfileImage(file);
            } finally {
                setIsUploadingProfile(false);
                setProfilePreview(null);
            }
        }
    };
    
    const handleAchievementImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (editingAchievement) {
                setEditingAchievementFile(file);
            } else {
                setNewAchievementFile(file);
            }
        }
    };

    const handleSaveAchievement = async () => {
        if (editingAchievement) {
            if (editingAchievement.title && editingAchievement.description) {
                await onUpdateAchievement(editingAchievement, editingAchievementFile || undefined);
                setEditingAchievement(null);
                setEditingAchievementFile(null);
            }
        } else {
            if (newAchievement.title && newAchievement.description) {
                await onAddAchievement(newAchievement, newAchievementFile || undefined);
                setNewAchievement({ title: '', description: '' });
                setNewAchievementFile(null);
            }
        }
    };

    const handleAddNewSkill = async () => {
        if (newSkillName.trim()) {
            await onAddSkill({ name: newSkillName.trim() });
            setNewSkillName('');
        }
    };

    const handleStartEditSkill = (skill: Skill) => {
        setEditingSkillId(skill.id);
        setEditingSkillName(skill.name);
    };

    const handleSaveSkillEdit = async () => {
        if (editingSkillId && editingSkillName.trim()) {
            await onUpdateSkill({ id: editingSkillId, name: editingSkillName.trim() });
            setEditingSkillId(null);
            setEditingSkillName('');
        }
    };

    const handleNotesBlur = () => {
        onUpdateNotes(notes);
    };

  return (
    <div className="relative isolate min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10 p-4 md:p-8 max-w-5xl mx-auto">
        <header className="text-center py-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            مرحباً {profile.name}! 👋
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-300">
            من هنا يمكنك إدارة ملف إنجازك، إضافة المهارات الجديدة، تحديث صورتك، أو رفع مشاريعك بسهولة.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Profile Picture Section */}
            <Card glowColor="purple">
                <h2 className="text-2xl font-bold mb-4 text-purple-300 flex items-center gap-2">
                    <CameraIcon className="w-6 h-6" />
                    صورتي الشخصية
                </h2>
                <div className="relative w-40 h-40 mx-auto mb-6 group">
                    <img 
                        src={profilePreview || profile.imageUrl} 
                        alt={`الصورة الشخصية الحالية للطالب ${profile.name}`} 
                        className={`w-full h-full rounded-full object-cover border-4 border-purple-500 shadow-xl transition-all duration-300 ${isUploadingProfile ? 'opacity-50 blur-sm' : ''}`} 
                    />
                    {isUploadingProfile && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    <label className="absolute bottom-0 right-0 p-2 bg-cyan-500 rounded-full cursor-pointer hover:bg-cyan-400 transition-colors shadow-lg group-hover:scale-110">
                        <CameraIcon className="w-5 h-5 text-white" />
                        <input type="file" accept="image/*" className="hidden" aria-label="رفع صورة شخصية جديدة" onChange={handleProfileImageUpload} disabled={isUploadingProfile} />
                    </label>
                </div>
                <p className="text-center text-gray-400 text-sm leading-relaxed mb-4">الصورة تعكس هويتك الرقمية وشغفك. يمكنك استبدالها بصورة تعبر عن طموحك في عالم التقنية.</p>
            </Card>

            {/* Personal Notes Section */}
            <Card glowColor="blue">
                <h2 className="text-2xl font-bold mb-4 text-cyan-300">ملاحظاتي الشخصية</h2>
                <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onBlur={handleNotesBlur}
                    placeholder="اكتب ملاحظات لنفسك هنا..."
                    className="w-full h-48 bg-[#1f2937] border border-cyan-500 rounded-md p-4 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-gray-200 resize-none"
                ></textarea>
            </Card>
        </div>

        {/* Achievements Editor */}
        <section className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-6 text-green-400">إدارة الإنجازات</h2>
            <div className="space-y-4 mb-8">
                {achievements.map(ach => (
                    <Card key={ach.id} className="flex flex-col" glowColor="green">
                        <div className="flex justify-between items-start">
                                <div className="flex-1 flex gap-4 overflow-hidden">
                                    {ach.proofUrl && (
                                        <div className="w-16 h-16 flex-shrink-0 bg-gray-800 rounded border border-gray-700 overflow-hidden">
                                            <img src={ach.proofUrl} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-lg truncate text-green-400">{ach.title}</h3>
                                        <p className="text-sm text-gray-400 line-clamp-2">{ach.description}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-shrink-0 ml-4">
                                    <button 
                                        onClick={() => {
                                            setEditingAchievement(ach); 
                                            setEditingAchievementFile(null);
                                            const editor = document.getElementById('achievement-editor');
                                            if (editor) {
                                                window.scrollTo({ top: editor.offsetTop - 100, behavior: 'smooth' });
                                            }
                                        }} 
                                        className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors" 
                                        aria-label={`تعديل إنجاز: ${ach.title}`}
                                    >
                                        <EditIcon />
                                    </button>
                                    <button 
                                        onClick={() => setAchievementToDelete(ach)} 
                                        className="p-2 text-red-500 hover:text-red-400 transition-colors" 
                                        aria-label={`حذف إنجاز: ${ach.title}`}
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                        </div>
                    </Card>
                ))}
            </div>
            
            <Card id="achievement-editor" glowColor={editingAchievement ? "blue" : "green"}>
                <h3 className="text-2xl font-bold mb-4 text-gray-200">
                    {editingAchievement ? 'تعديل إنجاز' : 'إضافة إنجاز جديد'}
                </h3>
                 <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <input 
                                type="text" 
                                placeholder="عنوان الإنجاز"
                                value={editingAchievement ? editingAchievement.title : newAchievement.title}
                                onChange={(e) => editingAchievement ? setEditingAchievement({...editingAchievement, title: e.target.value}) : setNewAchievement({...newAchievement, title: e.target.value})}
                                className="w-full bg-[#1f2937] border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                            />
                            <textarea 
                                placeholder="وصف الإنجاز"
                                value={editingAchievement ? editingAchievement.description : newAchievement.description}
                                onChange={(e) => editingAchievement ? setEditingAchievement({...editingAchievement, description: e.target.value}) : setNewAchievement({...newAchievement, description: e.target.value})}
                                className="w-full h-32 bg-[#1f2937] border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none resize-none"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-4 bg-black/20">
                            {editingAchievement?.proofUrl && !editingAchievementFile && (
                                <div className="text-center mb-4">
                                    <p className="text-xs text-gray-500 mb-2">الصورة الحالية:</p>
                                    <img src={editingAchievement.proofUrl} alt="الحالية" className="w-32 h-32 object-cover rounded shadow-md border border-gray-600" />
                                </div>
                            )}
                            <label className="cursor-pointer text-center group">
                                <div className="bg-gray-800 p-4 rounded-full mb-2 group-hover:bg-gray-700 transition-colors">
                                    <PlusIcon className="w-8 h-8 text-cyan-400" />
                                </div>
                                <span className="text-sm font-bold text-gray-300">
                                    {editingAchievementFile || newAchievementFile ? 'تغيير الملف المحدد' : 'رفع صورة إثبات للإنجاز'}
                                </span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleAchievementImageUpload} />
                            </label>
                            {(editingAchievementFile || newAchievementFile) && (
                                <p className="mt-2 text-xs text-green-400 animate-pulse">تم تحديد ملف جديد بنجاح</p>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                        <NeonButton onClick={handleSaveAchievement} glowColor={editingAchievement ? "blue" : "green"}>
                            {editingAchievement ? 'حفظ التعديلات' : 'إضافة الإنجاز'}
                        </NeonButton>
                        {editingAchievement && (
                            <button 
                                onClick={() => {setEditingAchievement(null); setEditingAchievementFile(null);}} 
                                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                إلغاء
                            </button>
                        )}
                    </div>
                 </div>
            </Card>
        </section>

        {/* Skills Editor */}
        <section className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">إدارة المهارات</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                {skills.map(skill => (
                    <Card 
                        key={skill.id} 
                        className={`relative p-2 text-center group transition-all duration-300 ${editingSkillId === skill.id ? 'ring-2 ring-yellow-400 scale-105' : ''}`} 
                        glowColor={editingSkillId === skill.id ? "yellow" : "blue"}
                    >
                        {editingSkillId === skill.id ? (
                            <div className="flex flex-col gap-2 p-1">
                                <input 
                                    type="text"
                                    value={editingSkillName}
                                    onChange={(e) => setEditingSkillName(e.target.value)}
                                    className="w-full bg-[#111827] border border-yellow-500 rounded p-1 text-sm text-center focus:outline-none text-white"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSaveSkillEdit();
                                        if (e.key === 'Escape') setEditingSkillId(null);
                                    }}
                                />
                                <div className="flex justify-center gap-2">
                                    <button onClick={handleSaveSkillEdit} className="text-yellow-400 text-xs font-bold hover:underline">حفظ</button>
                                    <button onClick={() => setEditingSkillId(null)} className="text-gray-400 text-xs hover:underline">إلغاء</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-1 py-1">
                                <TargetIcon className="w-4 h-4 text-cyan-400/50 group-hover:text-cyan-400 transition-colors" />
                                <span className="block font-medium text-sm md:text-base">{skill.name}</span>
                                <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => handleStartEditSkill(skill)} 
                                        className="p-1 text-cyan-400 bg-[#111827] rounded-full hover:text-cyan-300 shadow-md"
                                        aria-label={`تعديل مهارة: ${skill.name}`}
                                    >
                                        <EditIcon className="w-3 h-3" />
                                    </button>
                                    <button 
                                        onClick={() => setSkillToDelete(skill)} 
                                        className="p-1 text-red-500 bg-[#111827] rounded-full hover:text-red-400 shadow-md" 
                                        aria-label={`حذف مهارة: ${skill.name}`}
                                    >
                                        <TrashIcon className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </Card>
                ))}
            </div>
            <Card glowColor="blue">
                 <h3 className="text-2xl font-bold mb-4 text-gray-200 flex items-center gap-2">
                    <SparklesIcon className="w-6 h-6 text-yellow-400" />
                    إضافة مهارة جديدة
                 </h3>
                 <div className="flex gap-4">
                    <input 
                        type="text" 
                        placeholder="اسم المهارة"
                        value={newSkillName}
                        onChange={(e) => setNewSkillName(e.target.value)}
                        className="flex-grow bg-[#1f2937] border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    <NeonButton onClick={handleAddNewSkill} glowColor="blue" className="px-4 py-2"><PlusIcon /></NeonButton>
                 </div>
            </Card>
        </section>

        {/* Teacher Feedback Management */}
        <section className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-6 text-purple-400">إدارة تعليقات المعلمين</h2>
            <div className="space-y-4">
                {teacherFeedback.length > 0 ? teacherFeedback.map(fb => (
                    <Card key={fb.id} className="flex justify-between items-center" glowColor="purple">
                        <div>
                            <h4 className="font-bold text-purple-300">{fb.teacherName}</h4>
                            <p className="text-sm text-gray-400 italic">"{fb.comment}"</p>
                        </div>
                        <button onClick={() => onDeleteTeacherFeedback(fb.id)} className="p-2 text-red-500 hover:text-red-400 flex-shrink-0" aria-label={`حذف تعليق المعلم: ${fb.teacherName}`}>
                            <TrashIcon />
                        </button>
                    </Card>
                )) : ( <p className="text-center text-gray-500">لا توجد تعليقات للمراجعة حالياً.</p> )}
            </div>
        </section>

        {/* Confirmation Modals */}
        {skillToDelete && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[110]" onClick={() => setSkillToDelete(null)} role="dialog" aria-modal="true" aria-labelledby="delete-skill-modal-title">
                <div className="relative w-full max-w-sm p-4" onClick={(e) => e.stopPropagation()}>
                    <Card glowColor="red" className="border-red-500/50">
                        <div className="text-center">
                            <h3 id="delete-skill-modal-title" className="text-2xl font-bold mb-4 text-red-400">تأكيد حذف المهارة</h3>
                            <p className="text-gray-300 mb-8 font-medium italic">
                                "هل أنت متأكد من رغبتك في حذف مهارة <span className="text-blue-400 font-bold">"{skillToDelete.name}"</span>؟"
                            </p>
                            <div className="flex justify-center gap-4">
                                <button 
                                    onClick={async () => {
                                        await onDeleteSkill(skillToDelete.id);
                                        setSkillToDelete(null);
                                    }}
                                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-2 rounded-md transition-all duration-300 shadow-lg shadow-red-500/30"
                                >
                                    حذف (Delete)
                                </button>
                                <button 
                                    onClick={() => setSkillToDelete(null)}
                                    className="px-8 py-2 text-gray-400 hover:text-white border border-gray-700 rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    إلغاء (Cancel)
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )}

        {achievementToDelete && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[110]" onClick={() => setAchievementToDelete(null)} role="dialog" aria-modal="true" aria-labelledby="delete-ach-modal-title">
                <div className="relative w-full max-w-sm p-4" onClick={(e) => e.stopPropagation()}>
                    <Card glowColor="red" className="border-red-500/50">
                        <div className="text-center">
                            <h3 id="delete-ach-modal-title" className="text-2xl font-bold mb-4 text-red-400">حذف الإنجاز</h3>
                            <p className="text-gray-300 mb-8 font-medium">
                                هل أنت متأكد من رغبتك في حذف إنجاز <span className="text-green-400 font-bold">"{achievementToDelete.title}"</span>؟
                            </p>
                            <div className="flex justify-center gap-4">
                                <button 
                                    onClick={async () => {
                                        await onDeleteAchievement(achievementToDelete.id);
                                        setAchievementToDelete(null);
                                    }}
                                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-2 rounded-md transition-all duration-300 shadow-lg shadow-red-500/30"
                                >
                                    حذف نهائي
                                </button>
                                <button 
                                    onClick={() => setAchievementToDelete(null)}
                                    className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    تراجع
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;