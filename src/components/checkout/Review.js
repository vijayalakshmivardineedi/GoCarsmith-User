import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

const products = [
  {
    name: "Basic Service",
    desc: " A visual inspection and oil and filter change, the critical fluids in the engine such as anti-freeze, brake fluid, washer fluid, and steering fluid), are topped up.",
    price: "2400",
  },
  {
    name: "Front Bumper Paint ",
    desc: "Removal of minor scratches,Grade A Primer Applied,high Quality DuPont Paint",
    price: "3600",
  },
  {
    name: "Clutch Bearing Replacement",
    desc: "Clutch Set, Clutch Cable/WIre,Clutch Cylinder,FlyWheel,Hydraulic Bearing in Add Ons",
    price: "2400",
  },
  {
    name: "Fog Light",
    desc: "Opening And Fitting of Bumper + Fog Lamp,Fog Light Assembly Replacement",
    price: "1300",
  },
  { name: "Labour Charges", desc: "", price: "104.00" },
  { name: "Discount", desc: "Applied coupon", price: "250" },
  { name: "Taxes", desc: "", price: "128.21" },
];

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review() {
  return (
    <React.Fragment>
      <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
      <Typography variant="h5" gutterBottom>
        Order summary
      </Typography>
      <Typography variant="h5" sx={{fontWeight:"700"}}> Order ID:#2001539</Typography></div>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            10128.21
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Customer Address
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
