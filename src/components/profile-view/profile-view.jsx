import { Fragment, useState } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';
import UpdateView from './update-view';
import FavoriteMovies from './favorites-movies';
import UserInfo from './user-info';
//import UserFavoritesScenes from './user-favorites-scenes';
import ImageUpload from '../image-upload/image-upload';
import { API } from '../../utils';
import FetchUserImages from './fetch-user-images';

const ProfileView = ({ user, token, favoritesMovies, toggleFavoritesMovies }) => {
   const handleDelete = () => {
      fetch(`${API}/users/${user.Username}`, {
         method: 'DELETE',
         mode: 'cors',
         credentials: 'include',

         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
      })
         .then((response) => {
            if (response.ok) {
               alert('Successfully Delete');
               window.location.reload();
               localStorage.clear();
            } else {
               alert('Failed to update');
            }
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      <Fragment>
         <Row className="justify-content-center  mt-4 ">
            <UserInfo user={user} handleUserDelete={handleDelete} />
            <UpdateView user={user} token={token} />
            <FavoriteMovies favoritesMovies={favoritesMovies} toggleFavoritesMovies={toggleFavoritesMovies} />

            <Col title="Uploaded Images">
               <Row className="justify-content-center py-5">
                  <h2 className="text-center mb-5">Uploaded Images</h2>
                  <Row className="justify-content-center pb-3">
                     <ImageUpload  userId={user._id} token={token}/>
                  </Row>
               </Row>
            </Col>
         </Row>
         <FetchUserImages userId={user._id} token={token} />
      </Fragment>
   );
};

export default ProfileView;
