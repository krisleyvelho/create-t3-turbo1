import { authRouter } from "./router/auth";
import { eventoRouter } from "./router/evento";
import { pointMapRouter } from "./router/map";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  evento: eventoRouter,
  pointerMap: pointMapRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
