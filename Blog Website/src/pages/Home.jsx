import { useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db,auth } from "../firebase.config/firebase";
import { Card, Container, Row, Col } from 'react-bootstrap';


function Home({ isAuth }) {
  const [postLists, setPostLists] = useState([]);
  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await getDocs(postCollectionRef);
        const result = response.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };  // Include document id in the result
        });
        setPostLists(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      // If the deletion is successful, update the state to reflect the changes
      setPostLists((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="">
      <Container>
        <Row className="justify-content-center">
          {postLists.map((list, index) => (
            <Col key={index} md={6}>
              <div className="card-container">
                <Card className="mt-4 border-info">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <Card.Title className="text-primary">{list.title}</Card.Title>
                      
                      <div className="deletePost">
                        {/* Check if the user is authenticated and the post's author ID matches the current user's ID */}
                        {isAuth && list.Author.id === auth.currentUser.uid && (
                          
                          <button onClick={() => { deletePost(list.id) }}>X</button>
                        
                        )}
                        
                      </div>
                    </div>
                    <Card.Text style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {list.postText}
                    </Card.Text>
                    <div className="text-end">
                      <small className="text-muted">
                        <strong className="font-weight-bold">@{list.Author.name}</strong>
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
