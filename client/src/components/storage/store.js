export const initialState = {userData: {data:{}}, isAutheticated: false,  }


export const reducer = (state, action) => {
  switch(action.type) {

      case 'LOGIN':
        return {...state, userData: action.payload, isAutheticated: true }
  
      case 'LOGOUT':
        return {...initialState}
  
  
      default:
        return state
    }
  }