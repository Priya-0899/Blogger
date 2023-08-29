import React, { useEffect, useState } from "react";
import "./CSS/AuthorStyle.css";
import { Container, Card, CardContent, Typography } from "@mui/material";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../Slices/blogsSlice";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CircularProgress } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderMenu from "./Header/HeaderMenu";

const colors = ["#f0f5f9", "#faf3e0", "#e8f6f3", "#f3e5f5", "#f0f4c3"];
const PAGE_SIZE = 10;

//for generating random bg colors...
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function Blogs() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.data);
  const loading = useSelector((state) => state.blogs.loading);

  const [currentPage, setCurrentPage] = useState(1);

  // authors details
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/users");
      setAuthors(response.data.users.slice(4, 10));
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const handleAuthorClick = (author) => {
    setSelectedAuthor(author);
  };

  useEffect(() => {
    fetchAuthors();
    dispatch(fetchBlogs());
  }, []);

  const totalBlogs = blogs ? blogs.length : 0;
  const totalPages = Math.ceil(totalBlogs / PAGE_SIZE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // blogs page wise
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayedBlogs = blogs ? blogs.slice(startIndex, endIndex) : [];

  // pagination
  const pageRange = 10;
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  // rating
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  return (
    <>
      <HeaderMenu />

      {!loading ? (
        <>
          <br />
          <center>
            <div className="authors-container">
              {authors.map((author) => (
                <Tooltip title={author.firstName} placement="bottom" arrow>
                  <img
                    key={author.id}
                    src={author.image}
                    alt={author.firstname}
                    onClick={() => handleAuthorClick(author)}
                    className="author-image"
                  />
                </Tooltip>
              ))}
            </div>

            {/* Popup to display author details */}
            {selectedAuthor && (
              <div className="custom-modal">
                <div className="modal-content">
                  <h2>
                    {selectedAuthor.firstName} {selectedAuthor.lastName}
                  </h2>
                  <p>Email: {selectedAuthor.email}</p>
                  <p>Birth Date: {selectedAuthor.birthDate}</p>
                  <p>University: {selectedAuthor.university}</p>
                  <p>Mobile No: {selectedAuthor.phone}</p>
                  <button onClick={() => setSelectedAuthor(null)}>Close</button>
                </div>
              </div>
            )}
          </center>

          <Container maxWidth="1000vh">
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="flex-start"
              marginTop="4vh"
              sx={{
                overflow: "auto",
              }}
            >
              {displayedBlogs.map((blog) => (
                <Card
                  key={blog.id}
                  sx={{
                    backgroundColor: getRandomColor(),
                    margin: 2,
                    padding: 0,
                    width: 380,
                    height: "24vh",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      align="center"
                      sx={{ color: "#3085d9" }}
                    >
                      {blog.title}
                    </Typography>

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

                    {/* ratings */}
                    <center>
                      <Tooltip title="Mark Ratings" placement="right">
                        <StyledRating
                          name="customized-color"
                          defaultValue={2}
                          getLabelText={(value) =>
                            `${value} Heart${value !== 1 ? "s" : ""}`
                          }
                          precision={0.5}
                          icon={<FavoriteIcon fontSize="inherit" />}
                          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        />
                      </Tooltip>
                      <br />
                      <br />
                      <Link
                        to={`/blogs/${blog.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          Read More
                        </Button>
                      </Link>
                    </center>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* previous & next btn */}
            <Box display="flex" justifyContent="center" marginTop="2vh">
              <Button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
              {Array.from({ length: endPage - startPage + 1 }).map(
                (_, index) => (
                  <Button
                    key={startPage + index}
                    onClick={() => handlePageChange(startPage + index)}
                    variant={
                      currentPage === startPage + index
                        ? "contained"
                        : "outlined"
                    }
                  >
                    {startPage + index}
                  </Button>
                )
              )}
              <Button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </Box>
          </Container>
        </>
      ) : (
        <div>
          <center>
            <CircularProgress
              color="secondary"
              style={{ marginTop: "40vh", width: "55px" }}
            />
          </center>
        </div>
      )}
    </>
  );
}

export default Blogs;
