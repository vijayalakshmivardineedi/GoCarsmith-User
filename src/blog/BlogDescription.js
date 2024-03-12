import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  IconButton,
  Button,
  TextField,
  Box,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate, useParams ,useLocation} from 'react-router-dom';
import axios from 'axios';

const getToken = () => {
    return localStorage.getItem('token');
};

const CarInfo = ({ title, children }) => {
    return (
        <div style={{ padding: 20, marginBottom: '20px' }}>
            <Typography variant="h4">{title}</Typography>
            {children}
        </div>
    );
};

const BlogDescription = () => {
    const { id } = useParams();
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [blogDetails, setBlogDetails] = useState(null);
    const [personalizedComments, setPersonalizedComments] = useState([]);
    const [loadingPersonalizedComments, setLoadingPersonalizedComments] = useState(
        false
    );
    const [personalizedCommentText, setPersonalizedCommentText] = useState('');
    const [editingPersonalizedComment, setEditingPersonalizedComment] = useState(
        false
    );
    const [userInteraction, setUserInteraction] = useState(null);

    const navigate = useNavigate();

    const locations = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page on route change
    }, [locations.pathname]);
  
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    const userEmail = user?.email;

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                if (blogDetails) {
                    return;
                }

                const response = await axios.get(
                    `https://gocarsmithbackend.onrender.com/api/user/blog/posts/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    }
                );
                setBlogDetails(response.data);
            } catch (error) {
                console.error('Error fetching blog details:', error);
            }
        };

        const fetchPersonalizedComments = async () => {
            try {
                if (!blogDetails && userEmail) {
                    setLoadingPersonalizedComments(true);

                    const response = await axios.get(
                        `https://gocarsmithbackend.onrender.com/api/user/getPersonalizedComment/${userEmail}/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                            },
                        }
                    );

                    setPersonalizedComments([response.data.comment]);
                    setLoadingPersonalizedComments(false);
                }
            } catch (error) {
                console.error('Error fetching personalized comments:', error);
                setLoadingPersonalizedComments(false);
            }
        };

        if (id) {
            fetchBlogDetails();
        }

        if (userEmail && id) {
            fetchPersonalizedComments();
        }
    }, [id, blogDetails, userEmail]);

    const handlePostComment = async () => {
        try {
            if (userEmail) {
                const response = await axios.post(
                    `https://gocarsmithbackend.onrender.com/api/user/addOrUpdateComment/${id}`,
                    {
                        comment: newComment,
                        email: userEmail,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    }
                );

                const updatedComments = response.data.comments;
                setComments(updatedComments);
                setNewComment('');

                if (response) {
                    const response = await axios.get(
                        `https://gocarsmithbackend.onrender.com/api/user/getPersonalizedComment/${userEmail}/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                            },
                        }
                    );

                    setPersonalizedComments([response.data.comment]);
                }
            } else {
                console.error('User email not found in localStorage');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
      
        try {
            const response = await axios.delete(
                `https://gocarsmithbackend.onrender.com/api/user/deleteCommentPersonalized/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                    data: {
                        email: userEmail,
                    },
                }
            );

            
      window.location.reload(false)

    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

    const handleEditPersonalizedComment = () => {
        setEditingPersonalizedComment(true);
        setPersonalizedCommentText(personalizedComments[0]);
    };

    const handleSavePersonalizedComment = async () => {
        try {
            const response = await axios.post(
                `https://gocarsmithbackend.onrender.com/api/user/addOrUpdateComment/${id}`,
                {
                    comment: personalizedCommentText,
                    email: userEmail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );

            const updatedComments = response.data.comments;
            setComments(updatedComments);

            setEditingPersonalizedComment(false);
            setPersonalizedCommentText('');

            if (response) {
                const response = await axios.get(
                    `https://gocarsmithbackend.onrender.com/api/user/getPersonalizedComment/${userEmail}/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    }
                );

                setPersonalizedComments([response.data.comment]);
            }
        } catch (error) {
            console.error('Error updating personalized comment:', error);
        }
    };
    console.log(userEmail)
    const handleLikeClick = async (action) => {
        console.log(userEmail)
        try {
            const response = await axios.post(
                `https://gocarsmithbackend.onrender.com/api/user/updateLikedStatus/${id}`,
                {
                    email: userEmail,
                    action: action,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );

            const { like, dislike } = response.data;
            setLikeCount(like ? like : 0);
            setIsLiked(like);
            setIsDisliked(dislike);

            if (response) {
                const response = await axios.get(
                    `https://gocarsmithbackend.onrender.com/api/user/getParticularLikes/${userEmail}/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    }
                );
                setUserInteraction(response.data.liked);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        const fetchUserInteraction = async () => {
            try {
                if (userEmail && id) {
                    const response = await axios.get(
                        `https://gocarsmithbackend.onrender.com/api/user/getParticularLikes/${userEmail}/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                            },
                        }
                    );
                    setUserInteraction(response.data.liked);
                }
            } catch (error) {
                console.error('Error fetching user interaction:', error);
            }
        };

        fetchUserInteraction();
    }, [id, userEmail]);

    return (
        <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '35px' }}>
        <div style={{ margin: '30px 100px 50px 100px' }}>
          {blogDetails && <CarInfo title={blogDetails.posttitle}></CarInfo>}
          <Grid container spacing={2}>
            {blogDetails && blogDetails.cover && blogDetails.cover.length > 0 && (
              <Grid item xs={12}>
                <img
                  src={`https://gocarsmithbackend.onrender.com${blogDetails.cover[0].img}`}
                  alt={`Cover  0`}
                  style={{ width: '100%' }}
                />
              </Grid>
            )}
          </Grid>
          {blogDetails && (
            <CarInfo title="Description">
              <Typography style={{textAlign:"justify"}}>{blogDetails.description}</Typography>
            </CarInfo>
          )}
          <Grid container spacing={2}>
            {blogDetails && blogDetails.cover && blogDetails.cover.length > 1 && (
              <Grid item xs={12}>
                <img
                  src={`https://gocarsmithbackend.onrender.com${blogDetails.cover[1].img}`}
                  alt={`Cover  1`}
                  style={{ width: '100%' }}
                />
              </Grid>
            )}
          </Grid>
          <CarInfo title="Content">
            <Typography style={{textAlign:"justify"}}>{blogDetails && blogDetails.content}</Typography>
          </CarInfo>
          <Grid container spacing={2}>
            {blogDetails && blogDetails.cover && blogDetails.cover.length > 2 && (
              <Grid item xs={12}>
                <img
                  src={`https://gocarsmithbackend.onrender.com${blogDetails.cover[2].img}`}
                  alt={`Cover  2`}
                  style={{ width: '100%' }}
                />
              </Grid>
            )}
          </Grid>
          <CarInfo title="Tags">
            <Typography>
              {blogDetails && blogDetails.tags
                ? `Tags: ${blogDetails.tags.join(', ')}`
                : ''}
            </Typography>
          </CarInfo>
          <CarInfo title="Author">
            <Typography>{blogDetails && `${blogDetails.author}`}</Typography>
          </CarInfo>
          <CarInfo title="Like/Dislike">
            <div>
              <Typography>
                Liked:
                <IconButton
                  color="primary"
                  onClick={() => handleLikeClick('like')}
                >
                  {userInteraction === 'like' ? (
                    <ThumbUpIcon style={{ color: 'blue' }} />
                  ) : (
                    <ThumbUpIcon style={{ color: 'black' }} />
                  )}
                </IconButton>
              </Typography>
              <Typography>
                Disliked:
                <IconButton
                  color="primary"
                  onClick={() => handleLikeClick('dislike')}
                >
                  {userInteraction === 'dislike' ? (
                    <ThumbDownIcon style={{ color: 'red' }} />
                  ) : (
                    <ThumbDownIcon style={{ color: 'black' }} />
                  )}
                </IconButton>
              </Typography>
            </div>
          </CarInfo>
          {personalizedComments.length > 0 && (
            <CarInfo title="My Comments">
              {loadingPersonalizedComments ? (
                <Typography>Loading personalized comments...</Typography>
              ) : editingPersonalizedComment ? (
                <div>
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    value={personalizedCommentText}
                    onChange={(e) => setPersonalizedCommentText(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSavePersonalizedComment}
                    style={{ marginLeft: '80px',marginTop:"30px" }}
                  >
                    Save Comment
                  </Button>
                </div>
              ) : (
                <div>
                  <Typography>{personalizedComments[0]}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditPersonalizedComment}
                    style={{ marginLeft: '80px',marginTop:"30px" }}
                  >
                    Edit Comment
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDeleteComment}
                    style={{ marginLeft: '80px',marginTop:"30px" }}
                  >
                    Delete Comment
                  </Button>
                </div>
              )}
            </CarInfo>
          )}
          {personalizedComments.length === 0 && (
            <CarInfo title="Comments">
              <div>
                {comments &&
                  comments.map((comment, index) => (
                    <div
                      key={comment.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #ddd',
                        padding: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <Avatar>{comment.user}</Avatar>
                      {comment.text}
                      {!comment.pinned && (
                        <div style={{ marginLeft: 'auto' }}>
                          <IconButton
                            color="secondary"
                            style={{ marginLeft: '10px' }}
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <TextField
                fullWidth
                multiline
                rows={5}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}

              />
              <Button
                variant="contained"
                color="primary"
                onClick={handlePostComment}
                style={{ marginLeft: '40px',marginTop:"30px" }}
                disabled={
                  newComment === null ||
                  newComment === undefined ||
                  newComment.trim() === ''
                }
              >
                Post Comment
              </Button>
            </CarInfo>
          )}
        </div>
      </Box>
    </Box>
    );
};

export default BlogDescription;