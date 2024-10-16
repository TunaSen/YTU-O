import apiClient from "../api";
import { ProfileProps } from "../Interfaces";


const managementUrl="management/"

export const getAll = async (): Promise<ProfileProps[]> => {
    const response = await apiClient.get<ProfileProps[]>(managementUrl+'profile/');
    return response.data;
  };

