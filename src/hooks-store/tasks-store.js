import { initStore } from './store';

const configureStore = () => {
  const actions = {
    NEW_TASK: (currentState, newTask) => {
        console.log('[ACTIONS] NEW_TASK');
        const updatedTasks = [...currentState.tasks];
        updatedTasks.push(newTask)
        return { tasks: updatedTasks };
    },
    DELETE_TASK: (currentState, taskId) => {
        console.log('[ACTIONS] DELETE_TASK');
        const currentTasks = [...currentState.tasks];
        const updatedTasks = currentTasks.filter(task => task.id !== taskId)
        return { tasks: updatedTasks };
    },
    START_TASK: (currentState, taskId) => {
        console.log('[ACTIONS] START_TASK');
        const pausedTasks = currentState.tasks.filter(task => task.id !== taskId);
        const selectedTask = currentState.tasks.filter(task => task.id === taskId)[0];

        const updatedTasks = [selectedTask, ...pausedTasks];
        
        updatedTasks[0].status = 'ACTIVE';

        return { tasks: updatedTasks, current_task: selectedTask };
    },
    PAUSE_TASK: (currentState, taskId) => {
        console.log('[ACTIONS] PAUSE_TASK');

        const taskIndex = currentState.tasks.findIndex(task => task.id === taskId);
        const updatedTasks = [...currentState.tasks];
        updatedTasks[taskIndex] = {
          ...currentState.tasks[taskIndex],
          status: 'PENDING'
        };

        return { tasks: updatedTasks, current_task: null };
    },
    SAVE_TIME: (currentState, taskId) => {
      console.log('[ACTIONS] SAVE_TIME');

      const taskIndex = currentState.tasks.findIndex(task => task.id === taskId);
      const updatedTasks = [...currentState.tasks];
      updatedTasks[taskIndex] = {
        ...currentState.tasks[taskIndex],
        remaining_time: currentState.tasks[taskIndex].remaining_time - 1000
      };
      return { tasks: updatedTasks, current_task: updatedTasks[taskIndex] };
    },
    RESTART_TIME: (currentState, taskId) => {
      console.log('[ACTIONS] RESTART_TIME');

      const taskIndex = currentState.tasks.findIndex(task => task.id === taskId);
      const updatedTasks = [...currentState.tasks];
      updatedTasks[taskIndex] = {
        ...currentState.tasks[taskIndex],
        remaining_time: currentState.tasks[taskIndex].estimaded_time
      };
      if (currentState.current_task) {
        return { tasks: updatedTasks, current_task: updatedTasks[taskIndex] };
      }
      return { tasks: updatedTasks };
    },
  };

  
  initStore(actions, {
    tasks: [
      {
        id: 'p1',
        name: 'Creación de estilos para la card de las tareas.',
        estimaded_time: 45*60000,
        remaining_time: 45*60000,
        finished: false,
        status: 'PENDING'
      }, {
        id: 'p2',
        name: 'Creación de estilos para la card de las tareas.',
        estimaded_time: 45*60000,
        remaining_time: 45*60000,
        finished: false,
        status: 'PENDING'
      }, {
        id: 'p3',
        name: 'Creación de estilos para la card de las tareas.',
        estimaded_time: 45*60000,
        remaining_time: 45*60000,
        finished: false,
        status: 'PENDING'
      }
    ]
  });
};

export default configureStore;