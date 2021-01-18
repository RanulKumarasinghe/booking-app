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
};

// firestore()
//   .collection('Users')
//   // Filter results
//   .where('points', '>=', 10)
//   .get()
//   .then(querySnapshot => {
//     /* ... */
//   });

// Update points
// firestore()
//   .collection('Users')
//   .doc('ABC')
//   .update({
//     points: 200,
//   })
//   .then(() => {
//     console.log('points updated!');
//   });