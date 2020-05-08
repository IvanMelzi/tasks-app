import { initStore } from './store';

// Actions store.
const configureStore = () => {
  const actions = {
    NEW_TASK: (currentState, newTask) => {
        let updatedTasks = [];
        if (currentState.tasks) {
          updatedTasks = [...currentState.tasks];
        }

        updatedTasks.push(newTask)
        saveStorage({ tasks: updatedTasks });
        return { tasks: updatedTasks };
    },
    DELETE_TASK: (currentState, taskId) => {
        const currentTasks = [...currentState.tasks];
        const updatedTasks = currentTasks.filter(task => task.id !== taskId);
        saveStorage({ tasks: updatedTasks });
        return { tasks: updatedTasks, current_task: null };
    },
    START_TASK: (currentState, taskId) => {
        const pausedTasks = currentState.tasks.filter(task => task.id !== taskId);
        const selectedTask = currentState.tasks.filter(task => task.id === taskId)[0];

        const updatedTasks = [selectedTask, ...pausedTasks];
        
        updatedTasks[0].status = 'ACTIVE';

        saveStorage({ tasks: updatedTasks });
        return { tasks: updatedTasks, current_task: selectedTask };
    },
    PAUSE_TASK: (currentState, taskId) => {
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
      let updatedTasks = [];

      if (currentState.tasks) {
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

// Set local storage.
const saveStorage = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
}

export default configureStore;
