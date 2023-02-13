import { authRouter } from "./router/auth";
import { eventoRouter } from "./router/evento";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  evento: eventoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
