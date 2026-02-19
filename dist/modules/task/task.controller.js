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
exports.getTaskById = exports.toggleTask = exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const taskService = __importStar(require("./task.service"));
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = await taskService.createTask(req.userId, title, description);
        res.status(201).json(task);
    }
    catch (error) {
        res.status(400).json({ error: "Task creation failed" });
    }
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const status = req.query.status;
        const search = req.query.search;
        const tasks = await taskService.getTasks(req.userId, page, limit, status, search);
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};
exports.getTasks = getTasks;
const updateTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await taskService.updateTask(req.userId, id, req.body);
        res.json({ message: "Task updated" });
    }
    catch {
        res.status(400).json({ error: "Update failed" });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await taskService.deleteTask(req.userId, id);
        res.json({ message: "Task deleted" });
    }
    catch {
        res.status(400).json({ error: "Delete failed" });
    }
};
exports.deleteTask = deleteTask;
const toggleTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const task = await taskService.toggleTask(req.userId, id);
        res.json(task);
    }
    catch {
        res.status(400).json({ error: "Toggle failed" });
    }
};
exports.toggleTask = toggleTask;
const getTaskById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const task = await taskService.getTaskById(req.userId, id);
        if (!task) {
            return res.status(404).json({
                error: "Task not found",
            });
        }
        res.json(task);
    }
    catch {
        res.status(500).json({
            error: "Error fetching task",
        });
    }
};
exports.getTaskById = getTaskById;
