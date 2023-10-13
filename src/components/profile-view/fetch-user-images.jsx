import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {API} from '../../utils/index';

const FetchUserImages= ({userId, token}) => {
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    // Fetch image files from the Node.js backend
    fetch(`${API}/users/userImages/${userId}}`,{
        method: 'GET',
         credentials: 'include',
         headers: {
            Authorization: `Bearer ${token}`,
         },

    }) 
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
       setImageFiles(data.files);
      })
      .catch((error) => {
        console.error('Error fetching image files:', error);
      });
  }, []);

  return (
    <Container className="my-4">
      <h1>Fetched Images from S3</h1>
      <Row>
        {imageFiles.map((pathFile, index) => (
          <Col md={4} key={index}>
            <Card>
              <Card.Img
                variant="top"
                src={`http://my-flixx-user-images.s3-website.eu-central-1.amazonaws.com/${pathFile}`}
                alt={`Image ${index + 1}`}
                style={{ maxHeight: '200px' }}
              />
              <Card.Body>
                <Card.Title>Image {index + 1}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FetchUserImages;
