import React, { useState, useEffect, useCallback } from 'react';
import type { PortfolioData, Achievement, Skill, TeacherFeedback } from './types';
import { INITIAL_DATA } from './constants';
import VisitorPage from './components/VisitorPage';
import AdminPage from './components/AdminPage';
import { AdminIcon } from './components/icons';

const App: React.FC = () => {
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const savedData = localStorage.getItem('portfolioData');
      return savedData ? JSON.parse(savedData) : INITIAL_DATA;
    } catch (error) {
      console.error("Error loading data from localStorage", error);
      return INITIAL_DATA;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data to localStorage", error);
    }
  }, [data]);

  const handleAdminToggle = () => {
    if (isAdminView) {
      setIsAdminView(false);
    } else {
      if (isAuthenticated) {
        setIsAdminView(true);
      } else {
        const code = prompt("الرجاء إدخال رمز الدخول للمشرف:");
        if (code === '7520') {
          setIsAuthenticated(true);
          setIsAdminView(true);
        } else if (code !== null) {
          alert("رمز الدخول غير صحيح!");
        }
      }
    }
  };

  const updateData = useCallback(<T,>(updater: (prevData: PortfolioData) => T) => {
    setData(prev => ({ ...prev, ...updater(prev) }));
  }, []);

  const handleUpdateProfileImage = (imageUrl: string) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, imageUrl },
    }));
  };

  const handleAddAchievement = (newAchievement: Omit<Achievement, 'id'>) => {
    setData(prev => ({
      ...prev,
      achievements: [...prev.achievements, { ...newAchievement, id: Date.now().toString() }],
    }));
  };
  
  const handleUpdateAchievement = (updatedAchievement: Achievement) => {
    setData(prev => ({
        ...prev,
        achievements: prev.achievements.map(ach => ach.id === updatedAchievement.id ? updatedAchievement : ach),
    }));
  };

  const handleDeleteAchievement = (id: string) => {
    setData(prev => ({
        ...prev,
        achievements: prev.achievements.filter(ach => ach.id !== id),
    }));
  };

  const handleAddSkill = (newSkill: Omit<Skill, 'id'>) => {
    setData(prev => ({
        ...prev,
        skills: [...prev.skills, { ...newSkill, id: Date.now().toString() }],
    }));
  };

  const handleDeleteSkill = (id: string) => {
    setData(prev => ({
        ...prev,
        skills: prev.skills.filter(skill => skill.id !== id),
    }));
  };

  const handleUpdateNotes = (notes: string) => {
    setData(prev => ({...prev, personalNotes: notes}));
  }

  const handleAddTeacherFeedback = (newFeedback: Omit<TeacherFeedback, 'id'>) => {
    setData(prev => ({
        ...prev,
        teacherFeedback: [...prev.teacherFeedback, { ...newFeedback, id: Date.now().toString() }],
    }));
  };

  const handleDeleteTeacherFeedback = (id: string) => {
    setData(prev => ({
        ...prev,
        teacherFeedback: prev.teacherFeedback.filter(fb => fb.id !== id),
    }));
  };

  return (
    <div className="bg-[#0a0f1c] text-gray-200 min-h-screen">
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
        <VisitorPage data={data} onAddTeacherFeedback={handleAddTeacherFeedback} />
      )}
    </div>
  );
};

export default App;