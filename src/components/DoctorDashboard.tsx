import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { STATES, SYMPTOMS, MOCK_PATIENTS } from "@/data/medical";
import type { DoctorInfo } from "@/types/medical";
import { useNavigate } from "react-router-dom";

interface DoctorDashboardProps {
  doctor: DoctorInfo;
}

const DoctorDashboard = ({ doctor }: DoctorDashboardProps) => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSymptom, setSelectedSymptom] = useState("");
  
  const selectedStateData = STATES.find(state => state.name === selectedState);
  const areas = selectedStateData?.areas || [];
  
  const filteredPatients = MOCK_PATIENTS.filter(patient => {
    return (!selectedState || patient.state === selectedState) &&
           (!selectedArea || patient.area === selectedArea) &&
           (!selectedSymptom || patient.symptoms.includes(selectedSymptom));
  });

  const patientPercentage = (filteredPatients.length / MOCK_PATIENTS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Welcome, Dr. {doctor.name}</h1>
            <p className="text-blue-600">{doctor.department} - {doctor.hospital}</p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/camp-schedules')}>
                Camp Schedules
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50/50">
          <div className="space-y-2">
            <Label className="text-blue-700">State</Label>
            <Select onValueChange={setSelectedState}>
              <SelectTrigger className="bg-white border-blue-200">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {STATES.map((state) => (
                  <SelectItem key={state.id} value={state.name}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-blue-700">Area</Label>
            <Select 
              onValueChange={setSelectedArea}
              disabled={!selectedState}
            >
              <SelectTrigger className="bg-white border-blue-200">
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-blue-700">Symptoms</Label>
            <Select onValueChange={setSelectedSymptom}>
              <SelectTrigger className="bg-white border-blue-200">
                <SelectValue placeholder="Select symptom" />
              </SelectTrigger>
              <SelectContent>
                {SYMPTOMS.map((symptom) => (
                  <SelectItem key={symptom.id} value={symptom.name}>
                    {symptom.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Patients</h2>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="p-4 bg-blue-50/30">
                <h3 className="font-medium text-blue-800">{patient.name}</h3>
                <p className="text-sm text-blue-600">
                  {patient.state}, {patient.area}
                </p>
                <p className="text-sm text-blue-600">
                  Symptoms: {patient.symptoms.join(", ")}
                </p>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-blue-600">
              Total Patients: {filteredPatients.length}
            </p>
            <p className="text-sm text-blue-600">
              Percentage: {patientPercentage.toFixed(1)}%
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;