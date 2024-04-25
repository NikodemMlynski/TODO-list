import { createSlice } from "@reduxjs/toolkit";

const findUniqueId = (tasks) => {
    let id;
    do {
        id = Math.floor(Math.random() * 500); // Zakładam, że unikalne id będą w przedziale od 0 do 999999
    } while (tasks.some(task => task.id === id)); // Sprawdzamy, czy wygenerowany id jest już używany
    return id;
}


export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        value: []
    },
    reducers: {
        addTask: (state, action) => {
            console.log(action);
            state.value.push({...action.payload.task, id: findUniqueId(state.value), completed: false});
        },
        deleteTask: (state, action) => {
            state.value = state.value.filter(task => task.id !== action.payload.id);
        },
        updateTask: (state, action) => {
            const index = state.value.findIndex(task => task.id == action.payload.task.id);
            if(!(index === -1)){
                state.value[index] = {...action.payload.task};
            }
        },
        completeTask: (state, action) => {
            const index = state.value.findIndex(task => task.id === action.payload.id);
            if(index !== -1){
                state.value[index] = {...state.value[index], completed: !state.value[index].completed}
            }
        }
    }
});
export const {addTask, deleteTask, updateTask, completeTask} = tasksSlice.actions;

export default tasksSlice.reducer;