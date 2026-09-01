/**
 * Wires up the live editor panel for the Medical & Travel Expense form.
 * Each table section supports adding/removing rows and editing cell
 * values, then re-rendering (which re-paginates automatically).
 */

let currentData = JSON.parse(JSON.stringify(SAMPLE_DATASETS.original));

const SECTION_DEFS = [
  {
    key: "prescriptionDrugs",
    label: "Prescription Drugs",
    fields: [
      { key: "drugName", placeholder: "Drug name" },
      { key: "prescriptionDate", placeholder: "Prescription date" },
      { key: "datePurchased", placeholder: "Date purchased" },
      { key: "providerName", placeholder: "Provider name" },
      { key: "paidAmount", placeholder: "Paid amount" },
    ],
  },
  {
    key: "otcDrugs",
    label: "Over-the-Counter Drugs",
    fields: [
      { key: "drugName", placeholder: "Drug name" },
      { key: "datePurchased", placeholder: "Date purchased" },
      { key: "paidAmount", placeholder: "Paid amount" },
      { key: "sellerName", placeholder: "Seller's name" },
      { key: "reason", placeholder: "Reason for purchasing" },
    ],
  },
  {
    key: "supplies",
    label: "Bandages, Braces or Other Medical Supplies",
    fields: [
      { key: "item", placeholder: "Item purchased" },
      { key: "datePurchased", placeholder: "Date purchased" },
      { key: "prescribed", placeholder: "Prescribed? Yes/No" },
      { key: "providerName", placeholder: "Provider name" },
      { key: "paidAmount", placeholder: "Paid amount" },
      { key: "sellerName", placeholder: "Seller's name" },
    ],
  },
  {
    key: "parking",
    label: "Parking for Medical Appointments",
    fields: [
      { key: "address", placeholder: "Facility address" },
      { key: "date", placeholder: "Date" },
      { key: "paidAmount", placeholder: "Paid amount" },
      { key: "meterUsed", placeholder: "Meter used? yes/no" },
      { key: "meterNumber", placeholder: "Meter number" },
    ],
  },
  {
    key: "mileage",
    label: "Mileage to Medical Appointments",
    fields: [
      { key: "appointmentDate", placeholder: "Appointment date" },
      { key: "providerAddress", placeholder: "Facility address" },
      { key: "workplaceAddress", placeholder: "Workplace address" },
      { key: "km", placeholder: "Number of km" },
    ],
  },
  {
    key: "busTaxi",
    label: "Bus or Taxi Fare",
    fields: [
      { key: "appointmentDate", placeholder: "Appointment date" },
      { key: "startAddress", placeholder: "Starting address" },
      { key: "providerAddress", placeholder: "Facility address" },
      { key: "type", placeholder: "Bus or Taxi" },
      { key: "fare", placeholder: "Total fare paid" },
    ],
  },
];

function loadDataset(key) {
  currentData = JSON.parse(JSON.stringify(SAMPLE_DATASETS[key]));
  renderMedicalTravelExpense(currentData);
  buildEditor();
}

const editorBtn = document.getElementById("toggle-editor-btn");

        let editorMode = false;

        editorBtn.addEventListener("click", function () {
            editorMode = !editorMode;

            if (editorMode) {
                alert("You are in editor mode, please make your changes and click 'Apply Changes' when done.");
                editorBtn.textContent = "Exit Editor Mode";
            } else {
                alert("You are exiting the editor mode");
                editorBtn.textContent = "Edit rows";
            }
        });

function buildEditor() {
  const container = document.getElementById("editor-sections");
  container.innerHTML = "";

  document.getElementById("f-claimNo").value = currentData.claimNo;
  document.getElementById("f-workerName").value = currentData.workerName;
  document.getElementById("f-workerAppId").value = currentData.workerAppId;
  document.getElementById("f-submittedAt").value = currentData.submittedAt;

  SECTION_DEFS.forEach((section) => {
    const wrapper = document.createElement("div");
    wrapper.className = "editor-section";
    wrapper.innerHTML = `<h3>${section.label} (${currentData[section.key].length} row(s))</h3>`;

    const rowsHolder = document.createElement("div");
    rowsHolder.id = `rows-${section.key}`;
    renderRowInputs(section, rowsHolder);
    wrapper.appendChild(rowsHolder);

    const addBtn = document.createElement("button");
    addBtn.className = "add-row";
    addBtn.textContent = "+ Add row";
    addBtn.addEventListener("click", () => {
      const blank = {};
      section.fields.forEach((f) => (blank[f.key] = ""));
      currentData[section.key].push(blank);
      renderRowInputs(section, rowsHolder);
      wrapper.querySelector("h3").textContent = `${section.label} (${currentData[section.key].length} row(s))`;
    });
    wrapper.appendChild(addBtn);

    container.appendChild(wrapper);
  });
}

function renderRowInputs(section, holder) {
  holder.innerHTML = "";
  currentData[section.key].forEach((row, rowIdx) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "editor-row";

    section.fields.forEach((f) => {
      const input = document.createElement("input");
      input.placeholder = f.placeholder;
      input.value = row[f.key] || "";
      input.addEventListener("input", (e) => {
        currentData[section.key][rowIdx][f.key] = e.target.value;
      });
      rowDiv.appendChild(input);
    });

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-row";
    removeBtn.textContent = "✕";
    removeBtn.title = "Remove this row";
    removeBtn.addEventListener("click", () => {
      currentData[section.key].splice(rowIdx, 1);
      renderRowInputs(section, holder);
      const h3 = holder.parentElement.querySelector("h3");
      h3.textContent = `${section.label} (${currentData[section.key].length} row(s))`;
    });
    rowDiv.appendChild(removeBtn);

    holder.appendChild(rowDiv);
  });
}

function applyEditorChanges() {
  currentData.claimNo = document.getElementById("f-claimNo").value;
  currentData.workerName = document.getElementById("f-workerName").value;
  currentData.workerAppId = document.getElementById("f-workerAppId").value;
  currentData.submittedAt = document.getElementById("f-submittedAt").value;

  renderMedicalTravelExpense(currentData);
}

function toggleEditor() {
  document.getElementById("editor-panel").classList.toggle("open");
}

window.addEventListener("DOMContentLoaded", () => {
  renderMedicalTravelExpense(currentData);
  buildEditor();

  document.getElementById("dataset-select").addEventListener("change", (e) => {
    loadDataset(e.target.value);
  });

  document.getElementById("toggle-editor-btn").addEventListener("click", toggleEditor);
  document.getElementById("apply-btn").addEventListener("click", applyEditorChanges);
  document.getElementById("print-btn").addEventListener("click", () => window.print());
});
