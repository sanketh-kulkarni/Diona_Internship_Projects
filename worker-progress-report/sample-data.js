/**
 * Sample datasets for the Worker Progress Report.
 * Each object represents one worker's submitted form.
 * Swap between these via the toolbar dropdown, or edit live in the panel.
 */

const SAMPLE_DATASETS = {
  original: {
    claimNo: "20042047",
    formCode: "WP",
    workerName: "Madeleine Willson",
    workerAppId: "712041",
    submittedAt: "March 19, 2024 19:21",

    returnToWork: {
      status: "returnedOn", // one of: notMissed | notReturned | returnedOn
      returnedOnDate: "March 15, 2024",
    },
    workingType: {
      status: "modifiedReduced", // fullRegular | fullReduced | modifiedRegular | modifiedReduced | other
      otherText: "",
    },
    returnGoing: "Terrible. Testing Testing",
    expectedReturnDate: "",
    concerns: "",
    lastContact: { name: "", date: "" },

    recovery: {
      status: "fullyRecovered", // notRecovered | fullyRecovered
      comments: "",
    },

    painScale: 5,

    medicalTreatment: {
      status: "notContinuing", // notContinuing | continuing
      providerType: "",
    },
    lastTreatment: { date: "", providerName: "" },
    nextTreatment: { date: "", providerName: "" },
    therapyFrequency: "",

    medication: {
      status: "notTaking", // notTaking | taking
      name: "",
    },

    homeExercises: {
      status: "notDoing", // notDoing | doing
      list: "",
    },

    otherInfo: "No info Testing Testing",
  },

  minimalCase: {
    claimNo: "20055310",
    formCode: "WP",
    workerName: "Devon Carter",
    workerAppId: "804233",
    submittedAt: "June 2, 2024 09:05",

    returnToWork: { status: "notMissed", returnedOnDate: "" },
    workingType: { status: "fullRegular", otherText: "" },
    returnGoing: "",
    expectedReturnDate: "",
    concerns: "",
    lastContact: { name: "", date: "" },

    recovery: { status: "fullyRecovered", comments: "" },
    painScale: 1,

    medicalTreatment: { status: "notContinuing", providerType: "" },
    lastTreatment: { date: "", providerName: "" },
    nextTreatment: { date: "", providerName: "" },
    therapyFrequency: "",

    medication: { status: "notTaking", name: "" },
    homeExercises: { status: "notDoing", list: "" },

    otherInfo: "",
  },

  detailedCase: {
    claimNo: "20061188",
    formCode: "WP",
    workerName: "Priya Nathan",
    workerAppId: "918744",
    submittedAt: "August 14, 2024 14:47",

    returnToWork: { status: "notReturned", returnedOnDate: "" },
    workingType: { status: "other", otherText: "On graduated hours, 3 days/week" },
    returnGoing: "Slow but steady improvement week over week.",
    expectedReturnDate: "September 30, 2024",
    concerns:
      "I am concerned that my workstation has not yet been modified to accommodate my restrictions, and standing for long periods still causes pain.",
    lastContact: { name: "Robert Zheng (Supervisor)", date: "August 10, 2024" },

    recovery: {
      status: "notRecovered",
      comments:
        "Still experiencing stiffness in the lower back, especially in the mornings. Physiotherapist recommends continuing treatment for another 6-8 weeks.",
    },
    painScale: 7,

    medicalTreatment: { status: "continuing", providerType: "Physiotherapist" },
    lastTreatment: { date: "August 8, 2024", providerName: "Dr. Alan Kessler" },
    nextTreatment: { date: "August 22, 2024", providerName: "Dr. Alan Kessler" },
    therapyFrequency: "Twice weekly",

    medication: { status: "taking", name: "Naproxen 250mg" },
    homeExercises: {
      status: "doing",
      list: "Daily lower-back stretches, 15-minute walk twice a day, core strengthening 3x/week as prescribed by physiotherapist.",
    },

    otherInfo:
      "I would like to request an ergonomic assessment of my workstation before my return-to-work date.",
  },
};

const RTW_LABELS = {
  notMissed: "I have not missed time from work",
  notReturned: "I have not returned to work",
  returnedOn: "I returned to work on:",
};

const WORKING_TYPE_LABELS = {
  fullRegular: "Full duties, regular hours",
  fullReduced: "Full duties, reduced hours",
  modifiedRegular: "Modified duties, regular hours",
  modifiedReduced: "Modified duties, reduced hours",
  other: "Other:",
};

const RECOVERY_LABELS = {
  notRecovered: "I have not fully recovered from my workplace injury.",
  fullyRecovered: "I have fully recovered from my workplace injury.",
};

const MED_TREATMENT_LABELS = {
  notContinuing: "I am not continuing to receive medical treatment for my workplace injury.",
  continuing: "I am continuing to receive medical treatment for my workplace injury from:",
};

const MEDICATION_LABELS = {
  notTaking: "I am not taking medication for my workplace injury.",
  taking: "I am taking medication for my workplace injury:",
};

const HOME_EX_LABELS = {
  notDoing: "I am not doing home exercises for my workplace injury.",
  doing: "I am doing home exercises for my workplace injury.",
};
