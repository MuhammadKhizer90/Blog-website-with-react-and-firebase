import { addDoc, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { db, auth } from '../firebase.config/firebase'; // Assuming that 'db' and 'auth' are correctly imported
import { useNavigate } from 'react-router-dom';

function Post(isAuth) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const titleChange = (e) => {
    setTitle(e.target.value);
  }

  const postTextChange = (e) => {
    setPostText(e.target.value);
  }

  const postCollectionRef = collection(db, "posts");

  const createPost = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (auth.currentUser) {
    try {
      await addDoc(postCollectionRef, {
        title,
        postText,
        Author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid
        }
      });
      navigate('/')
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }
  
  }
  useEffect(()=>{
   if(!isAuth){
    navigate('/login');
   }
  },[])

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form className="mt-4 p-4 border rounded shadow" onSubmit={createPost}>
            <h2 className="text-center mb-4">Create a Post</h2>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter a title" required value={title} onChange={titleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Post</Form.Label>
              <Form.Control as="textarea" placeholder="Write your post here" required value={postText} onChange={postTextChange} />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Post
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Post;
