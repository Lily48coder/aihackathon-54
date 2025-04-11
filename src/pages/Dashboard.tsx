
import { useAuth } from "@/context/AuthContext";
import DoctorDashboard from "@/components/DoctorDashboard";
import { DoctorHeader } from "@/components/DoctorHeader";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <DoctorHeader />
      <DoctorDashboard doctor={user} />
    </div>
  );
};

export default Dashboard;
