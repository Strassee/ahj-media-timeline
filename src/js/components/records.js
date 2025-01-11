import Record from "./record";

export default class Records {
  constructor() {
    this.recordsArray = [];
    this.input = document.querySelector(".input");
    this.result = document.querySelector(".result");
    this.parent = document.querySelector(".records");
  }

  addRecord() {
    this.result.textContent = "";
    if (this.input.value !== "") {
      this.result.textContent = "";
      const record = new Record(this.input.value.trim(), this.parent);
      this.recordsArray.push(record);
      this.input.value = "";
    } else {
      this.result.textContent = "Ошибка ввода записи";
    }
  }
}
