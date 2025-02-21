"use client";

import { DashboardLayout } from "components/Layouts/DashboardLayout";

interface DashboardRootLayoutProps {
  children: React.ReactNode;
}

export default function DashboardRootLayout({ children }: DashboardRootLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
