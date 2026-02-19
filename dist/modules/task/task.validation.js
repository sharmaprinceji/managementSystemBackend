"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
});
exports.updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
});
