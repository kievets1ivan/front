<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Задача</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Название*"
                  required
                  v-model="title"
                  prepend-icon="mdi-text-short"
                  :rules="[rules.required, rules.title]"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Описание"
                  rows="2"
                  v-model="description"
                  prepend-icon="mdi-text"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="[
                    {
                      value: 0,
                      label: 'Easy',
                    },
                    {
                      value: 1,
                      label: 'Medium',
                    },
                    {
                      value: 2,
                      label: 'Strong',
                    },
                  ]"
                  label="Сложность*"
                  v-model="complexity"
                  item-value="value"
                  item-text="label"
                  prepend-icon="mdi-view-list-outline"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Стоимость"
                  v-model="payment"
                  :rules="[rules.isNumber]"
                   type="number"
                  min="0"
                  prepend-icon="mdi-cash-100"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Продолжительность (часов)"
                  prepend-icon="mdi-clock-outline"
                  :rules="[rules.isNumber]"
                  type="number"
                  min="0"
                  v-model="estimatedDuration"
                ></v-text-field>
              </v-col>
              <v-col cols="12" v-if="taskData.id">
                <v-text-field
                  v-model="start"
                  label="Дата начала"
                  prepend-icon="mdi-calendar"
                  readonly
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" v-if="taskData.id">
                <v-text-field
                  v-model="end"
                  label="Дата окончания"
                  prepend-icon="mdi-calendar"
                  readonly
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" v-if="taskData.id">
                <v-select
                  prepend-icon="mdi-account-outline"
                  v-model="taskEmployees"
                  :items="employees"
                  item-value="id"
                  label="Сотрудники"
                  multiple
                >
                  <template slot="selection" slot-scope="data">
                    <!-- HTML that describe how select should render selected items -->
                    {{ data.item.firstName }} {{ data.item.lastName }};
                  </template>
                  <template slot="item" slot-scope="data">
                    {{ data.item.firstName }} {{ data.item.lastName }}
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small>*означает что поле обязательно</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('input', false)">
          Отмена
        </v-btn>
        <v-btn color="blue darken-1" text @click="saveData"> Сохранить </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import {required,isNumber, title} from "../common/rules";
export default {
  name: "TaskModal",
  props: {
    value: [Boolean, Number],
    default: false,
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    rules: {
      required,
      isNumber,
      title
    },
  }),
  computed: {
    ...mapState(["taskData", "employees"]),
    title: {
      get() {
        return this.taskData.title;
      },
      set(value) {
        this.setTaskData({ field: "title", value });
      },
    },
    description: {
      get() {
        return this.taskData.description;
      },
      set(value) {
        this.setTaskData({ field: "description", value });
      },
    },
    estimatedDuration: {
      get() {
        return this.taskData.estimatedDuration;
      },
      set(value) {
        this.setTaskData({ field: "estimatedDuration", value });
      },
    },
    complexity: {
      get() {
        return this.taskData.complexity;
      },
      set(value) {
        this.setTaskData({ field: "complexity", value });
      },
    },
    payment: {
      get() {
        return this.taskData.payment;
      },
      set(value) {
        this.setTaskData({ field: "payment", value });
      },
    },
    start: {
      get() {
        return this.taskData.start === "0001-01-01T00:00:00"
          ? "-"
          : this.taskData.start.split('T')[0];
      },
      set(value) {
        this.setTaskData({ field: "start", value });
      },
    },
    end: {
      get() {
        return this.taskData.end === "0001-01-01T00:00:00"
          ? "-"
          : this.taskData.end.split('T')[0];
      },
      set(value) {
        this.setTaskData({ field: "end", value });
      },
    },
    isFinished: {
      get() {
        return this.taskData.isFinished;
      },
      set(value) {
        this.setTaskData({ field: "isFinished", value });
      },
    },
    taskEmployees: {
      get() {
        return this.taskData.taskEmployees;
      },
      set(value) {
        this.setTaskData({ field: "taskEmployees", value });
      },
    },
  },
  methods: {
    ...mapMutations(["setTaskData"]),
    ...mapActions(["sendTaskData"]),
    saveData() {
      if (!this.$refs.form.validate()) {
        console.log("Incorrect Data");
      } else {
        const data = { ...this.taskData };
        data.taskEmployees = data.taskEmployees
          ? data.taskEmployees.map((taskEmployee) => {
              return { employeeId: taskEmployee };
            })
          : [];
        this.sendTaskData(data);
        this.$emit("input", false);
      }
    },
  },
};
</script>

<style>
</style>