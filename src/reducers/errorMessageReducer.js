const initialState = {
  errorMessage: '',
};

export const errorMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FAILED_ACTION': {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case 'EDIT_SUCCESS': {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
