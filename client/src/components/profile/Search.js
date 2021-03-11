import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItem';

const Search = ({ allProfile, profile }) => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    const results = allProfile.filter((userProfile) => {
      return userProfile.user.name.toLowerCase().includes(result);
    });

    setData(results);
  }, [result]);
  //console.log(data)

  const onChange = (e) => {
    setResult(e.target.value);
  };

  return (
    <div>
      <input
        type='text'
        placeholder='search here ..'
        value={result}
        onChange={onChange}
      />
      <div className='profiles'>
        {data.length > 0 && profile !== null ? (
          data.map(
            (userProfile) =>
              userProfile.user !== null && (
                <ProfileItem
                  key={userProfile._id}
                  profile={userProfile}
                  loginUser={profile}
                />
              )
          )
        ) : (
          <div>No profiles found</div>
        )}
      </div>
    </div>
  );
};

export default Search;
