import { getCoords } from "./getcoords";

export default class Modal {
  constructor(record, title) {
    this.record = record;
    this.title = title;
    this.parent = document.querySelector(".timeline");
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onModalMessage = this.onModalMessage.bind(this);
    this.init();
  }

  static get modalCoords() {
    return `
      <div class="modal-content">
        <div class="modal-title"></div>
        <form class="modal-form" novalidate>
          <label for="coordinates">Широта и долгота через запятую</label>
          <input type="text" name="coordinates" id="coordinates" class="modal-coordinates" maxlength="30" placeholder="Введите координаты...">
          <div class="modal-buttons">
            <input type="button" class="modal-btn-cancel" value="Отмена">
            <input type="submit" class="modal-btn-ok" value="OK">
          </div>
          <div class="modal-message"></div>
        </form>
      </div>
    `;
  }

  init() {
    this.modal = document.createElement("div");
    this.modal.classList.add("modal");
    this.modal.innerHTML = Modal.modalCoords;
    this.modalform = this.modal.querySelector(".modal-form");
    this.modaltitle = this.modal.querySelector(".modal-title");
    this.modaltitle.innerHTML = this.title;
    this.modalcoordinates = this.modal.querySelector(".modal-coordinates");
    this.modalbtncancel = this.modal.querySelector(".modal-btn-cancel");
    this.modalmessage = this.modal.querySelector(".modal-message");
    this.modalform.addEventListener("submit", this.onSubmit);
    this.modalbtncancel.addEventListener("click", this.onCancel);
    this.modalcoordinates.addEventListener("focus", this.onModalMessage);
    this.parent.append(this.modal);
  }

  onModalMessage() {
    this.modalmessage.textContent = "";
  }

  onCancel() {
    this.modal.remove();
    this.record.renderRecord();
  }

  onSubmit(e) {
    this.modalcoordinates.setCustomValidity("");
    e.preventDefault();
    this.modalmessage.textContent = "";
    try {
      this.record.position = getCoords(this.modalcoordinates.value);
      this.onCancel();
    } catch (e) {
      this.modalcoordinates.setCustomValidity(
        "Invalid coordinate input format",
      );
      // this.modalform.reportValidity();
      this.modalmessage.textContent = e.message;
    }
  }

  showModal() {
    this.modal.style.display = "block";
  }
}
