const API_BASE_URL = "https://api.auvnet.com";

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

/**
 * Get employee profile by username
 * @param username - The username of the employee
 * @returns Promise with employee profile response
 */
export async function getEmployeeProfile(username: string): Promise<EmployeeProfileResponse> {
  const url = `${API_BASE_URL}/employee/profile?username=${encodeURIComponent(username)}`;
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch employee profile: ${response.statusText}`);
  }

  return response.json();
}

// Export EmployeeData as EmployeeProfile for backward compatibility
export type EmployeeProfile = EmployeeData;
