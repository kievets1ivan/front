<template>
  <v-container>
    <v-row dense wrap>
      <v-col cols="12">
        <v-card outlined v-if="tasks.length === 0 || isTasksLoading">
          <div class="mx-3">
            <v-skeleton-loader type="table-row-divider" />
            <v-skeleton-loader type="table-row-divider" />
            <v-skeleton-loader type="table-row-divider" />
            <v-skeleton-loader type="table-row-divider" />
            <v-skeleton-loader type="table-row-divider" />
            <v-skeleton-loader type="table-row-divider" />
            <v-skeleton-loader type="table-tfoot" />
          </div>
        </v-card>
        <div v-else>
          <v-card class="mb-5">
            <v-card-title>
              Неоплаченные задачи
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="unpaidTasks"
              :items-per-page="10"
              show-select
              v-model="selected"
              class="mb-3"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-btn
                    color="primary"
                    dark
                    class="ml-auto"
                    @click="onPay"
                    :disabled="selected ? ((selected.length === 0) || (selected.filter(item=>!item.isFinished).length > 0)) : true"
                  >
                    Оплатить
                  </v-btn>
                </v-toolbar>
              </template>
              <template v-slot:item.taskEmployees="{ item }">
                <!--  <span :style="{'color': getColor(item)}">{{ getStatus(item)}}</span> -->
                <v-avatar
                  color="primary"
                  size="32"
                  v-for="employee in item.taskEmployees"
                  :key="employee.id"
                  class="mr-1"
                >
                  <span class="white--text caption">
                    {{
                      `${getEmployeeById(employee.employeeId).firstName.slice(
                        0,
                        1
                      )}${getEmployeeById(employee.employeeId).lastName.slice(
                        0,
                        1
                      )}`
                    }}
                  </span>
                </v-avatar>

                <!-- <v-chip small :color="getColor(item)" dark></v-chip> -->
              </template>
              <template v-slot:item.end="{ item }">
                <!--  <span :style="{'color': getColor(item)}">{{ getStatus(item)}}</span> -->
                <span>{{
                  item.end === "0001-01-01T00:00:00" ? "-" : item.end.split('T')[0]
                }}</span>
                <!-- <v-chip small :color="getColor(item)" dark></v-chip> -->
              </template>
              <template v-slot:item.isFinished="{ item }">
                <!--  <span :style="{'color': getColor(item)}">{{ getStatus(item)}}</span> -->
                <span>{{ getStatus(item) }}</span>
                <!-- <v-chip small :color="getColor(item)" dark></v-chip> -->
              </template>
              <template v-slot:item.actions="{ item }">
                <div class="actions">
                  <v-tooltip bottom v-if="!item.isFinished">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        color="gray"
                        x-small
                        icon
                        v-on="on"
                        @click="onChangeStatus(item.id, item.isFinished)"
                      >
                        <v-icon>mdi-radiobox-marked</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ !item.isStarted ? "Начать" : "Выполнить" }}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        color="gray"
                        class="ml-2"
                        x-small
                        icon
                        v-on="on"
                        @click="onEdit(item.id)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Редактировать</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="onDelete(item.id)"
                        color="gray"
                        class="ml-2"
                        x-small
                        icon
                        v-on="on"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Удалить</span>
                  </v-tooltip>
                </div>
              </template>
            </v-data-table>
          </v-card>
          <v-card>
            <v-card-title>
              Оплаченные задачи
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="paidTasks"
              :items-per-page="10"
            >
              <template v-slot:item.taskEmployees="{ item }">
                <!--  <span :style="{'color': getColor(item)}">{{ getStatus(item)}}</span> -->
                <v-avatar
                  color="primary"
                  size="32"
                  v-for="employee in item.taskEmployees"
                  :key="employee.id"
                  class="mr-1"
                >
                  <span class="white--text caption">
                    {{
                      `${getEmployeeById(employee.employeeId).firstName.slice(
                        0,
                        1
                      )}${getEmployeeById(employee.employeeId).lastName.slice(
                        0,
                        1
                      )}`
                    }}
                  </span>
                </v-avatar>

                <!-- <v-chip small :color="getColor(item)" dark></v-chip> -->
              </template>
              <template v-slot:item.end="{ item }">
                <!--  <span :style="{'color': getColor(item)}">{{ getStatus(item)}}</span> -->
                <span>{{
                  item.end === "0001-01-01T00:00:00" ? "-" : item.end.split('T')[0]
                }}</span>
                <!-- <v-chip small :color="getColor(item)" dark></v-chip> -->
              </template>
              <template v-slot:item.isFinished="{ item }">
                <!--  <span :style="{'color': getColor(item)}">{{ getStatus(item)}}</span> -->
                <span>{{ getStatus(item) }}</span>
                <!-- <v-chip small :color="getColor(item)" dark></v-chip> -->
              </template>
              <template v-slot:item.actions="{ item }">
                <div class="actions">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="onDelete(item.id)"
                        color="gray"
                        class="ml-2"
                        x-small
                        icon
                        v-on="on"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Удалить</span>
                  </v-tooltip>
                </div>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-btn
      color="pink"
      fab
      dark
      fixed
      bottom
      right
      @click="onCreateNewTaskModal"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Users",
  data() {
    return {
      headers: [
        // { text: "", value: "avatar", sortable: false },
        { text: "Сотрудники", value: "taskEmployees" },
        { text: "Название", value: "title" },
        { text: "Дата окончания", value: "end" },
        {
          text: "Сумма",
          align: "left",
          value: "payment",
        },
        { text: "Статус", value: "isFinished" },

        // { text: "Дата рождения", value: "date_of_birth" },
        { text: "Действия", value: "actions", sortable: false },
      ],
      items: [],
      selected: [],
    };
  },
  computed: {
    ...mapState(["isEployeesLoading", "employees", "isTasksLoading", "tasks"]),
    ...mapGetters(["getEmployeeById"]),
    paidTasks(){
      return this.tasks.length ? this.tasks.filter(task=>task.isPaid) : []
    },
    unpaidTasks(){
      return this.tasks.length ? this.tasks.filter(task=>!task.isPaid) : []
    }
  },
  methods: {
    ...mapActions([
      "loadEmployees",
      "loadTasks",
      "deleteTask",
      "completeTask",
      "showTaskModal",
      "check",
    ]),
    getData() {
      this.$axios
        .get(`${this.$hostname}/api/user/`)
        .then((response) => {
          this.items = response.data;
          console.log(response);
        })
        .catch((error) => {});
    },
    getColor(item) {
      if (item.is_superadmin && item.is_active) return "orange";
      else if (item.is_admin && item.is_active) return "blue";
      else if (item.is_active) return "green";
      else return "gray";
    },
    getStatus(item) {
      return item.isFinished
        ? "Выполнена"
        : item.start === "0001-01-01T00:00:00"
        ? "Новая"
        : "В процессе";
    },
    onDelete(id) {
      this.deleteTask(id);
    },
    onCreateNewTaskModal() {
      this.showTaskModal({ id: false });
    },
    onEdit(id) {
      this.showTaskModal({ id });
    },
    onChangeStatus(id, status) {
      this.completeTask({ id, status });
    },
    onPay() {
      this.check(this.selected ? this.selected.map((item) => item.id) : []);
    },
  },
  mounted() {
    this.loadTasks();
    this.loadEmployees();
  },
};
</script>

<style scoped>
</style>
