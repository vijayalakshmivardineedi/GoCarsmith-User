import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chip } from "@mui/material";
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CenteredContainer = styled("div")({
  display: "flex", // Adjust as needed
});

export default function OrderHistory() {
  const [expandedMap, setExpandedMap] = React.useState({});
  const [orderHistory, setOrderHistory] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleExpandClick = (orderId) => {
    setExpandedMap((prevExpandedMap) => ({
      ...prevExpandedMap,
      [orderId]: !prevExpandedMap[orderId],
    }));
  };

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;

  React.useEffect(() => {
    const getOrderHistory = async () => {
      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/getAppointmentBookingById/${userId}`
        );
        if (response.data) {
          setOrderHistory(response.data);
          // Initialize expandedMap with default values
          const initialExpandedMap = response.data.reduce(
            (acc, order) => ({ ...acc, [order._id]: false }),
            {}
          );
          setExpandedMap(initialExpandedMap);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getOrderHistory();
  }, [userId]);

  return (
    <CenteredContainer
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      {isLoading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : orderHistory.length === 0 ? (
        <div
          style={{
            display: "flex",
            minHeight: "70vh",
          }}
        >
          <Typography variant="h4" sx={{textAlign:"center"}}>
            <strong>No orders placed</strong>
          </Typography>
        </div>
      ) : (
        orderHistory.map((eachDetail) => (
          <Card
            key={eachDetail._id}
            sx={{
              maxWidth: 345,
              margin: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 8px 8px",
              backgroundColor: "#D3D3D3",
              padding: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <CardHeader
                title={eachDetail.carModel}
                subheader={eachDetail.Brand}
                subheaderTypographyProps={{ display: "inline" }}
                style={{ marginRight: "50px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image={`https://gocarsmithbackend.onrender.com${eachDetail.imagePath}`}
                alt="Car Image"
                style={{ border: "15px solid white", borderRadius: "5px" }}
              />
            </div>
            <div
              style={{ display: "flex", alignItems: "center", padding: "10px" }}
            >
              <Typography variant="body2" color="text.secondary">
                Booking Id: {eachDetail._id}
              </Typography>
              <Chip label={eachDetail.status} style={{ marginLeft: "40px" }} />
            </div>
            <div
              style={{ display: "flex", alignItems: "center", padding: "10px" }}
            >
              <Typography variant="body2" color="text.secondary">
                Fuel Type:
                <Chip
                  label={eachDetail.fuelType}
                  style={{ marginLeft: "40px" }}
                />
              </Typography>
            </div>
            <CardActions disableSpacing style={{ borderTop: "1px solid #ccc" }}>
              <h4>Service History</h4>
              <ExpandMore
                expand={expandedMap[eachDetail._id]}
                onClick={() => handleExpandClick(eachDetail._id)}
                aria-expanded={expandedMap[eachDetail._id]}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse
              in={expandedMap[eachDetail._id]}
              timeout="auto"
              unmountOnExit
            >
              {eachDetail.listOfServices &&
                eachDetail.listOfServices.map((eachService, index) => (
                  <CardContent key={index}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ marginRight: "20px" }}
                      >
                        Service: {eachService.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ marginLeft: "auto" }}
                      >
                        Price: {eachService.price}
                      </Typography>
                    </div>
                  </CardContent>
                ))}
            </Collapse>
          </Card>
        ))
      )}
    </CenteredContainer>
  );
}
