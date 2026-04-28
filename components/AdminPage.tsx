import React, { useState } from 'react';
import type { PortfolioData, Achievement, Skill } from '../types';
import Card from './Card';
import NeonButton from './Button';
import AnimatedBackground from './AnimatedBackground';
import { PlusIcon, TrashIcon, EditIcon } from './icons';

interface AdminPageProps {
  data: PortfolioData;
  onUpdateProfileImage: (file: File) => Promise<void>;
  onAddAchievement: (achievement: Omit<Achievement, 'id'>, imageFile?: File) => Promise<void>;
  onUpdateAchievement: (achievement: Achievement, imageFile?: File) => Promise<void>;
  onDeleteAchievement: (id: string) => Promise<void>;
  onAddSkill: (skill: Omit<Skill, 'id'>) => Promise<void>;
  onDeleteSkill: (id: string) => Promise<void>;
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
    onUpdateNotes,
    onDeleteTeacherFeedback,
}) => {
    const { profile, achievements, skills, personalNotes, teacherFeedback } = data;

    const [newAchievement, setNewAchievement] = useState({ title: '', description: ''});
    const [newAchievementFile, setNewAchievementFile] = useState<File | null>(null);

    const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
    const [editingAchievementFile, setEditingAchievementFile] = useState<File | null>(null);

    const [newSkillName, setNewSkillName] = useState('');
    const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
    const [notes, setNotes] = useState(personalNotes);

    const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            await onUpdateProfileImage(e.target.files[0]);
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
                <h2 className="text-2xl font-bold mb-4 text-purple-300">صورتي الشخصية</h2>
                <img src={profile.imageUrl} alt={`الصورة الشخصية الحالية للطالب ${profile.name}`} className="w-40 h-40 rounded-full object-cover mx-auto mb-4 border-4 border-purple-500" />
                <p className="text-center text-gray-400 mb-4">هذه صورتي الشخصية، وأستطيع تعديلها أو تغييرها في أي وقت. الصورة تمثل هويتي داخل الموقع وتعكس طموحي وشغفي في عالم التقنية والـGaming.</p>
                <div className="flex justify-center gap-4">
                    <label className="cursor-pointer">
                        <span className="inline-block bg-cyan-500/80 hover:bg-cyan-500 text-white font-bold px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-cyan-500/50">رفع صورة جديدة</span>
                        <input type="file" accept="image/*" className="hidden" aria-label="رفع صورة شخصية جديدة" onChange={handleProfileImageUpload} />
                    </label>
                </div>
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
                           <div className="flex-1">
                                <h3 className="font-bold text-lg">{ach.title}</h3>
                                <p className="text-sm text-gray-400">{ach.description}</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0 ml-4">
                                <button 
                                    onClick={() => {setEditingAchievement(ach); setEditingAchievementFile(null);}} 
                                    className="p-2 text-cyan-400 hover:text-cyan-300" 
                                    aria-label={`تعديل إنجاز: ${ach.title}`}
                                >
                                    <EditIcon />
                                </button>
                                <button 
                                    onClick={() => onDeleteAchievement(ach.id)} 
                                    className="p-2 text-red-500 hover:text-red-400" 
                                    aria-label={`حذف إنجاز: ${ach.title}`}
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            
            <Card glowColor={editingAchievement ? "blue" : "green"}>
                <h3 className="text-2xl font-bold mb-4 text-gray-200">{editingAchievement ? 'تعديل إنجاز' : 'إضافة إنجاز جديد'}</h3>
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
                        className="w-full h-24 bg-[#1f2937] border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none resize-none"
                    />
                    <div className="flex items-center gap-4">
                        <label className="cursor-pointer">
                            <span className="text-sm text-cyan-400 hover:underline">رفع ملف أو صورة إثبات</span>
                            <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleAchievementImageUpload} />
                        </label>
                        {(editingAchievementFile || newAchievementFile) && <span className="text-sm text-green-400">تم تحديد ملف جديد.</span>}
                    </div>
                    <div className="flex gap-4">
                        <NeonButton onClick={handleSaveAchievement} glowColor="green">{editingAchievement ? 'حفظ التعديلات' : 'إضافة الإنجاز'}</NeonButton>
                        {editingAchievement && <button onClick={() => setEditingAchievement(null)} className="text-gray-400 hover:text-white">إلغاء</button>}
                    </div>
                 </div>
            </Card>
        </section>

        {/* Skills Editor */}
        <section className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">إدارة المهارات</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                {skills.map(skill => (
                    <Card key={skill.id} className="relative p-4 text-center group" glowColor="blue">
                        <span>{skill.name}</span>
                        <button onClick={() => setSkillToDelete(skill)} className="absolute top-1 right-1 p-1 text-red-500 bg-[#111827] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label={`حذف مهارة: ${skill.name}`}>
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </Card>
                ))}
            </div>
            <Card glowColor="blue">
                 <h3 className="text-2xl font-bold mb-4 text-gray-200">إضافة مهارة جديدة</h3>
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

        {/* Delete Confirmation Modal */}
        {skillToDelete && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[110]" onClick={() => setSkillToDelete(null)} role="dialog" aria-modal="true" aria-labelledby="delete-skill-modal-title">
                <div className="relative w-full max-w-sm p-4" onClick={(e) => e.stopPropagation()}>
                    <Card glowColor="red" className="border-red-500/50">
                        <div className="text-center">
                            <h3 id="delete-skill-modal-title" className="text-2xl font-bold mb-4 text-red-400">تأكيد الحذف</h3>
                            <p className="text-gray-300 mb-8 font-medium">
                                هل أنت متأكد من رغبتك في حذف مهارة <span className="text-blue-400 font-bold">"{skillToDelete.name}"</span>؟ لا يمكن التراجع عن هذا الإجراء.
                            </p>
                            <div className="flex justify-center gap-4">
                                <button 
                                    onClick={async () => {
                                        await onDeleteSkill(skillToDelete.id);
                                        setSkillToDelete(null);
                                    }}
                                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-2 rounded-md transition-all duration-300 shadow-lg shadow-red-500/30"
                                >
                                    حذف المهارة
                                </button>
                                <button 
                                    onClick={() => setSkillToDelete(null)}
                                    className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    إلغاء
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