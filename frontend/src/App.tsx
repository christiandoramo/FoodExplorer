import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./contexts/auth";
import { GlobalStyle } from "./themes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <GlobalStyle />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer
        newestOnTop={true}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        position="bottom-center"
      />
    </>
  );
};

export default App;
