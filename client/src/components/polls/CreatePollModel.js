import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { getPolls, createPoll } from '../../actions/poll';
import { getCategories } from '../../actions/category';

const CreatePollModel = ({
  getCategories,
  createPoll,
  category: { categories, loading },
  profile: { profile },
  open,
  onClose,
  dispatch,
}) => {
  const [name, setName] = useState('');
  //State for Dropdown value
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState('');

  //Image value
  const [fileInputState, setFileInputState] = useState('');
  const setImages = useRef([]);

  useEffect(() => {
    getCategories();
    if (categories) {
      setItems(
        categories.map(({ _id, category_name }) => ({
          label: category_name,
          value: _id,
        }))
      );
    }
  }, [open, profile]);

  //Image input methods

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImages.current = [...setImages.current, reader.result];
      console.log(setImages.current);
    };
  };

  //Create the new poll
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    createPoll(name, setImages.current[0], setImages.current[1], selected);
    setName('');
    setSelected('selected-list');
    setImages.current = [];
    onClose();
  };

  return (
    <Fragment>
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
          <div className='paper create-poll-model'>
            <h1 className='create-poll-model__heading'>Create Poll</h1>
            <form onSubmit={handleSubmit} className='create-poll-section'>
              <div className='poll-form-section'>
                <div className='poll-info-section'>
                  <div className='poll-info-section__question'>
                    <label>
                      <span>Question:</span>
                      <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      <span>Friend list:</span>
                      <select
                        className='poll-info-section__friends-list'
                        disabled={loading}
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}>
                        <option
                          className='poll-info-section__friends-list'
                          selected='selected'
                          value='selected-list'>
                          Select Your List
                        </option>

                        {items.map(({ label, value }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
                <div className='image-sec'>
                  <label class='custom-file-upload'>
                    <input
                      type='file'
                      name='image'
                      title='foo'
                      onChange={handleFileInputChange}
                      value={fileInputState}
                      className='image-input'
                    />
                    <CloudUploadIcon className='cloud-icon' />
                    Select two images
                  </label>
                </div>
              </div>

              <input
                type='submit'
                value='Create'
                className='round-button create-poll-button'
              />
            </form>
          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  category: state.category,
});

export default connect(mapStateToProps, {
  getPolls,
  getCategories,
  createPoll,
})(CreatePollModel);
