/**
 * Sample datasets for the Medical & Travel Expense Request.
 * Every table section is an array of row objects, so each can hold
 * zero, one, or many rows to demonstrate dynamic table rendering.
 */

const SAMPLE_DATASETS = {
  original: {
    claimNo: "20042047",
    workerName: "Madeleine Willson",
    workerAppId: "712041",
    submittedAt: "March 28, 2024 20:43",

    prescriptionDrugs: [
      {
        drugName: "Naproxen",
        prescriptionDate: "February 28, 2024",
        datePurchased: "February 29, 2024",
        providerName: "Dr. Best",
        paidAmount: "$20.00",
      },
    ],
    otcDrugs: [
      {
        drugName: "Advil",
        datePurchased: "March 28, 2024",
        paidAmount: "$8.00",
        sellerName: "Shoppers Drug Mart",
        reason: "Pain",
      },
    ],
    supplies: [
      {
        item: "Tensor",
        datePurchased: "February 28, 2024",
        prescribed: "Yes",
        providerName: "Dr. Best",
        paidAmount: "$10.00",
        sellerName: "Shoppers DrugMart",
      },
    ],
    parking: [
      {
        address: "333 St Mary Ave, Winnipeg MB R3C4A5, Canada",
        date: "March 28, 2024",
        paidAmount: "$10.00",
        meterUsed: "yes",
        meterNumber: "12245",
      },
    ],
    mileage: [
      {
        appointmentDate: "March 28, 2024",
        providerAddress: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada",
        workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada",
        km: "20 km",
      },
    ],
    busTaxi: [
      {
        appointmentDate: "March 28, 2024",
        startAddress: "",
        providerAddress: "HSC Winnipeg Women's Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada",
        type: "Bus",
        fare: "$3.00",
      },
      {
        appointmentDate: "March 27, 2024",
        startAddress: "25 Furby St, Winnipeg MB R3C2A2, Canada",
        providerAddress: "440 Edmonton St, Winnipeg MB R3B 2M4, Canada",
        type: "Taxi",
        fare: "$15.00",
      },
    ],
  },

  emptyCase: {
    claimNo: "20077412",
    workerName: "Jordan Ellis",
    workerAppId: "930155",
    submittedAt: "July 4, 2024 11:02",

    prescriptionDrugs: [],
    otcDrugs: [],
    supplies: [],
    parking: [],
    mileage: [],
    busTaxi: [],
  },

  heavyCase: {
    claimNo: "20088876",
    workerName: "Samuel Okonkwo",
    workerAppId: "445982",
    submittedAt: "October 2, 2024 16:30",

    prescriptionDrugs: [
      { drugName: "Naproxen", prescriptionDate: "Sept 1, 2024", datePurchased: "Sept 2, 2024", providerName: "Dr. Best", paidAmount: "$20.00" },
      { drugName: "Gabapentin", prescriptionDate: "Sept 10, 2024", datePurchased: "Sept 11, 2024", providerName: "Dr. Best", paidAmount: "$45.00" },
      { drugName: "Cyclobenzaprine", prescriptionDate: "Sept 20, 2024", datePurchased: "Sept 21, 2024", providerName: "Dr. Lin", paidAmount: "$18.50" },
    ],
    otcDrugs: [
      { drugName: "Advil", datePurchased: "Sept 5, 2024", paidAmount: "$8.00", sellerName: "Shoppers Drug Mart", reason: "Pain" },
      { drugName: "Tylenol", datePurchased: "Sept 18, 2024", paidAmount: "$9.50", sellerName: "Rexall", reason: "Headache from medication" },
    ],
    supplies: [
      { item: "Tensor", datePurchased: "Sept 2, 2024", prescribed: "Yes", providerName: "Dr. Best", paidAmount: "$10.00", sellerName: "Shoppers DrugMart" },
      { item: "Lumbar Brace", datePurchased: "Sept 15, 2024", prescribed: "Yes", providerName: "Dr. Best", paidAmount: "$65.00", sellerName: "Wellwise" },
      { item: "Ice Packs", datePurchased: "Sept 16, 2024", prescribed: "No", providerName: "", paidAmount: "$12.00", sellerName: "Shoppers DrugMart" },
    ],
    parking: [
      { address: "333 St Mary Ave, Winnipeg MB R3C4A5, Canada", date: "Sept 2, 2024", paidAmount: "$10.00", meterUsed: "yes", meterNumber: "12245" },
      { address: "820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", date: "Sept 20, 2024", paidAmount: "$6.00", meterUsed: "no", meterNumber: "" },
    ],
    mileage: [
      { appointmentDate: "Sept 2, 2024", providerAddress: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada", km: "20 km" },
      { appointmentDate: "Sept 20, 2024", providerAddress: "440 Edmonton St, Winnipeg MB R3B 2M4, Canada", workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada", km: "14 km" },
    ],
    busTaxi: [
      { appointmentDate: "Sept 5, 2024", startAddress: "", providerAddress: "HSC Winnipeg Women's Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada", type: "Bus", fare: "$3.00" },
      { appointmentDate: "Sept 12, 2024", startAddress: "25 Furby St, Winnipeg MB R3C2A2, Canada", providerAddress: "440 Edmonton St, Winnipeg MB R3B 2M4, Canada", type: "Taxi", fare: "$15.00" },
      { appointmentDate: "Sept 18, 2024", startAddress: "10 Main St, Winnipeg MB, Canada", providerAddress: "820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", type: "Bus", fare: "$3.00" },
    ],
  },
};
