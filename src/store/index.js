import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getAllEployees, getEmployee, createEmployee, updateEmployee, getAllTasks, getTask, createTask, updateTask, deleteTask, completeTask, check } from '../api'

export default new Vuex.Store({
    state: {
        isEployeesLoading: false,
        employees: [],
        isTasksLoading: false,
        isTaskEditLoading: false,
        tasks: [],
        taskData: {},
        employeeData: {},
        checks: []
    },
    mutations: {
        set(state, { type, data }) {
            state[type] = data;
        },
        setDefaultTaskData(state) {
            state.taskData = {
                "title": "",
                "description": "",
                "estimatedDuration": 0,
                "complexity": 1,
                "payment": 0,
            }
        },
        setDefaultEmployeeData(state) {
            state.employeeData = {
                "firstName": "",
                "lastName": "",
                "age": 18,
                "salary": 0,
            }
        },
        resetTaskData(state) {
            state.taskData = {}
        },
        resetEmployeeData(state) {
            state.employeeData = {}
        },
        setTaskData(state, { field, value }) {
            state.taskData[field] = value;
        },
        setEmployeeData(state, { field, value }) {
            state.employeeData[field] = value;
        }
    },
    actions: {
        async loadEmployees({ commit, dispatch }) {
            commit('set', { type: 'isEployeesLoading', data: true });
            const { data } = await getAllEployees();
            commit('set', { type: 'employees', data });
            commit('set', { type: 'isEployeesLoading', data: false });
        },
        async loadTasks({ commit, dispatch }) {
            commit('set', { type: 'isTasksLoading', data: true });
            const { data } = await getAllTasks();
            commit('set', { type: 'tasks', data });
            commit('set', { type: 'isTasksLoading', data: false });
        },
        async getTask({ commit, dispatch }, { id }) {
            commit('set', { type: 'isTasksLoading', data: true });
            const { data } = await getTask(id);
            data.taskEmployees = data.taskEmployees.length ? data.taskEmployees.map(taskEmployee => taskEmployee.employeeId) : [];
            commit('set', { type: 'isTasksLoading', data: false });
            return data;
        },
        async getEmployee({ commit, dispatch }, { id }) {
            commit('set', { type: 'isEployeesLoading', data: true });
            const { data } = await getEmployee(id);
            commit('set', { type: 'isEployeesLoading', data: false });
            return data;
        },
        async deleteTask({ commit, dispatch }, id) {
            commit('set', { type: 'isTaskEditLoading', data: true });
            const { data } = await deleteTask(id);
            commit('set', { type: 'isTaskEditLoading', data: false });
            dispatch({ type: 'loadTasks' })
        },
        async completeTask({ commit, dispatch }, { id, status }) {
            commit('set', { type: 'isTaskEditLoading', data: true });
            const { data } = await completeTask(id, status);
            commit('set', { type: 'isTaskEditLoading', data: false });
            dispatch({ type: 'loadTasks' })
        },
        async showTaskModal({ commit, dispatch }, { id }) {
            if (id === false) {
                commit('setDefaultTaskData')
            } else {
                const data = await dispatch('getTask', { id });
                commit('set', { type: 'taskData', data })
            }
        },
        async showEmployeeModal({ commit, dispatch }, { id }) {
            if (id === false) {
                commit('setDefaultEmployeeData')
            } else {
                const data = await dispatch('getEmployee', { id });
                commit('set', { type: 'employeeData', data })
            }
        },
        hideTaskModal({ commit, dispatch }) {
            commit('resetTaskData');
        },
        hideEmployeeModal({ commit, dispatch }) {
            commit('resetEmployeeData');
        },
        async sendTaskData({ commit, dispatch }, data) {
            if (data && data.id) {
                await updateTask(data);
                dispatch('loadTasks')
            } else {
                await createTask(data)
                dispatch('loadTasks')
            }
        },
        async sendEmployeeData({ commit, dispatch }, data) {
            if (data && data.id) {
                await updateEmployee(data);
                dispatch('loadEmployees')
            } else {
                await createEmployee(data)
                dispatch('loadEmployees')
            }
        },
        async check({ commit, dispatch }, data) {
            const response = await check(data);
            const checks = response.data.payments;
            commit('set', { type: 'checks', data: checks })
            dispatch('loadTasks');
            // headers = headers.join(',');
            let headers = ['Фио', 'id Платежа', 'Сумма', 'taskId', '\n'];
            let preparedData = [headers];
            checks.map(check => {
                preparedData.push(Object.values(check), '\n')
            })
            const file = new File(preparedData, 'csvFile', {
                type: "text/csv"
            })
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = 'csvFile';
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    },
    getters: {
        getEmployeeById(state) {
            return (id) => {
                return state.employees.find(employee => employee.id === id)
            }
        }
    },
    modules: {

    }
})