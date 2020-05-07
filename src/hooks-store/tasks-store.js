import { initStore } from './store';

const configureStore = () => {
  const actions = {
    NEW_TASK: (currentState, newTask) => {
        console.log('[ACTIONS] NEW_TASK');
        let updatedTasks = [];
        if (currentState.tasks) {
          updatedTasks = [...currentState.tasks];
        }

        updatedTasks.push(newTask)
        saveStorage({ tasks: updatedTasks });
        return { tasks: updatedTasks };
    },
    DELETE_TASK: (currentState, taskId) => {
        console.log('[ACTIONS] DELETE_TASK');
        const currentTasks = [...currentState.tasks];
        const updatedTasks = currentTasks.filter(task => task.id !== taskId);
        saveStorage({ tasks: updatedTasks });
        return { tasks: updatedTasks, current_task: null };
    },
    START_TASK: (currentState, taskId) => {
        console.log('[ACTIONS] START_TASK');
        const pausedTasks = currentState.tasks.filter(task => task.id !== taskId);
        const selectedTask = currentState.tasks.filter(task => task.id === taskId)[0];

        const updatedTasks = [selectedTask, ...pausedTasks];
        
        updatedTasks[0].status = 'ACTIVE';

        saveStorage({ tasks: updatedTasks });
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

        saveStorage({ tasks: updatedTasks });
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

      saveStorage({ tasks: updatedTasks });
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
        saveStorage({ tasks: updatedTasks });
        return { tasks: updatedTasks, current_task: updatedTasks[taskIndex] };
      }
      saveStorage({ tasks: updatedTasks });
      return { tasks: updatedTasks };
    },
    FINISH_TASK: (currentState, taskId) => {
        console.log('[ACTIONS] FINISH_TASK');
        
        const taskIndex = currentState.tasks.findIndex(task => task.id === taskId);
        const updatedTasks = [...currentState.tasks];
        updatedTasks[taskIndex] = {
          ...currentState.tasks[taskIndex],
          status: 'FINISHED',
          finish_date: new Date()
        };

        saveStorage({ tasks: updatedTasks });
        return { tasks: updatedTasks, current_task: null };
    },
    SAVE_TASK: (currentState, updatedTask) => {
        console.log('[ACTIONS] FINISH_TASK');
        console.log(updatedTask);
        const taskIndex = currentState.tasks.findIndex(task => task.id === updatedTask.id);
        const updatedTasks = [...currentState.tasks];
        updatedTasks[taskIndex] = {
          ...currentState.tasks[taskIndex],
          name: updatedTask.name,
          estimaded_time: updatedTask.time,
          remaining_time: updatedTask.time
        };

        saveStorage({ tasks: updatedTasks });
        return { tasks: updatedTasks };
    },
    RANDOM_TASKS: (currentState, newTasks) => {
      console.log('[ACTIONS] RANDOM_TASKS');
      let updatedTasks = [];

      if (currentState.tasks) {
        console.log('entre a c')
        updatedTasks = [...currentState.tasks, ...newTasks];
      } else {
        updatedTasks = [...newTasks];
      }

      saveStorage({ tasks: updatedTasks });
      return { tasks: updatedTasks };
  },
  };

  
  initStore(actions);
};

const saveStorage = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
}

export default configureStore;


/* , {
  tasks: [
    {
      id: 'p1',
      name: 'Creación de estilos para la card de las tareas.',
      estimaded_time: 45*60000,
      remaining_time: 45*60000,
      finished: false,
      status: 'PENDING',
      finish_date: ''
    }, {
      id: 'p2',
      name: 'Creación de estilos para la card de las tareas.',
      estimaded_time: 45*60000,
      remaining_time: 45*60000,
      finished: true,
      status: 'PENDING',
      finish_date: ''
    }, {
      id: 'p3',
      name: 'Creación de estilos para la card de las tareas.',
      estimaded_time: 45*60000,
      remaining_time: 45*60000,
      finished: false,
      status: 'PENDING',
      finish_date: ''
    }
  ]
} */