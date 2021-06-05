import React, { useState, useEffect } from 'react';
import { CurrentUserStore } from '../stores/CurrentUser.store';
import { observer } from 'mobx-react';
import './Main_Style.css';

// mobx interface

interface CurrentPropsStore {
    userStore: CurrentUserStore
}
// local state interface
interface PropsUser {
    Name: string,
    Age: number
}

export const DisplayUsername: React.FC<CurrentPropsStore> = observer(({ userStore: { currentUser, editMode }, userStore }) => {

    const [user, setUser] = useState<PropsUser>({ Name: '', Age: NaN })
    const [onEdit, setOnEdit] = useState<boolean>(false);

    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        // on submit modify the localstorage and mobx.
        const localSt = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (localSt) localStorage.setItem('currentUser', JSON.stringify({ ...localSt, fullName: user.Name.substring(0, 10), age: user.Age }))

        userStore.addUser(user.Age, user.Name)
        userStore.onEditMode()
    }

    // to catch the currentUser updates
    useEffect(() => {

        const { Age, Name } = currentUser;
        setUser({ Age, Name: Name.substring(0, 10) })

    }, [currentUser])

    // to catch the editMode updates
    useEffect(() => {
        setOnEdit(editMode)
    }, [editMode])

    return (
        <div className="display-username">
            {/*  
                2 mode to display, edit mode to modify the name and age.
                second mode is reguler, Displays the data as is. 
             */}
            <div>{onEdit ?
                (<form onSubmit={onSubmit}>
                    <h1>My Name Is
                        <input type="text" placeholder="Name" value={user.Name}
                            onChange={e => setUser(p => ({ ...p, Name: e.target.value }))} />
                    </h1>
                    <p>And i'm
                    <input type="number" placeholder="Age" value={user.Age}
                            onChange={e => setUser(p => ({ ...p, Age: Number(e.target.value) }))} />
                         years old.</p>
                    <button>Submit</button>
                </form>) : (
                    <div>
                        <h1 className='name-title'>My Name Is {user.Name === '' ? ' - ' : user.Name}.</h1>
                        <p>And i'm {isNaN(user.Age) ? ' - ' : user.Age} years old.</p>
                    </div>
                )
            }
            </div>
        </div>
    )
})
