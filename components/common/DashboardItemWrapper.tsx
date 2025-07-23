export function DashboardItemWrapper({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  const combinedClass =
    "bg-white/80 dark:bg-white/10 p-6 rounded-xl min-h-30" +
    (className ? " " + className : "");
  return <div className={combinedClass}>{children}</div>;
}
