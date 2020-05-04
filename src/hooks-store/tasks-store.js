import { initStore } from './store';

const configureStore = () => {
  const actions = {
    NEW_TASK: (currentState, newTask) => {
        const updatedTasks = [...currentState.tasks];
        updatedTasks.push(newTask)
        console.log(updatedTasks);
        return { tasks: updatedTasks };
      }
  };

  
  initStore(actions, {
    tasks: [
      {
        id: 'p1',
        name: 'Red Scarf',
        estimaded_time: 'A pretty red scarf.',
        remaining_time: false,
        finished: false,
        status: 'PENDING'
      },
      {
        id: 'p2',
        name: 'Blue T-Shirt',
        estimaded_time: 'A pretty blue t-shirt.',
        remaining_time: false,
        finished: false,
        status: 'PENDING'
      },
      {
        id: 'p3',
        name: 'Green Trousers',
        estimaded_time: 'A pair of lightly green trousers.',
        remaining_time: false,
        finished: false,
        status: 'PENDING'
      }
    ]
  });
};

export default configureStore;