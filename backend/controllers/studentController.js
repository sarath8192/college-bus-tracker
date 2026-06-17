let students = [
  {
    id: 1,
    name: "Sarath",
    email: "sarath@gmail.com",
    bus: "Bus-01",
    route: "Vijayawada",
  },
  {
    id: 2,
    name: "Ravi",
    email: "ravi@gmail.com",
    bus: "Bus-02",
    route: "Guntur",
  },
];

// GET all students
const getStudents = (req, res) => {
  res.status(200).json(students);
};

// GET student by ID
const getStudentById = (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.status(200).json(student);
};

// POST create student
const createStudent = (req, res) => {
  const { name, email, bus, route } = req.body;

  if (!name || !email || !bus || !route) {
    return res.status(400).json({
      message: "Please provide name, email, bus and route",
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    email,
    bus,
    route,
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student created successfully",
    student: newStudent,
  });
};

// PUT update student
const updateStudent = (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  const { name, email, bus, route } = req.body;

  student.name = name || student.name;
  student.email = email || student.email;
  student.bus = bus || student.bus;
  student.route = route || student.route;

  res.status(200).json({
    message: "Student updated successfully",
    student,
  });
};

// DELETE student
const deleteStudent = (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  students = students.filter((s) => s.id !== id);

  res.status(200).json({
    message: "Student deleted successfully",
  });
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};