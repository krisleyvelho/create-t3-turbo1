type HeaderLayoutProps = {
  title?: string;
};

export function HeaderLayout({ title }: HeaderLayoutProps) {
  return (
    <div>
      {title && (
        <div className="w-100 bg-gray-500 p-4 text-white">
          <span>{title}</span>
        </div>
      )}
    </div>
  );
}
