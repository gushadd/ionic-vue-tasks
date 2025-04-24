<template>
    <ion-page>
        <ion-header :translucent="false">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/" />
                </ion-buttons>
                <ion-title>Nova Tarefa</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div class="container">
                <ion-input v-model="title" placeholder="Título" fill="outline"></ion-input>
                <ion-input v-model="formattedDate" placeholder="Data" readonly @ionFocus="showDatePicker" fill="outline"></ion-input>
                <ion-input v-model="formattedTime" placeholder="Hora" readonly @ionFocus="showTimePicker" fill="outline"></ion-input>
                <ion-button @click="saveTask" shape="round">Salvar</ion-button>
            </div>

            <ion-popover :is-open="datePopoverIsOpen" alignment="center" :event="dateEvent" @didDismiss="datePopoverIsOpen = false">
                <ion-content>
                    <ion-datetime presentation="date" v-model="date" @ionChange="updateFormattedDate" locale="pt-BR" />
                    <div class="modal-ok-button-wrapper">
                        <ion-button @click="datePopoverIsOpen = false">Ok</ion-button>
                    </div>
                </ion-content>
            </ion-popover>

            <ion-popover :is-open="timePopoverIsOpen" alignment="center" :event="timeEvent" @didDismiss="timePopoverIsOpen = false">
                <ion-content>
                    <ion-datetime presentation="time" hour-cycle="h23" v-model="time" @ionChange="updateFormattedTime" locale="pt-BR" />
                    <div class="modal-ok-button-wrapper">
                        <ion-button @click="timePopoverIsOpen = false">Ok</ion-button>
                    </div>
                </ion-content>
            </ion-popover>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, IonInput, IonButton, IonPopover, IonDatetime } from "@ionic/vue";
import { ref } from "vue";

import { useDateFormat } from "@vueuse/core";
import { useTasks } from "@/composables/useTasks";
import { useRouter } from "vue-router";

const router = useRouter();

const { addTask, tasks } = useTasks();

const title = ref("");
const date = ref<string>("");
const time = ref<string>("");

const formattedDate = ref("");
const formattedTime = ref("");

const datePopoverIsOpen = ref(false);
const timePopoverIsOpen = ref(false);
const dateEvent = ref<Event | null>(null);
const timeEvent = ref<Event | null>(null);

const showDatePicker = (e: Event) => {
    dateEvent.value = e;
    datePopoverIsOpen.value = true;
};

const showTimePicker = (e: Event) => {
    timeEvent.value = e;
    timePopoverIsOpen.value = true;
};

const updateFormattedDate = () => {
    if (date.value) {
        formattedDate.value = useDateFormat(() => new Date(date.value), "DD/MM/YYYY").value;
    }
};

const updateFormattedTime = () => {
    if (time.value) {
        formattedTime.value = useDateFormat(() => new Date(time.value), "HH:mm").value;
    }
};

const saveTask = async () => {
    const task = {
        id: String(Date.now()),
        title: title.value,
        date: formattedDate.value,
        time: formattedTime.value,
        done: false,
    };
    await addTask(task);
    router.go(-1);
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
}

.modal-ok-button-wrapper{
    display: flex;
    justify-content: end;
}
</style>
