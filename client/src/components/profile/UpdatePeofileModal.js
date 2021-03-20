import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { updateAvatar } from '../../actions/profile';

const UpdateProfileModal = ({ open, handleClose, updateAvatar }) => {
  //Image value
  const [fileInputState, setFileInputState] = useState('Select your avatar');
  const setImage = useRef([]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage.current = reader.result;
      console.log(setImage.current);
      setFileInputState('Great! You are all ready to Go!!');
    };
  };

  //Create the new poll
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    updateAvatar(setImage.current);
    setImage.current = [];
    setFileInputState('Select your avatar');
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        className='modal'
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className='paper image-update'>
            <div className='image-sec'>
              <label class='custom-file-upload update-profile-pic'>
                <input
                  type='file'
                  name='image'
                  title='foo'
                  onChange={handleFileInputChange}
                  className='image-input'
                />
                <CloudUploadIcon className='cloud-icon' />
                {fileInputState}
              </label>
            </div>
            <input
              type='submit'
              value='Update'
              className='round-button create-poll-button'
              onClick={handleSubmit}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default connect(null, { updateAvatar })(UpdateProfileModal);
