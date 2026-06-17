import prisma from "../config/prisma";

type CreateFoodDTO = {
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: string;
};

type UpdateFoodDTO = {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  categoryId?: string;
};

// CREATE
export const createFood = async (data: CreateFoodDTO) => {
  return prisma.food.create({
    data:{
      name:data.name,
      description:data.description,
      price:data.price,
      image:data.image,
      categoryId:data.categoryId
    }
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
