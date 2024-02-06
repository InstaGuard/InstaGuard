/** @type {import('next').NextConfig} */
const nextConfig = {
  "weights": {
    "verifiedAndHighFollowers": 10,
    "followersRatio": 20,
    "followsMoreThanThreshold": 12,
    "userNameSus": 28,
    "joinedRecently": 5,
    "emptyBio": 4,
    "bioLinks": 3,
    "bioSpecialChar": 3,
    "noProfilePicture": 2,
    "postsCount": 10,
    "lastPostComments": 3
  },
  "thresholds": {
    "verifiedAndHighFollowers": 10000,
    "followersRatio": 0.3,
    "followsMoreThanThreshold": 1000,
    "usernameSpecialChar": 0.4,
    "bioLinks": 3,
    "bioSpecialChar": 0.5,
    "lastPostCommentsMax": 2,
    "avgEntropy": 60
  }
}

module.exports = nextConfig
