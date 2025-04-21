import { ref, watch, onMounted } from "vue";
import { Preferences } from "@capacitor/preferences";
import { Task } from "@/models/Task";

export const useTasks = () => {
    const TASKS_KEY = "tasks";
    const tasks = ref<Task[]>([]);

    const addTask = async (task: Task) => {
        tasks.value.push(task);
    };

    const getTasks = async () => {
        const tasksList = await Preferences.get({ key: TASKS_KEY });
        const tasksInPreferences = tasksList.value ? JSON.parse(tasksList.value) : [];
        tasks.value = tasksInPreferences;
    };

    const deleteTask = async (task: Task) => {
        tasks.value = tasks.value.filter((t) => t.id !== task.id);
    };

    const saveTasks = async () => {
        await Preferences.set({ key: TASKS_KEY, value: JSON.stringify(tasks.value) });
    };

    const toggleDone = async (task: Task) => {
        tasks.value.forEach((taskItem) => {
            if (task.id === taskItem.id) {
                taskItem.done = !taskItem.done;
            }
        });
        await saveTasks();
    };

    // qualquer mudança ocorrida em 'tasks' carregará a função 'saveTasks()'
    watch(tasks, saveTasks);

    onMounted(getTasks);

    return {
        tasks,
        toggleDone,
        deleteTask,
    };
};
