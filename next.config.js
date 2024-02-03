/** @type {import('next').NextConfig} */
const nextConfig = {
  "weights": {
    "verifiedAndHighFollowers": 15,
    "followersRatio": 10,
    "followsMoreThanThreshold": 10,
    "usernameSpecialChar": 10,
    "serialNumbers": 10,
    "joinedRecently": 10,
    "bioLinks": 10,
    "bioSpecialChar": 10,
    "noProfilePicture": 5,
    "lastPostComments": 10
  },
  "thresholds": {
    "verifiedAndHighFollowers": 10000,
    "followersRatio": 0.3,
    "followsMoreThanThreshold": 1000,
    "usernameSpecialChar": 0.4,
    "bioLinks": 3,
    "bioSpecialChar": 0.5,
    "lastPostCommentsMax": 2
  }
}

module.exports = nextConfig
