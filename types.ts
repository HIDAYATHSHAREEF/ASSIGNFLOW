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

// Represents the 'profiles' table in Supabase
export interface Profile {
  id: string; // references auth.users.id
  full_name: string;
  role: UserRole;
  avatar_url: string;
  department: string;
  student_id?: string;
  semester?: number;
  section?: string;
  cgpa?: number;
}

export type SubmissionStatus = 'submitted' | 'pending' | 'late' | 'graded';

export interface Assignment {
  id: string;
  title: string;
  courseCode: string; // Mapped from course_code
  courseName: string; // Mapped from course_name
  subject: string;    
  dueDate: string;    // Mapped from due_date
  totalPoints: number; // Mapped from total_points
  status: 'open' | 'closed';
  description: string;
  attachmentUrl?: string; // Mapped from attachment_url
  submissionCount?: number;
  totalStudents?: number;
  allowedFileTypes?: string[]; // Mapped from allowed_file_types
  created_at?: string;
  teacher_id?: string;
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