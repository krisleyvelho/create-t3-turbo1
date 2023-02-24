import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const pointMapRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.pointMap.findMany({ orderBy: { id: "asc" } });
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.pointMap.findFirst({ where: { id: input } });
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        zoom: z.number().min(0),
        coordinateX: z.string(),
        coordinateY: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.pointMap.create({ data: input });
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.pointMap.delete({ where: { id: input } });
  }),
  put: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
        zoom: z.number().min(0),
        coordinateX: z.string(),
        coordinateY: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.pointMap.update({
        where: { id: input.id },
        data: input,
      });
    }),
});

export const polygonMapRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.polygonItens.findMany({ orderBy: { id: "asc" } });
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.polygonItens.findFirst({ where: { id: input } });
  }),
});
