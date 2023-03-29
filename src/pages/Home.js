import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import SingleCard from "../components/SingleCard";
import { Col, Container, Row } from "react-bootstrap";
import Jumbo from "../components/Jumbo";

const Home = ({ isAuth }) => {
  const [data, setData] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    try {
      await deleteDoc(postDoc);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  return (
    <div>
      <Jumbo />
      <Container>
        <h2 className="m-3">Explore Blog Posts</h2>
        <hr className="m-2" />
        <Row>
          {data.map((post, index) => {
            return (
              <Col key={index} md={6} lg={4}>
                <SingleCard
                  isAuth={isAuth}
                  key={post.id}
                  deletePost={deletePost}
                  post={post}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
