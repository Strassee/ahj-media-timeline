import moment from "moment";
import Modal from "./modal";

export default class Record {
  constructor(text, parent) {
    this.text = text;
    this.parent = parent;
    this.result = document.querySelector(".result");
    this.created = Date.now();
    this.init();
  }

  init() {
    this.getPosition();
  }

  renderRecord() {
    this.divRecord = document.createElement("div");
    this.divRecord.classList.add("record");
    this.divCreated = document.createElement("div");
    this.divCreated.classList.add("record-created");
    this.divCreated.textContent = moment(this.created).format("DD.MM.YY HH:mm");
    this.divRecord.append(this.divCreated);
    this.divContent = document.createElement("div");
    this.divContent.classList.add("record-content");
    this.divContent.textContent = this.text;
    this.divRecord.append(this.divContent);
    if (this.position) {
      const url = encodeURI(
        `https://maps.yandex.ru/?ll=${this.position.longitude},${this.position.latitude}&text=${this.position.latitude}+${this.position.longitude}&z=17`,
      );
      this.divPosition = document.createElement("div");
      this.divPosition.classList.add("record-position");

      this.divPositionContent = document.createElement("div");
      this.divPositionContent.classList.add("record-position-content");
      this.divPositionContent.textContent = `[${this.position.latitude}, ${this.position.longitude}]`;
      this.divPosition.append(this.divPositionContent);

      this.divPositionUrl = document.createElement("div");
      this.divPositionUrl.classList.add("record-position-url");
      this.divPositionUrl.innerHTML = `<a href="${url}" target="_blank"><i class="fa fa-eye" aria-hidden="true"></i></a>`;
      this.divPosition.append(this.divPositionUrl);
      this.divRecord.append(this.divPosition);
    }
    this.parent.insertBefore(this.divRecord, this.parent.firstElementChild);
    this.result.textContent = "Запись добавлена";
  }

  getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data) => {
          this.position = {
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          };
          this.renderRecord();
        },
        () => {
          this.position = false;
          const textModal =
            "Что-то пошло не так <br/><br/> К сожалению, нам не удалось определить Ваше местоположение, пожайлуста, дайте \
          разрешение на использование геолокации, либо введите координаты вручную.";
          const modal = new Modal(this, textModal);
          modal.showModal();
        },
        { enableHighAccuracy: true },
      );
    }
  }
}
