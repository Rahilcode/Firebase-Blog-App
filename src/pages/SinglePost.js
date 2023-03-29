import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import SpinnerCom from "../components/SpinnerCom";

const SinglePost = () => {
  const [data, setData] = useState(null);
  const param = useParams();

  useEffect(() => {
    const getSingleDoc = async () => {
      const docRef = doc(db, "posts", param.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setData(docSnap.data());
      } else {
        setData("This page does not Exist!");
      }
    };

    getSingleDoc();
  }, []);

  if (!data) {
    return <SpinnerCom />;
  }
  return (
    <Container>
      {!data.title ? (
        <h1>This page does not exist</h1>
      ) : (
        <>
          <h1 className="title">{data.title.toUpperCase()}</h1>
          <p className="author-name">
            Author: {data.author.email.split("@")[0]}
          </p>
          <Image className="m-2" src={data.image} alt="post image" />
          <p
            style={{
              padding: "0.3rem",
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            {data.postData}
          </p>
        </>
      )}
    </Container>
  );
};

export default SinglePost;
