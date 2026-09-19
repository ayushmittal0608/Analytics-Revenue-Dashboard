"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bcrypt = __importStar(require("bcrypt"));
const index_1 = require("../index");
const schema_1 = require("../schema");
async function seedUsers() {
    console.log('Seeding users...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const northPassword = await bcrypt.hash('north123', 10);
    const southPassword = await bcrypt.hash('south123', 10);
    await index_1.db
        .insert(schema_1.users)
        .values([
        {
            email: 'admin@example.com',
            passwordHash: adminPassword,
            role: 'ADMIN',
            region: null,
        },
        {
            email: 'north@example.com',
            passwordHash: northPassword,
            role: 'MANAGER',
            region: 'NORTH',
        },
        {
            email: 'south@example.com',
            passwordHash: southPassword,
            role: 'MANAGER',
            region: 'SOUTH',
        },
    ])
        .onConflictDoNothing({
        target: schema_1.users.email,
    });
    console.log('Users seeded successfully.');
}
seedUsers()
    .catch((error) => {
    console.error('User seed failed:', error);
    process.exit(1);
})
    .finally(() => {
    process.exit(0);
});
//# sourceMappingURL=users.seed.js.map