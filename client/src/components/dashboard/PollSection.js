import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { getPolls } from '../../actions/poll';
import PollsItem from '../polls/PollsItem';
import CreatePollModel from '../polls/CreatePollModel';

const PollSection = ({ getPolls, profile: { loading, profile } }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    if (profile !== null) {
      setPolls(profile.polls);
    }
  }, [profile]);

  //Open and close model
  const handleButtonClickOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  //Scrolling arrow functionality

  const sideScroll = (element, direction, speed, distance, step) => {
    let scrollAmount = 0;
    let slideTimer = setInterval(function () {
      if (direction === 'left') {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  };

  const nextScroll = (e) => {
    const container = document.querySelector('.poll-list');
    sideScroll(container, 'right', 25, 100, 10);
  };

  const prevScroll = (e) => {
    const container = document.querySelector('.poll-list');
    sideScroll(container, 'left', 25, 100, 10);
  };

  return (
    <>
      <div className='create-section'>
        <h1 className='create-section__heading'>Polls</h1>
        <button
          className='round-button create-section__button'
          onClick={handleButtonClickOpen}>
          Create Poll
        </button>
      </div>
      <div className='card-section'>
        {polls.length !== 0 ? (
          <>
            <div className='arrow left' onClick={prevScroll}></div>
            <div className='poll-list'>
              {polls.map((poll) => (
                <PollsItem key={poll._id} pollId={poll} />
              ))}
            </div>
            <div className='arrow right' onClick={nextScroll}></div>
          </>
        ) : (
          <div className='not-found'>No List found</div>
        )}
      </div>

      <CreatePollModel open={modalOpen} onClose={handleModalClose} />
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  poll: state.poll,
});

export default connect(mapStateToProps, { getPolls })(PollSection);
