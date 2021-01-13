import { FETCH_REWARD_POINTS } from '../actions/rewards';

const initialState ={
    rewards: []
    // user: null,
    // document: null,
    // code: null,
    // codeUsed: null,
    // createDate: null,
    // points: null,
    // employee: null,
    // restrauntId: null
};

const rewardsReducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_REWARD_POINTS:
            //this action
            //return action.FETCH_REWARD_POINTS;
        default: 
            return state;
    }
}

export default rewardsReducer;