
import React, { useState, useEffect } from 'react';
import type { PortfolioData, Achievement, Skill, TeacherFeedback } from './types';
import { INITIAL_DATA } from './constants';
// Import the global firebase object wrapper from our local file
import firebase, { portfolioDocRef } from './firebase';
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
    // Use onSnapshot instead of get() for real-time updates and faster caching
    const unsubscribe = portfolioDocRef.onSnapshot(
      (docSnap) => {
        if (docSnap.exists) {
          setData(docSnap.data() as PortfolioData);
        } else {
          // Only set initial data if document definitely doesn't exist
          // and we are not already waiting for a write
          if (!data) {
             portfolioDocRef.set(INITIAL_DATA).catch(console.error);
             setData(INITIAL_DATA);
          }
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching portfolio data:", error);
        // Only fallback if we don't have data yet
        if (!data) setData(INITIAL_DATA);
        setLoading(false);
      }
    );

    return () => unsubscribe();
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

  // Function to compress and convert image to Base64
  // This is crucial because Firestore has a 1MB limit per document
  const compressAndConvertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800; // Resize to max 800px
                const MAX_HEIGHT = 800;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    // Convert to JPEG with 0.7 quality to save space
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(dataUrl);
                } else {
                    reject(new Error("Could not get canvas context"));
                }
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (error) => reject(error);
    });
  };

  const handleUpdateProfileImage = async (imageFile: File) => {
    if (!data) return;
    setLoading(true);
    try {
      // Compress and convert
      const base64 = await compressAndConvertToBase64(imageFile);
      
      const updatedProfile = { ...data.profile, imageUrl: base64 };
      await portfolioDocRef.update({ profile: updatedProfile });
      
      // Optimistic update
      setData(prev => prev ? { ...prev, profile: updatedProfile } : null);
    } catch (error) {
      console.error("Error updating profile image:", error);
      alert("حدث خطأ أثناء تحديث الصورة. تأكد أن الصورة ليست تالفة.");
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
        const base64 = await compressAndConvertToBase64(imageFile);
        achievementToAdd.proofUrl = base64;
      }
      
      await portfolioDocRef.update({ achievements: firebase.firestore.FieldValue.arrayUnion(achievementToAdd) });
      // No need to setData manually if onSnapshot is working, but good for responsiveness
    } catch (error) {
      console.error("Error adding achievement:", error);
      alert("حدث خطأ أثناء إضافة الإنجاز.");
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
        const base64 = await compressAndConvertToBase64(imageFile);
        finalAchievement.proofUrl = base64;
      }
      
      // We read the current state to map over it
      const updatedAchievements = data.achievements.map(ach => ach.id === finalAchievement.id ? finalAchievement : ach);
      
      await portfolioDocRef.update({ achievements: updatedAchievements });
    } catch (error) {
      console.error("Error updating achievement:", error);
      alert("حدث خطأ أثناء تعديل الإنجاز.");
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
        await portfolioDocRef.update({ achievements: firebase.firestore.FieldValue.arrayRemove(achievementToDelete) });
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
    await portfolioDocRef.update({ skills: firebase.firestore.FieldValue.arrayUnion(skillToAdd) });
  };

  const handleDeleteSkill = async (id: string) => {
    if (!data) return;
    const skillToDelete = data.skills.find(skill => skill.id === id);
    if (skillToDelete) {
      await portfolioDocRef.update({ skills: firebase.firestore.FieldValue.arrayRemove(skillToDelete) });
    }
  };

  const handleUpdateNotes = async (notes: string) => {
    await portfolioDocRef.update({ personalNotes: notes });
  };

  const handleAddTeacherFeedback = async (newFeedback: Omit<TeacherFeedback, 'id'>) => {
    if (!data) return;
    const feedbackToAdd = { ...newFeedback, id: Date.now().toString() };
    await portfolioDocRef.update({ teacherFeedback: firebase.firestore.FieldValue.arrayUnion(feedbackToAdd) });
  };

  const handleDeleteTeacherFeedback = async (id: string) => {
    if (!data) return;
    const feedbackToDelete = data.teacherFeedback.find(fb => fb.id === id);
    if(feedbackToDelete) {
        await portfolioDocRef.update({ teacherFeedback: firebase.firestore.FieldValue.arrayRemove(feedbackToDelete) });
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
