import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import { deletePoll } from '../../actions/poll';
import Spinner from '../layout/Spinner';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditPollModel from './EditPollModel';

const PollsItem = ({ deletePoll, pollId, category: { loading } }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [pollItem, setPollItem] = useState(null);
  const history = useHistory();

  useEffect(() => {
    //Get the Poll by Id
    const getPollItem = async () => {
      try {
        const res = await axios.get(`/api/polls/${pollId}`);

        if (res.status === 200) {
          setPollItem(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getPollItem();
  }, [pollId, modalOpen]);

  //Redirect to Poll Details component
  const handleOpenPollDetails = () => {
    history.push({
      pathname: '/poll-details',
      state: { data: pollItem },
    });
  };

  //Open and close model
  const handleButtonClickOpen = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };
  const handleModalClose = (e) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  return !loading && pollItem !== null ? (
    <div
      className='category-container poll-item'
      onClick={handleOpenPollDetails}>
      <div className='edit-remove-section'>
        <SettingsIcon
          className='setting-icon edit-icon'
          onClick={handleButtonClickOpen}
        />

        <DeleteRoundedIcon
          onClick={(e) => {
            e.stopPropagation();
            deletePoll(pollId);
          }}
          className='setting-icon delete-icon'
        />
      </div>
      <div className='poll-item__question'>{pollItem.question}</div>
      <div className='poll-item__friends-list'>
        {pollItem.opinionImage1Likes.length +
          pollItem.opinionImage2Likes.length}
        {pollItem.opinionImage1Likes.length +
          pollItem.opinionImage2Likes.length ===
        1
          ? ' answer'
          : ' answers'}
      </div>
      <div className='poll-item__images'>
        <div className='poll-item__images__image-div'>
          <Image
            cloudName='daqdhcvyv'
            publicId={pollItem.opinionImage1}
            width='75'
            height='75'
            crop='mfit'
            className='poll-image'
          />
          <div className='like-icon-section'>
            <FavoriteIcon className='like-icon' />{' '}
            {pollItem.opinionImage1Likes.length}
          </div>
        </div>
        <div className='poll-item__images__image-div'>
          <Image
            cloudName='daqdhcvyv'
            publicId={pollItem.opinionImage2}
            width='75'
            height='75'
            crop='mfit'
            className='poll-image'
          />
          <div className='like-icon-section'>
            <FavoriteIcon className='like-icon' />{' '}
            {pollItem.opinionImage2Likes.length}
          </div>
        </div>
      </div>
      <EditPollModel
        open={modalOpen}
        onClose={handleModalClose}
        pollId={pollItem._id}
        question={pollItem.question}
        list={pollItem.friendsList}
      />
    </div>
  ) : (
    <Spinner />
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  category: state.category,
});
export default connect(mapStateToProps, { deletePoll })(PollsItem);
