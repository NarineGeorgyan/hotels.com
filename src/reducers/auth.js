let auth = window.localStorage.getItem('auth');
let userState = auth ? JSON.parse(auth) : null;

export const authReducer = (state = userState, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return action.payload;
    default:
      return state;
  }
};
