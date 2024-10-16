import apiClient from "../api";
import { useNavigate } from 'react-router-dom';

interface AuthResponse {
  token: string;
  profile:JSON;
  valid:boolean;
  
}
interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
  location: string;
  birthday: string;
  club: string;
  role: string;
  profileImage: File | string; // Updated to handle File type
}



export const signIn = async (email: string, password: string): Promise<boolean> => {
  try{
    const response = await apiClient.post<AuthResponse>('management/auth/signin/', { email, password });
    if (response.data.token){
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('profile', JSON.stringify(response.data.profile));
      
      return true
    }
  }
  catch {
    logout()
    return false

  }
  logout()

  return false

};


export const signUp = async (name : string , surname : string , email: string, password: string): Promise<boolean> => {

  try{
    const response = await apiClient.post<AuthResponse>('management/auth/signup/', { name, surname , email, password });

      if (response.data.token){
        localStorage.setItem('token', response.data.token);
        return true
      }
    }
    catch {
      logout()
      return false

    }
    logout()

    return false
    };

export const logout = (): void => {

  localStorage.removeItem('token');
  const navigate = useNavigate();

  navigate('/');
};


export const validateToken = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      logout();
      return false;
    }

    // Token'ı Authorization başlığında gönderiyoruz
    const response = await apiClient.get<AuthResponse>('management/auth/validate/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data) {
      return true;
    } else {
      logout();
      return false;
    }
  } catch {
    logout();
    return false;
  }
};

  
export const update = async (userProfile: UserProfile): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    // const formData = new FormData();
    // Object.keys(userProfile).forEach(key => {
    //   if (userProfile[key] instanceof File) {
    //     formData.append(key, userProfile[key]);
    //   } else {
    //     formData.append(key, userProfile[key] as string);
    //   }
    // });

    const response = await apiClient.post<AuthResponse>(
      'management/profile/update/', 
      userProfile, 
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Add the Bearer token to the Authorization header
          'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
        }
      }
    );

    if (response.data.profile) {
      localStorage.setItem('profile', JSON.stringify(response.data.profile));
      return true;
    }
  } catch (error) {
    console.error('Update error:', error);
    logout();
  }
  return false;
};