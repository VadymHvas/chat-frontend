export interface UserState {
  id: string;
  name: string;
  onlineUsers: Set<string>;
  invitations: Set<string>;
}