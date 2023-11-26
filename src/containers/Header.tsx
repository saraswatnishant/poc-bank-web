import { AppBar, Container, Box, Avatar, Typography } from "@mui/material";
import ActionBar from "../components/ActionBar";
import Logo from "../assets/image.png";
import { useLocation, useNavigate } from "react-router-dom";
const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    navigate(newValue);

  return (
    <AppBar position="sticky">
      <Container maxWidth={"xl"}>
        <Box
          sx={{
            pt: "16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            component="img"
            sx={{
              height: "3rem",
            }}
            alt="Insta Bank Logo."
            src={Logo}
          />
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
          >
            <Avatar></Avatar>
            <Typography variant="body2">Nishant Saraswat</Typography>
          </Box>
        </Box>
        <ActionBar
          handleTabChange={handleTabChange}
          value={pathname}
          tabs={[
            { name: "Dashboard", value: "/dashboard" },
            { name: "Manage Loans", value: "/manageloans" },
          ]}
        />
      </Container>
    </AppBar>
  );
};

export default Header;
