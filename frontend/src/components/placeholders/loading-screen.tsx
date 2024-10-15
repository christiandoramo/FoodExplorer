import { Backdrop, CircularProgress, Box } from "@mui/material";
import { useEffect } from "react";
import { Logo } from "../logo";

const LoadingScreen: React.FC<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ loading, setLoading }) => {
  useEffect(() => {
    // Simular um carregamento e disparar o toast
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <Backdrop
          open={loading}
          style={{
            zIndex: 9999,
            color: "#fff",
            backdropFilter: "blur(8px)", // Efeito de desfoque
          }}
          className="bg-home"
        >
          <Logo />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            height="100%"
          >
            <CircularProgress color="inherit" />
          </Box>
        </Backdrop>
      )}
    </>
  );
};

export default LoadingScreen;
