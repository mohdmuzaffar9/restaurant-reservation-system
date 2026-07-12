import CustomerNavbar from "../components/CustomerNavbar";

function CustomerLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">

      <CustomerNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>

    </div>
  );
}

export default CustomerLayout;