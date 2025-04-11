
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { DoctorHeader } from "@/components/DoctorHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hospital, User, Building, Phone, Mail, FileText } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorHeader />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <Card className="p-6 text-center shadow-md">
              <div className="h-32 w-32 mx-auto mb-4 rounded-full bg-medical-light flex items-center justify-center">
                <User className="h-16 w-16 text-medical-primary" />
              </div>
              <h2 className="text-xl font-semibold">Dr. {user?.name}</h2>
              <p className="text-medical-primary">{user?.department}</p>
              <p className="text-gray-500 mt-1">{user?.hospital}</p>
              
              <div className="mt-6">
                <Button className="w-full bg-medical-primary hover:bg-medical-primary/90">
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full mt-2 border-medical-primary text-medical-primary hover:bg-medical-light">
                  Change Password
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <Tabs defaultValue="personal">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-6">
                <Card className="p-6 shadow-md">
                  <h3 className="font-semibold text-lg mb-4 border-b pb-2">Personal Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-medical-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">Dr. {user?.name || "Sahiti Sri"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-medical-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user?.name ? user.name.toLowerCase().replace(' ', '.') + '@example.com' : "sahiti.sri@example.com"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-medical-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">+91 98765 43210</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="professional" className="space-y-6">
                <Card className="p-6 shadow-md">
                  <h3 className="font-semibold text-lg mb-4 border-b pb-2">Professional Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-medical-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="font-medium">{user?.department || "Cardiology"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Hospital className="h-5 w-5 text-medical-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Hospital</p>
                        <p className="font-medium">{user?.hospital || "City Hospital"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-medical-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        <p className="font-medium">8 Years</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-6">
                <Card className="p-6 shadow-md">
                  <h3 className="font-semibold text-lg mb-4 border-b pb-2">Documents & Certifications</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-medical-primary" />
                        <div>
                          <p className="font-medium">Medical License</p>
                          <p className="text-sm text-gray-500">Uploaded on: 18 Jan 2024</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    
                    <div className="p-4 border rounded-md flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-medical-primary" />
                        <div>
                          <p className="font-medium">Board Certification</p>
                          <p className="text-sm text-gray-500">Uploaded on: 05 Dec 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    
                    <div className="p-4 border rounded-md flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-medical-primary" />
                        <div>
                          <p className="font-medium">Medical Degree</p>
                          <p className="text-sm text-gray-500">Uploaded on: 20 Nov 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full">Upload New Document</Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
