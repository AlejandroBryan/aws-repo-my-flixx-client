import { Col, Row, Alert } from 'react-bootstrap';
import { Fragment } from 'react';


export const UserFavoritesScenes = ({userId, token}) => {
   return (
      <Fragment>
         <Col eventKey="uploaded-images" title="Uploaded Images">
            <Row className="justify-content-center py-5">
               <h2 className="text-center mb-5">Uploaded Images</h2>
               <Row className="justify-content-center pb-3">
                  <ImageUpload userId={id} />
               </Row>
            </Row>
         </Col>
      </Fragment>
   );
};



