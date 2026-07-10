import { createContext, useContext, useState, useEffect } from "react";
import { getStudentProfile } from "../services/studentServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
const fetchStudent = async () => {
  
  try {
    const response = await getStudentProfile();
    

    setStudent(response.student);
  } catch (error) { 
    setStudent(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  const token = localStorage.getItem("token");
  const student = localStorage.getItem("student");

  if (token && student) {
    fetchStudent();
  } else {
    setLoading(false);
  }
}, []);
 const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("student");
  localStorage.removeItem("society");
  setStudent(null);
}; 
  return (
    <AuthContext.Provider
      value={{
        student,
        setStudent,
        fetchStudent,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);