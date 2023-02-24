import Link from "next/link";

export type HeaderLayoutProps = {
  title?: string;
};

export function HeaderLayout({ title }: HeaderLayoutProps) {
  const routersHeader: { title: string; route: string }[] = [
    { title: "Página inicial", route: "/" },
    { title: "Mapa", route: "/map" },
  ];

  return (
    <div className="w-100 flex items-center justify-between bg-gray-500 p-4 text-center text-white">
      {title && (
        <div>
          <span>{title}</span>
        </div>
      )}
      {routersHeader.length && (
        <div className="flex gap-4">
          {routersHeader.map((link) => (
            <Link href={link.route} key={link.route}>
              {link.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
