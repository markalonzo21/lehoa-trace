export const comorbidities_opts = [
  { type: "hypertesion" },
  { type: "kidney" },
  { type: "bronchial" },
  { type: "cancer" },
  { type: "leukemia" },
  { type: "asthma" },
  { type: "heart" },
  { type: " diabetes" },
  { type: "autoimmune disease" },
  { type: "blood" },
  { type: "hiv" },
  { type: "epilepsy" },
  { type: "other" },
  { type: "drug allergy" },
  { type: "insect allergy" },
  { type: "mold allergy" },
  { type: "pollen allergy" },
  { type: "food allergy" },
  { type: "latex allergy" },
  { type: "pet allergy" },
  { type: "allergy on vaccine or its components" },
];

export const registrant_category = [
  { type: "A1 - Health Care Workers" },
  { type: "A2 - Senior Citizens" },
  { type: "A3 - Adult with Comorbidity" },
  { type: "A4 - Frontline Personnel in Essential Sector" },
  { type: "A5 - Poor population" },
  { type: "B1 - Teachers and Social Workers" },
  { type: "B2 - Other Goverment Workers" },
  { type: "B3 - Other Essential Workers" },
  { type: "B4 - Socio-demographic Groups" },
  { type: "B5 - Overseas Filipino Workers" },
  { type: "B6 - Other Remaining Workforce" },
  { type: "C - Rest of the Population" },
];

export const radio_opts = ["oo", "no"];

const gender_opts = [{ type: "male" }, { type: "female" }];
const suffix_opts = [
  { type: "I" },
  { type: "II" },
  { type: "III" },
  { type: "IV" },
  { type: "V" },
  { type: "Jr." },
  { type: "Sr." },
];

// form
const personal_info = {
  firstname: {
    type: "text",
    validations: { required: true },
    errors: {},
    placeholder: "First name",
  },
  lastname: {
    type: "text",
    validations: { required: true },
    errors: {},
    placeholder: "Last name",
  },
  middlename: {
    type: "text",
    validations: {},
    errors: {},
    placeholder: "Middle name",
  },
  suffix: {
    type: "select",
    options: suffix_opts,
    validations: {},
    errors: {},
    placeholder: "Suffix",
  },
  gender: {
    type: "select",
    options: gender_opts,
    validations: { required: true },
    errors: {},
    placeholder: "Gender",
  },
  bdate: {
    type: "date",
    validations: { required: true },
    errors: {},
    placeholder: "Birthdate",
  },
  contact: {
    type: "tel",
    validations: { required: true },
    errors: {},
    placeholder: "Phone Number",
  },
  email: {
    type: "email",
    validations: { required: true },
    errors: {},
    placeholder: "Email Address",
  },
  home_address: {
    type: "text",
    validations: { required: true },
    errors: {},
    placeholder: "Home Address",
  },
  city: {
    type: "text",
    validations: { required: true },
    errors: {},
    placeholder: "City",
  },
  brgy: {
    type: "text",
    validations: { required: true },
    errors: {},
    placeholder: "Barangay",
  },
};

const medical_info = {
  category: {
    type: "select",
    options: registrant_category,
    validations: { required: true },
    errors: {},
    placeholder: "DOH Priority Group",
  },
  covid_positive: {
    type: "radio",
    options: radio_opts,
    default: "no",
    validations: { required: true },
    errors: {},
    placeholder: "Are you Covid19 positive?",
  },
  contact_with_covid_positive: {
    type: "radio",
    options: radio_opts,
    default: "no",
    validations: { required: true },
    errors: {},
    placeholder: "Had a contact with Covid19 positive?",
  },
  fever: {
    type: "radio",
    options: radio_opts,
    default: "no",
    validations: { required: true },
    errors: {},
    placeholder: "Fever for the past few days",
  },
  body_pain: {
    type: "radio",
    options: radio_opts,
    default: "no",
    validations: { required: true },
    errors: {},
    placeholder: "Body pain",
  },
  headache: {
    type: "radio",
    options: radio_opts,
    default: "no",
    validations: { required: true },
    errors: {},
    placeholder: "Headache",
  },
  cough: {
    type: "radio",
    options: radio_opts,
    default: "no",
    validations: { required: true },
    errors: {},
    placeholder: "Cough",
  },
  diarrhea: {
    type: "radio",
    options: radio_opts,
    default: "no",
    validations: { required: true },
    errors: {},
    placeholder: "Diarrhea",
  },
  nausea: {
    type: "radio",
    options: radio_opts,
    default: "no",
    validations: { required: true },
    errors: {},
    placeholder: "Nausea/Vomitting",
  },
  breathing: {
    type: "radio",
    options: radio_opts,
    default: "no",
    validations: { required: true },
    errors: {},
    placeholder: "Difficulty in breathing",
  },
  sore_throat: {
    type: "radio",
    options: radio_opts,
    default: "no",
    validations: { required: true },
    errors: {},
    placeholder: "Sore throat",
  },
  smell: {
    type: "radio",
    options: radio_opts,
    default: "no",
    validations: { required: true },
    errors: {},
    placeholder: "Decreased sense of smell",
  },
  comorbidities: {
    type: "select",
    multiple: true,
    options: comorbidities_opts,
    default: "no",
    validations: {},
    errors: {},
    placeholder: "Comorbidities",
  },
};

const privacy_content = {
  data_privacy_notice: {
    type: "checkbox",
    validations: { required: true },
    placeholder: "I have read and agreed to the Data Privacy Notice",
  },
  information_consent: {
    type: "checkbox",
    validations: { required: true },
    placeholder:
      "I am fully aware and hereby give my informed consent for the collection of personal data for the purpose stated in  the Notice",
  },
  initial_consent: {
    type: "checkbox",
    validations: { required: true },
    placeholder:
      "I give my initial consent for my vaccination against COVID-19.",
  },
  sharing_data_consent: {
    type: "checkbox",
    validations: { required: true },
    placeholder:
      "I consent to the sharing of my personal data with the Department of Health (DOH) for the purpose of masterlisting with the Vaccine Information Management System Immunization Registry (VIMS-IR) and Vaccine Administration System (VIMS-VAS) for the Vaccination program of the National Goverment.",
  },
  data_subject_rights: {
    type: "checkbox",
    validations: { required: true },
    placeholder:
      "I understand and agree that I can exercise my data subject rights over the personal information I have given under the Lehoa Trace by accomplishing the prescribed Data Privacy Contact Form and in accordance with the procedure laid down for the purpose.",
  },
  optOut_consent: {
    type: "checkbox",
    validations: { required: true },
    placeholder:
      "I am informed and aware that I can opt-out from the Lehoa Trace at anytime prior to the vaccination and have my personal data erased or deleted in the database of the Lehoa Admin after accomplishing the prescribed Lehoa Trace Opt-Out Form for the purpose, subject to limitation provided by law.",
  },
  // certified_data: {
  //   type: "text",
  //   validations: {},
  //   placeholder: "The Information provided is certified as TRUE and CORRECT.",
  // },
  // spam_aggreement: {
  //   type: "text",
  //   validations: {},
  //   placeholder:
  //     "Registrants should not create multiple FALSE RESIDENCY AND HOUSEHOLD MEMBERS.",
  // },
};

export const STEPS = [
  {
    icon: "person-circle-sharp",
    label: "Personal Information",
    progress: 0.3,
    data: personal_info,
  },
  {
    icon: "pulse-sharp",
    label: "Medical Information",
    progress: 0.6,
    data: medical_info,
  },
  {
    icon: "information-circle-sharp",
    label: "Terms & Conditions",
    progress: 0.9,
    data: privacy_content,
  },
];
