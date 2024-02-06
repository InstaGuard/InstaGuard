const config = require('../../next.config');

export default function calculateFakeUserScore(userData) {
  const {
    verifiedAndHighFollowers:verifiedAndHighFollowersWeight,
    followersRatio:followersRatioWeight,
    followsMoreThanThreshold:followsMoreThanThresholdWeight,
    usernameSpecialChar:usernameSpecialCharWeight,
    serialNumbers:serialNumbersWeight,
    joinedRecently:joinedRecentlyWeight,
    bioLinks:bioLinksWeight,
    bioSpecialChar:bioSpecialCharWeight,
    noProfilePicture:noProfilePictureWeight,
    lastPostComments:lastPostCommentsWeight
  } = config.weights;

  const {
    verified: isVerified,
    followersCount,
    followsCount,
    username,
    biography,
    joinedRecently: isJoinedRecently,
    profilePicUrl,
    latestPosts
  } = userData;

  const {
    verifiedAndHighFollowers:verifiedAndHighFollowersThreshold,
    followersRatio:followersRatioThreshhold,
    followsMoreThanThreshold:followsMoreThanThresholdThreshold,
    usernameSpecialChar:usernameSpecialCharThreshold,
    bioLinks:bioLinksThreshold,
    bioSpecialChar:bioSpecialCharThreshold,
    lastPostCommentsMax:lastPostCommentsMaxThreshhold
  } = config.thresholds;

  let fakeUserScore = 0;
  let trueConditions = {};
//vv
  if (!(isVerified && followersCount > verifiedAndHighFollowersThreshold)) {
    fakeUserScore += verifiedAndHighFollowersWeight;
    trueConditions.verifiedAndHighFollowers = true;
  }
//vv
if (!followsCount || followersCount / followsCount < followersRatioThreshhold) {
  fakeUserScore += followersRatioWeight;
  trueConditions.followersRatio = true;
}

//v
  if (followsCount > followsMoreThanThresholdThreshold) {
    fakeUserScore += followsMoreThanThresholdWeight;
    trueConditions.followsMoreThanThreshold = true;
  }
//v
  const specialCharCount = username.replace(/[a-zA-Z]/g, '').length;
  const usernameSpecialCharRatio = specialCharCount / username.length;
  if (usernameSpecialCharRatio > usernameSpecialCharThreshold) {
    fakeUserScore += usernameSpecialCharWeight;
    trueConditions.usernameSpecialChar = true;
  }
//vv
  if (/(\d)\1{2,}/.test(username) || /123|234|345|456|567|678|789|890/.test(username)) {
    fakeUserScore += serialNumbersWeight;
    trueConditions.serialNumbers = true;
  }
//v
  if (isJoinedRecently) {
    fakeUserScore += joinedRecentlyWeight;
    trueConditions.joinedRecently = true;
  }
//v
  const bioLinksArray = (biography.match(/https?:\/\/[^\s]+/g) || []).filter(link => link.includes('http'));
  const filteredBioLinks = filterOutKnownWebsites(bioLinksArray);
  if (filteredBioLinks.length > 0) {
    fakeUserScore += bioLinksWeight;
    trueConditions.bioLinks = true;
  }
//v counts hebrew as special characters...
  const bioSpecialCharCount = biography.replace(/[a-zA-Z]/g, '').length;
  const bioLengthRatio = bioSpecialCharCount / biography.length;
  if (bioLengthRatio > bioSpecialCharThreshold) {
    fakeUserScore += bioSpecialCharWeight;
    trueConditions.bioSpecialChar= true;
  }
//???fix
  if (!profilePicUrl) {
    fakeUserScore += noProfilePictureWeight;
    trueConditions.noProfilePicture = true;
  }
//v
  const lastPostCommentsCount = latestPosts.length > 1 ? latestPosts[0].commentsCount : 0;
  if (lastPostCommentsCount <= lastPostCommentsMaxThreshhold) {
    fakeUserScore += lastPostCommentsWeight;
    trueConditions.lastPostComments = true;
  }

  fakeUserScore = Math.max(0, Math.min(100, fakeUserScore));

  return { fakeUserScore,
           trueConditions, 
           profilePicUrl,
           followersCount,
           followsCount,
           username
          };
}


const knownWebsites = ['facebook.com', 'twitter.com', 'instagram.com'];
function filterOutKnownWebsites(links) {
  return links.filter(link => !knownWebsites.some(known => link.includes(known)));
}