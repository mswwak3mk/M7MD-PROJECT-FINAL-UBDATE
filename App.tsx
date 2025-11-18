import React, { useState, useEffect } from 'react';
// Fix: Update Firebase imports for v8 compatibility
// Fix: Use firebase v9 compat libraries to support v8 namespaced API.
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import type { PortfolioData, Achievement, Skill, TeacherFeedback } from './types';
import { INITIAL_DATA } from './constants';
import { portfolioDocRef, storage } from './firebase';
import VisitorPage from './components/VisitorPage';
import AdminPage from './components/AdminPage';
import GamesPage from './components/GamesPage';
import AnimatedBackground from './components/AnimatedBackground';
import AdminLoginModal from './components/AdminLoginModal';
import { AdminIcon } from './components/icons';

const App: React.FC = () => {
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<'main' | 'games'>('main');
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fix: Use v8 syntax for getting a document
        const docSnap = await portfolioDocRef.get();
        if (docSnap.exists) {
          setData(docSnap.data() as PortfolioData);
        } else {
          // Fix: Use v8 syntax for setting a document
          await portfolioDocRef.set(INITIAL_DATA);
          setData(INITIAL_DATA);
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setData(INITIAL_DATA); // Fallback on error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdminToggle = () => {
    if (isAdminView) {
      setIsAdminView(false);
    } else {
      if (isAuthenticated) {
        setIsAdminView(true);
      } else {
        setIsLoginModalOpen(true);
      }
    }
  };

  const handleLoginAttempt = (password: string) => {
    if (password === '7520') {
      setIsAuthenticated(true);
      setIsAdminView(true);
      setIsLoginModalOpen(false);
    } else {
      alert("رمز الدخول غير صحيح!");
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
  };

  const handleUpdateProfileImage = async (imageFile: File) => {
    if (!data) return;
    setLoading(true);
    try {
      // Fix: Use v8 syntax for storage reference and upload
      const storageRef = storage.ref('profileImage');
      const base64 = await fileToBase64(imageFile);
      await storageRef.putString(base64, 'data_url');
      const imageUrl = await storageRef.getDownloadURL();
      
      const updatedProfile = { ...data.profile, imageUrl };
      // Fix: Use v8 syntax for updating a document
      await portfolioDocRef.update({ profile: updatedProfile });
      setData(prev => prev ? { ...prev, profile: updatedProfile } : null);
    } catch (error) {
      console.error("Error updating profile image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAchievement = async (newAchievement: Omit<Achievement, 'id'>, imageFile?: File) => {
    if (!data) return;
    setLoading(true);
    const id = Date.now().toString();
    let achievementToAdd: Achievement = { ...newAchievement, id };

    try {
      if (imageFile) {
        // Fix: Use v8 syntax for storage reference and upload
        const storageRef = storage.ref(`achievements/${id}`);
        const base64 = await fileToBase64(imageFile);
        await storageRef.putString(base64, 'data_url');
        const proofUrl = await storageRef.getDownloadURL();
        achievementToAdd.proofUrl = proofUrl;
      }
      // Fix: Use v8 syntax for arrayUnion
      await portfolioDocRef.update({ achievements: firebase.firestore.FieldValue.arrayUnion(achievementToAdd) });
      setData(prev => prev ? { ...prev, achievements: [...prev.achievements, achievementToAdd] } : null);
    } catch (error) {
      console.error("Error adding achievement:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateAchievement = async (updatedAchievement: Achievement, imageFile?: File) => {
    if (!data) return;
    setLoading(true);
    let finalAchievement = { ...updatedAchievement };
    
    try {
      if (imageFile) {
        // Fix: Use v8 syntax for storage reference and upload
        const storageRef = storage.ref(`achievements/${finalAchievement.id}`);
        const base64 = await fileToBase64(imageFile);
        await storageRef.putString(base64, 'data_url');
        const proofUrl = await storageRef.getDownloadURL();
        finalAchievement.proofUrl = proofUrl;
      }
      const updatedAchievements = data.achievements.map(ach => ach.id === finalAchievement.id ? finalAchievement : ach);
      // Fix: Use v8 syntax for updating a document
      await portfolioDocRef.update({ achievements: updatedAchievements });
      setData(prev => prev ? { ...prev, achievements: updatedAchievements } : null);
    } catch (error) {
      console.error("Error updating achievement:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    if (!data) return;
    setLoading(true);
    try {
      const achievementToDelete = data.achievements.find(ach => ach.id === id);
      if(achievementToDelete) {
        // Fix: Use v8 syntax for arrayRemove
        await portfolioDocRef.update({ achievements: firebase.firestore.FieldValue.arrayRemove(achievementToDelete) });
        setData(prev => prev ? { ...prev, achievements: prev.achievements.filter(ach => ach.id !== id) } : null);
      }
    } catch(error) {
       console.error("Error deleting achievement:", error);
    } finally {
        setLoading(false);
    }
  };

  const handleAddSkill = async (newSkill: Omit<Skill, 'id'>) => {
    if (!data) return;
    const skillToAdd = { ...newSkill, id: Date.now().toString() };
    // Fix: Use v8 syntax for arrayUnion
    await portfolioDocRef.update({ skills: firebase.firestore.FieldValue.arrayUnion(skillToAdd) });
    setData(prev => prev ? { ...prev, skills: [...prev.skills, skillToAdd] } : null);
  };

  const handleDeleteSkill = async (id: string) => {
    if (!data) return;
    const skillToDelete = data.skills.find(skill => skill.id === id);
    if (skillToDelete) {
      // Fix: Use v8 syntax for arrayRemove
      await portfolioDocRef.update({ skills: firebase.firestore.FieldValue.arrayRemove(skillToDelete) });
      setData(prev => prev ? { ...prev, skills: prev.skills.filter(skill => skill.id !== id) } : null);
    }
  };

  const handleUpdateNotes = async (notes: string) => {
    // Fix: Use v8 syntax for updating a document
    await portfolioDocRef.update({ personalNotes: notes });
    setData(prev => prev ? { ...prev, personalNotes: notes } : null);
  };

  const handleAddTeacherFeedback = async (newFeedback: Omit<TeacherFeedback, 'id'>) => {
    if (!data) return;
    const feedbackToAdd = { ...newFeedback, id: Date.now().toString() };
    // Fix: Use v8 syntax for arrayUnion
    await portfolioDocRef.update({ teacherFeedback: firebase.firestore.FieldValue.arrayUnion(feedbackToAdd) });
    setData(prev => prev ? { ...prev, teacherFeedback: [...prev.teacherFeedback, feedbackToAdd] } : null);
  };

  const handleDeleteTeacherFeedback = async (id: string) => {
    if (!data) return;
    const feedbackToDelete = data.teacherFeedback.find(fb => fb.id === id);
    if(feedbackToDelete) {
        // Fix: Use v8 syntax for arrayRemove
        await portfolioDocRef.update({ teacherFeedback: firebase.firestore.FieldValue.arrayRemove(feedbackToDelete) });
        setData(prev => prev ? { ...prev, teacherFeedback: prev.teacherFeedback.filter(fb => fb.id !== id) } : null);
    }
  };

  const renderVisitorContent = () => {
    if (!data) return null;
    switch(currentPage) {
        case 'games':
            return <GamesPage onBack={() => setCurrentPage('main')} />;
        case 'main':
        default:
            return <VisitorPage data={data} onAddTeacherFeedback={handleAddTeacherFeedback} onShowGames={() => setCurrentPage('games')} />;
    }
  };

  if (loading || !data) {
    return (
        <div className="bg-[#0a0f1c] text-gray-200 min-h-screen flex items-center justify-center">
            <AnimatedBackground />
            <div className="relative z-10 text-center">
                <h1 className="text-4xl font-bold mb-4 text-purple-400">جارِ تحميل ملف الإنجاز...</h1>
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto"></div>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-[#0a0f1c] text-gray-200 min-h-screen">
       <AnimatedBackground />
      <button
        onClick={handleAdminToggle}
        className="fixed bottom-4 left-4 z-50 bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-full shadow-lg shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400"
        aria-label={isAdminView ? "العودة لواجهة الزائر" : "الدخول للوحة التحكم"}
      >
        <AdminIcon />
      </button>
      {isAdminView ? (
        <AdminPage 
            data={data} 
            onUpdateProfileImage={handleUpdateProfileImage}
            onAddAchievement={handleAddAchievement}
            onUpdateAchievement={handleUpdateAchievement}
            onDeleteAchievement={handleDeleteAchievement}
            onAddSkill={handleAddSkill}
            onDeleteSkill={handleDeleteSkill}
            onUpdateNotes={handleUpdateNotes}
            onDeleteTeacherFeedback={handleDeleteTeacherFeedback}
        />
      ) : (
        renderVisitorContent()
      )}
      {isLoginModalOpen && (
        <AdminLoginModal
            onLogin={handleLoginAttempt}
            onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;