export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  department?: string;
  semester?: number; // Student specific
  section?: string;  // Student specific
  studentId?: string; // Roll number
  cgpa?: number;     // Student specific
}

export type SubmissionStatus = 'submitted' | 'pending' | 'late' | 'graded';

export interface Assignment {
  id: string;
  title: string;
  courseCode: string; // e.g., CS401
  courseName: string; // e.g., Modern Web Development
  subject: string;    // Department subject category
  dueDate: string;
  totalPoints: number;
  status: 'open' | 'closed';
  description: string;
  attachmentUrl?: string;
  submissionCount?: number;
  totalStudents?: number;
  allowedFileTypes?: string[];
}

export interface Submission {
  id: string;
  studentName: string;
  studentId: string;
  assignmentId: string;
  submittedAt?: string;
  status: SubmissionStatus;
  grade?: number;
  remarks?: string; // Teacher feedback
  plagiarismScore?: number;
  fileUrl?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  schedule: string;
  attendance: number;
  totalClasses: number;
  attendedClasses: number;
  color: string;
}

export interface DashboardStats {
  totalStudents: number;
  submissionRate: number;
  pendingAssignments: number;
  averageGrade: number;
  dailySubmissions: { day: string; count: number }[];
  statusDistribution: { name: string; value: number; color: string }[];
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  author: string;
  type: 'urgent' | 'info' | 'event';
}

export type ResourceType = 'pdf' | 'video' | 'link' | 'archive' | 'doc';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  courseCode: string; // Linked to course
  author: string;
  date: string;
  size?: string; // e.g. "2.4 MB"
  downloads: number;
  category: 'Notes' | 'Lab Manual' | 'Paper' | 'Reference';
}