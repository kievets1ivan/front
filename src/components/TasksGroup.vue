<template>
  <v-card outlined :loading="loading" max-height="500px">
    <div class="d-flex flex-column">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="title">
            {{title}}
          </v-card-title>
          <v-card-subtitle>
            {{subtitle}}
          </v-card-subtitle>
        </div>
      </div>
      <v-card-text>
        <v-simple-table fixed-header v-if="data.length">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Название</th>
                <th class="text-left">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in data" :key="item.name">
                <td>{{ `${i+1}. ${item.title}` }}</td>
                <td>
                  <template>
                    <div class="actions">
                      <v-tooltip bottom v-if="!item.isFinished">
                        <template v-slot:activator="{ on }">
                          <v-btn color="gray" x-small icon v-on="on" @click="onChangeStatus(item.id,item.isFinished)">
                            <v-icon>mdi-radiobox-marked</v-icon>
                          </v-btn>
                        </template>
                        <span>{{!item.isStarted ? 'Начать' : 'Выполнить'}}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn color="gray" class="ml-2" x-small icon v-on="on" @click="onEdit(item.id)">
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </template>
                        <span>Редактировать</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn @click="onDelete(item.id)" color="gray" class="ml-2" x-small icon v-on="on">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </template>
                        <span>Удалить</span>
                      </v-tooltip>
                    </div>
                  </template>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
       <div class="text-center mt-3" v-else>
          <span class="body-2">Нет данных</span>
       </div>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "TasksGroup",
  props:{
    title:{
      type: String,
      default: ""
    },
    subtitle:{
      type: String,
      default: ""
    },
    loading:{
      type: Boolean,
      default: true
    },
    data:{
      type: Array,
      default: []
    }
  },
  data() {
    return {
      desserts: [
      ]
    };
  },
  methods:{
    onDelete(id) {
      this.$emit('onDelete',id)
    },
    onEdit(id) {
      this.$emit('onEdit',id)
    },
    onChangeStatus(id,status) {
      this.$emit('onChangeStatus',id,status)
    }
  }
};
</script>

<style>
</style>