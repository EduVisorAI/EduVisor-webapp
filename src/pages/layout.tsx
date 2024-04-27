import { Container } from "../components/container/container.tsx";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};
