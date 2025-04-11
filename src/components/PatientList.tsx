
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Patient {
  id: number;
  name: string;
  state: string;
  area: string;
  symptoms: string[];
  riskLevel?: "low" | "medium" | "high";
}

interface PatientListProps {
  patients: Patient[];
}

export function PatientList({ patients }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "risk">("name");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.symptoms.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      patient.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      const riskOrder = { high: 0, medium: 1, low: 2, undefined: 3 };
      return (
        (riskOrder[a.riskLevel || "undefined"] || 3) -
        (riskOrder[b.riskLevel || "undefined"] || 3)
      );
    }
  });

  const getRiskColor = (risk?: "low" | "medium" | "high") => {
    switch (risk) {
      case "high":
        return "bg-medical-danger text-white";
      case "medium":
        return "bg-medical-warning text-white";
      case "low":
        return "bg-medical-success text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Patient List</CardTitle>
        <div className="flex items-center justify-between mt-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search patients or symptoms..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("name")}>
                  Sort by Name
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("risk")}>
                  Sort by Risk
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3 mt-4 max-h-[450px] overflow-y-auto pr-1">
          {sortedPatients.length > 0 ? (
            sortedPatients.map((patient) => (
              <div
                key={patient.id}
                className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{patient.name}</h3>
                    <p className="text-sm text-gray-600">
                      {patient.state}, {patient.area}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {patient.symptoms.map((symptom) => (
                        <Badge key={symptom} variant="secondary" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {patient.riskLevel && (
                      <Badge className={cn("ml-auto", getRiskColor(patient.riskLevel))}>
                        {patient.riskLevel.charAt(0).toUpperCase() + patient.riskLevel.slice(1)} Risk
                      </Badge>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Contact Patient</DropdownMenuItem>
                        <DropdownMenuItem>Add to Camp</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-gray-500">
              No patients found with the current search criteria.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
