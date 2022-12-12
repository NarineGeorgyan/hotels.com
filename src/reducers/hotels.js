const hotelsState = [];
export const hotelsReducer = (state = hotelsState, action) => {
  switch (action.type) {
    case 'ALL_HOTELS':
      return [...state, ...action.payload];

    default:
      return state;
  }
};
