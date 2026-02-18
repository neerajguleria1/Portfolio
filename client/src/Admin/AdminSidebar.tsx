import { useRouter } from "../router";
import {
  LayoutGrid, FileText, X, Menu, LogOut
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminSidebar({ open, setOpen }: SidebarProps) {
  const { navigate, currentPath } = useRouter();

  const links = [
    { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/admin" },
    { name: "Posts", icon: <FileText size={20} />, path: "/admin/posts" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login"); 
  };

  return (
    <>
      {!open && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#0e1a39] text-white rounded-lg"
          onClick={() => setOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      <div className={`fixed left-0 top-0 w-64 h-full bg-[#0e1a39] text-white p-6 transition-transform duration-300 z-50
        flex flex-col justify-between
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>

        <div>
          <button
            className="md:hidden absolute right-4 top-4 text-white"
            onClick={() => setOpen(false)}
          >
            <X size={22} />
          </button>

          <h1 className="text-xl font-bold flex items-center gap-2 mb-8 mt-8 md:mt-0">
            <FileText size={22} /> Blogwise Admin
          </h1>

          <div className="space-y-1">
            {links.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-md text-sm w-full text-left transition-all
                  ${currentPath === item.path ? "bg-[#213b75]" : "hover:bg-[#16244a] text-gray-300"}`}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ Logout Button at Bottom */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-md text-sm mt-4 w-full text-left bg-[#16244a] hover:bg-[#213b75] transition-all"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </>
  );
}
