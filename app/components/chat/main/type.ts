export interface UserProfile {
  name: string;
  username: string;
  phone: string;
  email: string;
  status: "online" | "offline" | "last seen";
  lastSeen?: string;
  bio: string;
  joinDate: string;
  location: string;
  avatar?: string;
}
