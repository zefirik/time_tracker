export const initialState = {userData: [], isAutheticated: false,  }


export const reducer = (state, action) => {
  switch(action.type) {

      case 'LOGIN':
        return {...state, userData: action.payload, isAutheticated: true }
  
      case 'LOGOUT':
        return {...initialState}
  
        case 'RELOAD':
          return {...state, isAutheticated: true }
  
    //   case 'CHANGE':
    //     return {...state, counter: +action.value}
  
    //   case 'RESET':
    //     return {...initialState}
  
      default:
        return state
    }
  }