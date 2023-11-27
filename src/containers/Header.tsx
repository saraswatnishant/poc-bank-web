import { useContext } from "react";
import { AppBar, Container, Box, Avatar, Typography } from "@mui/material";
import ActionBar from "../components/ActionBar";
import Logo from "../assets/image.png";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { UserContext } from "../utility/UserContext";
const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { role } = useContext(UserContext);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    navigate(newValue);
  return (
    <AppBar position="sticky">
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            my: 2,
          }}
        >
          <Box
            onClick={() => {
              navigate("/");
            }}
            component="img"
            sx={{
              height: "3rem",
              cursor: "pointer",
            }}
            alt="Insta Bank Logo."
            src={Logo}
          />
          {isAuthenticated && (
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                alignSelf: "flex-end",
              }}
            >
              <Avatar></Avatar>
              <Typography variant="subtitle2">Nishant ({role})</Typography>
            </Box>
          )}
        </Box>
        {isAuthenticated && (
          <ActionBar
            handleTabChange={handleTabChange}
            value={pathname}
            tabs={[
              { name: "Dashboard", value: "/dashboard" },
              { name: "Manage Loans", value: "/manageloans" },
            ]}
          />
        )}
      </Container>
    </AppBar>
  );
};

export default Header;
