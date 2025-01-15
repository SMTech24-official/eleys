import { Prisma, Provider } from "@prisma/client";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { IPaginationOptions } from "../../interface/pagination.type";
import { calculatePagination } from "../../utils/calculatePagination";

const createProvider = async (provider: Provider) => {
    const isExitProvider = await prisma.provider.findUnique({
        where: {
            email: provider.email,
        },
    });

    if (isExitProvider) {
        throw new AppError(httpStatus.BAD_REQUEST, "provider already exists");
    }

    const result = await prisma.provider.create({
        data: provider,
    });

    return result;
}

const getProvider = async (id: string) => {
    const result = await prisma.provider.findUnique({
        where: {
            id: id,
        },
    });

    if (!result) throw new AppError(httpStatus.NOT_FOUND, "provider not found");

    return result;
}


const getAllProvider = async (options: IPaginationOptions, params: any) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

    const { searchTerm, ...restFilters } = params;

    const andConditions: Prisma.ProviderWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: ["name"].map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        })
    }

    if (Object.keys(restFilters).length > 0) {
        andConditions.push({
            AND: Object.keys(restFilters).map((key) => ({
                [key]: { equals: (restFilters as any)[key] },
            })),
        });
    }

    const result = await prisma.provider.findMany({
        where: {
            AND: andConditions,
        },
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
    });

    const total = await prisma.provider.count({});

    const meta = {
        page,
        limit,
        total,
    }

    return { data: result, meta };
}

const updateProvider =  async (id: string, provider: Partial<Provider>) => { 
    const isExitProvider = await prisma.provider.findUnique({
        where: {
            id: id,
        },
    });

    if (!isExitProvider) {
        throw new AppError(httpStatus.NOT_FOUND, "provider not found");
    }

    const result = await prisma.provider.update({
        where: {
            id: id,
        },
        data: provider,
    });

    return result;
}

const deleteProvider = async (id: string) => {
    const isExitProvider = await prisma.provider.findUnique({
        where: {
            id: id,
        },
    });

    if (!isExitProvider) {
        throw new AppError(httpStatus.NOT_FOUND, "provider not found");
    }

    const result = await prisma.provider.delete({
        where: {
            id: id,
        },
    });

    return result;
}

export const ProviderService = {
    createProvider,
    getProvider,
    getAllProvider,
    updateProvider,
    deleteProvider
};