<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Сотрудник</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Имя*"
                  required
                  v-model="firstName"
                  prepend-icon="mdi-text-short"
                  type="text"
                  :rules="[rules.required, rules.title]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Фамилия*"
                  required
                  v-model="lastName"
                  type="text"
                  prepend-icon="mdi-text-short"
                  :rules="[rules.required, rules.title]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Возраст*"
                  required
                  v-model="age"
                  type="number"
                  min="1"
                  max="130"
                  prepend-icon="mdi-text-short"
                  :rules="[rules.required, rules.isNumber, rules.isAgeInRange]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Зарплата*"
                  required
                  v-model="salary"
                  type="number"
                  min="0"
                  prepend-icon="mdi-text-short"
                  :rules="[rules.isNumber]"
                />
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
import { required, title, isNumber, isAgeInRange } from "../common/rules";
export default {
  name: "UserModal",
  props: {
    value: [Boolean, Number],
    default: false,
  },
  data() {
    return {
      rules: {
        required,
        title,
        isNumber,
        isAgeInRange,
      },
    };
  },
  computed: {
    ...mapState(["employeeData", "employees"]),
    firstName: {
      get() {
        return this.employeeData.firstName;
      },
      set(value) {
        this.setEmployeeData({ field: "firstName", value });
      },
    },
    lastName: {
      get() {
        return this.employeeData.lastName;
      },
      set(value) {
        this.setEmployeeData({ field: "lastName", value });
      },
    },
    age: {
      get() {
        return this.employeeData.age;
      },
      set(value) {
        this.setEmployeeData({ field: "age", value: parseInt(value) });
      },
    },
    salary: {
      get() {
        return this.employeeData.salary;
      },
      set(value) {
        this.setEmployeeData({ field: "salary",value: parseInt(value) });
      },
    },
  },
  methods: {
    ...mapMutations(["setEmployeeData"]),
    ...mapActions(["sendEmployeeData"]),
    saveData() {
      // const data = { ...this.employeeData };
      // console.log(this.employeeData);
      if (!this.$refs.form.validate()) {
        console.log("Incorrect Data");
      } else {
        this.sendEmployeeData(this.employeeData);
        this.$emit("input", false);
      }
    },
  },
};
</script>

<style>
</style>