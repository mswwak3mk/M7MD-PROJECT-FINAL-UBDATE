import React, { useEffect, useState } from 'react';
import type { PortfolioData, TeacherFeedback } from '../types';
import AnimatedBackground from './AnimatedBackground';
import Card from './Card';
import NeonButton from './Button';
import { GamepadIcon, UserIcon, TrophyIcon, BrainCircuitIcon, TeacherIcon, CircuitBoardIcon, ControllerIcon, HelpCircleIcon } from './icons';
import SnakeGame from './SnakeGame';
import QuizGame from './QuizGame';
import MemoryGame from './MemoryGame';
import HangmanGame from './HangmanGame';
import TicTacToeGame from './TicTacToeGame';
import RockPaperScissorsGame from './RockPaperScissorsGame';
import ReactionTimeGame from './ReactionTimeGame';
import ClickerGame from './ClickerGame';

interface VisitorPageProps {
  data: PortfolioData;
  onAddTeacherFeedback: (feedback: Omit<TeacherFeedback, 'id'>) => void;
}

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
    <div className="flex items-center justify-center gap-4 mb-8">
        <div className="text-purple-400 drop-shadow-[0_0_5px_rgba(192,132,252,0.7)]">{icon}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            {title}
        </h2>
    </div>
);

const VisitorPage: React.FC<VisitorPageProps> = ({ data, onAddTeacherFeedback }) => {
  const { profile, achievements, skills, favoriteSubjects, teacherFeedback } = data;
  const [newFeedback, setNewFeedback] = useState({ teacherName: '', comment: '' });
  const [showMemoryGame, setShowMemoryGame] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (newFeedback.teacherName.trim() && newFeedback.comment.trim()) {
          onAddTeacherFeedback(newFeedback);
          setNewFeedback({ teacherName: '', comment: '' });
      }
  };

  useEffect(() => {
    const element = document.getElementById('hero-section');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <main className="relative isolate overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 p-4 md:p-8 max-w-5xl mx-auto">
            
            {/* Hero Section */}
            <header id="hero-section" className="text-center py-20">
                <div className="inline-block p-4 border-2 border-purple-500 rounded-full shadow-lg shadow-purple-500/50 mb-6">
                    <img src={profile.imageUrl} alt="الصورة الشخصية" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    مرحباً بكم في ملف إنجازي! <span className="text-green-400">🎮✨</span>
                </h1>
                <p className="max-w-3xl mx-auto text-lg text-gray-300">
                    أنا {profile.name} – طالب في الصف {profile.grade}، شغوف بالتقنية، الألعاب الإلكترونية، وتطوير المهارات. في هذا الموقع أعرض لكم رحلتي التعليمية والعملية، إنجازاتي، مهاراتي، واهتماماتي الدراسية، بتصميم مستوحى من عالم الـGaming.
                </p>
            </header>

            <div className="space-y-16">
                {/* About Me Section */}
                <section>
                    <SectionTitle icon={<UserIcon className="w-8 h-8"/>} title="عني" />
                    <Card glowColor="purple">
                        <ul className="space-y-4 text-lg">
                            <li><strong className="text-cyan-400 ml-2">الاسم:</strong> {profile.name}</li>
                            <li><strong className="text-cyan-400 ml-2">المرحلة:</strong> {profile.grade}</li>
                            <li><strong className="text-cyan-400 ml-2">الهوايات:</strong> {profile.hobbies.join(' – ')}</li>
                            <li><strong className="text-cyan-400 ml-2">الحلم:</strong> {profile.dream}</li>
                        </ul>
                    </Card>
                </section>

                {/* Quiz Game Section */}
                <section>
                    <SectionTitle icon={<HelpCircleIcon className="w-8 h-8" />} title="اختبر معلوماتك عني!" />
                    <Card glowColor="blue">
                        <QuizGame onQuizComplete={() => setShowMemoryGame(true)} />
                    </Card>
                </section>

                {/* Memory Game Section */}
                {showMemoryGame && (
                    <section>
                        <SectionTitle icon={<BrainCircuitIcon className="w-8 h-8"/>} title="لعبة الذاكرة" />
                        <Card glowColor="purple">
                            <MemoryGame />
                        </Card>
                    </section>
                )}

                {/* Achievements Section */}
                <section>
                    <SectionTitle icon={<TrophyIcon className="w-8 h-8"/>} title="إنجازاتي" />
                    <div className="grid md:grid-cols-2 gap-8">
                        {achievements.map((ach) => (
                            <Card key={ach.id} glowColor="green">
                                <div className="flex items-start gap-4">
                                    <div className="text-green-400 mt-1 drop-shadow-[0_0_5px_rgba(74,222,128,0.7)]"><CircuitBoardIcon className="w-6 h-6"/></div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-green-400 mb-2">{ach.title}</h3>
                                        <p className="text-gray-300">{ach.description}</p>
                                        {ach.proofUrl && <img src={ach.proofUrl} alt={ach.title} className="mt-4 rounded-lg w-full h-40 object-cover" />}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Snake Game Section */}
                <section>
                    <SectionTitle icon={<ControllerIcon className="w-8 h-8"/>} title="استراحة قصيرة" />
                    <Card glowColor="purple">
                        <SnakeGame />
                    </Card>
                </section>

                {/* More Games Section */}
                <section>
                    <SectionTitle icon={<GamepadIcon className="w-8 h-8"/>} title="المزيد من الألعاب" />
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card glowColor="green"><HangmanGame /></Card>
                        <Card glowColor="blue"><TicTacToeGame /></Card>
                        <Card glowColor="purple"><RockPaperScissorsGame /></Card>
                        <Card glowColor="green"><ReactionTimeGame /></Card>
                        <Card glowColor="blue" className="md:col-span-2"><ClickerGame /></Card>
                    </div>
                </section>
                
                <div className="grid md:grid-cols-2 gap-16">
                    {/* Skills Section */}
                    <section>
                        <SectionTitle icon={<GamepadIcon className="w-8 h-8"/>} title="مهاراتي" />
                        <div className="grid grid-cols-2 gap-4">
                            {skills.map((skill) => (
                                <Card key={skill.id} className="text-center" glowColor="blue">
                                    <p className="font-bold text-lg">{skill.name}</p>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Favorite Subjects Section */}
                    <section>
                        <SectionTitle icon={<BrainCircuitIcon className="w-8 h-8"/>} title="المواد المفضلة لدي" />
                        <div className="grid grid-cols-2 gap-4">
                            {favoriteSubjects.map((subject, index) => (
                                <Card key={index} className="text-center" glowColor="blue">
                                    <p className="font-bold text-lg">{subject}</p>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Teacher Feedback Section */}
                <section>
                    <SectionTitle icon={<TeacherIcon className="w-8 h-8"/>} title="آراء وتعليقات المعلمين" />
                    <div className="space-y-6">
                        {teacherFeedback.length > 0 ? teacherFeedback.map((feedback) => (
                            <Card key={feedback.id} glowColor="purple">
                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-500/20 p-3 rounded-full">
                                        <TeacherIcon className="w-6 h-6 text-purple-400 drop-shadow-[0_0_5px_rgba(192,132,252,0.7)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-purple-300">{feedback.teacherName}</h4>
                                        <p className="text-gray-300 italic">"{feedback.comment}"</p>
                                    </div>
                                </div>
                            </Card>
                        )) : (
                           <p className="text-center text-gray-400">لا توجد تعليقات بعد. كن أول من يترك تعليقاً!</p>
                        )}
                    </div>

                    <Card glowColor="green" className="mt-8">
                        <h3 className="text-xl font-bold text-green-300 mb-4">أضف تعليقك</h3>
                        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="teacherName" className="block text-sm font-medium text-gray-300 mb-1">الاسم</label>
                                <input
                                    id="teacherName"
                                    type="text"
                                    placeholder="اسم المعلم"
                                    value={newFeedback.teacherName}
                                    onChange={(e) => setNewFeedback({ ...newFeedback, teacherName: e.target.value })}
                                    className="w-full bg-[#1f2937] border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">التعليق</label>
                                <textarea
                                    id="comment"
                                    placeholder="اكتب تعليقك هنا..."
                                    value={newFeedback.comment}
                                    onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                                    className="w-full h-24 bg-[#1f2937] border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none resize-none"
                                    required
                                ></textarea>
                            </div>
                            <NeonButton type="submit" glowColor="green">إرسال التعليق</NeonButton>
                        </form>
                    </Card>
                </section>
            </div>
            
            {/* Footer */}
            <footer className="text-center py-12 mt-16 border-t border-gray-800">
                <p className="text-gray-400">© 2025 – ملف إنجاز الطالب {profile.name}</p>
                <p className="text-gray-500 text-sm">تم التصميم بأسلوب Gaming يعكس شغفي وطموحي في عالم التقنية.</p>
            </footer>
        </div>
    </main>
  );
};

export default VisitorPage;