import React, { useState, useEffect } from 'react';
import { CurrentUserStore } from '../stores/CurrentUser.store';
import { generateNewUser } from '../Utils';
import { observer } from 'mobx-react';
import './Main_Style.css';

// mobx interface
interface CurrentPropsStore {
    userStore: CurrentUserStore
}
// local state interface
interface UserNotExists {
    gender: string,
    city: string,
    country: string
}

const initialUser = { gender: '', city: '', country: '' }

export const EditUser: React.FC<CurrentPropsStore> = observer(({ userStore }) => {
    const [userNotExists, setUserNotExists] = useState<UserNotExists>(initialUser)

    // remove data from localstorage, mobx, and the local state !
    const clearAll = () => {
        localStorage.removeItem('currentUser');
        userStore.clearUser()
        setUserNotExists(p => initialUser)
    }

    // Arrangement of the api call if not exists user on our storage.
    useEffect(() => {
        const userProps = localStorage.getItem('currentUser');

        // if user not exists in a localstorage
        if (!userProps) {
            generateNewUser(userStore, setUserNotExists)
        } else {
            const userProps = JSON.parse(localStorage.getItem('currentUser') || '{}')
            userStore.addUser(userProps.age, userProps.fullName)
            setUserNotExists(userProps)
        }


    }, [userStore])

    return (
        <div className="edit-user">
            <div>
                <p>My Gender is {userNotExists.gender}</p>
                <p>I'm live in {userNotExists.city} which is in {userNotExists.country}</p>
                <button onClick={generateNewUser.bind(null, userStore, setUserNotExists)}>Generate New User</button>
                <button onClick={clearAll}>Clear All Information</button>
                <button onClick={() => { userStore.onEditMode() }}>Edit Your Properties</button>
            </div>
        </div>
    )
})
