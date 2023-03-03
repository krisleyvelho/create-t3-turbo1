import Link from "next/link";
import { ReactNode, useState } from "react";

type LayoutProps = {
  children: ReactNode;
};

export function NewLayout({ children }: LayoutProps) {
  const [showAside, setShowAside] = useState<boolean>(false);

  const routers: { title: string; route: string }[] = [
    { title: "Página inicial", route: "/" },
    { title: "Mapa", route: "/map" },
  ];

  const Header = () => (
    <div>
      <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="text-3xl"
            onClick={() => setShowAside(!showAside)}
          >
            aqui
          </button>
          <div>Logo</div>
        </div>
      </header>
    </div>
  );
  return (
    <div>
      <main
        className="min-h-screen w-full bg-gray-100 text-gray-700"
        x-data="layout"
      >
        <Header />

        <div className="flex">
          {showAside && (
            <aside
              className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2"
              style={{ height: "90vh" }}
              x-show="asideOpen"
            >
              {routers.map((route) => (
                <Link
                  key={route.route}
                  href={route.route}
                  className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
                  onClick={() => setShowAside(false)}
                >
                  {route.title}
                </Link>
              ))}
            </aside>
          )}
          <div className="w-full py-4">{children}</div>
        </div>
      </main>
    </div>
  );
}
