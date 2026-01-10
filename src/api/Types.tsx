// Image/File interfaces
export interface ImageUrl {
  url: string;
  secureUrl: string;
}

export interface CvFile {
  url: string;
  secureUrl: string;
  viewUrl: string;
  format: string;
  uploadedAt: string;
}

// User/Creator interfaces
export interface CreatedBy {
  _id: string;
  userName: string;
}

// Location interface
export interface Location {
  country: string;
  state: string;
}

// Thought interface
export interface Thought {
  text: string;
  emoji: string;
  _id: string;
  createdAt: string;
}

// Skill interface
export interface Skill {
  name: string;
  description: string;
  order: number;
  _id: string;
}

// Project interface
export interface Project {
  name: string;
  date: string;
  url: string;
  image: ImageUrl;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

// Testimonial interface
export interface Testimonial {
  name: string;
  title: string;
  text: string;
  order: number;
  _id: string;
}

// Employee Data interface
export interface EmployeeData {
  _id: string;
  email: string;
  username: string;
  role: string;
  isComplete: boolean;
  contact: string[];
  slider: string[];
  cv: CvFile;
  createdBy: CreatedBy;
  thoughts: Thought[];
  skills: Skill[];
  projects: Project[];
  testimonials: Testimonial[];
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  firstName: string;
  lastName: string;
  profileImage: ImageUrl;
  bio: string;
  title: string;
  location: Location;
}

// API Response interface
export interface EmployeeProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: EmployeeData;
  timestamp: string;
}

// Export EmployeeData as EmployeeProfile for backward compatibility
export type EmployeeProfile = EmployeeData;

// Contact Message interfaces
export interface ContactMessageRequest {
  messageObj: {
    name: string;
    wPhone?: string; // optional
    phone?: string; // optional
    email: string;
    description: string;
  };
}

export interface ContactMessageData {
  message: {
    name: string;
    wPhone?: string;
    phone?: string;
    email: string;
    description: string;
  };
  telegramMessageId: number;
  telegramChatId: number;
  sentAt: string;
}

export interface ContactMessageResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ContactMessageData;
  timestamp: string;
}

