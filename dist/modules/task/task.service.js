"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTask = exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const db_1 = require("../../config/db");
const createTask = async (userId, title, description) => {
    return db_1.prisma.task.create({
        data: {
            title,
            description,
            userId,
        },
    });
};
exports.createTask = createTask;
const getTasks = async (userId, page, limit, status, search) => {
    const skip = (page - 1) * limit;
    return db_1.prisma.task.findMany({
        where: {
            userId,
            status: status || undefined,
            title: search
                ? {
                    contains: search,
                }
                : undefined,
        },
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getTasks = getTasks;
const getTaskById = async (userId, taskId) => {
    return db_1.prisma.task.findFirst({
        where: {
            id: taskId,
            userId,
        },
    });
};
exports.getTaskById = getTaskById;
const updateTask = async (userId, taskId, data) => {
    return db_1.prisma.task.updateMany({
        where: {
            id: taskId,
            userId,
        },
        data,
    });
};
exports.updateTask = updateTask;
const deleteTask = async (userId, taskId) => {
    return db_1.prisma.task.deleteMany({
        where: {
            id: taskId,
            userId,
        },
    });
};
exports.deleteTask = deleteTask;
const toggleTask = async (userId, taskId) => {
    const task = await db_1.prisma.task.findFirst({
        where: { id: taskId, userId },
    });
    if (!task)
        throw new Error("Task not found");
    const newStatus = task.status === "DONE" ? "TODO" : "DONE";
    return db_1.prisma.task.update({
        where: { id: taskId },
        data: { status: newStatus },
    });
};
exports.toggleTask = toggleTask;
