import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { RiArrowRightSLine } from "react-icons/ri";


const GoMoney = () => {
    const [showAll, setShowAll] = useState(false);
    const handleToggleView = () => {
        setShowAll(!showAll);
    };
    const currentDate = new Date();
    const [coins, setCoins] = useState([])

    // const MyComponent = () => {
    //     const [showAll, setShowAll] = useState(false);
    //     const handleToggleView = () => {
    //       setShowAll(!showAll);
    //     };
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const userId = user?._id;
    useEffect(() => {
        const getReferalData = async () => {
            
            try {
                const response = await axios.get(`https://gocarsmithbackend.onrender.com/api/getReferalDetailsBy/${userId}`);
                if (response.status === 200) {
                    // setCoins(response.data.filter(item => new Date(item.expiryDate) > currentDate));
                    setCoins(response.data); 
                } else {
                    console.log("Referral failed");
                }
            } catch (error) {
                console.error('Error earning coins:', error);
            }
        }
        getReferalData()

    }, [userId])

    const navigate = useNavigate();


    const getFormattedDate = (dateString) => {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Add padding for single-digit months
        const date = dateObject.getDate().toString().padStart(2, '0'); // Add padding for single-digit dates

        return `${date}/${month}/${year}`;
    };
    const filetrData=coins.filter(item => new Date(item.expiryDate) > currentDate)
    const totalAmount = filetrData.reduce((total, item) => total + item.totalMoney, 0);

    return (
        <div style={{ flexGrow: 1, padding: '16px', margin: '70px' }}>
            <h1 style={{ marginBottom: '80px' }}>GoAppMoney</h1>
            <Grid container spacing={8}>
                {/* Left Column */}
                <Grid item xs={6}>
                    <Card style={{ minWidth: 230, marginBottom: '100px' }}>
                        <CardContent>
                            {/* Card 1 */}
                            <Link to="/Referal" style={{ color: "black", textDecoration: "none" }}>
                                <Box display="flex" alignItems="center">
                                    <img
                                        src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/OrderTracking/Slotted.png"
                                        alt="Card 1 "
                                        style={{ width: '50px', marginRight: '16px' }}
                                    />
                                    <div style={{display:"flex",alignItems:"center", }}>
                                      <div  style={{marginRight:"150px"}}>
                                      <Typography variant="h5" component="div">
                                            Refer and Earn
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Guaranteed Reward For Every Referral
                                        </Typography>
                                      </div>
                                        <div >
                                        <RiArrowRightSLine style={{fontSize:"50px",color:"#d91a09",opacity:"0.8"}}  />
                                        </div>
                                    </div>
                                </Box>
                            </Link>
                        </CardContent>
                    </Card>
                    {/* Card 2 */}



                    <Card style={{ minWidth: 230, marginBottom: '100px' }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} onClick={() => navigate("/Referal")}>

                                <img
                                    src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/OrderTracking/GoAppMoney.png"
                                    alt="Card 2 "
                                    style={{ width: '50px', marginRight: '16px' }}
                                />
                                <div>
                                    <Typography variant="h5" component="div">
                                        GoAppMoney
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" paddingTop="20px">
                                        Rupees: {totalAmount}
                                    </Typography>
                                </div>
                            </Box>
                        </CardContent>
                    </Card>
                    {/* Salary Day Sale Card */}
                    <Card style={{ minWidth: 275, marginBottom: '16px' }}>
                        <h1 style={{ marginBottom: '30px', padding:"0px 0px 30px 10px" }}>Wallet Activity</h1>
                        <CardContent>
                            {coins.map((eachList) => (
                                <Box display="flex" alignItems="center" key={eachList._id} boxShadow="0px 2px 4px 1px rgba(0, 0, 0, 0.2)" 
                                borderBottom="1px solid #cfcfcf" padding="10px"  marginBottom="20px">
                                    <div style={{ marginRight: "200px"}}>
                                        <Typography variant="h6" component="div">
                                            Referal Money
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {getFormattedDate(eachList.referalDate)}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Expires On: {getFormattedDate(eachList.expiryDate)}
                                        </Typography>
                                    </div>
                                    <div>
                                        {new Date(eachList.expiryDate) > currentDate ? 
                                       
                                        <Typography variant="h6" component="div" style={{color: "green" }}>
                                             {console.log(new Date(eachList.expiryDate) > currentDate)}
                                            {eachList.moneyReferal}
                                        </Typography>:
                                         <Typography variant="h6" component="div" style={{ color: "red" }}>
                                            -{eachList.moneyReferal}
                                            {console.log(eachList.expiryDate > currentDate)}
                                            
                                        </Typography>}

                                        {new Date(eachList.expiryDate)>currentDate? <Typography variant="body2" color="textSecondary">
                                            Amount Credited
                                        </Typography>: <Typography variant="body2" color="textSecondary">
                                        Expired
                                        </Typography>}
                                       
                                    </div>
                                </Box>
                            ))}
                            {/* View All / View Less */}
                            <Typography
                                variant="body2"
                                color="primary"
                                style={{ cursor: 'pointer' }}
                                onClick={handleToggleView}
                            >
                            </Typography>
                        </CardContent>
                    </Card>
                    {/* <Typography
                        variant="body2"
                        color="primary"
                        style={{
                            cursor: 'pointer',
                            color: 'red', // Set the color to red
                            marginLeft: "280px",
                            marginTop: "50px",
                            fontSize: "20px",
                            fontWeight: 700,
                          
                        }}

                        onClick={handleToggleView}
                    >
                        {showAll ? 'View Less <' : 'View All >'}
                    </Typography> */}
                </Grid>
                {/* Right Column */}
                <Grid item xs={6}>
                    <Card style={{ minWidth: 300, marginBottom: '16px', height: '700px', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Single Card Heading
                            </Typography>
                            <img
                                src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/OrderTracking/Components/bannerImage/experience.png"
                                alt="Card 2 "
                                style={{ marginRight: '16px' }}
                            />
                            {/* Accordion */}
                            <Accordion style={{ width: '90%', marginTop: '20px', padding: "10px" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h8">What Is GoAppMoney ?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* Accordion Content */}
                                    <Typography>
                                        GoApp Money is Gocarsmith’s indigenous virtual credit system which can be used as an alternative payment method for car services at GoCarsmith.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion style={{ width: '90%', marginTop: '20px', padding: "10px" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h8">How Can I Earn GoAppMoney ?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* Accordion Content */}
                                    <Typography>
                                        You earn ₹1000 GoApp Money by referring the GoCarsmith App to a friend via your unique referral code. You also earn GoApp Money upon successful completion of your service with GoCarsmith and for making an online payment for your car service.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion style={{ width: '90%', marginTop: '20px', padding: "10px" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h8">For What Service Can i utilise GoAppMoney ?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* Accordion Content */}
                                    <Typography>
                                        GoApp Money can be utilised for all car services available on the GoCarsmith App.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion style={{ width: '90%', marginTop: '20px', padding: "10px", }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h8">How Much GoAppMoneyMoney Can Use In One Go ?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* Accordion Content */}
                                    <Typography>
                                        Please note that you can only utilise 50% of your GoApp Money at a time to pay for a car service at GoCarsmith.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};
export default GoMoney;