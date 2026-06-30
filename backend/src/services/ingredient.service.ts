import prisma from "../config/prisma";

export const createIngredient = async (data: any) => {
  return prisma.ingredient.create({
    data,
  });
};

// export const getIngredients = async () => {
//   return prisma.ingredient.findMany({
//     include: {
//       categoryId: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
// };

export const updateIngredient = async (id: string, data: any) => {
  return prisma.ingredient.update({
    where: { id },
    data,
  });
};

export const deleteIngredient = async (id: string) => {
  return prisma.ingredient.delete({
    where: { id },
  });
};