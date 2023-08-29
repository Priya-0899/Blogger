import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Box, Card, CardContent, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import HeaderMenu from "./Header/HeaderMenu";

function BlogDetails() {
  const { id } = useParams();
  const [blogsView, setBlogsViews] = useState([]);
  const colors = ["#f0f5f9", "#faf3e0", "#e8f6f3", "#f3e5f5", "#f0f4c3"];
  const navigate = useNavigate();

  //styling for background image
  const styles = {
    header: {
      backgroundImage: "url(/blog5.jpg)",
      height: "93vh",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      maxWidth: "1000vh",
    },
    content: {
      height: "93.2%",
      width: "100%",
      backgroundColor: "rgb(0 0 0 / 44%)",
      left: "0px",
      position: "absolute",
      color: "white",
    },
  };

  const listBlogs = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setBlogsViews(data);
      } else {
        setBlogsViews([data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listBlogs();
  }, []);

  //for generating random background colors..
  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  //back to home
  const backToHome = () => {
    navigate("/blogs");
  };

  return (
    <>
      <HeaderMenu />

      <Container style={styles.header}>
        <Box
          style={styles.content}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            overflow: "auto",
          }}
        >
          {blogsView?.map((blog) => (
            <Card
              key={blog.id}
              sx={{
                backgroundColor: getRandomColor(),
                margin: 2,
                padding: 0,
                width: 500,
                height: "45vh",
                marginTop: "22vh",
                overflowY: "auto",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  align="center"
                  sx={{ color: "Crimson" }}
                >
                  {blog.title}
                </Typography>
                <br />
                <Typography
                  variant="h6"
                  component="div"
                  align="center"
                  sx={{ color: "black" }}
                >
                  {blog.body}
                </Typography>
                <br />
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  <strong>
                    {blog.tags.map((tag) => `#${tag}`).join(", ")}
                  </strong>
                </Typography>
                <br />
              </CardContent>
            </Card>
          ))}

          {/* back button */}
          <center>
            <Button
              type="submit"
              onClick={backToHome}
              variant="contained"
              style={{
                backgroundColor: "#3c9ce9",
                marginTop: "70vh",
                marginLeft: "-54vh",
              }}
            >
              Back
            </Button>
          </center>
        </Box>
      </Container>
    </>
  );
}

export default BlogDetails;
