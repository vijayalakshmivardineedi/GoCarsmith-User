// BlogHome
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const BlogHome = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const locations = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [locations.pathname]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://gocarsmithbackend.onrender.com/api/user/blog/posts");
        setBlogPosts(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {/* Banner Image */}
      <img
        src="https://img.freepik.com/premium-photo/red-laser-dodge-challenger-racing-through-autumn-red-car-red-forest-ai-generated-illustration_744422-1352.jpg?w=740"
        alt="Banner"
        style={{ width: '100%', height: '600px', objectFit: 'cover' }}
      />
      <Container style={{ marginTop: '20px' }}>
        <Grid container spacing={4} >
          {blogPosts.map((card) => (
            <Grid key={card._id} item xs={12} sm={6} md={3} lg={3} style={{marginTop:"50px"}} >
              <Link
                to={`/blog/page/${card._id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card className="blog-card" style={{height:"480px"}}>
                  {card.cover && card.cover.length > 0 && (
          <CardMedia
            component="img"
            style={{ height: '252px', width: '100%' ,objectFit:"cover" }}
            image={`https://gocarsmithbackend.onrender.com${card.cover[0].img}`}
            alt={card.posttitle}
          />
                  )}
                  <CardContent style={{ color: 'YourChosenColor' }}>
                    <h4>{card.posttitle}</h4>
                    <h5>{card.author}</h5>
                    <h5>{format(new Date(card.createdAt), 'yyyy-MM-dd')}</h5>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
export default BlogHome;