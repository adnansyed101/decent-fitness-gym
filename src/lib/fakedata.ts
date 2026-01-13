export const members = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@gym.com',
    phone: '555-0101',
    age: 28,
    joinDate: '2024-01-15',
    admissionFeePaid: true,
    monthlyFeeStatus: 'paid',
    lastPaymentDate: '2025-01-01',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@gym.com',
    phone: '555-0102',
    age: 24,
    joinDate: '2024-02-20',
    admissionFeePaid: true,
    monthlyFeeStatus: 'paid',
    lastPaymentDate: '2025-01-05',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike@gym.com',
    phone: '555-0103',
    age: 32,
    joinDate: '2024-03-10',
    admissionFeePaid: true,
    monthlyFeeStatus: 'unpaid',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@gym.com',
    phone: '555-0104',
    age: 26,
    joinDate: '2024-04-05',
    admissionFeePaid: true,
    monthlyFeeStatus: 'pending',
  },
  {
    id: '5',
    name: 'Chris Brown',
    email: 'chris@gym.com',
    phone: '555-0105',
    age: 30,
    joinDate: '2024-05-12',
    admissionFeePaid: true,
    monthlyFeeStatus: 'paid',
    lastPaymentDate: '2025-01-08',
  },
]

export const attendance = [
  {
    id: '1',
    memberId: '1',
    date: '2025-01-13',
    checkIn: '06:30',
    checkOut: '08:00',
    duration: 90,
  },
  {
    id: '2',
    memberId: '2',
    date: '2025-01-13',
    checkIn: '07:00',
    checkOut: '08:30',
    duration: 90,
  },
  { id: '3', memberId: '3', date: '2025-01-13', checkIn: '17:00' },
  {
    id: '4',
    memberId: '1',
    date: '2025-01-12',
    checkIn: '06:15',
    checkOut: '07:45',
    duration: 90,
  },
  {
    id: '5',
    memberId: '2',
    date: '2025-01-12',
    checkIn: '07:30',
    checkOut: '09:00',
    duration: 90,
  },
  {
    id: '6',
    memberId: '4',
    date: '2025-01-12',
    checkIn: '18:00',
    checkOut: '19:30',
    duration: 90,
  },
]

export const notices = [
  {
    id: '1',
    title: 'New Year Schedule',
    content:
      'Gym will be open from 6 AM to 10 PM during the holiday season. Special classes available!',
    date: '2025-01-10',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Equipment Maintenance',
    content:
      'The treadmills will be under maintenance this Saturday. Please use alternative cardio equipment.',
    date: '2025-01-08',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'New Trainer Introduction',
    content: 'Welcome our new yoga instructor joining us next week!',
    date: '2025-01-05',
    priority: 'low',
  },
]

export const currentUser = {
  id: 'trainer-1',
  name: 'Alex Thompson',
  email: 'trainer@gym.com',
  role: 'trainer',
}
