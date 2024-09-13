import { jwtDecode } from "jwt-decode";

const Apiurl = "http://localhost:9090/api/users/"
export const generateUsers = async (count: number): Promise<void> => {
    try {
      const response = await fetch(`${Apiurl}generate?count=${count}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate users');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'users.json';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating users:', error);
    }
  };
  
  export const uploadUserFile = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch(Apiurl+'batch', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };
  
  export const fetchUserProfile = async (): Promise<any> => {
    try {
      const response = await fetch(`${Apiurl}me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };
  export const fetchUserProfileByUsername = async (username: string): Promise<any> => {
    try {
      const response = await fetch(`${Apiurl}${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };
  
  interface JwtPayload {
    role: UserRole ;
  }
  export enum UserRole {
    admin = "admin",
    user = "user",
  }
  
  const getRoleFromToken = (): UserRole | null => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return null;
    }
  
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.role || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  
 
  export const isAdmin = (): boolean => {
    const role = getRoleFromToken();
    if(role == UserRole.admin)
      return true
  return false
  };