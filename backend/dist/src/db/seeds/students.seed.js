"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const index_1 = require("../index");
const schema_1 = require("../schema");
async function seedStudents() {
    console.log('Seeding students...');
    const filePath = path_1.default.join(process.cwd(), 'data', 'data.json');
    const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
    if (data.students?.length) {
        await index_1.db
            .insert(schema_1.students)
            .values(data.students.map((student) => ({
            id: student.id,
            name: student.name,
            region: student.region.toUpperCase(),
            joined_on: student.joined_on
        })))
            .onConflictDoNothing({
            target: schema_1.students.id,
        });
    }
    console.log('Students seeded successfully.');
}
seedStudents()
    .catch((error) => {
    console.error('Student seed failed:', error);
    process.exit(1);
})
    .finally(() => {
    process.exit(0);
});
//# sourceMappingURL=students.seed.js.map