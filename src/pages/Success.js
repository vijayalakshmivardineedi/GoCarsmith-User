import React from "react";
import { Typography } from "@mui/material";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BiCheckCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";

const Success = () => {
  return (
    <Container
      fluid
      style={{
       
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row className="justify-content-center">
        <Col className="text-center">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BiCheckCircle style={{ fontSize: "200px", color: "green" }} />
          </div>
          <Typography
            variant="h4"
            gutterBottom
            style={{
              marginTop: "10px",
              color: "green",
              fontWeight:"700",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            Payment Successful
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            style={{ marginTop: "50px"}}
          >
            Thank you for your order.
          </Typography>
          <Typography variant="subtitle1" >
             We will send you an update from the Service Center on
            your Appointment.
          </Typography>
          <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center", marginTop: "20px"
            }}>
            
             
            
          </div>
          <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center", marginTop: "20px"
            }}>
            <Link to="/">
              <Typography variant="h5" gutterBottom>
                Back to Home
              </Typography>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Success;
