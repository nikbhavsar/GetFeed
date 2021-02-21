import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const PollSection = (props) => {
  return (
    <>
      <div className='create-section'>
        <h1 className='create-section__heading'>Polls</h1>
        <button className='round-button create-section__button'>
          Create Poll
        </button>
      </div>
      <div className='card-section'></div>
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(null, null)(PollSection);
