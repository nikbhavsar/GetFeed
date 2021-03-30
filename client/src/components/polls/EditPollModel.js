import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { getPolls, updatePoll } from '../../actions/poll';
import { getCategories } from '../../actions/category';

const EditPollModel = ({
  getCategories,
  updatePoll,
  category: { categories, loading },
  profile: { profile },
  question,
  pollId,
  list,
  open,
  onClose,
}) => {
  const [name, setName] = useState(question);
  //State for Dropdown value
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(list);

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

  //Create the new poll
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    updatePoll(pollId, name, selected);
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
            <h1 className='create-poll-model__heading'>Edit Poll</h1>
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
                        {items.map(({ label, value }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              </div>

              <input
                type='submit'
                value='Update'
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
  updatePoll,
})(EditPollModel);
