import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import "../styles/globals.css";

import { MapProvider } from "~/contexts/map";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MapProvider>
        <Component {...pageProps} />
      </MapProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
