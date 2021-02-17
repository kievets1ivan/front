<template>
  <v-container>
    <v-row dense wrap>
      <v-col cols="12">
        <h3 class="title">Все сотрудники</h3>
      </v-col>
    </v-row>
    <v-row dense wrap>
      <v-col cols="12">
        <v-card outlined>
          <div v-if="employees.length === 0 || isEployeesLoading" class="mx-3">
            <v-skeleton-loader type="table-row-divider" />
            <v-skeleton-loader type="table-row-divider" />
            <v-skeleton-loader type="table-row-divider" />
            <v-skeleton-loader type="table-row-divider" />
            <v-skeleton-loader type="table-row-divider" />
            <v-skeleton-loader type="table-row-divider" />
            <v-skeleton-loader type="table-tfoot" />
          </div>

          <v-data-table :headers="headers" v-else :items="employees" :items-per-page="10">
            <!-- <template v-slot:item.avatar="{ item }">
                <v-btn
                  fab
                  outlined
                  x-small
                  elevation="0"
                  :color="'#'+(Math.random()*0xFFFFFF<<0).toString(16)"
                >
            <span class="subtitle-1">{{`${item.last_name.charAt(0).toUpperCase()}`}}</span>-->
            <!--<v-icon light>person</v-icon>-->
            <!-- </v-btn> -->
            <!-- </template> -->
            <template v-slot:item.status="{ item }">
              <!--  <span :style="{'color': getColor(item)}">{{ getStatus(item)}}</span> -->
              <span>{{ getStatus(item)}}</span>
              <!-- <v-chip small :color="getColor(item)" dark></v-chip> -->
            </template>
            <template v-slot:item.actions="{ item }">
              <div class="actions">
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
                <!-- <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn color="gray" class="ml-2" x-small icon v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <span>Тест 2</span>
                </v-tooltip> -->
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
     <v-btn color="pink" fab dark fixed bottom right @click="onCreateNewEmployeeModal">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import {mapState, mapActions} from "vuex";
export default {
  name: "Users",
  data() {
    return {
      headers: [
        // { text: "", value: "avatar", sortable: false },
        { text: "Имя", value: "firstName" },
        { text: "Фамилия", value: "lastName" },
        { text: "Возраст", value: "age" },
        {
          text: "Зарплата",
          align: "left",
          value: "salary"
        },
        { text: "Задачи", value: "taskEmployees.length", sortable: false },

        // { text: "Дата рождения", value: "date_of_birth" },
        { text: "Действия", value: "actions", sortable: false }
      ],
      items: []
    };
  },
  computed: {
    ...mapState(['employees', 'isEployeesLoading'])
  },
  methods: {
    ...mapActions(['loadEmployees','showEmployeeModal']),
    // getData() {
    //   getAllEployees()
    //     .then(response => {
    //       this.items = response.data;
    //       console.log(response);
    //     })
    //     .catch(error => {});
    // },

    getColor(item) {
      if (item.is_superadmin && item.is_active) return "orange";
      else if (item.is_admin && item.is_active) return "blue";
      else if (item.is_active) return "green";
      else return "gray";
    },
    getStatus(item) {
      if (item.is_superadmin && item.is_active) return "Суперадмин";
      else if (item.is_admin && item.is_active) return "Админ";
      else if (item.is_active) return "Пользователь";
      else return "Не активирован";
    },
     onCreateNewEmployeeModal(){
      this.showEmployeeModal({id: false});
    },
    onEdit(id) {
      this.showEmployeeModal({ id });
    },
  },
  mounted() {
    this.loadEmployees();
  }
};
</script>

<style scoped>
</style>
