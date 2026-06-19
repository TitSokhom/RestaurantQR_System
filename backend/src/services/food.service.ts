import prisma from "../config/prisma";

type UpdateFoodDTO = {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  categoryId?: string;
};

type CreateFoodDTO = {
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: string;
  isAvailable?: boolean;
};

export const createFood = async (data: CreateFoodDTO) => {
  return prisma.food.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      categoryId: data.categoryId,
      isAvailable: data.isAvailable ?? true,
    },
  });
};

// GET ALL
export const getFoods = async () => {
  return prisma.food.findMany({
    include: {
      category: true,
    },
    orderBy:{
      createdAt:"desc"
    }
  });
};

// GET BY ID
export const getFoodById = async (id: string) => {
  return prisma.food.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
};

// UPDATE
export const updateFood = async (id: string, data: UpdateFoodDTO) => {
  return prisma.food.update({
    where: { id },
    data,
  });
};

// DELETE
export const deleteFood = async (id: string) => {
  return prisma.food.delete({
    where: { id },
  });
};
