/**
 * Renders the Worker Progress Report from a data object into the
 * #form-root element, split across 3 pages matching the source PDF layout.
 */

function esc(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function checkbox(checked, labelHtml) {
  return `
    <div class="checkbox-item">
      <span class="box ${checked ? "checked" : ""}"></span>
      <span>${labelHtml}</span>
    </div>
  `;
}

function filledLine(value, placeholderWidth = "150px") {
  const has = value && value.trim().length > 0;
  return `<span class="line ${has ? "" : "empty"}" style="${has ? "" : `min-width:${placeholderWidth}`}">${
    has ? esc(value) : ""
  }</span>`;
}

function header(data) {
  return `
    <div class="doc-header">
      <div class="logo-block">
        <img src="../assets/logo.png" alt="Workers Compensation Board of Manitoba logo" />
      </div>
      <div class="org-address">
          333 Broadway<br/>
          Winnipeg, MB R3C 4W3<br/>
          Phone: (204) 954-4321<br/>
          Toll Free: 1-855-954-4321<br/>
          <a href="#">wcb.mb.ca</a>
        </div>
      <div class="title-block">
        <div class="form-title">Worker Progress Report</div>
        <div class="claim-box-row">
          <div class="claim-box">Claim No. ${esc(data.claimNo)}</div>
          <div class="claim-box">${esc(data.formCode)}</div>
        </div>
      </div>
    </div>
  `;
}

function footer(data, pageNum, totalPages) {
  return `
    <div class="doc-footer">
      <div>Worker App ID: ${esc(data.workerAppId)}</div>
      <div class="page-num">
        Submitted: ${esc(data.submittedAt)}<br/>
        Page ${pageNum} of ${totalPages}
      </div>
    </div>
  `;
}

function renderPage1(data, totalPages) {
  const rtw = data.returnToWork;
  const wt = data.workingType;
  const rec = data.recovery;

  return `
    <div class="page" data-page="1">
      <div class="page-body">
        ${header(data)}
        <div class="intro-line">
          <span class="worker-name">${esc(data.workerName)}</span> provided the following updates in relation to their claim:
        </div>

        <div class="section-heading">Return to Work</div>
        <div class="field-box">
          <div class="box-label">Select one:</div>
          <div class="checkbox-row">
            ${checkbox(rtw.status === "notMissed", RTW_LABELS.notMissed)}
            ${checkbox(rtw.status === "notReturned", RTW_LABELS.notReturned)}
            <div class="checkbox-item">
              <span class="box ${rtw.status === "returnedOn" ? "checked" : ""}"></span>
              <span>
                I returned to work on:
                <br/>
                ${filledLine(rtw.status === "returnedOn" ? rtw.returnedOnDate : "", "120px")}
                <span class="field-sub-label">Date</span>
              </span>
            </div>
          </div>
        </div>

        <div class="field-box">
          <div class="box-label">I am working:</div>
          <div class="checkbox-row">
            ${checkbox(wt.status === "fullRegular", WORKING_TYPE_LABELS.fullRegular)}
            ${checkbox(wt.status === "fullReduced", WORKING_TYPE_LABELS.fullReduced)}
            ${checkbox(wt.status === "modifiedRegular", WORKING_TYPE_LABELS.modifiedRegular)}
            ${checkbox(wt.status === "modifiedReduced", WORKING_TYPE_LABELS.modifiedReduced)}
          </div>
          <div class="checkbox-row" style="margin-top:8px;">
            <div class="checkbox-item" style="min-width:100%;">
              <span class="box ${wt.status === "other" ? "checked" : ""}"></span>
              <span style="display:flex;gap:8px;align-items:baseline;flex:1;">
                Other:
                ${filledLine(wt.status === "other" ? wt.otherText : "", "300px")}
              </span>
            </div>
          </div>
        </div>

        <div class="text-box">
          <div class="box-label">My return to work is going:</div>
          ${data.returnGoing ? `<div class="filled-text">${esc(data.returnGoing)}</div>` : ""}
        </div>

        <div class="inline-field">
          I expect to return to work on:
          ${filledLine(data.expectedReturnDate, "180px")}
        </div>
        <div style="margin-top:-10px;margin-bottom:12px;">
          <span class="field-sub-label" style="text-align:left;display:inline-block;margin-left:190px;">Date</span>
        </div>

        <div class="text-box tall">
          <div id="space" class="box-label">I have the following concerns about returning to work:<BR><br><br><br><br><br><br><br>
          
          
          </div>
          ${data.concerns ? `<div class="filled-text">${esc(data.concerns)}</div>` : ""}
        </div>

        <div class="inline-field">
          I was most recently in contact with:
          ${filledLine(data.lastContact.name, "200px")}
          on
          ${filledLine(data.lastContact.date, "140px")}
        </div>

        <div class="section-heading">Recovery</div>
        <div class="field-box">
          <div class="box-label">Select one:</div>
          <div class="checkbox-row">
            ${checkbox(rec.status === "notRecovered", RECOVERY_LABELS.notRecovered)}
            ${checkbox(rec.status === "fullyRecovered", RECOVERY_LABELS.fullyRecovered)}
          </div>
        </div>

        <div class="text-box tall">
          <div class="box-label" id="space">I have provided the following comments about my recovery:<br><br><br><br><br><br></div>
          ${rec.comments ? `<div class="filled-text">${esc(rec.comments)}</div>` : ""}
        </div>
      </div>
      ${footer(data, 1, totalPages)}
    </div>
  `;
}

function renderPage2(data, totalPages) {
  const mt = data.medicalTreatment;
  const med = data.medication;
  const he = data.homeExercises;

  return `
    <div class="page" data-page="2">
      <div class="page-body">
        <div class="pain-scale">
          <div class="pain-scale-label">
            I rate my current pain/discomfort on a scale of 1-10, where 1 is no pain and 10 is severe pain out of 10.
          </div>
          <div class="pain-scale-numbers">
            ${[1,2,3,4,5,6,7,8,9,10]
              .map(
                (n) =>
                  `<div class="pain-num ${n === data.painScale ? "selected" : ""}">${n}</div>`
              )
              .join("")}
          </div>
        </div><br>

        <div class="field-box">
          <div class="box-label">Select one:</div>
          <div class="checkbox-row">
            <div class="checkbox-item">
              <span class="box ${mt.status === "notContinuing" ? "checked" : ""}"></span>
              <span>${MED_TREATMENT_LABELS.notContinuing}</span>
            </div>
            <div class="checkbox-item">
              <span class="box ${mt.status === "continuing" ? "checked" : ""}"></span>
              <span>
                ${MED_TREATMENT_LABELS.continuing}
                <br/>
                ${filledLine(mt.status === "continuing" ? mt.providerType : "", "200px")}
                <span class="field-sub-label">(Medical Provider Type)</span>
              </span>
            </div>
          </div>
        </div><br>

        <div class="inline-field" style="flex-direction:column;align-items:flex-start;gap:10px;">
          <div>My last medical treatment was: <span style="margin-left: 180px;">from:</span></div>
          <div style="display:flex;gap:100px;width:100%;">
            <div style="flex:1;">
              ${filledLine(data.lastTreatment.date, "140px")}
              <div class="field-sub-label" style="margin-left: 180px;">Date</div>
            </div>
            <div style="flex:1;">
              ${filledLine(data.lastTreatment.providerName, "180px")}
              <div class="field-sub-label" style="text-align:left;">(Medical Provider Name)</div>
            </div>
          </div>
        </div><br>

        <div class="inline-field" style="flex-direction:column;align-items:flex-start;gap:10px;">
          <div>My next medical treatment is: <span style="margin-left: 180px;">from:</span></div>
          <div style="display:flex;gap:20px;width:100%;">
            <div style="flex:1;">
              ${filledLine(data.nextTreatment.date, "140px")}
              <div class="field-sub-label" style="margin-left: 140px;">Date</div>
            </div>
            <div style="flex:1;">
              ${filledLine(data.nextTreatment.providerName, "180px")}
              <div class="field-sub-label" style="margin-left: -180px;">(Medical Provider Name)</div>
            </div>
          </div>
        </div><br>

        <div class="inline-field">
          I am attending a Chiropractor or Physiotherapist
          ${filledLine(data.therapyFrequency, "160px")}
          <span class="field-sub-label" style="text-align:left;">(Frequency)</span>
        </div>

        <div class="field-box" style="margin-top:16px;">
          <div class="box-label">Select one:</div>
          <div class="checkbox-row">
            <div class="checkbox-item">
              <span class="box ${med.status === "notTaking" ? "checked" : ""}"></span>
              <span>${MEDICATION_LABELS.notTaking}</span>
            </div>
            <div class="checkbox-item">
              <span class="box ${med.status === "taking" ? "checked" : ""}"></span>
              <span>
                ${MEDICATION_LABELS.taking}
                <br/>
                ${filledLine(med.status === "taking" ? med.name : "", "220px")}
                <span class="field-sub-label">(Name of prescribed medication)</span>
              </span>
            </div>
          </div>
        </div>

        <div class="field-box">
          <div class="box-label">Select one:</div>
          <div class="checkbox-row">
            ${checkbox(he.status === "notDoing", HOME_EX_LABELS.notDoing)}
            ${checkbox(he.status === "doing", HOME_EX_LABELS.doing)}
          </div>
        </div>

        <div class="text-box tall">
          <div id="space" class="box-label">List the exercises you are doing:<BR><br><br><br><br><br><br><br><br><br><br><br><br></div>
          ${he.list ? `<div class="filled-text">${esc(he.list)}</div>` : ""}
        </div>

        <div class="section-heading">Other Information</div>
        <div class="text-box tall">
          <div class="box-label">I would like to provide the following additional information about my claim/injury:</div>
          ${data.otherInfo ? `<div class="filled-text">${esc(data.otherInfo)}</div>` : ""}
        </div>
      </div>
      ${footer(data, 2, totalPages)}
    </div>
  `;
}

function renderPage3(data, totalPages) {
  return `
    <div class="page" data-page="3">
      <div class="page-body">
        <div class="text-box" style="font-size:12px;line-height:1.6;">
        <class="checkboxw"></span>
        <span class="checkboxq">
          <span class="checkbox checked"></span></span>
          I certify that the information given on this form is true, correct and complete to the best of my
          knowledge. I agree to notify the Workers Compensation Board of Manitoba (WCB) immediately once I
          return to any form of work and/or employment. I understand that it is an offence to knowingly make
          a false statement to the WCB. I also understand that it is an offence to withhold information from
          WCB which affects my entitlement to compensation (e.g., full or partial recovery from injury, ability to
          return to work, sources of additional income, etc.). I understand that refusing to co-operate with, or
          follow my treatment, may result in the WCB reducing or suspending my benefits.
        </div>
        <div class="agree-row">
        <class="checkboxw"></span>
        <span class="checkboxq">
          <span class="checkbox checked"></span></span>
            <span class="box"></span>
            <span>I understand that the <a href="#">Privacy Notice</a> applies to the personal information collected in this document.</span>
          
        </div>
      </div>
      ${footer(data, 3, totalPages)}
    </div>
  `;
}

function renderWorkerProgressReport(data) {
  const totalPages = 3;
  const html =
    renderPage1(data, totalPages) +
    renderPage2(data, totalPages) +
    renderPage3(data, totalPages);
  document.getElementById("form-root").innerHTML = html;
  autoFitTallTextBoxes();
}

/**
 * Long free-text entries (Concerns, Recovery Comments, etc.) sit inside
 * fixed-height boxes so a single page's total height stays predictable
 * for print pagination. If a user's text is long enough to overflow its
 * box, shrink its font size step by step until it fits, rather than
 * silently clipping words or letting the page grow past one printed page.
 */
function autoFitTallTextBoxes() {
  document.querySelectorAll(".text-box.tall .filled-text").forEach((el) => {
    const box = el.closest(".text-box.tall");
    if (!box) return;
    let fontSize = 14;
    el.style.fontSize = fontSize + "px";
    let guard = 0;
    while (el.scrollHeight > box.clientHeight - 30 && fontSize > 9 && guard < 12) {
      fontSize -= 1;
      el.style.fontSize = fontSize + "px";
      guard++;
    }
  });
}
