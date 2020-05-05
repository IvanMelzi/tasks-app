import { initStore } from './store';

const configureStore = () => {
  const actions = {
    NEW_TASK: (currentState, newTask) => {
        const updatedTasks = [...currentState.tasks];
        updatedTasks.push(newTask)
        console.log(updatedTasks);
        return { tasks: updatedTasks };
    },
    DELETE_TASK: (currentState, taskId) => {
        //const taskIndex = currentState.tasks.findIndex(task => task.id === taskId);
        console.log('dDELETE TASK');
        const currentTasks = [...currentState.tasks];
        const updatedTasks = currentTasks.filter(task => task.id !== taskId)
        console.log(updatedTasks);
        return { tasks: updatedTasks };
      }
  };

  
  initStore(actions, {
    tasks: [
      {
        id: 'p1',
        name: 'Creación de estilos para la card de las tareas.',
        estimaded_time: 45,
        remaining_time: 45,
        finished: false,
        status: 'PENDING'
      }, {
        id: 'p2',
        name: 'Creación de estilos para la card de las tareas.',
        estimaded_time: 45,
        remaining_time: 45,
        finished: false,
        status: 'PENDING'
      }, {
        id: 'p3',
        name: 'Creación de estilos para la card de las tareas.',
        estimaded_time: 45,
        remaining_time: 45,
        finished: false,
        status: 'PENDING'
      }
    ]
  });
};

export default configureStore;