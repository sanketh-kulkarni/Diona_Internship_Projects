let currentData = JSON.parse(JSON.stringify(SAMPLE_DATASETS.original));

function loadDataset(key) {
  currentData = JSON.parse(JSON.stringify(SAMPLE_DATASETS[key]));
  renderWorkerProgressReport(currentData);
  populateEditor();
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
                editorBtn.textContent = "Edit fields";
            }
        });

function populateEditor() {
  const d = currentData;
  document.getElementById("f-claimNo").value = d.claimNo;
  document.getElementById("f-workerName").value = d.workerName;
  document.getElementById("f-workerAppId").value = d.workerAppId;
  document.getElementById("f-submittedAt").value = d.submittedAt;

  document.getElementById("f-rtwStatus").value = d.returnToWork.status;
  document.getElementById("f-rtwDate").value = d.returnToWork.returnedOnDate;

  document.getElementById("f-workingType").value = d.workingType.status;
  document.getElementById("f-workingOther").value = d.workingType.otherText;

  document.getElementById("f-returnGoing").value = d.returnGoing;
  document.getElementById("f-concerns").value = d.concerns;

  document.getElementById("f-recoveryStatus").value = d.recovery.status;
  document.getElementById("f-recoveryComments").value = d.recovery.comments;

  document.getElementById("f-painScale").value = d.painScale;

  document.getElementById("f-medStatus").value = d.medication.status;
  document.getElementById("f-medName").value = d.medication.name;

  document.getElementById("f-heStatus").value = d.homeExercises.status;
  document.getElementById("f-heList").value = d.homeExercises.list;

  document.getElementById("f-otherInfo").value = d.otherInfo;
}

function applyEditorChanges() {
  const d = currentData;
  d.claimNo = document.getElementById("f-claimNo").value;
  d.workerName = document.getElementById("f-workerName").value;
  d.workerAppId = document.getElementById("f-workerAppId").value;
  d.submittedAt = document.getElementById("f-submittedAt").value;

  d.returnToWork.status = document.getElementById("f-rtwStatus").value;
  d.returnToWork.returnedOnDate = document.getElementById("f-rtwDate").value;

  d.workingType.status = document.getElementById("f-workingType").value;
  d.workingType.otherText = document.getElementById("f-workingOther").value;

  d.returnGoing = document.getElementById("f-returnGoing").value;
  d.concerns = document.getElementById("f-concerns").value;

  d.recovery.status = document.getElementById("f-recoveryStatus").value;
  d.recovery.comments = document.getElementById("f-recoveryComments").value;

  d.painScale = parseInt(document.getElementById("f-painScale").value, 10);

  d.medication.status = document.getElementById("f-medStatus").value;
  d.medication.name = document.getElementById("f-medName").value;

  d.homeExercises.status = document.getElementById("f-heStatus").value;
  d.homeExercises.list = document.getElementById("f-heList").value;

  d.otherInfo = document.getElementById("f-otherInfo").value;

  renderWorkerProgressReport(d);
}

function toggleEditor() {
  document.getElementById("editor-panel").classList.toggle("open");
}

window.addEventListener("DOMContentLoaded", () => {
  renderWorkerProgressReport(currentData);
  populateEditor();

  document.getElementById("dataset-select").addEventListener("change", (e) => {
    loadDataset(e.target.value);
  });

  document.getElementById("toggle-editor-btn").addEventListener("click", toggleEditor);
  document.getElementById("apply-btn").addEventListener("click", applyEditorChanges);
  document.getElementById("print-btn").addEventListener("click", () => window.print());

  // Re-run the text auto-fit right before printing, since print layout
  // can differ slightly from the on-screen layout.
  window.addEventListener("beforeprint", () => autoFitTallTextBoxes());
});
