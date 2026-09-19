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
async function seedEnrollments() {
    console.log('Seeding enrollments...');
    const filePath = path_1.default.join(process.cwd(), 'data', 'data.json');
    const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
    const enrollmentRows = data.students.flatMap((student) => (student.enrollments ?? []).map((enrollment) => ({
        student_id: student.id,
        course_id: enrollment.course_id,
        enrolled_on: enrollment.enrolled_on,
        completion_status: enrollment.completion_status,
        grade: enrollment.grade,
        rating: enrollment.rating,
        fee_paid: String(enrollment.fee_paid),
    })));
    if (enrollmentRows.length) {
        await index_1.db
            .insert(schema_1.enrollments)
            .values(enrollmentRows);
    }
    console.log('Enrollments seeded successfully.');
}
seedEnrollments()
    .catch((error) => {
    console.error('Enrollment seed failed:', error);
    process.exit(1);
})
    .finally(() => {
    process.exit(0);
});
//# sourceMappingURL=enrollments.seed.js.map