export interface Student {
  studentId: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  course: string;
  hobby?: string;
  admissionDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
