import React from 'react';

const convertResultsToReasons = (result) => {
  switch (result) {
    case 'verifiedAndHighFollowers':
      return 'Not verified';
    case 'followersRatio':
      return 'The ratio between the number of profiles the user follows and how many are followed is significant';
    case 'followsMoreThanThreshold':
      return 'Follows an unusual amount of users';
    case 'userNameSus':
      return 'The username is suspicious';
    case 'joinedRecently':
      return 'Recently joined the platform';
    case 'emptyBio':
      return 'Empty biography';
    case 'bioLinks':
      return 'The biography contains suspicious links';
    case 'bioSpecialChar':
      return 'Biography contains special characters';
    case 'noProfilePicture':
      return 'No profile picture';
    case 'postsCount':
      return 'Upload only a small number of posts';
    case 'lastPostComments':
      return 'Each post receives a small amount of comments';
    default:
      return '';
  }
};

const ReasonsContainer = (props) => {
  const { reasonsList } = props;
  
  return ( 
      <div>
          <h2>Reasons for this score</h2>
          <p>Here are the reasons we gave this profile its score:</p>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
              {Object.entries(reasonsList).map(([reason, value]) => (
                  <ReasonItem key={reason} reason={convertResultsToReasons(reason)} value={value} />
              ))}
          </ul>
      </div>
  );
}


const ReasonItem = ({ reason, value }) => (
    <li>
        <span style={{ color: 'red' }}>✗</span>
        {reason}
    </li>
);



export default ReasonsContainer;
