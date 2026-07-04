import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={10}
        toastOptions={{
          duration: 3000,

          style: {
            background: "#fff",
            color: "#1e293b",
            borderRadius: "14px",
            padding: "16px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.15)",
          },

          success: {
            iconTheme: {
              primary: "#2563eb",
              secondary: "#fff",
            },
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <AppRoutes />
    </>
  );
}

export default App;