import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { getCategories } from '../../actions/category';
import Spinner from '../layout/Spinner';
import FavoriteIcon from '@material-ui/icons/Favorite';

const PollsItem = ({
  pollId,
  getCategories,
  auth,
  category: { categories, loading },
}) => {
  const [pollItem, setpollItem] = useState(null);
  const [friendList, setfriendList] = useState([]);

  useEffect(() => {
    //Get the Poll by Id
    const getPollItem = async () => {
      try {
        const res = await axios.get(`/api/polls/${pollId}`);

        if (res.status === 200) {
          setpollItem(res.data);
        }
        console.log(pollItem);
      } catch (err) {
        console.error(err);
      }
    };
    getPollItem();
  }, [pollId]);

  return !loading && pollItem !== null ? (
    <div className='category-container poll-item'>
      <div className='poll-item__question'>{pollItem.question}</div>
      <div className='poll-item__friends-list'>
        {pollItem.opinionImage1Likes.length +
          pollItem.opinionImage2Likes.length}{' '}
        answers
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
          <FavoriteIcon className='like-icon' />
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
          <FavoriteIcon className='like-icon' />
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  category: state.category,
});
export default connect(mapStateToProps, { getCategories })(PollsItem);
