export const entrepriseTypeJuridique = [
  { value: "SAS", label: "SAS" },
  { value: "SA", label: "SA" },
  { value: "SARL", label: "SARL" },
  { value: "SASU", label: "SASU" },
  { value: "SC", label: "Société civile" },
  { value: "EURL", label: "EURL" },
  { value: "SNC", label: "Société en nom collectif" },
  { value: "SCS", label: "Société en commandite simple" },
  { value: "SCA", label: "Société en commandite par actions" },
  { value: "EI", label: "Entreprise individuelle" },
  { value: "EIRL", label: "EIRL" },
];
export const entrepriseType = [
  { value: "SIEGE", label: "Siège" },
  { value: "HOLDING", label: "Holding" },
  { value: "FILLIALE", label: "Filliale" },
  { value: "SUCURSALE", label: "Sucursale" },
  { value: "AUTRE_SOCIETE", label: "Autre société" },
];

export const chainesDeValeursAmont = [
  {
    name: "Approvisionnement",
    value: [
      {
        name: "Electricité",
        value: "Electricité",
      },
      {
        name: "Energies fossiles",
        value: "Energies fossiles",
      },
      {
        name: "Eau",
        value: "Eau",
      },
      {
        name: "Réseau de froid ou de chaud",
        value: "Réseau de froid ou de chaud",
      },
      {
        name: "Réseau internet et téléphonie",
        value: "Réseau internet et téléphonie",
      },
      {
        name: "Datacenter",
        value: "Datacenter",
      },
      {
        name: "Matières premières",
        value: "Matières premières",
      },
      {
        name: "Biens finis ou semi-finis",
        value: "Biens finis ou semi-finis",
      },
      {
        name: "Biens d’équipement",
        value: "Biens d’équipement",
      },
      {
        name: "Services financiers",
        value: "Services financiers",
      },
      {
        name: "Services autres que financiers",
        value: "Services autres que financiers",
      },
    ],
  },
  {
    name: "Transports de marchandises entrantes",
    value: "Transports de marchandises entrantes",
  },
  {
    name: "Déplacements",
    value: [
      {
        name: "Voyages professionnels",
        value: "Voyages professionnels",
      },
      {
        name: "Déplacements domicile-travail des collaborateurs",
        value: "Déplacements domicile-travail des collaborateurs",
      },
      {
        name: "Déplacements de fournisseurs",
        value: "Déplacements de fournisseurs",
      },
    ],
  },
];
