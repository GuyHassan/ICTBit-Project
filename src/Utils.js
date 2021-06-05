import axios from 'axios';

// return object that includes all the data
const arrangeUserProps = (user) => {
    let userProps;
    const { age, gender, location: { city, country }, name: { first, last } } = user;
    userProps = { age, gender, city, country, fullName: `${first} ${last}` }

    return userProps

}
// Call the api (if user not exists on localStorage) And initializes the mobx, local state and localstorage
const generateNewUser = async (userStore, setUserNotExists) => {
    try {
        const resp = await axios.get('https://randomuser.me/api');

        const userProps = arrangeUserProps({
            age: resp.data.results[0].dob.age, gender: resp.data.results[0].gender,
            location: resp.data.results[0].location, name: resp.data.results[0].name
        });

        userStore.addUser(userProps.age, userProps.fullName);
        setUserNotExists(userProps);
        localStorage.setItem('currentUser', JSON.stringify(userProps));
    } catch {
        console.log('Something went wrong along the way');
        return null
    }

}

export { arrangeUserProps, generateNewUser }