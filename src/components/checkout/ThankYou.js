import React from 'react';
import { Typography } from '@mui/material';
const ThankYou=()=>{
    return(
        <div>
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update from the Service Center on your Appointment.
              </Typography>
            </React.Fragment>
        </div>
    );
}
export default ThankYou