import { Assignment, DashboardStats, Submission, User, Announcement, Course, Resource } from './types.ts';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Dr. Sarah Lin',
  email: 'sarah.lin@university.edu',
  role: 'teacher',
  avatarUrl: 'https://picsum.photos/200',
  department: 'Computer Science',
};

// Interface for mock auth only (not exported in types to keep app clean)
interface MockUser extends User {
  password?: string;
}

export const ALL_MOCK_TEACHERS: MockUser[] = [
  {
    ...CURRENT_USER,
    password: 'password'
  },
  {
    id: 'u2',
    name: 'Prof. Alan Turing',
    email: 'alan.turing@univ.edu',
    role: 'teacher',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alan',
    department: 'Computer Science',
    password: 'password'
  },
  {
    id: 'u3',
    name: 'Dr. Jane Goodall',
    email: 'jane.goodall@univ.edu',
    role: 'teacher',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    department: 'Ethics in Tech',
    password: 'password'
  }
];

export const ALL_MOCK_STUDENTS: MockUser[] = [
  // CSE Department
  {
    id: 'cse001',
    studentId: 'CSE21A001',
    name: 'Arjun Kumar',
    email: 'arjun.kumar@univ.edu',
    password: 'Arjun@123',
    role: 'student',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    department: 'CSE Department',
    semester: 6,
    section: 'A',
    cgpa: 8.9,
  },
  {
    id: 'cse002',
    studentId: 'CSE21A002',
    name: 'Priya Sharma',
    email: 'priya.sharma@univ.edu',
    password: 'Priya@123',
    role: 'student',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    department: 'CSE Department',
    semester: 6,
    section: 'A',
    cgpa: 9.2,
  },
  // ECE Department
  {
    id: 'ece001',
    studentId: 'ECE20B001',
    name: 'Varun Chakravarthy',
    email: 'varun.c@univ.edu',
    password: 'Varun@123',
    role: 'student',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Varun',
    department: 'ECE Department',
    semester: 4,
    section: 'B',
    cgpa: 7.8,
  },
  {
    id: 'ece002',
    studentId: 'ECE20B002',
    name: 'Sneha Raj',
    email: 'sneha.r@univ.edu',
    password: 'Sneha@123',
    role: 'student',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    department: 'ECE Department',
    semester: 4,
    section: 'B',
    cgpa: 8.5,
  },
  // MECH Department
  {
    id: 'mech001',
    studentId: 'MECH24C001',
    name: 'Ramesh Babu',
    email: 'ramesh.b@univ.edu',
    password: 'Ramesh@123',
    role: 'student',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh',
    department: 'MECH Department',
    semester: 2,
    section: 'C',
    cgpa: 8.1,
  },
  {
    id: 'mech002',
    studentId: 'MECH24C002',
    name: 'Kavya S',
    email: 'kavya.s@univ.edu',
    password: 'Kavya@123',
    role: 'student',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya',
    department: 'MECH Department',
    semester: 2,
    section: 'C',
    cgpa: 9.0,
  }
];

export const MOCK_STUDENT = ALL_MOCK_STUDENTS[0]; // Fallback for backward compatibility

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: 'a1',
    title: 'Advanced React Patterns',
    courseCode: 'CS401',
    courseName: 'Web Development',
    subject: 'Frontend Engineering',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // Due in 2 days
    totalPoints: 100,
    status: 'open',
    description: 'Implement a compound component system using React Context API. Upload your source code as a ZIP file.',
    submissionCount: 45,
    totalStudents: 60,
    allowedFileTypes: ['.zip', '.rar']
  },
  {
    id: 'a2',
    title: 'Database Normalization',
    courseCode: 'CS302',
    courseName: 'Database Systems',
    subject: 'DBMS',
    dueDate: '2023-11-10T23:59:00',
    totalPoints: 50,
    status: 'closed',
    description: 'Normalize the provided schema to 3NF.',
    submissionCount: 58,
    totalStudents: 60,
  },
  {
    id: 'a3',
    title: 'AI Ethics Essay',
    courseCode: 'ETH200',
    courseName: 'Ethics in Tech',
    subject: 'Humanities',
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), // Due in 5 days
    totalPoints: 100,
    status: 'open',
    description: 'Write a 2000-word essay on the implications of AGI.',
    submissionCount: 12,
    totalStudents: 60,
  },
  {
    id: 'a4',
    title: 'Thermodynamics Lab Report',
    courseCode: 'ME201',
    courseName: 'Mechanical Eng',
    subject: 'Physics',
    dueDate: new Date(Date.now() - 86400000).toISOString(), // Overdue
    totalPoints: 20,
    status: 'open',
    description: 'Submit lab record for Experiment 4.',
    submissionCount: 50,
    totalStudents: 60,
  },
];

export const MOCK_SUBMISSIONS: Submission[] = [
  { id: 's1', studentName: 'Alex Chen', studentId: 'st001', assignmentId: 'a1', submittedAt: '2023-11-14T10:30:00', status: 'submitted', grade: 92, remarks: 'Excellent work on the context implementation.', plagiarismScore: 2 },
  { id: 's2', studentName: 'Sarah Miller', studentId: 'st002', assignmentId: 'a1', submittedAt: '2023-11-14T11:15:00', status: 'submitted', plagiarismScore: 5 },
  { id: 's3', studentName: 'Mike Johnson', studentId: 'st003', assignmentId: 'a1', status: 'pending' },
  { id: 's4', studentName: 'Emily Davis', studentId: 'st004', assignmentId: 'a1', submittedAt: '2023-11-15T09:00:00', status: 'late', plagiarismScore: 12 },
  { id: 's5', studentName: 'David Wilson', studentId: 'st005', assignmentId: 'a2', submittedAt: '2023-11-10T14:20:00', status: 'graded', grade: 45, remarks: 'Good normalization, but missed one dependency.', plagiarismScore: 0 },
];

export const MOCK_STATS: DashboardStats = {
  totalStudents: 60,
  submissionRate: 85,
  pendingAssignments: 15,
  averageGrade: 78.5,
  dailySubmissions: [
    { day: 'Mon', count: 12 },
    { day: 'Tue', count: 18 },
    { day: 'Wed', count: 25 },
    { day: 'Thu', count: 15 },
    { day: 'Fri', count: 30 },
    { day: 'Sat', count: 10 },
    { day: 'Sun', count: 5 },
  ],
  statusDistribution: [
    { name: 'On Time', value: 65, color: '#10b981' },
    { name: 'Late', value: 15, color: '#f59e0b' },
    { name: 'Pending', value: 20, color: '#6366f1' },
  ]
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    code: 'CS401',
    name: 'Advanced Web Development',
    instructor: 'Dr. Sarah Lin',
    credits: 4,
    schedule: 'Mon, Wed 10:00 AM',
    attendance: 92,
    totalClasses: 24,
    attendedClasses: 22,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'c2',
    code: 'CS302',
    name: 'Database Systems',
    instructor: 'Prof. Alan Turing',
    credits: 3,
    schedule: 'Tue, Thu 02:00 PM',
    attendance: 85,
    totalClasses: 20,
    attendedClasses: 17,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'c3',
    code: 'ETH200',
    name: 'Ethics in Technology',
    instructor: 'Dr. Jane Goodall',
    credits: 2,
    schedule: 'Fri 09:00 AM',
    attendance: 100,
    totalClasses: 10,
    attendedClasses: 10,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'c4',
    code: 'ALG101',
    name: 'Algorithms & Data Structures',
    instructor: 'Prof. Donald Knuth',
    credits: 4,
    schedule: 'Mon, Wed 01:00 PM',
    attendance: 65,
    totalClasses: 24,
    attendedClasses: 15,
    color: 'from-orange-500 to-red-600'
  }
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: 'Lecture 5: React Hooks Deep Dive',
    description: 'Comprehensive notes on useEffect, useMemo, and useCallback.',
    type: 'pdf',
    courseCode: 'CS401',
    author: 'Dr. Sarah Lin',
    date: '2023-10-15',
    size: '2.4 MB',
    downloads: 145,
    category: 'Notes'
  },
  {
    id: 'r2',
    title: 'Lab Manual: AWS Deployment',
    description: 'Step-by-step guide to deploying React apps to S3 and CloudFront.',
    type: 'pdf',
    courseCode: 'CS401',
    author: 'Dr. Sarah Lin',
    date: '2023-10-20',
    size: '5.1 MB',
    downloads: 89,
    category: 'Lab Manual'
  },
  {
    id: 'r3',
    title: '2022 Mid-Term Question Paper',
    description: 'Previous year question paper for practice.',
    type: 'pdf',
    courseCode: 'CS302',
    author: 'Prof. Alan Turing',
    date: '2023-09-01',
    size: '1.2 MB',
    downloads: 210,
    category: 'Paper'
  },
  {
    id: 'r4',
    title: 'Understanding B-Trees Visualization',
    description: 'Video explanation of B-Tree insertion and deletion.',
    type: 'video',
    courseCode: 'CS302',
    author: 'Prof. Alan Turing',
    date: '2023-09-15',
    size: '10 mins',
    downloads: 320,
    category: 'Reference'
  },
  {
    id: 'r5',
    title: 'Ethics Case Study: AI Bias',
    description: 'Required reading for the upcoming seminar.',
    type: 'link',
    courseCode: 'ETH200',
    author: 'Dr. Jane Goodall',
    date: '2023-11-01',
    size: 'Ext Link',
    downloads: 56,
    category: 'Reference'
  },
  {
    id: 'r6',
    title: 'Semester Syllabus 2023',
    description: 'Complete breakdown of all modules and grading schemes.',
    type: 'doc',
    courseCode: 'CS401',
    author: 'Admin',
    date: '2023-08-01',
    size: '500 KB',
    downloads: 450,
    category: 'Notes'
  },
  {
    id: 'r7',
    title: 'Advanced Sorting Algorithms',
    description: 'Detailed analysis of QuickSort, MergeSort, and HeapSort time complexities.',
    type: 'pdf',
    courseCode: 'ALG101',
    author: 'Prof. Donald Knuth',
    date: '2023-09-10',
    size: '3.5 MB',
    downloads: 180,
    category: 'Notes'
  },
  {
    id: 'r8',
    title: 'Graph Theory Cheat Sheet',
    description: 'Quick reference for DFS, BFS, Dijkstra, and Prim algorithms.',
    type: 'pdf',
    courseCode: 'ALG101',
    author: 'Prof. Donald Knuth',
    date: '2023-09-25',
    size: '800 KB',
    downloads: 310,
    category: 'Reference'
  },
  {
    id: 'r9',
    title: 'Lab 3: SQL Injection Prevention',
    description: 'Security protocols and best practices for writing safe SQL queries.',
    type: 'doc',
    courseCode: 'CS302',
    author: 'Prof. Alan Turing',
    date: '2023-10-05',
    size: '1.1 MB',
    downloads: 120,
    category: 'Lab Manual'
  },
  {
    id: 'r10',
    title: 'Final Exam 2021: Answer Key',
    description: 'Solved paper for the 2021 End Semester Examination.',
    type: 'pdf',
    courseCode: 'CS401',
    author: 'Dr. Sarah Lin',
    date: '2023-01-15',
    size: '4.2 MB',
    downloads: 560,
    category: 'Paper'
  },
  {
    id: 'r11',
    title: 'The Trolley Problem Revisited',
    description: 'Interactive philosophical discussion recording from Week 4.',
    type: 'video',
    courseCode: 'ETH200',
    author: 'Dr. Jane Goodall',
    date: '2023-09-20',
    size: '45 mins',
    downloads: 75,
    category: 'Reference'
  },
  {
    id: 'r12',
    title: 'Lab 1: Setting up Node.js Environment',
    description: 'Beginner guide to installing Node, NPM, and VS Code extensions.',
    type: 'pdf',
    courseCode: 'CS401',
    author: 'Dr. Sarah Lin',
    date: '2023-08-15',
    size: '1.8 MB',
    downloads: 400,
    category: 'Lab Manual'
  },
  {
    id: 'r13',
    title: 'Dynamic Programming Problem Set',
    description: '50 practice problems for dynamic programming interviews.',
    type: 'doc',
    courseCode: 'ALG101',
    author: 'Prof. Donald Knuth',
    date: '2023-11-01',
    size: '600 KB',
    downloads: 290,
    category: 'Notes'
  },
  {
    id: 'r14',
    title: '2020 Supplementary Exam Paper',
    description: 'Question paper for supplementary exams held in Summer 2020.',
    type: 'pdf',
    courseCode: 'CS302',
    author: 'Admin',
    date: '2023-02-10',
    size: '900 KB',
    downloads: 95,
    category: 'Paper'
  }
];