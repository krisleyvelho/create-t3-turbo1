import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const jsonRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.jsonStorage.findMany();
  }),
  create: publicProcedure
    .input(z.object({ data: z.object({ name: z.string() }) }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.jsonStorage.create({ data: input });
    }),
});
