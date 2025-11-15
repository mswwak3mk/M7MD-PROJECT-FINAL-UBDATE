export interface Profile {
  name: string;
  grade: string;
  hobbies: string[];
  dream: string;
  imageUrl: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  proofUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface TeacherFeedback {
  id: string;
  teacherName: string;
  comment: string;
}

export interface PortfolioData {
  profile: Profile;
  achievements: Achievement[];
  skills: Skill[];
  favoriteSubjects: string[];
  teacherFeedback: TeacherFeedback[];
  personalNotes: string;
}