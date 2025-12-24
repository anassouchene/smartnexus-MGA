export interface InsuranceCountry {
  country: string;
  insurers: string[];
}

export const INSURANCE_COUNTRIES: InsuranceCountry[] = [
  {
    "country": "France",
    "insurers": [
      "AXA France",
      "CNP Assurances",
      "Crédit Agricole Assurances",
      "BNP Paribas Cardif",
      "Groupama",
      "MAAF (via Covéa)",
      "MMA (via Covéa)",
      "GMF (via Covéa)",
      "Allianz France",
      "Generali France",
      "Swiss Life France",
      "BPCE Assurances",
      "AG2R La Mondiale",
      "Groupe VYV",
      "APICIL",
      "MACSF",
      "MAE",
      "Euro-Assurance",
      "MetLife (France)",
      "Aésio Mutuelle",
      "Assurances du Crédit Mutuel (ACM)",
      "Aioi Nissay Dowa Insurance",
      "Alan Insurance"
    ]
  },
  {
    "country": "Allemagne",
    "insurers": [
      "Allianz SE",
      "ERGO Group",
      "Munich Re Group",
      "Talanx AG (HDI, etc.)",
      "R+V Versicherung AG",
      "Debeka",
      "HUK-COBURG",
      "Wüstenrot & Württembergische (W&W)",
      "ADAC Versicherung AG",
      "AXA Versicherung AG",
      "Gothaer Group",
      "Provinzial Konzern"
    ]
  },
  {
    "country": "Espagne",
    "insurers": [
      "Mapfre, S.A.",
      "Mutua Madrileña, S.A.",
      "Allianz España",
      "AXA Seguros (Espagne)",
      "Catalana Occidente (GCO)",
      "Generali España",
      "Sanitas",
      "Helvetia Seguros (Espagne)",
      "Asisa",
      "Santalucía",
      "Fénix Directo",
      "Liberty Seguros",
      "VidaCaixa (CaixaBank)"
    ]
  },
  {
    "country": "Italie",
    "insurers": [
      "Assicurazioni Generali S.p.A.",
      "UnipolSai Assicurazioni S.p.A.",
      "Gruppo Assicurativo Poste Vita / Poste Assicura",
      "Allianz Italia",
      "AXA Assicurazioni (Gruppo AXA Italia)",
      "Reale Mutua Assicurazioni",
      "Zurich Insurance (Italie)",
      "HDI Assicurazioni",
      "Cattolica Assicurazioni (maintient sa marque sous Generali)",
      "Genertel S.p.A.",
      "Alleanza Assicurazioni",
      "UnipolSai / Unipol Group (marque principale du groupe)",
      "Centro Italia Assicurazioni",
      "Quixa",
      "AdiR Assicurazioni",
      "Vitalia Fideiussioni"
    ]
  },
  {
    "country": "Portugal",
    "insurers": [
      "Fidelidade",
      "AGEAS Seguros Portugal",
      "GENERALI Portugal",
      "VidaCaixa / BPI Vida e Pensões (Vidacaixa)",
      "Allianz Portugal",
      "Tranquilidade",
      "Zurich Insurance Portugal",
      "Cigna Portugal",
      "Bupa Portugal",
      "PassportCard (Portugal)",
      "Hiscox Portugal",
      "Admiral Seguros Portugal",
      "April Portugal",
      "Segurio (Trust)",
      "Montepio / Lusitânia Seguros"
    ]
  },
  {
    "country": "Belgique",
    "insurers": [
      "AG Insurance (Ageas)",
      "AXA Belgium",
      "Ethias",
      "KBC Assurances",
      "Belfius Assurances",
      "P&V Assurances",
      "Allianz Benelux",
      "Baloise Insurance",
      "NN Insurance Belgium",
      "Argenta Assurances",
      "Dela Assurances",
      "Crelan Insurance",
      "DAS Assurances",
      "Europ Assistance",
      "Fidea",
      "Corona (Assurances)",
      "ATV / ATV Assurances"
    ]
  },
  {
    "country": "Irlande",
    "insurers": [
      "Irish Life Group",
      "New Ireland Assurance",
      "Zurich Insurance plc (Ireland)",
      "Aviva Insurance DAC",
      "FBD Insurance plc",
      "Liberty Insurance DAC",
      "RSA Insurance Ireland (via 123.ie)",
      "AXA Insurance DAC",
      "Allianz plc (Ireland)",
      "AIG Europe S.A. – Irish Branch",
      "Royal London Insurance dac",
      "Canada Life Assurance (International)",
      "Vhi Healthcare",
      "123.ie (online insurer)",
      "Intact Insurance Ireland DAC"
    ]
  },
  {
    "country": "Norvège",
    "insurers": [
      "Gjensidige Forsikring ASA",
      "Storebrand ASA",
      "KLP (Kommunal Landspensjonskasse)",
      "Nordea Liv",
      "DNB Livsforsikring / DNB Forsikring AS",
      "SpareBank 1 Forsikring AS",
      "Fremtind Forsikring AS",
      "Protector Forsikring ASA",
      "If P&C Insurance Company Ltd.",
      "AIG Europe S.A – branche Norvège",
      "Assuranceforeningen Skuld",
      "SpareBank 1 Livsforsikring"
    ]
  },
  {
    "country": "Suède",
    "insurers": [
      "Folksam",
      "Skandia",
      "If P&C Insurance",
      "Länsförsäkringar",
      "Trygg-Hansa",
      "Allianz Sweden",
      "AXA Sweden",
      "Cigna (Assurance santé internationale)",
      "Bupa Global",
      "Liberty / International providers"
    ]
  },
  {
    "country": "Finlande",
    "insurers": [
      "LähiTapiola Group",
      "OP Insurance / OP Financial Group",
      "If P&C Insurance (Sampo Group)",
      "Fennia Mutual Insurance Company",
      "Pohjantähti Mutual Insurance",
      "Mandatum Life Insurance",
      "Varma Mutual Pension Insurance Company",
      "Alandia Group",
      "Agria Eläinvakuutus",
      "Nordea Insurance Finland",
      "Allianz Finland",
      "Cigna / David Shield / IMG (santé pour expats)",
      "Zurich Insurance Finland",
      "Protector Insurance (Finland)"
    ]
  },
  {
    "country": "Danemark",
    "insurers": [
      "Tryg Forsikring",
      "Topdanmark Forsikring",
      "Alm. Brand",
      "Codan Forsikring",
      "PFA Pension",
      "Gjensidige (opérant au Danemark)",
      "If P&C Insurance (Danemark)",
      "Sygeforsikring Danmark",
      "ATP (Pensions)",
      "LB Forsikring",
      "GF Forsikring",
      "Købstædernes Forsikring",
      "Aros Forsikring",
      "Alka Forsikring",
      "Nordea Pension",
      "PenSam"
    ]
  },
  {
    "country": "Pologne",
    "insurers": [
      "Powszechny Zakład Ubezpieczeń (PZU)",
      "Sopockie Towarzystwo Ubezpieczeń Ergo Hestia SA",
      "Towarzystwo Ubezpieczeń i Reasekuracji Warta SA",
      "UNIQA Towarzystwo Ubezpieczeń SA",
      "Generali Towarzystwo Ubezpieczeń SA",
      "Allianz Polska",
      "Compensa Towarzystwo Ubezpieczeń SA",
      "AXA Ubezpieczenia Towarzystwo",
      "Wiener Insurance Group (y compris filiales en Pologne)",
      "InterRisk Towarzystwo Ubezpieczeń SA"
    ]
  },
  {
    "country": "République tchèque",
    "insurers": [
      "Česká pojišťovna",
      "Kooperativa pojišťovna, a.s.",
      "Allianz pojišťovna, a.s.",
      "Generali Česká pojišťovna",
      "ČSOB Pojišťovna",
      "UNIQA pojišťovna, a.s.",
      "Direct pojišťovna",
      "Slavia pojišťovna",
      "AXA (via IPA / international)",
      "Colonnade Insurance Company",
      "Maxima Insurance Company",
      "Vitalitas pojišťovna"
    ]
  },
  {
    "country": "Slovaquie",
    "insurers": [
      "KOOPERATIVA poisťovňa, a.s.",
      "Allianz – Slovenská poisťovňa, a.s.",
      "Generali poisťovňa, a.s.",
      "UNIQA poisťovňa, a.s.",
      "ČSOB Poisťovňa, a.s.",
      "MetLife Europe d.a.c.",
      "NN Životná poisťovňa, a.s.",
      "Colonnade Insurance S.A.",
      "Poisťovňa Cardif Slovakia, a.s.",
      "Union poisťovňa, a.s.",
      "Wüstenrot poisťovňa, a.s.",
      "YOUPLUS Životná poisťovňa",
      "Genertel",
      "Komunálna poisťovňa, a.s.",
      "Pillow poisťovňa, a.s."
    ]
  },
  {
    "country": "Hongrie",
    "insurers": [
      "UNION Vienna Insurance Group Biztosító Zrt.",
      "Alfa Vienna Insurance Group Biztosító Zrt.",
      "UNIQA Biztosító Zrt.",
      "Signal Iduna Biztosító Zrt.",
      "Colonnade Insurance S.A. Magyarországi Fióktelepe",
      "Wáberer Hungária Biztosító Zrt.",
      "Starr Europe Insurance Limited Magyarországi Fióktelepe",
      "Tiszasülyi Kölcsönös Növénybiztosító Egyesület",
      "Societatea Comerciala de Asigurare-Reasigurare Astra S.A. Biztosító Magyarországi Fióktelepe",
      "D.A.S. Jogvédelmi Biztosító Zrt.",
      "Gerna Insurance Brokers Ltd. (assurance/agents)",
      "Groupama (présence locale / agents) (assurance vie & biens via partenaire)"
    ]
  },
  {
    "country": "Grèce",
    "insurers": [
      "Ethniki Hellenic General Insurance Co.",
      "Interamerican Hellenic Insurance (Achmea)",
      "Generali Hellas Insurance Company",
      "Allianz Hellas Insurance Company",
      "NN Hellenic Life Insurance Company",
      "Groupama Phoenix Hellenic Insurance",
      "MetLife Greece",
      "Ergo Hellas (Munich Re Group)",
      "Hellas Direct",
      "European Reliance General Insurance Co.",
      "Prime Insurance SA",
      "Apeiron Insurance",
      "CNP Zois",
      "Synergy Insurance",
      "Asteras Insurance",
      "Mapfre Asistencia Greece"
    ]
  },
  {
    "country": "Pays-Bas",
    "insurers": [
      "Aegon Nederland N.V.",
      "NN Group (Nationale-Nederlanden)",
      "Achmea (incluant Centraal Beheer)",
      "ASR Nederland N.V.",
      "VGZ Zorgverzekeraar",
      "Allianz Nederland Groep N.V.",
      "Reaal Verzekeringen",
      "Goudse Verzekeringen (De Goudse)",
      "OHRA Verzekeringen",
      "Noord Nederlandsche P&I Club",
      "Delta Lloyd (historique / intégré à NN)"
    ]
  },
  {
    "country": "Luxembourg",
    "insurers": [
      "Foyer S.A.",
      "AXA Assurances Luxembourg S.A.",
      "Bâloise Assurances Luxembourg S.A.",
      "La Luxembourgeoise (LALUX) S.A.",
      "Cardif Lux Vie (BNP Paribas Cardif)",
      "Lombard International Assurance",
      "Swiss Life (Luxembourg) S.A.",
      "DKV Luxembourg S.A.",
      "Generali Employee Benefits (GEB)",
      "Allianz Life Luxembourg S.A.",
      "AIG Europe S.A.",
      "Colonnade Insurance S.A.",
      "CGPA Europe S.A.",
      "CNA Insurance Company (Europe) S.A.",
      "China Taiping Insurance S.A."
    ]
  },
  {
    "country": "Suisse",
    "insurers": [
      "Zurich Insurance Group Ltd.",
      "Swiss Life Holding AG",
      "Helvetia Group",
      "Bâloise Holding AG",
      "Swiss Re Ltd.",
      "AXA Winterthur / Allianz Suisse",
      "Groupe Mutuel",
      "Die Mobiliar (La Mobilière)",
      "Helsana AG",
      "Sanitas Krankenversicherung AG",
      "Vaudoise Assurances",
      "Concordia Versicherungen AG",
      "Swica Versicherungen AG",
      "Visana AG",
      "Generali Schweiz AG"
    ]
  },
  {
    "country": "Autriche",
    "insurers": [
      "UNIQA Österreich Versicherungen AG",
      "Vienna Insurance Group (VIG)",
      "Allianz Elementar Versicherungs-AG",
      "Generali Versicherung AG",
      "Wiener Städtische Versicherung AG",
      "Donau Versicherung AG",
      "Grazer Wechselseitige Versicherung AG (GRAWE)",
      "Zurich Versicherungs-AG",
      "Merkur Versicherung AG",
      "Ergo Versicherung AG",
      "Wüstenrot Versicherungs-AG",
      "Niederösterreichische Versicherung AG",
      "HDI Versicherung AG",
      "Österreichische Beamtenversicherung (ÖBV)",
      "Generali Bank & Bonus Pensionskassen (lié à Generali)"
    ]
  },
  {
    "country": "Roumanie",
    "insurers": [
      "Groupama Asigurari",
      "Allianz-Tiriac Asigurari",
      "Omniasig Vienna Insurance Group",
      "Asirom Vienna Insurance Group",
      "Generali Romania",
      "Grawe Romania"
    ]
  },
  {
    "country": "Royaume-Uni",
    "insurers": [
      "Aviva plc",
      "Legal & General Group plc",
      "Prudential plc",
      "Direct Line Group",
      "RSA Insurance Group",
      "Admiral Group plc",
      "Phoenix Group",
      "AIG UK / AIG Europe Ltd. (UK Branch)",
      "Ageas UK",
      "Allianz Insurance plc (UK)",
      "Hiscox Ltd.",
      "Beazley plc",
      "NFU Mutual",
      "Liverpool Victoria (LV=)"
    ]
  },
  {
    "country": "Bénin",
    "insurers": [
      "NSIA Assurances",
      "SUNU Assurances",
      "GAB (Générale des Assurances du Bénin)",
      "Atlantique Assurances",
      "Sanlam (ex-Saham)",
      "AMAB"
    ]
  },
  {
    "country": "Burkina Faso",
    "insurers": [
      "SONAR",
      "UAB (Union des Assurances du Burkina)",
      "SUNU Assurances",
      "Coris Assurances",
      "Allianz",
      "Sanlam",
      "Raya Assurances"
    ]
  },
  {
    "country": "Cameroun",
    "insurers": [
      "AXA Cameroun",
      "Activa Assurances",
      "Chanas Assurances",
      "SAAR Assurances",
      "Allianz Cameroun",
      "NSIA Assurances",
      "Prudential Beneficial",
      "Zenithe Insurance"
    ]
  },
  {
    "country": "Centrafrique",
    "insurers": [
      "UAC (Union des Assurances de Centrafrique)",
      "Activa Assurances",
      "SUNU Assurances",
      "Allianz Centrafrique"
    ]
  },
  {
    "country": "Congo (Brazzaville)",
    "insurers": [
      "ARC (Assurances et Réassurances du Congo)",
      "NSIA Assurances",
      "Allianz Congo",
      "Sanlam",
      "Activa Assurances",
      "AGC (Assurances Générales du Congo)"
    ]
  },
  {
    "country": "Côte d'Ivoire",
    "insurers": [
      "Sanlam",
      "SUNU Assurances",
      "NSIA Assurances",
      "Allianz",
      "AXA Côte d'Ivoire",
      "GNA Assurances",
      "La Loyale",
      "Atlantique Assurances",
      "SAFA"
    ]
  },
  {
    "country": "Gabon",
    "insurers": [
      "OGAR (Omnium Gabonais d'Assurances et de Réassurances)",
      "OGAR Vie",
      "AXA Gabon",
      "NSIA Assurances",
      "Sanlam",
      "ASSINCO"
    ]
  },
  {
    "country": "Sénégal",
    "insurers": [
      "AXA Sénégal",
      "Allianz Sénégal",
      "NSIA Assurances Sénégal",
      "SUNU Assurances Sénégal",
      "Sanlam Sénégal (ex-Saham)",
      "CNART",
      "AMSA Assurances",
      "La Prévoyance Assurances (PA)",
      "Wafa Assurance",
      "Askia Assurances"
    ]
  },
  {
    "country": "Mali",
    "insurers": [
      "SUNU Assurances Mali",
      "NSIA Mali",
      "Sanlam Mali",
      "Allianz Mali",
      "CNAR",
      "Lafia Assurances",
      "SABU NYUMAN",
      "Nallias"
    ]
  },
  {
    "country": "Togo",
    "insurers": [
      "GTA Assurances",
      "NSIA Assurances Togo",
      "SUNU Assurances Togo",
      "Sanlam Togo",
      "Fidélia Assurances",
      "Beneficial Life Insurance",
      "Ogar"
    ]
  },
  {
    "country": "Niger",
    "insurers": [
      "UGAN (Union Générale des Assurances du Niger)",
      "CARENI (Compagnie d'Assurance et de Réassurance du Niger)",
      "SNAR - Leyma",
      "SUNU Assurances Niger",
      "Sanlam Niger",
      "AMANA Assurances"
    ]
  },
  {
    "country": "Tchad",
    "insurers": [
      "STAR Nationale",
      "NSIA Assurances Tchad",
      "SUNU Assurances Tchad",
      "SAAR Assurances Tchad"
    ]
  },
  {
    "country": "Guinée-Bissau",
    "insurers": [
      "Guineense de Seguros",
      "A Mundial Seguros"
    ]
  },
  {
    "country": "Guinée Équatoriale",
    "insurers": [
      "EGTC (Empresa General de Seguros)"
    ]
  },
  {
    "country": "Maroc",
    "insurers": [
      "Wafa Assurance",
      "RMA – Royale Marocaine d’Assurance",
      "Mutuelle Taamine Chaabi (MATU)",
      "AXA Assurance Maroc",
      "Sanlam Maroc / Saham Assurance",
      "AtlantaSanad Assurance",
      "MCMA – Mutuelle Centrale Marocaine d’Assurances",
      "Marocaine Vie",
      "Allianz Maroc",
      "MAMDA – Mutuelle Agricole Marocaine d’Assurances",
      "Coface Maroc / Euler Hermes ACMAR",
      "CAT – Compagnie d’Assurance Transport",
      "Maroc Assistance International",
      "AXA Assistance Maroc",
      "Wafa IMA Assistance"
    ]
  },
  {
    "country": "Algérie",
    "insurers": [
      "SAA – Société Algérienne d’Assurance",
      "CAAR – Compagnie Algérienne d’Assurance et Réassurance",
      "CNMA – Compagnie Nationale d’Assurance",
      "Alliance Assurances",
      "Trust Algeria Assurance",
      "GAM – Assurance Méditerranéenne",
      "AXA Assurance Algérie",
      "Salama Assurance Algérie",
      "Mutuelle Assurance des Travailleurs de l’Éducation et de la Culture (MAATEC)",
      "Mutuelle Assurance des Commerçants & Industriels de la Région (MACIR)",
      "Compagnie Centrale de Réassurance (CCR)"
    ]
  },
  {
    "country": "Tunisie",
    "insurers": [
      "STAR – Société Tunisienne d’Assurances et de Réassurances",
      "LLOYD Assurances",
      "CARTE Assurances",
      "GAT – Groupe des Assurances de Tunis",
      "BH-Assurance",
      "COMAR – Compagnie Méditerranéenne d’Assurances et de Réassurances",
      "ASTREE Assurances",
      "Assurances BIAT",
      "MAGHREBIA Assurances",
      "Assurances AMI (Assurances Multirisques Ittihad)",
      "Zitouna Takaful",
      "El Amana Takaful",
      "At-Takafulia",
      "MAE – Mutuelle Assurance de l’Enseignement",
      "CTAMA – Caisse Tunisienne d’Assurances Mutuelles Agricoles",
      "HAYETT",
      "GAT Vie",
      "Maghrebia Vie",
      "Attijari Assurance",
      "Tunis Re"
    ]
  },
  {
    "country": "Libye",
    "insurers": [
      "Libya Insurance Company",
      "United Insurance Company",
      "African Insurance Company",
      "Sahara Insurance Company",
      "Takaful Insurance Company",
      "Trust Insurance Libya"
    ]
  },
  {
    "country": "Mauritanie",
    "insurers": [
      "NASR (Nouvelle Assurance et Réassurance)",
      "SAAR Assurances Mauritanie",
      "GAMA (Générale d'Assurance de Mauritanie)",
      "Daman Assurances",
      "Taamine (Société Mauritanienne d'Assurances)",
      "AGM (Assurances Générales de Mauritanie)"
    ]
  },
  {
    "country": "Bulgarie",
    "insurers": [
      "Armeec",
      "Bulstrad Vienna Insurance Group",
      "DZI (KBC Group)",
      "Allianz Bulgaria",
      "Lev Ins",
      "Euroins Bulgaria"
    ]
  },
  {
    "country": "Chypre",
    "insurers": [
      "General Insurance of Cyprus",
      "CNP Asfalistiki",
      "Trust Insurance Cyprus",
      "Universal Life",
      "Pancyprian Insurance"
    ]
  },
  {
    "country": "Croatie",
    "insurers": [
      "Croatia Osiguranje",
      "Allianz Zagreb",
      "Euroherc Osiguranje",
      "Wiener Osiguranje",
      "Generali Osiguranje"
    ]
  },
  {
    "country": "Estonie",
    "insurers": [
      "If Kindlustus",
      "ERGO Insurance SE",
      "Swedbank P&C Insurance",
      "Seesam Insurance",
      "Salva Kindlustus"
    ]
  },
  {
    "country": "Lettonie",
    "insurers": [
      "Balta",
      "BTA Baltic Insurance Company",
      "Gjensidige Latvia",
      "ERGO Latvia",
      "If Apdrošināšana"
    ]
  },
  {
    "country": "Lituanie",
    "insurers": [
      "Lietuvos Draudimas",
      "BTA",
      "ERGO Lithuania",
      "Gjensidige",
      "Compensa"
    ]
  },
  {
    "country": "Malte",
    "insurers": [
      "Mapfre Middlesea",
      "GasanMamo Insurance",
      "Atlas Insurance",
      "Citadel Insurance",
      "Elmo Insurance"
    ]
  },
  {
    "country": "Slovénie",
    "insurers": [
      "Zavarovalnica Triglav",
      "Zavarovalnica Sava",
      "Generali Zavarovalnica",
      "Vzajemna",
      "Grawe"
    ]
  }
];

export const REGIONS = ['Europe', 'Maghreb', 'CIMA'] as const;

export const COUNTRIES_BY_REGION: Record<(typeof REGIONS)[number], string[]> = {
  "Europe": [
    "Allemagne",
    "Autriche",
    "Belgique",
    "Bulgarie",
    "Chypre",
    "Croatie",
    "Danemark",
    "Espagne",
    "Estonie",
    "Finlande",
    "France",
    "Grèce",
    "Hongrie",
    "Irlande",
    "Italie",
    "Lettonie",
    "Lituanie",
    "Luxembourg",
    "Malte",
    "Pays-Bas",
    "Pologne",
    "Portugal",
    "République tchèque",
    "Roumanie",
    "Slovaquie",
    "Slovénie",
    "Suède",
    "Norvège",
    "Suisse",
    "Royaume-Uni"
  ],
  "Maghreb": [
    "Maroc",
    "Algérie",
    "Tunisie",
    "Libye",
    "Mauritanie"
  ],
  "CIMA": [
    "Bénin",
    "Burkina Faso",
    "Cameroun",
    "Centrafrique",
    "Congo (Brazzaville)",
    "Côte d'Ivoire",
    "Gabon",
    "Sénégal",
    "Mali",
    "Togo",
    "Niger",
    "Tchad",
    "Guinée-Bissau",
    "Guinée Équatoriale"
  ]
};
