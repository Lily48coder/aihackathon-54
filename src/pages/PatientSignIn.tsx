
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PatientSignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const gmailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (!validateEmail(value)) {
      setEmailError("Please use a valid Gmail address (username@gmail.com)");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 4 || value.length > 13) {
      setPasswordError("The password must contain 4 characters minimum and 13 maximum");
    } else {
      setPasswordError("");
    }
    setPassword(value);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateEmail(email) && !passwordError) {
      toast({
        title: "Successfully Signed In!",
        description: "Welcome back to the platform.",
      });
      navigate("/patient/history");
    } else {
      toast({
        title: "Sign In Error",
        description: "Please correct the email and password errors.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-green-800">Patient Sign In</h1>
        
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-green-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your Gmail address"
              value={email}
              onChange={handleEmailChange}
              required
              className={`border-green-200 focus:border-green-400 focus:ring-green-400 ${
                emailError ? 'border-red-500 focus:border-red-500' : ''
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-green-700">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
              className={`border-green-200 focus:border-green-400 focus:ring-green-400 ${
                passwordError ? 'border-red-500 focus:border-red-500' : ''
              }`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default PatientSignIn;
