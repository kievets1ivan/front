export const required = (value) => !!value || "Обязательно.";

export const title = (value) =>
    (value.length >= 4 && value.length <= 20) ||
    "Кол-во символом в диапазоне от 4 и до 20";

export const password = (value) => value.length >= 8 || "Мин 8 символов";

export const email = (value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Некорректный e-mail.";
};

export const isNumber = value => {
    const pattern = /^\d+$/;
    return pattern.test(value) || "Введите корректное число"
};

export const isAgeInRange = value => value >= 18 && value <= 80 || 'Возраст должен быть от 18 и до 80';