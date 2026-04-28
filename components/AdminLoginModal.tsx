import React, { useState } from 'react';
import Card from './Card';
import NeonButton from './Button';

interface AdminLoginModalProps {
  onLogin: (password: string) => void;
  onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
      <div className="relative w-full max-w-sm p-4" onClick={(e) => e.stopPropagation()}>
        <Card glowColor="purple">
          <form onSubmit={handleSubmit}>
            <h2 id="login-modal-title" className="text-3xl font-bold text-center mb-2 text-gray-100">دخول المشرف</h2>
            <p className="text-center text-gray-400 mb-8">الرجاء إدخال رمز الدخول للمتابعة.</p>
            <div className="mb-8 relative p-[2px] rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg shadow-cyan-500/30">
              <label htmlFor="admin-password" class="sr-only">رمز الدخول</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111827] border-0 rounded-md p-3 text-center text-xl tracking-[0.2em] focus:ring-2 focus:ring-purple-400 focus:outline-none"
                placeholder="••••••"
                autoFocus
              />
            </div>
            <div className="flex justify-center items-center gap-6">
               <NeonButton type="submit" glowColor="purple" className="px-10">
                دخول
              </NeonButton>
              <button type="button" onClick={onClose} className="px-6 py-2 text-gray-400 hover:text-white transition-colors">
                إلغاء
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginModal;