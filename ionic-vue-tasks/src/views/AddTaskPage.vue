<template>
    <ion-page>
        <ion-header :translucent="false">
            <ion-toolbar>
                <ion-title>Nova Tarefa</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div class="container">
                <ion-input placeholder="Título" fill="outline"></ion-input>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonInput } from "@ionic/vue";
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
}
</style>
