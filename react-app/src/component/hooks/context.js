import React, { useState, useContext } from 'react';
import { render } from 'react-dom';
const ProfileContext = React.createContext();
const ProfileProvider = (props) => {
    const userInformation = {
        company: 'Progress',
        companyImage: 'https://svgshare.com/i/9ir.svg',
        url: 'https://www.telerik.com/kendo-react-ui/',
        userImage: 'https://i.imgur.com/Y1XRKLf.png',
        userName: 'Kendoka',
        fullName: 'Kendō No Arikata',
        team: 'KendoReact',
        toggleTeam: (property, value) => {
            setUserInfo(
                {...userInfo,[property]: value}
            );
        }
    }
    const [userInfo, setUserInfo] = useState(userInformation);

    return (<ProfileContext.Provider value={userInfo}>
        {props.children}
    </ProfileContext.Provider>);
};

const App = () => <ProfileProvider><Profile /></ProfileProvider>;

const Profile = () => {
    const context = useContext(ProfileContext);
    return <div className="profile" >
        <img src={context.companyImage} />
        <User/>
    </div>;
};

const User = () => {
    const context = useContext(ProfileContext);
    return <div className = "user">
        <React.Fragment>
            <a href = {context.url}><img src={context.userImage} width = "138px" /></a>
            <h1 className="profile-userName"> {context.userName}</h1>
            <p className="profile-fullName"> ({context.fullName})</p>
            <Team />
            <button className="profile-button"
                    onClick={() => context.toggleTeam('team', 'Angular')}>Angular</button>
            <button className="profile-button"
                    onClick={() => context.toggleTeam('team', 'Vue')}>Vue</button>
            <button className="profile-button"
                    onClick={() => context.toggleTeam('team', 'React')}>React</button>
        </React.Fragment>
    </div>;
}

const Team = () => {
    const context = useContext(ProfileContext);
    return <div className = "team" >
        <p className = "profile-team">{context.team}</p>
    </div>;
};

export default App;
