import Records from "./components/records";

const records = new Records();
records.input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    records.addRecord();
  }
});
