import { useState, Fragment } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { API } from '../../utils';

const ImageUpload = ({userId, token}) => {
   const [file, setFile] = useState(null);
   const [message, setMessage] = useState('');

   const handleFileChange = (e) => {
    e.preventDefault();
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
   };

   const handleFileUpload = () => {
    
      if (!file) {
         setMessage('Please select a file.');
         return Promise.resolve(); // Return a resolved promise to prevent further execution.
      }

      const formData = new FormData();
      formData.append('file', file);

      return fetch(`${API}/users/userImages/${userId}`, {
         method: 'POST',
         body: formData,
         credentials: 'include',
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
         .then((response) => {
            if (response.ok) {
               setMessage('File uploaded successfully.');
               setFile(null);
            } else {
               setMessage('File upload failed.');
            }
         })
         .catch((error) => {
            console.error('Error uploading file:', error);
            setMessage('File upload failed.');
         });
   };

   return (
      <div>
         <h2>Upload a File</h2>
         <Form>
            <Form.Control
            label="choose a file"
            type='file'
            name='file'
            onChange={handleFileChange}
            />
            <Button variant="primary" onClick={handleFileUpload}>
               Upload
            </Button>
         </Form>
         {message && <Alert variant={message.includes('failed') ? 'danger' : 'success'}>{message}</Alert>}

      </div>
   );
};

export default ImageUpload;
