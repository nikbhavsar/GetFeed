import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CreateFriendsList from './CreateFriendsList';

export default function FriendsListModal({ open, onClose }) {
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={onClose}
        className='modal'
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className='paper'>
            <CreateFriendsList onClose={onClose} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
