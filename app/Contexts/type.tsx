export interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  phone: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
}
export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  getUserProfile: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
