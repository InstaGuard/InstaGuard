import Image from 'next/image'

const ProfileDetails = (props) => {
  const { username, followers, follows, posts } = props;

    return ( 
      <div>
        <h2>Profile Details</h2>
        <div className='flex-details'>
          <Image src="/InstaGuard_logo.png" alt="profile pic" width={100} height={100} />
          <div>
            <p><b>Username:</b> {username} </p>
            <p><b>#Followers:</b> {followers} </p>
            <p><b>#Follows:</b> {follows} </p>
            <p><b>#Posts:</b> {posts} </p>
          </div>
        </div>
      </div>
    );
}
 
export default ProfileDetails;