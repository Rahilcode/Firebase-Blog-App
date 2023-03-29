import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const SingleCard = ({ post, deletePost, isAuth }) => {
  return (
    <div>
      <Card style={{ width: "18rem", color: "black" }} className="m-2">
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/post/${post.id}`}
        >
          <Card.Img
            variant="top"
            src={
              post.image
                ? post.image
                : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?size=626&ext=jpg"
            }
            width={100}
          />
          <Card.Body>
            <Card.Title>{post.title.toUpperCase()}</Card.Title>
            <Card.Text>
              {post.postData.length > 40
                ? post.postData.slice(0, 40)
                : post.postData}
              ...
            </Card.Text>
          </Card.Body>
        </Link>
        {isAuth && post.author.id === auth.currentUser.uid && (
          <Button onClick={() => deletePost(post.id)} variant="primary">
            Delete
          </Button>
        )}
      </Card>
    </div>
  );
};

export default SingleCard;
