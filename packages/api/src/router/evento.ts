import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const eventoRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.evento.findMany({ orderBy: { id: "asc" } });
  }),
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.evento.create({
        data: input,
      });
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.evento.delete({ where: { id: input } });
  }),
});
