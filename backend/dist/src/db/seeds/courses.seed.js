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
async function seedCourses() {
    console.log('Seeding courses...');
    const filePath = path_1.default.join(process.cwd(), 'data', 'data.json');
    const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
    if (data.courses?.length) {
        await index_1.db
            .insert(schema_1.courses)
            .values(data.courses.map((course) => ({
            id: course.id,
            title: course.title,
            category: course.category,
            level: course.level,
            instructor: course.instructor,
            duration_weeks: course.duration_weeks
        })))
            .onConflictDoNothing({
            target: schema_1.courses.id,
        });
    }
    console.log('Courses seeded successfully.');
}
seedCourses()
    .catch((error) => {
    console.error('Course seed failed:', error);
    process.exit(1);
})
    .finally(() => {
    process.exit(0);
});
//# sourceMappingURL=courses.seed.js.map