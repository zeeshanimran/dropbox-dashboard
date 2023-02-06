import { Box, Container } from "@mui/material";
import { useContext } from "react";
import { useRoutes } from "react-router-dom";
import Header from "./components/Header";
import { AppContext } from "./context/AppContext";
import routes from "./routes";

const App = () => {
  const { user } = useContext(AppContext);
  const element = useRoutes(routes);
  return (
    <Box>
      {Boolean(user) && <Header />}
      <Container maxWidth="xl">{element}</Container>
    </Box>
  );
};

export default App;
