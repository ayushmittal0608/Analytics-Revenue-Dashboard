export type UserRole = 'ADMIN' | 'MANAGER';
export type UserRegion = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | null;
export interface AuthenticatedUser {
    id: number;
    email: string;
    role: UserRole;
    region: UserRegion;
}
