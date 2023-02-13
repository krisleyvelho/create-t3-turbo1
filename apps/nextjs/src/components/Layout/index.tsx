import { ReactElement } from "react";
import { HeaderLayout } from "./Header";

type LayoutProps = {
  title?: string;
  children: ReactElement;
};

export function LayoutBase({ title, children }: LayoutProps) {
  return (
    <div className="h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <HeaderLayout title={title} />
      {children}
    </div>
  );
}
