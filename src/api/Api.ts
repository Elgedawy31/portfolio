import type {
  EmployeeProfileResponse,
  ContactMessageRequest,
  ContactMessageResponse,
} from './Types';

const API_BASE_URL = "https://api.auvnet.com";

// Re-export types for backward compatibility
export type {
  ImageUrl,
  CvFile,
  CreatedBy,
  Location,
  Thought,
  Skill,
  Project,
  Testimonial,
  EmployeeData,
  EmployeeProfileResponse,
  EmployeeProfile,
  ContactMessageRequest,
  ContactMessageResponse,
  ContactMessageData,
} from './Types';

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

/**
 * Send contact message to chatbot
 * @param contactData - Contact message data
 * @returns Promise with contact message response
 */
export async function sendContactMessage(
  contactData: ContactMessageRequest
): Promise<ContactMessageResponse> {
  const url = `${API_BASE_URL}/chatBot/sendContact`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    throw new Error(`Failed to send contact message: ${response.statusText}`);
  }

  return response.json();
}

