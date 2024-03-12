import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
const stringAvatar = (name) => {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
};

const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return `#${'00000'.substring(0, 6 - c.length)}${c}`;
};

const carServices = [
    {
        name: 'Priya Kapoor',
        rating: 4,
        description: 'Providing top-notch car services with a focus on customer satisfaction.',
    },
    {
        name: 'Rajesh Sharma',
        rating: 3,
        description: 'Your go-to place for reliable and efficient car maintenance and repairs.',
    },
    {
        name: 'Nandini Patel',
        rating: 4,
        description: 'Car services are super because they ensure your vehicle runs smoothly.',
    },
    {
        name: 'Arjun Singh',
        rating: 3,
        description: 'They provide expert maintenance to keep your car in top condition.',
    },
    {
        name: 'Ananya Desai',
        rating: 4,
        description: 'Car services offer convenience, saving you time and effort.',
    },
    {
        name: 'Vikram Verma',
        rating: 3,
        description: 'Professional technicians in car services offer skilled repairs.',
    },
    {
        name: 'Aisha Khan',
        rating: 4,
        description: 'They use advanced diagnostic tools for accurate problem identification.',
    },
    {
        name: 'Rakesh Reddy',
        rating: 3,
        description: 'Regular car services contribute to increased fuel efficiency.',
    },
    {
        name: 'Meera Gupta',
        rating: 4,
        description: 'Car services provide peace of mind by addressing potential issues early.',
    },
    {
        name: 'Siddharth Malhotra',
        rating: 3,
        description: 'They enhance safety by checking and fixing brake systems.',
    },
    {
        name: 'Diya Choudhary',
        rating: 4,
        description: 'Car services help extend the lifespan of your vehicle.',
    },
    {
        name: 'Karthik Menon',
        rating: 3,
        description: 'Proper maintenance from car services prevents breakdowns.',
    },
    {
        name: 'Anjali Mehta',
        rating: 4,
        description: 'They offer comprehensive inspections for overall vehicle health.',
    },
    {
        name: 'Harish Iyer',
        rating: 3,
        description: 'Car services utilize quality parts for repairs and replacements.',
    },
    {
        name: 'Preeti Joshi',
        rating: 4,
        description: 'They contribute to a smoother and quieter ride through proper maintenance.',
    },
    {
        name: 'Rohan Bhat',
        rating: 3,
        description: 'Car services ensure your car meets environmental standards.',
    },
    {
        name: 'Mira Shah',
        rating: 4,
        description: 'They offer valuable advice on preventive maintenance.',
    },
    {
        name: 'Varun Kapoor',
        rating: 3,
        description: 'Car services help you stay compliant with manufacturer recommendations.',
    },
    {
        name: 'Nisha Rathi',
        rating: 4,
        description: 'They diagnose and fix issues related to the engine and transmission.',
    },
    {
        name: 'Sunil Srivastava',
        rating: 3,
        description: 'Car services contribute to a smoother and more responsive drive.',
    },
    {
        name: 'Ayesha Khanna',
        rating: 4,
        description: 'They provide regular tire maintenance for optimal performance.',
    },
    {
        name: 'Manoj Kumar',
        rating: 3,
        description: 'Car services offer thorough inspections for worn-out components.',
    },
    {
        name: 'Priyanka Mishra',
        rating: 4,
        description: 'They provide regular tire maintenance for optimal performance.',
    },
    {
        name: 'Sanjay Patel',
        rating: 3,
        description: 'Car services offer thorough inspections for worn-out components.',
    },
    {
        name: 'Simran Singh',
        rating: 4,
        description: 'They contribute to a comfortable interior through HVAC system checks.',
    },
    {
        name: 'Abhishek Chawla',
        rating: 3,
        description: 'Car services ensure your cars cooling system is functioning correctly.',
    },
    {
        name: 'Sameer Sharma',
        rating: 4,
        description: 'They provide expert advice on seasonal maintenance.',
    },
    {
        name: 'Shalini Reddy',
        rating: 3,
        description: 'Car services contribute to reduced emissions and environmental impact.',
    },
    {
        name: 'Amit Tiwari',
        rating: 4,
        description: 'They offer preventive measures against unexpected breakdowns.',
    },
    {
        name: 'Rahul Pandey',
        rating: 3,
        description: 'Car services use cutting-edge technology for efficient diagnostics.',
    },
    {
        name: 'Rahul Kumar',
        rating: 4,
        description: 'They contribute to optimal vehicle performance in various weather conditions.',
    },
    {
        name: 'Priya Pate',
        rating: 3,
        description: 'Car services help identify and fix issues with steering and suspension.',
    },
    {
        name: 'Aryan Sharma',
        rating: 4,
        description: 'They contribute to improved handling and stability on the road.',
    },
    {
        name: 'Neha Singh',
        rating: 3,
        description: 'Car services offer comprehensive electrical system checks.',
    },
    {
        name: 'Vikram Rao',
        rating: 4,
        description: 'They provide valuable insights into upcoming maintenance needs.',
    },
    {
        name: 'Shreya Chatterjee',
        rating: 3,
        description: 'Car services use genuine parts for reliable repairs.',
    },
    {
        name: 'Aditya Kapoor',
        rating: 4,
        description: 'They contribute to a safer driving experience through brake inspections.',
    },
    {
        name: 'Kavita Reddy',
        rating: 3,
        description: 'Car services provide regular updates on the status of your vehicle.',
    },
    {
        name: 'Pinky Padhi',
        rating: 4,
        description: 'Car services contribute to a quieter ride through exhaust system maintenance.',
    },
    {
        name: 'Raj Desai',
        rating: 3,
        description: 'They offer flexible scheduling to accommodate your needs.',
    },
    {
        name: 'Ananya Banerjee',
        rating: 4,
        description: 'They use eco-friendly practices in waste disposal.',
    },
    {
        name: 'Suresh Yadav',
        rating: 3,
        description: 'Car services contribute to a quieter ride through exhaust system maintenance.',
    },
    {
        name: 'Pooja Verma',
        rating: 4,
        description: 'They contribute to a more enjoyable driving experience.',
    },
    {
        name: 'Arjun Naidu',
        rating: 3,
        description: 'Car services help maintain the aesthetic appeal of your vehicle.',
    },
    {
        name: 'Neha Jha',
        rating: 4,
        description: 'They contribute to overall vehicle reliability and dependability.',
    },
    {
        name: 'Kiran Mehra',
        rating: 3,
        description: 'Car services offer assistance with recalls and manufacturer updates.',
    },
    {
        name: 'Aryan Malhotra',
        rating: 3,
        description: 'Car services offer assistance with recalls and manufacturer updates.',
    },
    {
        name: 'Ravi Sharma',
        rating: 3,
        description: 'Car services offer assistance with recalls and manufacturer updates.',
    },
    {
        name: 'Kunal Saxena',
        rating: 3,
        description: 'Car services offer assistance with recalls and manufacturer updates.',
    },
];


const itemsPerPage = 5;

const Reviews = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedCarServices = carServices.slice(startIndex, endIndex);

    return (
        <Container maxWidth="xl">
            <div>
                <Box>
                    <Grid container spacing={2}>
                        {/* First 6 columns */}
                        <Grid item xs={8}>
                            <div style={{ marginLeft: '100px' }}>
                                <Typography variant="h4" sx={{ marginBottom: 2, marginTop: 4, color: '#333', fontWeight:600 }}>
                                    1,02,400 Car Owners Made The Smarter Choice
                                </Typography>
                                <Typography variant="h5" sx={{ marginBottom: 2, marginTop: -2, fontWeight:600 }}>
                                This is their Love For Us!
                                </Typography>
                                <Typography variant="h6" sx={{ marginBottom: 2, color: '#333', fontWeight:600 }}>
                                <h2><b> 4.7</b>/5 </h2>
                                </Typography>
                                <Rating name="user-rating" value={4.7} readOnly precision={0.1} />
                                <Typography variant="body1" sx={{ marginBottom: 2, color: '#555' }}>
                                    Rating and reviews received in the last 3 months
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 2 ,fontWeight:600}}>
                                    8124 reviews
                                </Typography>
                            </div>
                        </Grid>

                        {/* Next 6 columns */}
                        <Grid item xs={4}>
                            {/* Your image goes here */}
                            <img
                                src="https://familyautoservice.com/wp-content/uploads/2022/09/e6aa1bd9-aeca-4695-a5cd-f3216459a932-768x483.jpeg"
                                alt="Your "
                                style={{ width: '80%', height: '80%', marginTop: '30px' }}
                            />
                        </Grid>
                    </Grid>

                    <List sx={{ display: 'flex', flexDirection: 'column', marginLeft: '240px', marginBottom: '15px' }}>
                        {displayedCarServices.map((service, index) => (
                            <ListItem key={index}>
                                <Card sx={{ height: '100%', width: '80%', backgroundColor: '#FFEEE6'}}>
                                    <CardContent>
                                        <Box display="flex" alignItems="center">
                                            <Avatar {...stringAvatar(service.name)} sx={{ width: 40, height: 40 }} />
                                            <Typography variant="h6" sx={{ fontSize: '1.2rem', marginLeft: '10px' }}>
                                                {service.name}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body1">Customer Rating:</Typography>
                                        <Rating value={service.rating} readOnly />
                                        <Typography variant="body2">{service.description}</Typography>
                                    </CardContent>
                                </Card>
                            </ListItem>
                        ))}
                    </List>

                    <Pagination
                        count={Math.ceil(carServices.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handleChangePage}
                        color="primary"
                        style={{ marginLeft: '500px', }}
                    />
                </Box >
            </div >
        </Container>
    );
};

export default Reviews;