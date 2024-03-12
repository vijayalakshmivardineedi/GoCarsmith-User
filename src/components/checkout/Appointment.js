import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Button, Grid, Typography } from "@mui/material";
const Appointment = () => {
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const [currentDate, setCurrentDate] = React.useState(dayjs());
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };
  const startMorningHour = 10;
  const endMorningHour = 12;
  const startAfternoonHour = 12;
  const endAfternoonHour = 16;
  const startEveningHour = 16;
  const endEveningHour = 18;
  const generateTimeSlots = (startHour, endHour, labelPrefix) => {
    const currentHour = currentDate.hour();
    const currentMinute = currentDate.minute();
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const label = `${hour}-${hour + 1} ${hour < 12 ? "AM" : "PM"}`;
      const id = `${labelPrefix}${hour}`;
      if (currentDate.isSame(dayjs(), "day") && hour <= currentHour) {
        // Skip past time slots for the current day
        continue;
      }
      slots.push({ label, id });
    }
    return slots;
  };
  const handleDateChange = (newDate) => {
    setCurrentDate(dayjs(newDate));
  };
  const morningSlots = generateTimeSlots(
    startMorningHour,
    endMorningHour,
    "morning"
  );
  const afternoonSlots = generateTimeSlots(
    startAfternoonHour,
    endAfternoonHour,
    "afternoon"
  );
  const eveningSlots = generateTimeSlots(
    startEveningHour,
    endEveningHour,
    "evening"
  );

  const areAllSlotsDisabled =
  morningSlots.length === 0 &&
  afternoonSlots.length === 0 &&
  eveningSlots.length === 0;
  return (
    <React.Fragment>
      <Grid container md={12}>
        <Grid item md={6} marginTop={"10px"}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Select Appointment Date:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]} sx={{ marginTop: "20px" }}>
              <DatePicker
                label="Select Date"
                minDate={dayjs()}
                value={currentDate}
                onChange={(newDate) => handleDateChange(newDate)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item md={6} marginTop={"10px"}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Pick Time Slots:
          </Typography>
       
             {areAllSlotsDisabled ? (
            <Typography variant="body1" color="error" sx={{ marginTop: "10px" }}>
              No slots are available for the selected date.
            </Typography>
          ) : (
            <>
          <Grid
            item
            md={12}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "20px"
            }}
          >
            <img
              src="https://gomechprod.blob.core.windows.net/gomech-retail/openweather_icons/Early%20Morning.webp"
              alt="morning"
            />
           <Typography variant="h6" gutterBottom marginLeft={2}>
              Morning Slots:
            </Typography>
            
          </Grid>
         
          <Grid container spacing={2} md={12}>
            {morningSlots.map((slot) => (
              <Grid item md={6} key={slot.id}>
                <Button
                  key={slot.id}
                  onClick={() => handleSlotSelect(slot.label)}
                  style={{
                    width: "90%",
                    height: "40px",
                    color: selectedSlot === slot.label ? "#FFFFFF" : "#000000",
                    backgroundColor:
                      selectedSlot === slot.label ? "#333333" : "#FFFFFF",
                    borderRadius: "8px",
                  }}
                >
                  {slot.label}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            md={12}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "20px"
            }}
          >
            <img
              src="https://gomechprod.blob.core.windows.net/gomech-retail/openweather_icons/Afternoon.png"
              alt="afternoon"
            />
            <Typography variant="h6" gutterBottom marginLeft={3}>
              Afternoon Slots:
            </Typography>
          </Grid>
          <Grid container spacing={2} md={12}>
            {afternoonSlots.map((slot) => (
              <Grid item md={6} key={slot.id}>
                <Button
                  key={slot.id}
                  onClick={() => handleSlotSelect(slot.label)}
                  style={{
                    width: "90%",
                    height: "40px",
                    color: selectedSlot === slot.label ? "#FFFFFF" : "#000000",
                    backgroundColor:
                      selectedSlot === slot.label ? "#333333" : "#FFFFFF",
                    borderRadius: "8px",
                  }}
                >
                  {slot.label}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            md={12}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "20px"
            }}
          >
            <img
              src="https://gomechprod.blob.core.windows.net/gomech-retail/openweather_icons/Evening.png"
              alt="evening"
            />
            <Typography variant="h6" gutterBottom marginLeft={3}>
              Evening Slots:
            </Typography>
          </Grid>
          <Grid container spacing={2} md={12}>
            {eveningSlots.map((slot) => (
              <Grid item key={slot.id} xs={6}>
                <Button
                  onClick={() => handleSlotSelect(slot.label)}
                  style={{
                    width: "90%",
                    height: "40px",
                    color: selectedSlot === slot.label ? "#FFFFFF" : "#000000",
                    backgroundColor:
                      selectedSlot === slot.label ? "#333333" : "#FFFFFF",
                    borderRadius: "8px",
                  }}
                >
                  {slot.label}
                </Button>
              </Grid>
            ))}
          </Grid>
          
          </>
            )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Appointment;