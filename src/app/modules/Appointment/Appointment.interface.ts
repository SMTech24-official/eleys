// Appointment.interface: Module file for the Appointment.interface functionality.
export interface AppointmentPayload {
    serviceId: string;         
    firstName: string;         
    lastName: string;          
    email: string;             
    phone: string;             
    address: string;           
    notes?: string;            
    slotId: string;    
    price?: number        
    paymentStatus: PaymentStatus;  
    paymentType: PaymentType;      
    amountPaid: number;        
    remainingAmount: number;   
    payableAmount: number;     
    paymentMethodId?: string;  
  }
  
  // Example enums for PaymentStatus and PaymentType:
  enum PaymentStatus {
    PENDING = "PENDING",
    PARTIAL = "PARTIAL",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
  }
  
  enum PaymentType {
    CASH = "CASH",
    PARTIAL = "PARTIAL",
    FULL = "FULL",
    NONE = "NONE",
  }
  