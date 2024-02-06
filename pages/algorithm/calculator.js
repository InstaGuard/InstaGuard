const config = require('../../next.config');
const stringEntropy = require('fast-password-entropy');

export default function calculateFakeUserScore(userData) {
  const {
    verifiedAndHighFollowers:verifiedAndHighFollowersWeight,
    followersRatio:followersRatioWeight,
    followsMoreThanThreshold:followsMoreThanThresholdWeight,
    userNameSus:userNameSusWeight,
    joinedRecently:joinedRecentlyWeight,
    emptyBio:emptyBioWeight,
    bioLinks:bioLinksWeight,
    bioSpecialChar:bioSpecialCharWeight,
    noProfilePicture:noProfilePictureWeight,
    postsCount:postsCountWeight,
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
    postsCount,
    latestPosts
  } = userData;

  const {
    verifiedAndHighFollowers:verifiedAndHighFollowersThreshold,
    followersRatio:followersRatioThreshhold,
    followsMoreThanThreshold:followsMoreThanThresholdThreshold,
    usernameSpecialChar:usernameSpecialCharThreshold,
    bioLinks:bioLinksThreshold,
    bioSpecialChar:bioSpecialCharThreshold,
    lastPostCommentsMax:lastPostCommentsMaxThreshhold,
    avgEntropy:avgEntropyThreshold
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

  if(stringEntropy(username) > avgEntropyThreshold + 10){
    fakeUserScore += userNameSusWeight;
    trueConditions.userNameSus = true;
  }

//v
  if (isJoinedRecently) {
    fakeUserScore += joinedRecentlyWeight;
    trueConditions.joinedRecently = true;
  }

  if(biography === ""){
    
    fakeUserScore += emptyBioWeight;
    trueConditions.emptyBio = true;
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

  if (postsCount < 5) {
    fakeUserScore += postsCountWeight;
    trueConditions.postsCount = true;
  }
//v
  const lastPostCommentsCount = latestPosts.length > 1 ? latestPosts[0].commentsCount : 0;
  if (lastPostCommentsCount <= lastPostCommentsMaxThreshhold) {
    fakeUserScore += lastPostCommentsWeight;
    trueConditions.lastPostComments = true;
  }

  console.log(fakeUserScore);
  console.log("conditions " + trueConditions);
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