
export const mockUsers = [
  {
    id: "1",
    membershipId: "MEM-2024-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    city: "New York",
    role: "user",
    membershipPlanId: "1",
    membershipStatus: "approved",
    joinDate: "2024-01-15",
    endDate: "2025-01-15",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    membershipId: "MEM-2024-002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1234567891",
    city: "Los Angeles",
    role: "user",
    membershipPlanId: "2",
    membershipStatus: "approved",
    joinDate: "2024-02-20",
    endDate: "2025-02-20",
    createdAt: "2024-02-20T10:00:00Z",
    updatedAt: "2024-02-20T10:00:00Z",
  },
  {
    id: "3",
    membershipId: "MEM-2024-003",
    name: "Bob Wilson",
    email: "bob@example.com",
    phone: "+1234567892",
    city: "Chicago",
    role: "user",
    membershipPlanId: "1",
    membershipStatus: "pending",
    joinDate: "2024-03-10",
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
  },
];

export const mockAdmins = [
  {
    id: "a1",
    name: "Admin User",
    email: "admin@example.com",
    phone: "+1234567800",
    role: "admin",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "sa1",
    name: "Super Admin",
    email: "superadmin@example.com",
    phone: "+1234567801",
    role: "super_admin",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
];

export const mockMembershipPlans = [
  {
    id: "1",
    name: "Basic Plan",
    description: "Perfect for individuals starting their membership journey",
    benefits: [
      "Access to basic features",
      "Monthly newsletter",
      "Community forum access",
      "Email support",
    ],
    price: 29.99,
    duration: 12,
    isActive: true,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Premium Plan",
    description: "For members who want the complete experience",
    benefits: [
      "All Basic Plan features",
      "Priority support",
      "Exclusive events access",
      "Advanced analytics",
      "Personal account manager",
    ],
    price: 99.99,
    duration: 12,
    isActive: true,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "3",
    name: "Enterprise Plan",
    description: "Tailored solutions for organizations",
    benefits: [
      "All Premium Plan features",
      "Custom integrations",
      "Dedicated support team",
      "Unlimited team members",
      "White-label options",
      "API access",
    ],
    price: 299.99,
    duration: 12,
    isActive: true,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
];

export const mockAnnouncements = [
  {
    id: "1",
    sNo: 1,
    title: "Welcome to 2024!",
    description:
      "We are excited to announce new features and improvements coming this year.",
    date: "2024-01-01",
    viewCount: 245,
    createdBy: "Super Admin",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "2",
    sNo: 2,
    title: "New Membership Benefits",
    description:
      "We have added new exclusive benefits for our premium members.",
    date: "2024-01-15",
    viewCount: 189,
    createdBy: "Admin User",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "3",
    sNo: 3,
    title: "Upcoming Event: Member Meetup",
    description:
      "Join us for our quarterly member meetup on February 20th.",
    date: "2024-02-01",
    viewCount: 156,
    createdBy: "Super Admin",
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-02-01T10:00:00Z",
  },
];

export const mockApplications = [
  {
    id: "app1",
    userId: "3",
    userName: "Bob Wilson",
    userEmail: "bob@example.com",
    membershipPlanId: "1",
    membershipPlanName: "Basic Plan",
    status: "pending",
    appliedAt: "2024-03-10T10:00:00Z",
  },
  {
    id: "app2",
    userId: "4",
    userName: "Alice Brown",
    userEmail: "alice@example.com",
    membershipPlanId: "2",
    membershipPlanName: "Premium Plan",
    status: "pending",
    appliedAt: "2024-03-12T10:00:00Z",
  },
];

export const mockDashboardStats = {
  totalUsers: 1250,
  totalAdmins: 8,
  totalMembers: 1100,
  totalAnnouncements: 45,
  membershipsByPlan: [
    { planName: "Basic Plan", count: 650 },
    { planName: "Premium Plan", count: 350 },
    { planName: "Enterprise Plan", count: 100 },
  ],
  pendingApplications: 25,
  approvedApplications: 1050,
  rejectedApplications: 75,
};

// Generate more users for reports
export const generateMockUsersForReports = () => {
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

  const plans = ["1", "2", "3"];
  const statuses = ["approved", "pending", "rejected"];

  const users = [];

  for (let i = 1; i <= 1000; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const joinDate = new Date(
      2023,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    );

    const endDate = new Date(joinDate);
    endDate.setFullYear(endDate.getFullYear() + 1);

    users.push({
      id: `user-${i}`,
      membershipId: `MEM-2024-${String(i).padStart(4, "0")}`,
      name: `Member ${i}`,
      email: `member${i}@example.com`,
      phone: `+1234567${String(i).padStart(4, "0")}`,
      city: cities[Math.floor(Math.random() * cities.length)],
      role: "user",
      membershipPlanId: plans[Math.floor(Math.random() * plans.length)],
      membershipStatus: status,
      joinDate: joinDate.toISOString().split("T")[0],
      endDate: status === "approved" ? endDate.toISOString().split("T")[0] : undefined,
      createdAt: joinDate.toISOString(),
      updatedAt: joinDate.toISOString(),
    });
  }

  return users;
};

export const mockReportUsers = generateMockUsersForReports();
