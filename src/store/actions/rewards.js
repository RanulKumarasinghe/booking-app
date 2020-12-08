import firebase from 'src/utils/firebase';
export const FETCH_REWARD_POINTS = 'FETCH_REWARD_POINTS';

export const fetchRewardPoints = () =>{
    return async dispatch =>{
        const rewards = await firebase.firestore().collection('rewards')
        rewards.get().then((querySnapshot) => {
          const rewardsArray = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
          });
          dispatch({ type: FETCH_REWARD_POINTS, payload: rewardsArray})
        });
    } 
    // ({ type:'FETCH_REWARD_POINTS', rewardId: id});
};

// firestore()
//   .collection('Users')
//   // Filter results
//   .where('age', '>=', 18)
//   .get()
//   .then(querySnapshot => {
//     /* ... */
//   });

// Update points
// firestore()
//   .collection('Users')
//   .doc('ABC')
//   .update({
//     age: 31,
//   })
//   .then(() => {
//     console.log('User updated!');
//   });