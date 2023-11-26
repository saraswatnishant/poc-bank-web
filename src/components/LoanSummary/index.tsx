import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";

const LoanSummary = ({
  fields = [],
  showTitle = true,
  title,
}: {
  fields: { name: string; value: string | number }[];
  showTitle: boolean;
  title?: string;
}) => {
  return (
    <Box
      mt={4}
      sx={{
        textAlign: "center",
        color: "primary.main",
        border: "1px solid #BF2051",
      }}
    >
      {showTitle && (
        <Typography
          sx={{
            textAlign: "center",
            borderBottom: "1px solid #BF2051",
            pb: "10px",
          }}
          variant="h6"
        >
          {title}
        </Typography>
      )}
      <Divider />
      <TableContainer>
        <Table size="medium">
          <TableBody>
            {fields.map(({ name, value }) => {
              return (
                <TableRow key={name}>
                  <TableCell sx={{ fontWeight: 700 }}>{name}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>{value}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LoanSummary;
