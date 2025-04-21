<template>
    <ion-page>
        <ion-header :translucent="false">
            <ion-toolbar>
                <ion-title>Tarefas</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="ion-padding">
            <div id="container">
                <ion-list>
                    <TaskItem v-for="task in tasks" :key="task.id" :task="task" @delete="deleteTask(task)" @toggle="toggleDone(task)" />
                </ion-list>

                <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                    <ion-fab-button @click="addNewTask">
                        <ion-icon :icon="add"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonList, IonFab, IonFabButton } from "@ionic/vue";
import { add } from "ionicons/icons";
import TaskItem from "@/components/TaskItem.vue";
import { useTasks } from "@/composables/useTasks";
import { useRouter } from "vue-router";

const router = useRouter();

const { tasks, deleteTask, toggleDone } = useTasks();

const addNewTask = async () => {
    router.push("/add-task");
};
</script>

<style scoped></style>
