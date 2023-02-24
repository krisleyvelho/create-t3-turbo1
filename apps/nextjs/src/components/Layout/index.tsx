import { ReactNode } from "react";
import { HeaderLayout, HeaderLayoutProps } from "./Header";

export function LayoutBase({
  children,
  ...props
}: { children: ReactNode } & HeaderLayoutProps) {
  return (
    <div className="h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div>
        <HeaderLayout {...props} />
        {children}
      </div>
    </div>
  );
}
