
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STATES, SYMPTOMS, MOCK_PATIENTS } from "@/data/medical";
import { useToast } from "@/hooks/use-toast";
import { DoctorHeader } from "@/components/DoctorHeader";
import { PatientStatisticsCard } from "@/components/PatientStatisticsCard";
import { PatientList } from "@/components/PatientList";
import { ArrowUpRight, Users } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");
  const [filteredPatients, setFilteredPatients] = useState(MOCK_PATIENTS);

  // Find the state object for the selected state
  const stateObj = STATES.find(state => state.name === selectedState);

  // Calculate statistics
  const totalPatients = MOCK_PATIENTS.length;
  
  // Add risk levels to patients (for demo purposes)
  const patientsWithRisk = MOCK_PATIENTS.map(patient => ({
    ...patient,
    riskLevel: getRandomRiskLevel() as "low" | "medium" | "high"
  }));

  // Helper function to get random risk level
  function getRandomRiskLevel() {
    const risks = ["low", "medium", "high"];
    return risks[Math.floor(Math.random() * risks.length)];
  }

  // Prepare data for pie charts
  const stateData = Object.entries(
    MOCK_PATIENTS.reduce((acc, patient) => {
      acc[patient.state] = (acc[patient.state] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([name, value]) => ({
      name,
      value,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const symptomData = Object.entries(
    MOCK_PATIENTS.flatMap(p => p.symptoms).reduce((acc, symptom) => {
      acc[symptom] = (acc[symptom] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([name, value]) => ({
      name,
      value,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Update filtered patients whenever selections change
  useEffect(() => {
    const filtered = patientsWithRisk.filter(patient => {
      const matchesState = !selectedState || patient.state === selectedState;
      const matchesArea = !selectedArea || patient.area === selectedArea;
      const matchesSymptom = !selectedSymptom || patient.symptoms.includes(selectedSymptom);
      return matchesState && matchesArea && matchesSymptom;
    });
    
    setFilteredPatients(filtered);
    
    // Show toast when filters are applied
    if (selectedState || selectedArea || selectedSymptom) {
      toast({
        title: "Filters Applied",
        description: `Showing ${filtered.length} of ${totalPatients} patients`,
      });
    }
  }, [selectedState, selectedArea, selectedSymptom, totalPatients, toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, Dr. {user?.name}
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="bg-medical-light p-3 rounded-full">
                <Users className="h-6 w-6 text-medical-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Patients</p>
                <div className="flex items-center">
                  <h3 className="text-xl font-bold">{totalPatients}</h3>
                  <ArrowUpRight className="h-4 w-4 text-medical-success ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">State</label>
                <Select onValueChange={setSelectedState} value={selectedState}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All States</SelectItem>
                    {STATES.map((state) => (
                      <SelectItem key={state.name} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Area</label>
                <Select 
                  onValueChange={setSelectedArea} 
                  disabled={!selectedState}
                  value={selectedArea}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder={selectedState ? "Select area" : "Select state first"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Areas</SelectItem>
                    {stateObj?.areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Symptoms</label>
                <Select onValueChange={setSelectedSymptom} value={selectedSymptom}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select symptom" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Symptoms</SelectItem>
                    {SYMPTOMS.map((symptom) => (
                      <SelectItem key={symptom.id} value={symptom.name}>
                        {symptom.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <PatientStatisticsCard 
            title="Patients by State" 
            data={stateData}
          />
          <PatientStatisticsCard 
            title="Common Symptoms" 
            data={symptomData}
          />
        </div>

        {/* Patient List */}
        <PatientList patients={filteredPatients} />
      </main>
    </div>
  );
};

export default Dashboard;
