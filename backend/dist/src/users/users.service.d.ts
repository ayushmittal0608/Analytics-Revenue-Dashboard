export declare class UsersService {
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        passwordHash: string;
        role: "ADMIN" | "MANAGER";
        region: "NORTH" | "SOUTH" | "EAST" | "WEST" | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findById(id: number): Promise<{
        id: number;
        email: string;
        role: "ADMIN" | "MANAGER";
        region: "NORTH" | "SOUTH" | "EAST" | "WEST" | null;
    }>;
}
