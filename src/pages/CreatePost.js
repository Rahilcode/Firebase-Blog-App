import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postData, setPostData] = useState("");
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [percentage, setPercentage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadImg = () => {
      const storageRef = ref(storage, `images/${file.name}` + Date.now());

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUrl(downloadURL);
          });
        }
      );
      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     const progress =
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     setPercentage(progress);
      //     console.log("Upload is " + progress + "% done");
      //     switch (snapshot.state) {
      //       case "paused":
      //         console.log("Upload is paused");
      //         break;
      //       case "running":
      //         console.log("Upload is running");
      //         break;
      //     }
      //   },
      //   (error) => {
      //     console.log(error);
      //     switch (error.code) {
      //       case "storage/unauthorized":
      //         break;
      //       case "storage/canceled":
      //         break;
      //       case "storage/unknown":
      //         break;
      //       default:
      //         break;
      //     }
      //   },
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //       // console.log("File available at", downloadURL);
      //       setUrl(downloadURL);
      //       console.log("url", url);
      //     });
      //   }
      // );
    };

    file && uploadImg();
  }, [file]);

  const collectionRef = collection(db, "posts");
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collectionRef, {
        title,
        postData,
        author: {
          email: auth.currentUser.email,
          id: auth.currentUser.uid,
        },
        image: url,
      });
      navigate("/");
      setTitle("");
      setPostData("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="m-2">Create New Post</h2>
      <hr className="m-2" />
      <Form onSubmit={handleSubmit} className="m-5 p-2">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>
            Enter Title <span className="red">*</span>
          </Form.Label>
          <Form.Control
            required
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            name="image"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            Enter Post Content <span className="red">*</span>{" "}
          </Form.Label>
          <Form.Control
            required
            name="postData"
            type="text"
            value={postData}
            onChange={(e) => setPostData(e.target.value)}
            as="textarea"
            placeholder="Enter your Content here"
            rows={7}
          />
        </Form.Group>

        <Button
          disabled={percentage !== null && percentage < 100}
          variant="primary"
          type="submit"
        >
          Create Post
        </Button>
      </Form>
    </div>
  );
};

export default CreatePost;
