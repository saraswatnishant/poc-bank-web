import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BankerImage from "../assets/banker.jpeg";
import ApplicantImage from "../assets/applicant.jpeg";
import { HomeComponentType, UserRole } from "../utility/types";

const Home = ({ setUser }: HomeComponentType) => {
  const navigate = useNavigate();
  const handleNavigation = (userRole: UserRole) => {
    setUser({ role: userRole });
    navigate("/dashboard");
  };

  return (
    <Grid container spacing={2} columns={12} sx={{ pt: "16px" }}>
      <Grid item xs={12} sm={6}>
        <Card sx={{ height: "100%" }}>
          <CardActionArea onClick={() => handleNavigation("Banker")}>
            <CardMedia
              sx={{ height: 300 }}
              image={BankerImage}
              title="Banker"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Banker Login
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Access the portal with banker admin privileges for comprehensive
                financial oversight. Streamline transactions, monitor accounts,
                and ensure seamless banking operations.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ height: "100%" }}>
          <CardActionArea onClick={() => handleNavigation("Applicant")}>
            <CardMedia
              sx={{ height: 300 }}
              image={ApplicantImage}
              title="Applicant"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Applicant Login
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Utilize the portal as a loan applicant for a hassle-free
                application process. Submit documents, track progress, and stay
                informed about your loan journey.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
