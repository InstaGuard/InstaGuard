import Image from 'next/image'

const ProfileDetails = (props) => {
  const { photo, username, followers, follows } = props;

    return ( 
      <div>
        <h2>Profile Details</h2>
        <div className='flex-details'>
          <Image src={"/" + username +".jpg"} alt="profile pic" width={150} height={150}/>
          <div>
            <p><b>Username:</b> {username} </p>
            <p><b>#Followers:</b> {followers} </p>
            <p><b>#Follows:</b> {follows} </p>
          </div>
        </div>
      </div>
    );
}
 
export default ProfileDetails;