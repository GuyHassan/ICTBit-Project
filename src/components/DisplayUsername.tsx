import React, { useState, useEffect } from 'react';
import { CurrentUserStore } from '../stores/CurrentUser.store';
import { observer } from 'mobx-react';

// mobx interface
interface CurrentPropsStore {
    userStore: CurrentUserStore
}
// local state interface
interface PropsUser {
    Name: string,
    Age: number
}

export const DisplayUsername: React.FC<CurrentPropsStore> = observer(({ userStore: { currentUser }, userStore }) => {

    const [user, setUser] = useState<PropsUser>({ Name: '', Age: NaN })

    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        // on submit modify the localstorage and mobx.
        const localSt = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (localSt) localStorage.setItem('currentUser', JSON.stringify({ ...localSt, fullName: user.Name.substring(0, 10), age: user.Age }))

        userStore.addUser(user.Age, user.Name)
    }

    // to catch the currentUser updates
    useEffect(() => {

        const { Age, Name } = currentUser;
        setUser({ Age, Name: Name.substring(0, 10) })

    }, [currentUser])

    return (
        <div className="display-username">
            <div>
                <h1 className='name-title'>My Name Is {user.Name === '' ? ' - ' : user.Name}.</h1>
                <p>And i'm {isNaN(user.Age) ? ' - ' : user.Age} years old.</p>
            </div>
        </div>
    )
})
