import { ref, watch, onMounted } from "vue";
import { Preferences } from "@capacitor/preferences";
import { Task } from "@/models/Task";

const TASKS_KEY = "tasks";
const tasks = ref<Task[]>([]);

const getTasks = async () => {
    const tasksList = await Preferences.get({ key: TASKS_KEY });
    const tasksInPreferences = tasksList.value ? JSON.parse(tasksList.value) : [];
    tasks.value = tasksInPreferences;
};

const saveTasks = async () => {
    await Preferences.set({ key: TASKS_KEY, value: JSON.stringify(tasks.value) });
};

const addTask = async (task: Task) => {
    tasks.value.push(task);
    await saveTasks();
};

const deleteTask = async (task: Task) => {
    tasks.value = tasks.value.filter((t) => t.id !== task.id);
    await saveTasks();
};

const toggleDone = async (task: Task) => {
    tasks.value.forEach((taskItem) => {
        if (task.id === taskItem.id) {
            taskItem.done = !taskItem.done;
        }
    });
    await saveTasks();
};

watch(tasks, saveTasks, { deep: true });

export const useTasks = () => {
    return {
        tasks,
        addTask,
        deleteTask,
        toggleDone,
        getTasks,
    };
};
