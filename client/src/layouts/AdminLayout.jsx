import { useState } from "react";



import AdminSidebar from "../components/AdminSidebar";



function AdminLayout({ children }) {



  const [sidebarOpen, setSidebarOpen] = useState(false);



  return (



    <div className="min-h-screen bg-slate-100 flex">



      <AdminSidebar

        sidebarOpen={sidebarOpen}

        setSidebarOpen={setSidebarOpen}

      />



      <main className="flex-1 min-w-0 md:ml-64 h-screen overflow-y-auto">



        {/* Mobile Header */}



        <div className="md:hidden bg-white shadow px-4 py-4 flex items-center justify-between">



          <h1 className="text-xl font-bold text-slate-800">

            Admin Panel

          </h1>



          <button

            onClick={() => setSidebarOpen(true)}

            className="text-3xl"

          >

            ☰

          </button>



        </div>



        <div className="p-4 md:p-8 md:pt-8">

          {children}

        </div>



      </main>



    </div>



  );

}



export default AdminLayout;