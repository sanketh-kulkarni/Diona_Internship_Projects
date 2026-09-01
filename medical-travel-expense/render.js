function esc(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
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
        <div class="form-title">Medical &amp; Travel Expense<br/>Request</div>
        <div class="claim-box-row">
          <div class="claim-box">Claim No. ${esc(data.claimNo)}</div>
        </div><br>
      </div><br>
    </div><br>
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

function emptyRow(colspan, label = "None reported") {
  return `<tr><td colspan="${colspan}" class="empty-note">${label}</td></tr>`;
}

function tableBlock({ title, note, headers, rows, rowRenderer, colspan }) {
  const bodyHtml =
    rows.length > 0
      ? rows.map(rowRenderer).join("")
      : emptyRow(colspan);

  return {
    // rough height estimate for pagination: title + note + header row + N rows
    estHeight:
      34 + // title
      (note ? 30 : 0) +
      34 + // table header
      Math.max(rows.length, 1) * 34 +
      16, // spacing
    html: `
      <div class="table-title">${esc(title)}</div>
      ${note ? `<div class="table-note">${note}</div>` : ""}
      <table class="data-table">
        <thead><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
        <tbody>${bodyHtml}</tbody>
      </table>
    `,
  };
}

function buildSectionBlocks(data) {
  const blocks = [];

  blocks.push(
    tableBlock({
      title: "Prescription Drugs",
      headers: ["Drug Name", "Prescription Date", "Date Purchased", "Healthcare Provider Name", "Paid Amount"],
      rows: data.prescriptionDrugs,
      colspan: 5,
      rowRenderer: (r) => `
        <tr>
          <td>${esc(r.drugName)}</td>
          <td>${esc(r.prescriptionDate)}</td>
          <td>${esc(r.datePurchased)}</td>
          <td>${esc(r.providerName)}</td>
          <td>${esc(r.paidAmount)}</td>
        </tr>`,
    })
  );

  blocks.push(
    tableBlock({
      title: "Over-the-Counter Drugs",
      headers: ["Drug Name", "Date Purchased", "Paid Amount", "Seller's Name", "Reason for Purchasing"],
      rows: data.otcDrugs,
      colspan: 5,
      rowRenderer: (r) => `
        <tr>
          <td>${esc(r.drugName)}</td>
          <td>${esc(r.datePurchased)}</td>
          <td>${esc(r.paidAmount)}</td>
          <td>${esc(r.sellerName)}</td>
          <td>${esc(r.reason)}</td>
        </tr>`,
    })
  );

  blocks.push(
    tableBlock({
      title: "Bandages, Braces or Other Medical Supplies",
      headers: ["Item Purchased", "Date Purchased", "Was this Prescribed?", "Healthcare Provider Name", "Paid Amount", "Seller's Name"],
      rows: data.supplies,
      colspan: 6,
      rowRenderer: (r) => `
        <tr>
          <td>${esc(r.item)}</td>
          <td>${esc(r.datePurchased)}</td>
          <td>${esc(r.prescribed)}</td>
          <td>${esc(r.providerName)}</td>
          <td>${esc(r.paidAmount)}</td>
          <td>${esc(r.sellerName)}</td>
        </tr>`,
    })
  );

  blocks.push(
    tableBlock({
      title: "Parking for Medical Appointments",
      headers: ["Address of Healthcare Provider/Medical Facility", "Date", "Paid Amount", "Meter Used?", "Meter Number"],
      rows: data.parking,
      colspan: 5,
      rowRenderer: (r) => `
        <tr>
          <td>${esc(r.address)}</td>
          <td>${esc(r.date)}</td>
          <td>${esc(r.paidAmount)}</td>
          <td>${esc(r.meterUsed)}</td>
          <td>${esc(r.meterNumber)}</td>
        </tr>`,
    })
  );

  blocks.push(
    tableBlock({
      title: "Mileage to Medical Appointments",
      note:
        "The WCB will generally reimburse only those transportation costs which are in excess of costs that would be incurred by the worker while travelling to and from work.",
      headers: ["Appointment Date", "Address of Healthcare Provider/Medical Facility", "Address of Workplace", "Number of km (Round Trip)"],
      rows: data.mileage,
      colspan: 4,
      rowRenderer: (r) => `
        <tr>
          <td>${esc(r.appointmentDate)}</td>
          <td>${esc(r.providerAddress)}</td>
          <td>${esc(r.workplaceAddress)}</td>
          <td>${esc(r.km)}</td>
        </tr>`,
    })
  );

  blocks.push(
    tableBlock({
      title: "Bus or Taxi Fare for Medical Appointments*",
      note: "*Note: Pre-approval is required from your WCB representative to claim taxi fare(s).",
      headers: ["Appointment Date", "Address of Starting Point", "Address of Healthcare Provider/Medical Facility", "Bus or Taxi (indicate one)", "Total Fare Paid"],
      rows: data.busTaxi,
      colspan: 5,
      rowRenderer: (r) => `
        <tr>
          <td>${esc(r.appointmentDate)}</td>
          <td>${esc(r.startAddress)}</td>
          <td>${esc(r.providerAddress)}</td>
          <td>${esc(r.type)}</td>
          <td>${esc(r.fare)}</td>
        </tr>`,
    })
  );

  return blocks;
}

const AGREE_HTML = `
  <div class="agree-row">
  <class="checkboxw"></span>
        <span class="checkboxq">
          <span class="checkbox checked"></span></span>
    <span class="box checked"></span>
    <span>I understand that the <a href="#">Privacy Notice</a> applies to the personal information collected in this document.</span>
  </div>
`;

// Approx usable body height (px) inside a .page for flowing content,
// tuned against the .page-body area defined in base.css.
const PAGE_BODY_BUDGET = 820;
const HEADER_HEIGHT = 140;
const INTRO_HEIGHT = 40;

function paginateBlocks(blocks) {
  const pages = [];
  let current = [];
  let usedHeight = 0;

  blocks.forEach((block, i) => {
    const isFirstPage = pages.length === 0;
    const budget = PAGE_BODY_BUDGET - (isFirstPage ? HEADER_HEIGHT + INTRO_HEIGHT : 0);

    if (current.length > 0 && usedHeight + block.estHeight > budget) {
      pages.push(current);
      current = [];
      usedHeight = 0;
    }
    current.push(block);
    usedHeight += block.estHeight;
  });

  if (current.length > 0) pages.push(current);
  return pages;
}

function renderMedicalTravelExpense(data) {
  const blocks = buildSectionBlocks(data);
  const pages = paginateBlocks(blocks);
  const totalPages = pages.length;

  const pagesHtml = pages
    .map((blockGroup, idx) => {
      const pageNum = idx + 1;
      const isFirst = idx === 0;
      const isLast = idx === pages.length - 1;

      return `
        <div class="page" data-page="${pageNum}">
          <div class="page-body">
            ${isFirst ? header(data) : ""}
            ${
              isFirst
                ? `<div class="intro-line"><span class="worker-name">${esc(
                    data.workerName
                  )}</span> requested reimbursement for the following medical and/or travel expenses:</div>`
                : ""
            }
            ${blockGroup.map((b) => b.html).join("")}
            ${isLast ? AGREE_HTML : ""}
          </div>
          ${footer(data, pageNum, totalPages)}
        </div>
      `;
    })
    .join("");

  document.getElementById("form-root").innerHTML = pagesHtml;
}
