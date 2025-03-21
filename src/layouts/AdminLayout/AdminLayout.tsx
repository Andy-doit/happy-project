


import SidebarAdmin from "@/components/siderbarAdmin/siderbarAdmin";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface Props {
  children?: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <SidebarAdmin />
      <SidebarInset>
        {children}

      </SidebarInset>
    </SidebarProvider>
  )
}