import firebase from 'src/utils/firebase';
export const FETCH_REWARD_POINTS = 'FETCH_REWARD_POINTS';

export const fetchRewardPoints = () =>{
    return async dispatch => {
        firebase.firestore().collection('rewards').get().then((querySnapshot) => {
          const rewardsArray = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
          });
          dispatch({ type: FETCH_REWARD_POINTS, payload: rewardsArray})
        }).catch(e => {
          console.log(e)
        })
    } 
};
