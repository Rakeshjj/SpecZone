export interface Brand {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface Solution {
  id: number;
  title: string;
  tagline: string;
  image: string;
  description: string;
}

export interface Location {
  id: number;
  name: string;
  city: string;
  image: string;
  address: string;
  phone: string;
  hours: string;
}

export interface ClinicalTableItem {
  type: string;
  description: string;
}

export interface MedicationTableItem {
  medication: string;
  action: string;
}

export interface ClinicalSignItem {
  sign: string;
  meaning: string;
}

export interface DiseaseStageItem {
  stage: string;
  category?: string;
  description?: string;
  features?: string[];
  complications?: string[];
}

export interface InvestigationTableItem {
  test: string;
  purpose: string;
}

export interface TreatmentSubtypeItem {
  category: string;
  description?: string;
  items: string[];
  note?: string;
}

export interface SecondaryConditionItem {
  title: string;
  definition?: string;
  causes: string[];
  symptoms: string[];
  treatments: string[];
  note?: string;
}

export interface FirstAidItem {
  situation: string;
  steps: string[];
  warning?: string;
  emergency?: boolean;
}

export interface InjuryTreatmentItem {
  injury: string;
  treatment: string;
}

export interface ClinicalSection {
  definition: string;
  causes: string[];
  riskFactors?: string[];
  symptoms: string[];
  treatments: string[];
  mechanism?: string;
  clinicalSigns?: string[];
  clinicalSignsTable?: ClinicalSignItem[];
  clinicalSignsSubsections?: { title: string; signs: string[] }[];
  stages?: DiseaseStageItem[];
  investigations?: string[];
  investigationsTable?: InvestigationTableItem[];
  systemicManagement?: string[];
  lifestyleChanges?: string[];
  mgdTreatment?: string[];
  prescriptionTreatment?: string[];
  treatmentSubtypes?: TreatmentSubtypeItem[];
  secondaryCondition?: SecondaryConditionItem;
  firstAid?: FirstAidItem[];
  injuryTreatmentTable?: InjuryTreatmentItem[];
  injections?: {
    category: string;
    medications: string[];
    action: string;
  };
  typesTable?: ClinicalTableItem[];
  medicationsTable?: MedicationTableItem[];
  laserTreatments?: string[];
  surgicalTreatments?: string[];
  earlyStageTreatment?: string[];
  treatmentWarning?: string;
  advancedTreatment?: string;
  emergencyAlert?: string;
  note?: string;
  example?: string;
}

export interface Article {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
  readTime: string;
  date: string;
  thumbnail: string;
  summary: string;
  content: string[];
  clinicalDetails?: ClinicalSection;
}
