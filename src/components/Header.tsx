import { ReactNode } from "react";

type HeaderProps = {
  title: string;
  icon?: ReactNode;
};

export default function Header({ title, icon }: HeaderProps) {
  return (
    <h1 className="text-white text-3xl font-bold flex items-center justify-center gap-2">
      {title}
      {icon}
    </h1>
  );
}
