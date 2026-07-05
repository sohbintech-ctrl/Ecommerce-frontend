import AdminSideBar from "./admin/dashboard/components/adminsidebar";
import ProfileSection from "./admin/dashboard/components/Profilesection";
import { AuthProvider } from "../(main)/context/authContext";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster richColors position="top-center" />

      <AuthProvider>
        <div className="flex">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 min-h-screen border-r">
            <AdminSideBar />
          </aside>

          <div className="flex-1 pt-4">
            <ProfileSection />
            <main>{children}</main>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}
