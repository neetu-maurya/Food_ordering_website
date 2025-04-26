import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { Logininputstate, Signupinputstate } from "@/schema/userschema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8000/api/v1/user";

// Enable cookies for authentication
axios.defaults.withCredentials = true;

interface User {
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: Signupinputstate) => Promise<void>;
  login: (input: Logininputstate) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: any) => Promise<void>;
}

export const useUserStore = create<UserState>()(persist((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  loading: false,
  // signup api implementation
  signup: async (input: Signupinputstate) => {
      try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/signup`, input, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (response.data.success) { 
              toast.success(response.data.message);
              set({ loading: false, user: response.data.user, isAuthenticated: true });
          }
      } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
      }
  },
  login: async (input: Logininputstate) => {
      try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/login`, input, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (response.data.success) { 
              toast.success(response.data.message);
              set({ loading: false, user: response.data.user, isAuthenticated: true });
          }
      } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
      }
  },
  verifyEmail: async (verificationCode: string) => {
      try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (response.data.success) {
              toast.success(response.data.message);
              set({loading: false, user: response.data.user, isAuthenticated: true });
          }
      } catch (error: any) {
          toast.success(error.response.data.message);
          set({ loading: false });
      }
  },
  checkAuthentication: async () => {
      try {
        set({ isCheckingAuth: true });
          const response = await axios.get(`${API_END_POINT}/check-auth`);
          if (response.data.success) {
              set({user: response.data.user, isAuthenticated: true,isCheckingAuth: false,loading: false });
          }
      } catch (error) {
          set({isAuthenticated: false, isCheckingAuth: false,loading: false });
      }
  },
  logout: async () => {
    try {
        set({ loading: true });
        const response = await axios.post(`${API_END_POINT}/logout`);
        if (response.data.success) {
            toast.success(response.data.message);
            set({ user: null, isAuthenticated: false });
        } else {
            toast.error("Logout failed. Please try again.");
        }
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Logout failed.");
    } finally {
        set({ loading: false }); 
    }
}, 




  forgotPassword: async (email: string) => {
      try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/forgot-password`, { email });
          if (response.data.success) {
              toast.success(response.data.message);
              set({ loading: false });
          }
      } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
      }
  },
  resetPassword: async (token: string, newPassword: string) => {
      try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/reset-password/${token}`, { newPassword });
          if (response.data.success) {
              toast.success(response.data.message);
              set({ loading: false });
          }
      } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
      }
  },
  updateProfile: async (input:any) => {
      try { 
          const response = await axios.put(`${API_END_POINT}/profile/update`, input,{
              headers:{
                  'Content-Type':'application/json'
              }
          });
          if(response.data.success){
              toast.success(response.data.message);
              set({user:response.data.user, isAuthenticated:true});
          }
      } catch (error:any) { 
          toast.error(error.response.data.message);
      }
  }
}),
  {
      name: 'user-name',
      storage: createJSONStorage(() => localStorage),
  }
))
