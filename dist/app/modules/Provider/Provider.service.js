"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const calculatePagination_1 = require("../../utils/calculatePagination");
const createProvider = (provider) => __awaiter(void 0, void 0, void 0, function* () {
    const isExitProvider = yield prisma_1.default.provider.findUnique({
        where: {
            email: provider.email,
        },
    });
    if (isExitProvider) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "provider already exists");
    }
    const result = yield prisma_1.default.provider.create({
        data: provider,
    });
    return result;
});
const getProvider = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.provider.findUnique({
        where: {
            id: id,
        },
    });
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "provider not found");
    return result;
});
const getAllProvider = (options, params) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, calculatePagination_1.calculatePagination)(options);
    const { searchTerm } = params, restFilters = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: ["name"].map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(restFilters).length > 0) {
        andConditions.push({
            AND: Object.keys(restFilters).map((key) => ({
                [key]: { equals: restFilters[key] },
            })),
        });
    }
    const result = yield prisma_1.default.provider.findMany({
        where: {
            AND: andConditions,
        },
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.provider.count({});
    const meta = {
        page,
        limit,
        total,
    };
    return { data: result, meta };
});
const updateProvider = (id, provider) => __awaiter(void 0, void 0, void 0, function* () {
    const isExitProvider = yield prisma_1.default.provider.findUnique({
        where: {
            id: id,
        },
    });
    if (!isExitProvider) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "provider not found");
    }
    const result = yield prisma_1.default.provider.update({
        where: {
            id: id,
        },
        data: provider,
    });
    return result;
});
const deleteProvider = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExitProvider = yield prisma_1.default.provider.findUnique({
        where: {
            id: id,
        },
    });
    if (!isExitProvider) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "provider not found");
    }
    const result = yield prisma_1.default.provider.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.ProviderService = {
    createProvider,
    getProvider,
    getAllProvider,
    updateProvider,
    deleteProvider
};
