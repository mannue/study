export const multiActions = ({dispatch, getState}) => next => action => {

    if (Array.isArray(action)) {
        console.log(action)
      action.forEach(a => next(a));
    } else {
      next(action);
    }
}

