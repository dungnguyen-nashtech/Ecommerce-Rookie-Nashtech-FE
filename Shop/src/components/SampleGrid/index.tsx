import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";


export default function SampleGrid() {
  return (
    <Box sx={{ flexGrow: 1, display: "block" }}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          h
        </Grid>
        <Grid xs={4}>
          h
        </Grid>
        <Grid xs={4}>
          h
        </Grid>
        <Grid xs={8}>
          h
        </Grid>
      </Grid>
    </Box>
  );
}