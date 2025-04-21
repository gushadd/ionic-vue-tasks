<template>
    <IonItemSliding>
        <ion-item>
            <div class="task-item">
                <ion-checkbox @ionChange="toggleDone" :checked="task.done"></ion-checkbox>
                <div class="task-item-info">
                    <ion-label class="task-title"> {{ task.title }} </ion-label>
                    <ion-label class="task-date-time">{{ formatDate(task.date) }} - {{ task.time }}</ion-label>
                </div>
            </div>
        </ion-item>

        <ion-item-options>
            <ion-item-option color="danger" @click="deleteTaskItem">Apagar</ion-item-option>
        </ion-item-options>
    </IonItemSliding>
</template>

<script setup lang="ts">
import { IonItem, IonItemSliding, IonCheckbox, IonLabel, IonItemOption, IonItemOptions } from "@ionic/vue";
import { Task } from "@/models/Task";
import { format } from "date-fns";

const props = defineProps<{
    task: Task;
}>();

const emit = defineEmits<{
    (e: "delete", id: string): void;
    (e: "toggle", id: string): void;
}>();

const deleteTaskItem = () => {
    emit("delete", props.task.id);
};

const toggleDone = () => {
    emit("toggle", props.task.id);
};

const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy");
};
</script>

<style scoped>
.task-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px 0px;
}

.task-item-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.task-title {
    font-size: 20px;
    font-weight: 600;
}

.task-date-time {
    opacity: 0.6;
}

.done {
    text-decoration: line-through;
    color: gray;
}
</style>
