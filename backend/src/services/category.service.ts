import prisma from "../config/prisma";

// TYPES
type CreateCategoryDTO = {
  name: string;
  icon: string | null;
  description: string | null;
  publishImmediately: boolean;
  isAvailable?: boolean;
};

type UpdateCategoryDTO = {
  name?: string;
  icon?: string | null;
  description?: string | null;
  publishImmediately?: boolean;
  isAvailable?: boolean;
};

// CREATE
export const createCategory = async (data: CreateCategoryDTO) => {
  return prisma.category.create({
    data: {
      name: data.name,
      icon: data.icon,
      description: data.description,
      isPublished: data.publishImmediately,
    },
  });
};

// GET ALL
export const getCategories = async () => {
  return prisma.category.findMany({
    // include: {
    //   foods:{
    //     where:{
    //       isAvailable:true
    //     }
    //   }
    // },
    // orderBy: {
    //   createdAt: "asc",
    // },
    include: {
  foods: {
    where: { isAvailable: true },
    orderBy: { createdAt: "desc" },
  },
}
  });
};

// GET BY ID
export const getCategoryById = async (id: string) => {
  return prisma.category.findUnique({
    where: { id },
    include: {
      foods: true,
    },
  });
};

// UPDATE
export const updateCategory = async (id: string, data: UpdateCategoryDTO) => {
  return prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      icon: data.icon,
      description: data.description,
      isPublished: data.publishImmediately,
    },
  });
};

// DELETE
export const deleteCategory = async (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};