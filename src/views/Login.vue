<template>
  <v-container fill-height>
    <v-row dense wrap justify="center" align="center">
      <v-col cols="12" md="5">
        <v-card outlined max-width="480">
          <v-card-title class="title font-weight-regular justify-space-between">
            <span>Войти</span>
          </v-card-title>
          <v-form ref="form" @submit.prevent="submitLoginForm">
            <v-card-text>
              <v-text-field
                label="Email"
                name="Email"
                prepend-icon="mdi-email-outline"
                ref="emailField"
                :rules="[rules.required, rules.email]"
                v-model="email"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Пароль"
                name="password"
                prepend-icon="mdi-lock-outline"
                type="password"
                v-model="password"
                :rules="[rules.required, rules.password]"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                depressed
                color="primary"
                type="submit"
                :loading="verifyRegisterLoading"
                class="text-none"
                >Войти</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {login} from "../api";
import {required,password,email} from "../common/rules";
export default {
  name: "Login",
  data() {
    return {
      snackbar: false,
      text: "Oops... Something went wrong",
      timeout: 5000,
      title: "Preliminary report",
      email: "",
      password: "",
      verifyRegisterLoading: false,
      rules: {
        required,
        password,
        email,
      },
    };
  },
  methods: {
    submitLoginForm() {
      if (!this.$refs.form.validate()) {
        this.text = "Fill the form correctly";
        this.snackbar = true;
      } else {
        const data = {
          crossdomain: true,
          password: this.password,
          email: this.email
        };
       login(data)
          .then(response => {
            // console.log(response);
            if (response.status === 200 && response.data) {
              this.$session.start();
              this.$session.set("jwt", response.data);
              this.$axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$session.get("jwt");
              this.$router.push("/home");
            }
          })
          .catch(error => {
            this.text = "Connection error";
            this.snackbar = true;
            console.log(error);
          });
      }
    }
  },
  beforeCreate() {
    this.$session.destroy();
    this.$axios.defaults.headers.common["Authorization"] = "";
  },
};
</script>

<style>
</style>