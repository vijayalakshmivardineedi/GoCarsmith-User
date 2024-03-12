import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { makeStyles } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import io from 'socket.io-client';
import axios from 'axios';
import { LuSend } from "react-icons/lu";

const socket = io('http://localhost:3000');

const useStyles = makeStyles((theme) => ({
    stepLabel: {
        color: 'red',
    },
    stepIcon: {
        backgroundColor: 'pink',
        borderRadius: '50%',
    },
}));

const steps = [
    {
        label: 'Select campaign settings',
    },
    {
        label: 'Create an ad group',
    },
    {
        label: 'Create an ad',
    },
];

const Referral = () => {
    const classes = useStyles()
    const [isReferralLinkSent, setIsReferralLinkSent] = useState(false);

    const [referralCode, setReferralCode] = useState('');
    // const [referralId, setReferralId] = useState('');

    useEffect(() => {

        socket.on('referralCodeGenerated', (code) => {
            setReferralCode(code);
        });

        return () => {
            socket.disconnect();
        };


    }, []);
    useEffect(() => {
        const generateReferralCode = async () => {
            try {
                const response = await axios.post('https://gocarsmithbackend.onrender.com/api/generateReferralCode');
                setReferralCode(response.data.referralCode);
            } catch (error) {
                console.error(error);
            }
        };
        generateReferralCode();
    }, []);

    const shareReferralLink = async () => {

        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Check out my referral link!',
                    text: 'Join now and enjoy exclusive benefits!',
                    url: `https://www.truquest.net?ref=${referralCode}`,
                });
                setIsReferralLinkSent(true)
            } else {
                alert('Web Share API not supported in your browser. Manually copy the link and share.');
            }
        } catch (error) {
            console.error('Error sharing referral link:', error);
        }
    };

    const shareReferralLinkThroughWhatsApp = () => {
        try {
            const message = `Join me on MyService! Sign up with my referral code: ${referralCode}.`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
            setIsReferralLinkSent(true)
        }
        catch (error) {
            console.error('Error sharing referral link through WhatsApp:', error);
        }
    };

    const [expandedAccordion, setExpandedAccordion] = useState(null);
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const userId = user?._id;
    useEffect(() => {
        // This useEffect will execute whenever isReferralLinkSent changes
        const earnCoins = async () => {

            if (isReferralLinkSent) {
                const dataUpload = {
                    userId: userId,
                    money: 1000
                };

                try {
                    const response = await axios.post('https://gocarsmithbackend.onrender.com/api/earnCoinsByReferalFriend', dataUpload);
                    if (response.status === 200) {
                      
                        setIsReferralLinkSent(false)
                        
                    } else {
                        console.log("Referral failed");
                    }
                } catch (error) {
                    console.error('Error earning coins:', error);
                }
            }
        };

        earnCoins(); // Call the function on mount
    }, [isReferralLinkSent]);


    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? panel : null);
    };
    return (
        <div style={{ flexGrow: 1, padding: '16px', margin: '50px' }}>
            <Grid container spacing={10}>
                {/* Left Column */}
                <Grid item xs={7}>
                    <Card
                        style={{
                            minWidth: 300,
                            marginBottom: '16px',
                            height: '1200px',
                            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <CardContent>
                            <img
                                src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/OrderTracking/Components/refer-earn/refer-and-earn-india.svg"
                                alt="Card 2 "
                                style={{ marginRight: '16px' }}
                            />
                            <Typography variant="h4" component="div" style={{ margin: '20px', fontWeight: "bold" }}>
                                Earn Rs. 1000 for every Friend you Refer
                            </Typography>
                            <Typography style={{ margin: '20px' }}>
                                Get a friend to start using GoCarsmith & earn Rs. 1000 when they
                                complete their first order.
                            </Typography>
                            <div style={{ flexGrow: 1, padding: '16px', }}>
                                <Box
                                    display="flex"
                                    border="2px solid red"
                                    height="250px"
                                    margin="10px"
                                    borderRadius="7px"
                                    flexDirection="column"
                                    backgroundColor="#FFF4F4"
                                >

                                    <Typography variant="h6" style={{ marginBottom: '10px', borderBottom: '1px dotted red', width: "400px", margin: "20px" }}>
                                        How It Works?
                                    </Typography>
                                    <Stepper orientation="vertical" style={{ marginLeft: "20px" }}>
                                        {steps.map((step, index) => (
                                            <Step key={step.label}>
                                                <StepLabel
                                                    StepIconProps={{
                                                        style: {
                                                            color: index === 0 ? '#FFC0BE' : '#FFC0BE', // Set color based on index
                                                        },
                                                    }}
                                                    style={{
                                                        color: index === 0 ? '#FFC0BE' : '#FFC0BE', // Set text color based on index
                                                    }}
                                                >
                                                    {step.label}
                                                </StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>

                                </Box>

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div
                                        style={{
                                            flex: '0.5', // Adjust the flex value to control the width of the line
                                            height: '20px',
                                            borderTop: '1px dotted #000',
                                            marginTop: '20px',
                                            marginRight: "30px",
                                            borderColor: "#6A6A6A",// Adjust the margin to control the space between the text and line
                                        }}
                                    />
                                    <Typography variant="h6" Color="#6A6A6A">
                                        REFER VIA
                                    </Typography>
                                    <div
                                        style={{
                                            flex: '0.5', // Adjust the flex value to control the width of the line
                                            height: '20px',
                                            borderTop: '1px dotted #000',
                                            marginTop: '20px',
                                            marginLeft: "30px",
                                            borderColor: "#6A6A6A",// Adjust the margin to control the space between the text and line
                                        }}
                                    />
                                </div>
                            </div>
                            <Typography variant="h6" marginLeft="20px">
                                SHARE YOUR REFERAL CODE
                            </Typography>
                            <Box
                                display="flex"
                                border="1px dotted blue"
                                height="60px"
                                justifyContent="space-between"
                                alignItems="center"
                                margin="30px"
                                borderRadius="7px"
                                backgroundColor="#E3ECF8"
                                borderColor="#5195E0"
                                padding="0px 20px 0px 0px"
                                
                            >
                                <Typography variant="h6" style={{ font: '16px', padding: '12px', color: '#5195E0', flex: 1 }}>
                                    {referralCode}
                                </Typography>
                                <Link onClick={shareReferralLink}>
                                    <LuSend
                                     style={{ color: '#3a8cf0', fontSize:"25px" }}
                                      />
                                  
                                </Link>
                            </Box>

                            <Link onClick={shareReferralLinkThroughWhatsApp} style={{ textDecoration: "none" }}>
                                <Box
                                    display="flex"
                                    border="1px"
                                    height="60px"
                                    margin="30px"
                                    borderRadius="7px"
                                    backgroundColor="#3AC64B"
                                    borderColor="#5195E0"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    padding="0px 20px 0px 0px"
                                >
                                    <Typography variant="h6" style={{ font: '16px', padding: '12px', color: 'white', fontWeight: "bold" }}>
                                        SHARE VIA WHATSAPP
                                    </Typography>
                                    <LuSend
                                     style={{ color: '#fff', fontSize:"25px" ,fontWeight:"bold"}}
                                      />
                                </Box>
                            </Link>

                        </CardContent>
                    </Card>
                </Grid>
                {/* Right Column */}
                <Grid item xs={5}>
                    <Card
                        style={{
                            minWidth: 300,
                            marginBottom: '16px',
                            height: 'auto',
                            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                            marginTop: "60%"
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Frequently Asked Questions
                            </Typography>
                            <img
                                src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/OrderTracking/Components/bannerImage/experience.png"
                                alt="Card 2 "
                                style={{ marginRight: '16px', width: '400px' }}
                            />
                            {/* Accordion */}
                            <Accordion
                                style={{ width: '100%', marginTop: '20px', padding: '10px' }}
                                expanded={expandedAccordion === "panel1"}
                                onChange={handleAccordionChange("panel1")}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h8">What Is GoAppMoney ?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* Accordion Content */}
                                    <Typography style={{ textAlign: "justify", backgroundColor: "#f0f0f0", padding: "10px" }}>
                                        GoCarsmith Referral Program enables the users to earn GoApp Money by referring the GoCarsmith App to a friend via a unique referral code shared under the Refer And Earn section of the App. You earn GoApp Money worth ₹1000 by referring the app to your friend.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion
                                expanded={expandedAccordion === "panel2"}
                                onChange={handleAccordionChange("panel2")}
                                style={{ width: '100%', marginTop: '20px', padding: '10px' }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h8">
                                        How Can I Earn GoAppMoney ?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* Accordion Content */}
                                    <Typography style={{ textAlign: "justify", backgroundColor: "#f0f0f0", padding: "10px" }}>
                                        You earn ₹1000 GoApp Money by referring the GoCarsmith App to a friend via your unique referral code. You also earn GoApp Money upon successfully completing your Service with GoCarsmith and making an online payment for your Car Service.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion
                                expanded={expandedAccordion === "panel3"}
                                onChange={handleAccordionChange("panel3")}
                                style={{ width: '100%', marginTop: '20px', padding: '10px' }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h8">
                                        For What Service Can I Utilise GoAppMoney ?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* Accordion Content */}
                                    <Typography style={{ textAlign: "justify", backgroundColor: "#f0f0f0", padding: "10px" }}>
                                        Your unique referral code can be used unlimited times.
                                        However, you can use your referral code to refer to one friend only once.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion
                                expanded={expandedAccordion === "panel4"}
                                onChange={handleAccordionChange("panel4")}
                                style={{ width: '100%', marginTop: '20px', padding: '10px' }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h8">
                                        How Much GoAppMoneyMoney Can Use In One Go ?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* Accordion Content */}
                                    <Typography style={{ textAlign: "justify", backgroundColor: "#f0f0f0", padding: "10px" }}>
                                        GoApp Money worth ₹1000 will be credited to you and your friend's GoCarsmith Wallet within 24 hours after the successful completion of the Car Service opted for by your friend. Note: GoApp Money won’t be dispersed in case of an Incomplete/Cancelled Service Order.
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

export default Referral;