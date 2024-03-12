import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import Input from '@mui/material/Input';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Profile = () => {
  const [isFileInputOpen, setFileInputOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    secondName: "",
    email: "",
    contactNumber: "",
    profilePicture: "",
    registrationDate: "",
    profilePicturePreview: "", // New field for previewing selected profile picture
  });



  const defaultAvatarSrc = 'data:image/png;base64,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'; // Replace with your default avatar URL

  const avatarStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0 auto 20px",
  };

  const editIconStyle = {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#fff", // Set background color if needed
    cursor: "pointer",
  };

  const handleEditIconClick = () => {
    setFileInputOpen(true);
  };

  const handleFileInputChange = (e) => {
    handleChange("profilePicture", e.target.files[0]);
    setFileInputOpen(false);
  };

  const handleCloseFileInput = () => {
    setFileInputOpen(false);
  };

  const handleDeleteProfile = () => {
    deleteProfileImage();
    setFileInputOpen(false);

  };





  const [loading, setLoading] = useState(true);

  const authToken = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const email = user?.email;

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const getUserByEmail = async () => {
    try {
      const response = await axios.get(
        `https://gocarsmithbackend.onrender.com/api/user/getUserByEmail/${email}`,
        axiosConfig
      );
      const data = response.data.user;
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  }

  const updateProfile = async () => {
    try {
      const formData = new FormData();

      // Append the profilePicture to the FormData if it exists
      if (userDetails.profilePicture) {
        formData.append("profilePicture", userDetails.profilePicture);
      }

      // Append other fields to the FormData
      formData.append("firstName", userDetails.firstName);
      formData.append("secondName", userDetails.secondName);
      formData.append("email", userDetails.email);
      formData.append("contactNumber", userDetails.contactNumber);

      console.log("Complete Update Data:", formData);

      const response = await axios.post(
        "https://gocarsmithbackend.onrender.com/api/user/updateProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Profile updated successfully:", response.data);

      // Fetch user details again to update the state
      getUserByEmail();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const deleteProfileImage = async () => {
    try {
      const requestData = { email: userDetails.email }; // Include email in the request payload

      const response = await axios.delete(
        "https://gocarsmithbackend.onrender.com/api/user/deleteProfileImage",
        { ...axiosConfig, data: requestData } // Include email in the request data
      );

      console.log("Profile image deleted successfully:", response.data);
      // Fetch user details again to update the state
      getUserByEmail();
    } catch (error) {
      console.error("Error deleting profile image:", error);
    }
  };


  const handleChange = (field, value) => {
    if (field === 'profilePicture') {
      // Update the image preview when a new image is selected
      const file = value;
      const imageUrl = URL.createObjectURL(file);
      setUserDetails({ ...userDetails, [field]: file, profilePicturePreview: imageUrl });
    } else {
      // Update other fields as usual
      setUserDetails({ ...userDetails, [field]: value });
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, []); // Fetch user details on component mount


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        
      }}
    >
      
      <Paper
        elevation={0}
        style={{
          padding: "20px",
          maxWidth: "700px",
          margin: "-20px",
          textAlign: "center",
        }}
      >
        <h1>User Profile</h1>




        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <EditIcon
              color="primary"
              style={editIconStyle}
              onClick={handleEditIconClick}
            />
          }
        >
          <Avatar
            src={`https://gocarsmithbackend.onrender.com${userDetails.profilePicture}`}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            style={avatarStyle}
            defaultSrc={defaultAvatarSrc}
          />
        </Badge>


        

        {/* File Input and Delete Dialog */}
        <Dialog open={isFileInputOpen} onClose={handleCloseFileInput}>
          <DialogTitle>Edit Profile Image</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                style={{ width: "100%" }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFileInput} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteProfile} color="secondary">
              Delete Profile Image
            </Button>
          </DialogActions>
        </Dialog>





        <div style={{ display: "inline-block", verticalAlign: "top", marginLeft: "10px" }}>
          <TextField
            value={userDetails.firstName}
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <TextField
            value={userDetails.secondName}
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => handleChange("secondName", e.target.value)}
          />
          <TextField
            value={userDetails.email}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => handleChange("email", e.target.value)}
            disabled
          />
          <TextField
            value={userDetails.contactNumber}
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => handleChange("contactNumber", e.target.value)}
          />
          <Button
            onClick={updateProfile}
            variant="contained"
            style={{
              backgroundColor: "black",
              fontWeight: 700,
              fontSize: 15,
              margin: "10px",
            }}
          >
            Save Changes
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Profile;