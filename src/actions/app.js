import { APP_LOAD } from './const';

export const loadApp = () => (dispatch) => {
  dispatch({
    type: APP_LOAD,
  });
};

