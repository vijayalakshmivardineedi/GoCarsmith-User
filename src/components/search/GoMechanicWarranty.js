import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const GoMechanicWarranty = () => {
  return (
    <Paper elevation={3} style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', margin: '20px' }}>
      <div style={{ backgroundColor: '#333', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" style={{ fontSize: '24px', margin: 0 }}>GoMechanic Warranty</Typography>
      </div>
      <div style={{ padding: '20px' }}>
        <Typography variant="h5" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>GoMechanic Service Warranty</Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Free Car Inspection"
              secondary="If you face any issue post-service by GoMechanic, we'll inspect your car for free. That's a GoMechanic promise!"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Replacement Warranty"
              secondary="At GoMechanic, we use 100% Genuine OES Parts. However, you can redeem the free replacement for any defective consumable (Oil, Filters, and Brakes) at any GoMechanic workshop within 30 days of service."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Network Warranty"
              secondary="GoMechanic provides a Standard Network Warranty of 1000 Kms/1-Month (whichever comes earlier) on Service & Consumables."
            />
          </ListItem>
        </List>
        <Typography variant="h5" style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '20px', color: '#333' }}>Terms and Conditions</Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Any defects that may occur post the Standard Warranty Period (1-Month/1000kms) will not be covered by GoMechanic."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="GoMechanic will not be held liable for any aftermarket spare parts fitted (before or after the GoMechanic Service) by any non-partner/non-GoMechanic workshop."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="GoMechanic Service Warranty stands void if the car is repaired/serviced at non-GoMechanic workshops during the warranty period."
            />
          </ListItem>
        </List>
      </div>
    </Paper>
  );
};

export default GoMechanicWarranty;
