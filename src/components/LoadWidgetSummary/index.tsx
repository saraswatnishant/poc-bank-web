import { Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LoadWidgetSummaryType } from "../../utility/types";
import { Link } from "react-router-dom";

const LoadWidgetSummary = ({ title, total }: LoadWidgetSummaryType) => {
  const { palette } = useTheme();
  const { primary } = palette;
  return (
    <Card
      sx={{
        color: `${primary.main}`,
        p: "8px",
        boxShadow:
          "0px 0px 0px 1px rgba(0, 0, 0, 0.05), inset 0px 0px 0px 1px rgba(209, 213, 219,1)",
      }}
    >
      <Link
        to="/manageloans"
        style={{ textDecoration: "none", color: primary.main }}
      >
        <CardContent>
          <Typography variant="h4">{total}</Typography>
          <Typography variant="subtitle2">{title}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
};
export default LoadWidgetSummary;
