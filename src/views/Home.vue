<template>
  <v-container class="app-page">
    <!-- <v-row dense wrap>
     
    </v-row>-->
     <v-row wrap dense>
      <v-col cols="12">
        <h3 class="title">Задачи</h3>
      </v-col>
      <v-col cols="12" md="4">
        <tasks-group 
        class="my-3"
        title='Беклог'
        subtitle='Задачи которые нужно выполнить'
        :loading="isTasksLoading"
        :data="newTasks"
        @onEdit="onTaskEdit"
         @onDelete="onTaskDelete"
         @onChangeStatus="onChangeStatus"
        />
      </v-col>
      <v-col cols="12" md="4">
        <tasks-group 
        class="my-3"
        title='В процессе'
        subtitle='Задачи которые выполняются'
        :loading="isTasksLoading"
        :data="currentTasks"
        @onEdit="onTaskEdit"
         @onDelete="onTaskDelete"
         @onChangeStatus="onChangeStatus"
        />
      </v-col>
       <v-col cols="12" md="4">
        <tasks-group 
        class="my-3"
        title='Выполненные задачи'
        subtitle='Задачи которые успешно выполнены'
        :loading="isTasksLoading"
        :data="completedTasks"
         @onEdit="onTaskEdit"
        @onDelete="onTaskDelete"
        @onChangeStatus="onChangeStatus"
        />
      </v-col>
    </v-row>
    <v-row dense wrap>
      <!-- <v-col cols="12" md="5">
        <h3 class="title">Просмотренные</h3>
        <v-card class="pt-4" outlined>
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels"
              :value="value"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">User Registrations</div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small> mdi-clock </v-icon>
            <span class="caption grey--text font-weight-light"
              >last registration 26 minutes ago</span
            >
          </v-card-text>
        </v-card>
      </v-col> -->
      <v-col cols="12">
        <h3 class="title">Сотрудники</h3>
        <v-card outlined :loading="isEployeesLoading" max-height="300">
          <v-list>
            <v-list-item v-for="item in employees" :key="item.id" @click dense>
              <v-list-item-avatar>
                <v-avatar color="primary" size="32">
                  <span class="white--text caption">
                    {{`${item.firstName.slice(0,1)}${item.lastName.slice(0,1)}`}}
                  </span>
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  {{ `${item.firstName} ${item.lastName}` }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
   
  </v-container>
</template>

<script>
// @ is an alias to /src

import { mapState, mapActions } from "vuex";

import {getRandomColor} from '../common/colors'

import CourseCard from "@/components/CourseCard";
import TasksGroup from "@/components/TasksGroup";

export default {
  name: "home",
  components: { CourseCard, TasksGroup },
  data() {
    return {
      // currentPodcastId: null,
      labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
      value: [200, 675, 410, 390, 310, 460, 250, 240],
      items: [
        {
          active: true,
          title: "Jason Oner",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        },
        {
          active: true,
          title: "Ranee Carlson",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        },
        {
          title: "Cindy Baker",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        },
        {
          title: "Ali Connors",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        },
      ],
    };
  },
  computed: {
    ...mapState(["isEployeesLoading", "employees","isTasksLoading", "tasks"]),
    newTasks(){
      return this.tasks.filter(task=>!task.isStarted && !task.isFinished);
    },
    currentTasks(){
      return this.tasks.filter(task=>task.isStarted && !task.isFinished);
    },
    completedTasks(){
       return this.tasks.filter(task=>task.isFinished);
    }
  },
  methods: {
    ...mapActions(["loadEmployees","loadTasks","deleteTask","completeTask","showTaskModal"]),
    onTaskDelete(id){
      this.deleteTask(id);
    },
    onTaskEdit(id){
      this.showTaskModal({id});
    },
    onChangeStatus(id,status){
      console.log(id,status);
      this.completeTask({id,status});
    },
    getRandomColor
  },
  mounted() {
    this.loadEmployees();
    this.loadTasks();
  },
  // mounted() {
  //   setTimeout(() => {
  //     this.items = this.$store.getters.getRecentlyListened;
  //   }, 500);
  // }
};
</script>

<style lang="scss">
.podcast-item {
  .theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background: #f5f5f5 !important;
  }
  .theme--light.v-btn.v-btn--disabled .v-icon {
    color: initial !important;
  }
}
</style>