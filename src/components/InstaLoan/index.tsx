import { useContext } from "react";
import {
  Card,
  CardActions,
  CardMedia,
  Typography,
  CardContent,
  Button,
} from "@mui/material";

import { InstaLoanCardType } from "../../utility/types";
import { UserContext } from "../../utility/UserContext";

const InstaLoanCard = ({
  image,
  heading,
  subheading,
  buttonText,
  handleApplyLoan,
}: InstaLoanCardType) => {
  const { role } = useContext(UserContext);
  return (
    <Card
      sx={{
        p: "8px",
        boxShadow:
          "0px 0px 0px 1px rgba(0, 0, 0, 0.05), inset 0px 0px 0px 1px rgba(209, 213, 219,1)",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt="Instant Apply Loan Card Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {heading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subheading}
        </Typography>
      </CardContent>
      {role === "Applicant" && (
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            onClick={() => handleApplyLoan(true)}
            variant="contained"
            size="small"
          >
            {buttonText}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default InstaLoanCard;
