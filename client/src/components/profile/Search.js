import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItem';

const Search = (props) => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    console.log();
    const results = props.allProfile.filter((userProfile) => {
      console.log(userProfile.user.name);
      console.log(result);
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
        placeholder='serch here ..'
        value={result}
        onChange={onChange}
      />
      <div className='profiles'>
        {data.length > 0 && props.profile !== null ? (
          data.map(
            (userProfile) =>
              userProfile.user !== null && (
                <ProfileItem
                  key={userProfile._id}
                  profile={userProfile}
                  loginUser={props.profile}
                />
              )
          )
        ) : (
          <h4>No profiles found</h4>
        )}
      </div>
    </div>
  );
};

export default Search;
