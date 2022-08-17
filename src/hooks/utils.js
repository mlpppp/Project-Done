export const mapUserMetaToHash = (userMeta, field) => {
    // map array of user document to object: {uid:field}
        // field:= <displayName, online, photoURL>
    const initValue = {}
    return userMeta.reduce((accumulator, user) => {     
        return {
            ...accumulator,
            [user.uid]:user[field]}
    }, initValue)
}