import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { API } from '../../utils/index';
import FullscreenModal from './image-modal';

const FetchUserImages = ({ userId, token }) => {
   const [imageThumbnails, setImageThumbnails] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  

   useEffect(() => {
      // Fetch image files from the Node.js backend
      fetch(`${API}/users/userImages/${userId}}`, {
         method: 'GET',
         credentials: 'include',
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setImageThumbnails(data.files);
         })
         .catch((error) => {
            console.error('Error fetching image files:', error);
         });
   }, []);


   const openModal = (thumbnail) => {
    setSelectedThumbnail(thumbnail);
    setShowModal(true);
  };


   const buttonStyle = {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: 'black',
      position: 'absolute',
      top: '50%',
      left: '50%',
      fontSize: '2em',
   };

   return (
      <Container className="my-4">
         <h1>Fetched Images from S3</h1>
         <Row>
            {imageThumbnails.map((thumbnail, index) => (
               <Col md={3} className="mb-3" key={index} >
                  <Card>
                     <Card.Img
                        src={`http://my-flixx-user-images.s3-website.eu-central-1.amazonaws.com/${thumbnail}`}
                        alt={`Image ${index + 1}`}
                        style={{ maxHeight: '300px', cursor: 'pointer' }} 
                        onClick={() => openModal('http://my-flixx-images-bucket.s3-website.eu-central-1.amazonaws.com/'+thumbnail.replace('resized-images', 'original-images'))}
                     />
                  </Card>
                  
               </Col>
            ))}
         </Row>
         <FullscreenModal
            show={showModal}
            onHide={() => setShowModal(false)}
            image={selectedThumbnail}
          
         />
      </Container>
   );
};

export default FetchUserImages;
