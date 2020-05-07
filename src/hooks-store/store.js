import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter(li => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions) => {
  const local_storage = JSON.parse(localStorage.getItem('data'));

  if (local_storage) {
    local_storage.tasks.forEach(task => {
      if (task.status === 'ACTIVE') {
        task.status = 'PENDING';
      }
    });
    globalState = { ...globalState, ...local_storage };
  }
  actions = { ...actions, ...userActions };
};
