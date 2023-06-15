import React from 'react'

const Profile = (props) => {
    const {name,lastname} = props; // destructuring 
    console.log(props);

    return (
        <div>Profile {name}{lastname}</div>
    )
}

export default Profile