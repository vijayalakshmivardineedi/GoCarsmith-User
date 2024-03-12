import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const StyledTypography = styled(Typography)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'orange',
    color: 'white',
    height: '50px',
  },
}));


const HeaderImage = styled('img')({
  width: '150px', // Adjust the width as needed
  height: '150px', // Maintain aspect ratio
  marginRight: '8px',
});


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: '#F5A201',
    borderRadius: '5px',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const StyledAppBar = styled(AppBar)({
  zIndex: 1000,
});

export default function SearchAppBar() {
  const [autoNewsAnchor, setAutoNewsAnchor] = React.useState(null);
  const [featuredArticlesAnchor, setFeaturedArticlesAnchor] = React.useState(null);


  const isUserLoggedIn = !!localStorage.getItem("token");


  const handleAutoNewsClick = (event) => {
    setAutoNewsAnchor(event.currentTarget);
  };

  const handleAutoNewsClose = () => {
    setAutoNewsAnchor(null);
  };

  const handleFeaturedArticlesClick = (event) => {
    setFeaturedArticlesAnchor(event.currentTarget);
  };

  const handleFeaturedArticlesClose = () => {
    setFeaturedArticlesAnchor(null);
  };

  const navigate = useNavigate();

  const handleMenuClick = (category, subCategoryName, closeFunction) => {
    if (category === 'autoNews') {
      navigate(`/blog/bloglist/subcategory/${encodeURIComponent(subCategoryName)}`);
    } else if (category === 'featuredArticles') {
      navigate(`/blog/bloglist/subcategory/${encodeURIComponent(subCategoryName)}`);
    }

    // Close the menu
    closeFunction();
  }

  const handleCategoryClick = () => {
    const categoryName = "Car Accessories";
    navigate(`/blog/bloglist/category/${encodeURIComponent(categoryName)}`);
    console.log(navigate)
  };

  const handleLogOut = async () => {
    try {
      // Retrieve authorization token from local storage
      const token = localStorage.getItem("token");
      console.log(token)

      // Make a request to the signout API endpoint with the authorization header
      const response = await axios.post(
        "https://gocarsmithbackend.onrender.com/api/user/signout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.clear();
        console.log("User signed out");
        navigate("/");
      } else {
        console.error("Failed to sign out");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleLogIn = () => {
    navigate("/login");
  };
  return (

    <Box sx={{ flexGrow: 1,flexShrink:"inherit" }}>

      <StyledAppBar sx={{ backgroundColor: 'black', height: '100px' }}>
        <Toolbar>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', height: '1000px' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', marginRight: '250px' }}>
              <img
                src="https://res.cloudinary.com/du9ucrizw/image/upload/v1701775031/Screenshot__35_-removebg-preview_pjeocu.png"
                alt="Logo"
                style={{ height: "90px", width: "auto", cursor: "pointer" }}
                onClick={() => navigate("/")}
              />
            </Typography>

            <StyledTypography variant="body1"  sx={{pr: 2, pl: 2, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '700' }} onClick={() => navigate("/blog/home")}>
              HOME
            </StyledTypography>

            <StyledTypography
              variant="body1"
              sx={{pr: 2, pl: 2, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '700' }}
              onClick={handleAutoNewsClick}
            >

              AUTO NEWS <ArrowDropDownIcon />

            </StyledTypography>
            
            <Menu
              anchorEl={autoNewsAnchor}
              open={Boolean(autoNewsAnchor)}
              onClose={handleAutoNewsClose}
            >
              <MenuItem onClick={() => handleMenuClick('autoNews', "Latest Car News", handleAutoNewsClose)}>Latest Car News</MenuItem>
              <MenuItem onClick={() => handleMenuClick('autoNews', "Latest Spy Shot", handleAutoNewsClose)}>Latest Spy Shot</MenuItem>
              <MenuItem onClick={() => handleMenuClick('autoNews', "Electric Car News", handleAutoNewsClose)}>Electric Car News</MenuItem>
            </Menu>
            <StyledTypography
              variant="body1"
              sx={{ pr: 2, pl: 2, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '700' }}
              onClick={handleFeaturedArticlesClick}
            >
              FEATURED ARTICLES <ArrowDropDownIcon />
            </StyledTypography>
            <Menu
              anchorEl={featuredArticlesAnchor}
              open={Boolean(featuredArticlesAnchor)}
              onClose={handleFeaturedArticlesClose}
            >
              <MenuItem onClick={() => handleMenuClick('featuredArticles', "Basics", handleFeaturedArticlesClose)}>GoCarsmith Basics</MenuItem>
              <MenuItem onClick={() => handleMenuClick('featuredArticles', "Fun Reads", handleFeaturedArticlesClose)}>GoCarsmith Fun Reads</MenuItem>
              <MenuItem onClick={() => handleMenuClick('featuredArticles', "Infomation Articles", handleFeaturedArticlesClose)}>GoCarsmith Informative Articles</MenuItem>
            </Menu>
            <StyledTypography variant="body1" sx={{ pr: 2, pl: 2, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '700', marginRight: '350px' }}
              onClick={handleCategoryClick}>
              CAR ACCESSORIES
            </StyledTypography>
            {isUserLoggedIn ? (
              // Render "Log Out" button when user is logged in
              <StyledTypography variant="body1"   sx={{ pr: 2, pl: 2, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '700'}} onClick={handleLogOut}>
                LOG OUT
              </StyledTypography>
            ) : (
              // Render "Log In" button when user is not logged in
              <StyledTypography
                variant="body1"
                sx={{ pr: 2, pl: 2, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '700'}}
                onClick={handleLogIn}
              >
                LOG IN
              </StyledTypography>
            )}
          </Box>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}