import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { CAMP_SCHEDULES, STATES } from "@/data/medical";
import { useToast } from "@/hooks/use-toast";
import { DoctorHeader } from "@/components/DoctorHeader";
import { CalendarIcon, MapPin, Clock, Users, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CampSchedules = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [campName, setCampName] = useState("");
  const [campDescription, setCampDescription] = useState("");

  // Find the state object for the selected state
  const stateObj = STATES.find(state => state.name === selectedState);

  const handleSchedule = () => {
    if (date && campName && selectedState) {
      toast({
        title: "Camp Scheduled Successfully!",
        description: `${campName} has been scheduled for ${date.toLocaleDateString()}.`,
      });
      setIsCreateDialogOpen(false);
      // Reset form
      setDate(undefined);
      setCampName("");
      setCampDescription("");
      setSelectedState("");
      setSelectedArea("");
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Medical Camps</h1>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-medical-primary hover:bg-medical-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                New Camp
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule a New Medical Camp</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Camp Name</label>
                  <Input 
                    value={campName} 
                    onChange={(e) => setCampName(e.target.value)} 
                    placeholder="Enter camp name" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    initialFocus
                    disabled={(day) => day < new Date()}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <Select onValueChange={setSelectedState} value={selectedState}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
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
                        {stateObj?.areas.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={campDescription}
                    onChange={(e) => setCampDescription(e.target.value)}
                    placeholder="Enter details about the camp"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSchedule}>Schedule Camp</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAMP_SCHEDULES.map((schedule, index) => (
            <Card key={index} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-medical-light pb-2 border-b">
                <CardTitle className="font-semibold text-medical-primary text-lg">
                  {schedule.department}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 pb-2">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <CalendarIcon className="h-4 w-4 text-medical-primary" />
                    <span>{schedule.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-medical-primary" />
                    <span>{schedule.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Clock className="h-4 w-4 text-medical-primary" />
                    <span>{schedule.timing}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-medical-primary text-medical-primary hover:bg-medical-light">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Attendance
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{schedule.department} Camp</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-gray-700 mb-4">
                        This feature will allow you to manage patient attendance for the camp.
                      </p>
                      <div className="flex justify-end">
                        <Button onClick={() => toast({
                          title: "Feature Coming Soon",
                          description: "The attendance management feature will be available in the next update."
                        })}>
                          View Attendees
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CampSchedules;
