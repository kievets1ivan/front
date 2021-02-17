<template>
  <v-container fill-height>
    <v-row dense wrap justify="center" align="center">
      <v-col cols="12" md="5">
        <v-card outlined max-width="480">
          <!-- <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Зарегестрироваться</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>-->
          <v-card-title class="title font-weight-regular justify-space-between">
            <span>Зарегестрироваться</span>
            <!-- <v-avatar
              color="primary lighten-2"
              class="subheading white--text"
              size="24"
              v-text="step"
            ></v-avatar>-->
          </v-card-title>
          <v-window v-model="step">
            <v-window-item :value="1" :eager="false">
              <v-form ref="stepForm_1" v-model="isValidForm_1">
                <v-card-text>
                  <v-text-field
                    label="Email"
                    name="Email"
                    prepend-icon="mdi-email-outline"
                    ref="emailField"
                    :rules="[rules.required,rules.email]"
                    v-model="email"
                  ></v-text-field>
                  <!-- messages="Введите Email" -->
                </v-card-text>
              </v-form>
            </v-window-item>
            <v-window-item :value="2" :eager="false">
              <v-form ref="stepForm_2" v-model="isValidForm_2">
                <v-card-text>
                  <v-text-field
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon="mdi-lock-outline"
                    type="password"
                    v-model="password"
                    :rules="[rules.required,rules.counter]"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Повторите пароль"
                    name="password"
                    prepend-icon="mdi-lock-outline"
                    type="password"
                    v-model="repeatedPassword"
                    :rules="[rules.required,rules.counter,rules.repeatPassword]"
                  ></v-text-field>
                </v-card-text>
              </v-form>
            </v-window-item>
          </v-window>
          <v-card-actions>
            <!-- <router-link class="text-xs-left" to="/login" v-if="step===1">Войти</router-link> -->
            <v-btn text color="primary" to="/login" v-if="step===1" class="text-none">Войти</v-btn>
            <v-btn text type="button" @click="prevStep" v-else class="text-none">Назад</v-btn>

            <v-spacer></v-spacer>

            <v-btn
              depressed
              color="primary"
              type="button"
              @click="nextStep"
              :loading="verifyRegisterLoading"
              :disabled="(!isValidForm_1 && step === 1) || (!isValidForm_2 && step === 2)"
               class="text-capitalize"
            >Далее</v-btn>
          </v-card-actions>

          <!-- <v-card-text class="d-flex justify-content-between mt-2"> -->
          <!-- <router-link class="text-xs-right" to="/forgot">Forgot Password?</router-link> -->
          <!-- </v-card-text> -->
        </v-card>
      </v-col>
      <!-- <v-col md="2">
        <v-img src='@/assets/man.svg'></v-img>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
 //TODO Validation for both passwords
export default {
  name: "Register",
  data() {
    return {
      snackbar: false,
      text: "Oops... Something went wrong",
      timeout: 5000,
      title: "Preliminary report",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      repeatedPassword: "",
      submitted: false,
      rules: {
        required: value => !!value || "Обязательно.",
        username: value =>
          (value.length >= 4 && value.length <= 150) || "От 4 - 150 символов",
        counter: value => value.length >= 8 || "Мин. 8 символов",
        repeatPassword: value =>
          value === this.password || "Пароли не совпадают",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Некорректный e-mail.";
        }
      },
      verifyRegisterLoading: false,
      step: 1,
      isValidForm_1: false,
      isValidForm_2: false
    };
  },
  methods: {
    submitForm() {
      if (!this.$refs["stepForm_1"].validate()||!this.$refs["stepForm_2"].validate()) {
        this.text = "Fill the form correctly";
        this.snackbar = true;
      } else {
        console.log("success");
        // this.step++;
        // const data = {
        //   crossdomain: true,
        //   first_name: this.first_name,
        //   last_name: this.last_name,
        //   email: this.email,
        //   password: this.password
        // };
        // this.$axios
        //   .post(`${this.$hostname}/api/user/`, data)
        //   .then(response => {
        //     if (response.status === 201) {
        //       this.submitted = true;
        //     }
        //   })
        //   .catch(error => {
        //     this.text = "Connection error";
        //     this.snackbar = true;
        //   });
      }
    },
    prevStep() {
      this.step--;
      // this.$refs.form.reset();
      // this.$refs.form.validate();
    },
    nextStep() {
      if (!this.$refs["stepForm_" + 1].validate()) {
        this.text = "Fill the form correctly";
        this.snackbar = true;
      } else if(this.step <2){
        this.step++;
      }else{
        this.submitForm();
      }
      // this.step++;
    }
  }
};
</script>

<style scoped>
</style>
