// BlogList
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useNavigate, useParams ,useLocation } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const navigate = useNavigate();
  const { categoryName, subCategoryName } = useParams();

  const locations = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [locations.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;
        if (subCategoryName) {
          url = `https://gocarsmithbackend.onrender.com/api/user/BySubcategory/${encodeURIComponent(subCategoryName)}`;
        } else if (categoryName) {
          url = `https://gocarsmithbackend.onrender.com/api/user/ByCategory/${encodeURIComponent(categoryName)}`;
        } else {
          // Handle error or default case
          return;
        }

        const response = await axios.get(url);
        setBlogPosts(response.data.blogPosts);
        console.log(response.data.blogPosts);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchData();
  }, [categoryName, subCategoryName]);

  return (
    <div>
      {/* Banner Image */}
      <img
        src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D"
        alt="Banner"
        style={{ width: '100%', height: '600px', objectFit: 'cover' }}
      />
      <Container style={{ marginTop: '20px' }}>
        <Grid container spacing={4}>
          {blogPosts.map((card) => (
            <Grid key={card._id} item xs={12} sm={6} md={3} lg={3}>
              <Card
                style={{
                  fontFamily: 'Calibri',
                  cursor: 'pointer',
                  height:"390px",
                  marginTop:"50px"
                }}
                className="blog-card"
                onClick={() => navigate(`/blog/page/${card._id}`)}
              >
                <CardMedia
                  component="img"
                  height="192px"
                  width="100%"
                  image={`https://gocarsmithbackend.onrender.com${card.cover[0].img}`}
                  alt={card.posttitle}
                  style={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <h4>{card.posttitle}</h4>
                  <h5>{card.author}</h5>
                  <h5>{format(new Date(card.createdAt), 'yyyy-MM-dd')}</h5>
                </CardContent>
              </Card>
            </Grid> 
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default BlogList;