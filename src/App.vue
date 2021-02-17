<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <task-modal 
    v-model="isTaskModalShown"
    />
    <user-modal 
    v-model="isEmployeeModalShown"
    />
    <!-- <v-snackbar v-model="snackbar" top :timeout="timeout">{{ text }}</v-snackbar> -->
    <v-app-bar extended extension-height="1" clipped-left app v-if="visible" flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <template #extension>
        <v-divider></v-divider>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed clipped app v-if="visible">
      <v-list dense shaped>
        <v-list-item v-for="item in items" :key="item.title" link color="primary" :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn text block class="text-none" @click="logout">Выход</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-content app>
      <router-view />
    </v-content>
  </v-app>
</template>
<style lang="scss">
* i {
  font-family: "Material Icons";
}
.v-toolbar__extension {
  padding: 0 !important;
}
.v-data-table tr .actions {
  visibility: hidden;
}
.v-data-table tr:hover .actions {
  visibility: visible;
}
</style>
<script lang='ts'>
import {mapState, mapActions} from 'vuex';
import Logger from "./components/Logger.vue";
import TaskModal from '@/components/TaskModal.vue';
import UserModal from '@/components/UserModal.vue';
export default {
  name: "App",
  components: {
    Logger,
    TaskModal,
    UserModal
  },
  data() {
    return {
      drawer: true,
      snackbar: true,
      timeout: 1500,
      items: [
        { title: "Дешборд", icon: "mdi-bulletin-board", route: "/home" },
        { title: "Задания", icon: "mdi-file-outline", route: "/tasks" },
        {
          title: "Сотрудники",
          icon: "mdi-account-multiple-outline",
          route: "/users"
        },
      ]
    };
  },
  methods: {
    logout() {
      this.$session.destroy();
      this.$axios.defaults.headers.common["Authorization"] = "";
      this.$router.push("/");
    },
    ...mapActions(['hideTaskModal','hideEmployeeModal'])
  },
  computed: {
    visible() {
      return this.$route.name !== "login" && this.$route.name !== "register";
      //TODO test
      // return !this.$session.get("jwt") || !this.$route.name === "login";
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    isTaskModalShown:{
       get(){
          return this.taskData && Object.keys(this.taskData).length
        },
        set(value){
          if(!value){
            this.hideTaskModal()
          }
        }
    },
    isEmployeeModalShown:{
       get(){
          return this.employeeData && Object.keys(this.employeeData).length
        },
        set(value){
          if(!value){
            this.hideEmployeeModal()
          }
        }
    },
    ...mapState(['taskData','employeeData'])
  },
  mounted() {
    if (this.$session.get("jwt")) {
      this.$axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$session.get("jwt");
    }
    this.$axios.interceptors.response.use(
      response => {
        // intercept the global error
        return response;
      },
      error => {
        if (error.response.status == 401) {
          this.logout();
          // if the error is 401 and hasent already been retried
        }
        return Promise.reject(error);
      }
    );
    // this.$axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    // this.$axios.defaults.credentials = "same-origin";
  },
  // beforeDestroy: function() {
  //   window.removeEventListener("keydown", this.keyboardEventHandler);
  // }
};
</script>

<style lang="scss">
.opacity-0 {
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.opacity-1 {
  opacity: 1;
}
.w-100 {
  width: 100%;
}
.app-page {
  padding-bottom: 60px;
}
.v-application .app-link {
  color: inherit;
  text-decoration: none;
  display: inline-block;
  // line-height: 0;
  &:hover {
    span {
      text-decoration: underline;
    }
  }
}
.v-card{
  position: relative;
  overflow: auto;
}
</style>