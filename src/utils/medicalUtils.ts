
/**
 * Medical utility functions for the doctor interface
 */

// Calculate risk level based on symptoms and patient data
export const calculateRiskLevel = (symptoms: string[]): "low" | "medium" | "high" => {
  const highRiskSymptoms = [
    "Chest Pain or Discomfort",
    "Shortness of Breath",
    "Severe Headache",
    "Loss of Consciousness",
    "Sudden Weakness or Numbness",
    "Difficulty Speaking or Understanding",
    "Seizures"
  ];
  
  const mediumRiskSymptoms = [
    "Fever",
    "Persistent Cough",
    "Dizziness",
    "Abdominal Pain or Cramping",
    "Gastrointestinal Bleeding",
    "Joint Pain or Swelling",
    "Bleeding or Bruising"
  ];
  
  // Check if any high risk symptoms are present
  for (const symptom of symptoms) {
    if (highRiskSymptoms.some(s => symptom.includes(s))) {
      return "high";
    }
  }
  
  // Check if any medium risk symptoms are present
  for (const symptom of symptoms) {
    if (mediumRiskSymptoms.some(s => symptom.includes(s))) {
      return "medium";
    }
  }
  
  // Default to low risk
  return "low";
};

// Format location data for display
export const formatLocation = (state: string, area: string): string => {
  return `${area}, ${state}`;
};

// Group patients by risk level
export const groupPatientsByRisk = (patients: any[]) => {
  return patients.reduce((groups, patient) => {
    const risk = patient.riskLevel || "unknown";
    if (!groups[risk]) groups[risk] = [];
    groups[risk].push(patient);
    return groups;
  }, {} as Record<string, any[]>);
};

// Calculate age from birthdate
export const calculateAge = (birthdate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const m = today.getMonth() - birthdate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
};

// Generate a list of potential diagnoses based on symptoms
export const generatePotentialDiagnoses = (symptoms: string[]): string[] => {
  const diagnosisMap: Record<string, string[]> = {
    "Fever": ["Common Cold", "Influenza", "COVID-19", "Malaria"],
    "Cough": ["Common Cold", "Bronchitis", "Pneumonia", "Asthma"],
    "Headache": ["Tension Headache", "Migraine", "Sinusitis", "Intracranial Pressure"],
    "Chest Pain": ["Angina", "Myocardial Infarction", "Pulmonary Embolism", "GERD"],
    "Shortness of Breath": ["Asthma", "COPD", "Pneumonia", "Heart Failure"],
    "Fatigue": ["Anemia", "Depression", "Hypothyroidism", "Chronic Fatigue Syndrome"]
  };
  
  const diagnoses = new Set<string>();
  
  symptoms.forEach(symptom => {
    Object.keys(diagnosisMap).forEach(key => {
      if (symptom.includes(key)) {
        diagnosisMap[key].forEach(diagnosis => diagnoses.add(diagnosis));
      }
    });
  });
  
  return Array.from(diagnoses);
};

// Calculate medical camp capacity based on area population density
export const calculateCampCapacity = (area: string): number => {
  // This would ideally be based on real population data
  // For now, return a random number between 50 and 200
  return Math.floor(Math.random() * 151) + 50;
};
