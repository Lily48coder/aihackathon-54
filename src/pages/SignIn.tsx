
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Lock, Mail } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, setUserData } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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
    if (!passwordError) {
      const formData = JSON.parse(localStorage.getItem('signupData') || '{}');
      const userData = {
        name: formData.name || 'Sahiti Sri',
        department: formData.department || 'Cardiology',
        hospital: formData.hospital || 'City Hospital'
      };
      
      setUserData(userData);
      login();
      toast({
        title: "Successfully Signed In!",
        description: "Welcome back to SymptoCamp.",
      });
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-light to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6 shadow-lg">
        <div className="flex flex-col items-center text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Doctor Sign In</h1>
          <p className="text-gray-600 mt-2">Sign in to access your SymptoCamp dashboard</p>
        </div>
        
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-medical-primary" />
              <span>Email Address</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-medical-primary" />
              <span>Password</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
              className={`bg-white ${
                passwordError ? 'border-red-500 focus:border-red-500' : ''
              }`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember-me" 
                checked={rememberMe} 
                onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
              />
              <label htmlFor="remember-me" className="text-sm text-gray-600 cursor-pointer">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-medical-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-primary/90">
            Sign In
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>
          
          <Button 
            type="button"
            variant="outline" 
            className="w-full border-gray-300"
            onClick={() => navigate("/sign-up")}
          >
            Create an Account
          </Button>
        </form>

        <Button 
          variant="ghost" 
          className="w-full flex items-center justify-center"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </Card>
    </div>
  );
};

export default SignIn;
