<template>
    <ion-page>
        <ion-header :translucent="false">
            <ion-toolbar>
                <ion-title>Tarefas</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="ion-padding">
            <div id="container">
                <ion-list v-if="tasks.length">
                    <TaskItem v-for="task in tasks" :key="task.id" :task="task" @delete="deleteTask(task)" @toggle="toggleDone(task)" />
                </ion-list>

                <h5 v-if="!tasks.length" >Não há tarefas adicionadas!</h5>

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
import { onMounted } from "vue";

const router = useRouter();

const { tasks, getTasks, deleteTask, toggleDone } = useTasks();

const addNewTask = async () => {
    router.push("/add-task");
};

onMounted(getTasks);
</script>

<style scoped>
#container{
    display: flex;
    justify-content: center;
    height: 100%;
}
</style>
