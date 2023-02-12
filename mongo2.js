db.users.insertMany([
  {
    name: "Maverick",
    codeKata: 200,
    mentor: "Tom Cat",
    classes: [
      {
        topic: "HTML",
        date: ISODate("2022-09-15"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-09-15"),
      },
      {
        topic: "CSS",
        date: ISODate("2022-09-30"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-09-30"),
      },
      {
        topic: "JAVASCRIPT",
        date: ISODate("2022-10-01"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-10-01"),
      },
      {
        topic: "REACT",
        date: ISODate("2022-10-15"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-10-15"),
      },
      {
        topic: "NODE",
        date: ISODate("2022-10-31"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-10-31"),
      },
      {
        topic: "MONGO",
        date: ISODate("2022-11-01"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-11-01"),
      },
    ],
  },
  {
    name: "Rooster",
    codeKata: 120,
    mentor: "Tom Cat",
    classes: [
      {
        topic: "HTML",
        date: ISODate("2022-09-15"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-09-15"),
      },
      {
        topic: "CSS",
        date: ISODate("2022-09-30"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-09-30"),
      },
      {
        topic: "JAVASCRIPT",
        date: ISODate("2022-10-01"),
        attendance: false,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-10-01"),
      },
      {
        topic: "REACT",
        date: ISODate("2022-10-15"),
        attendance: true,
        isTaskSubmitted: false,
        taskSubmittedDate: false,
      },
      {
        topic: "NODE",
        date: ISODate("2022-10-31"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-10-31"),
      },
      {
        topic: "MONGO",
        date: ISODate("2022-11-01"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-11-01"),
      },
    ],
  },
  {
    name: "Pay back",
    codeKata: 125,
    mentor: "Tom Cat",
    classes: [
      {
        topic: "HTML",
        date: ISODate("2022-09-15"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-09-15"),
      },
      {
        topic: "CSS",
        date: ISODate("2022-09-30"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-09-30"),
      },
      {
        topic: "JAVASCRIPT",
        date: ISODate("2022-10-01"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-10-01"),
      },
      {
        topic: "REACT",
        date: ISODate("2022-10-15"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-10-15"),
      },
      {
        topic: "NODE",
        date: ISODate("2022-10-31"),
        attendance: false,
        isTaskSubmitted: false,
        taskSubmittedDate: false,
      },
      {
        topic: "MONGO",
        date: ISODate("2022-11-01"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-11-01"),
      },
    ],
  },
  {
    name: "Fanboy",
    codeKata: 200,
    mentor: "Jerry",
    classes: [
      {
        topic: "HTML",
        date: ISODate("2022-09-15"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-09-15"),
      },
      {
        topic: "CSS",
        date: ISODate("2022-09-30"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-09-30"),
      },
      {
        topic: "JAVASCRIPT",
        date: ISODate("2022-10-01"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-10-01"),
      },
      {
        topic: "REACT",
        date: ISODate("2022-10-15"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-10-15"),
      },
      {
        topic: "NODE",
        date: ISODate("2022-10-31"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-10-31"),
      },
      {
        topic: "MONGO",
        date: ISODate("2022-11-01"),
        attendance: true,
        isTaskSubmitted: true,
        taskSubmittedDate: ISODate("2022-11-01"),
      },
    ],
  },
]);

//Find all the topics and tasks which are thought in the month of October
db.users.aggregate([
  { $unwind: "$classes" },
  {
    $match: {
      "classes.date": {
        $gte: new Date("2022-10-01"),
        $lte: new Date("2022-10-31"),
      },
    },
  },
  { $group: { _id: "$classes.topic" } },
]); //db.users.aggregate([{ $unwind: { path: "$classes" } }]);

//Find the number of problems solved by the user in codekata
db.users.find({}, { name: 1, codeKata: 1 });

//Find all the mentors with who has the mentee's count more than 15
db.users.aggregate([
  {
    $group: {
      _id: "$mentor",
      StudentCount: { $count: {} },
    },
  },
  { $match: { StudentCount: { $gte: 2 } } },
]);

//Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

db.users.aggregate([
  { $unwind: "$classes" },
  {
    $match: {
      $and: [
        { "classes.date": { $gte: new Date("2022-10-15") } },
        { "classes.date": { $lt: new Date("2022-10-31") } },
        { "classes.isTaskSubmitted": false },
        { "classes.attendance": false },
      ],
    },
  },
]);

// _____________________________________________________________________________________________

db.placement.insertMany([
  {
    company: "Dassault Rafale",
    date: ISODate("2022-10-15"),
    attendedStudent: ["Maverick", "Rooster", "Pay back"],
  },
  {
    company: "F-15 Eagle",
    date: ISODate("2022-10-20"),
    attendedStudent: ["Maverick", "Fanboy"],
  },
  {
    company: "Dassault Mirage",
    date: ISODate("2022-10-22"),
    attendedStudent: ["Maverick", "Pay back"],
  },
  {
    company: "Lockheed Martin",
    date: ISODate("2022-11-15"),
    attendedStudent: ["Maverick", "Rooster", "Pay back"],
  },
]);
//____________________________________________________________________________________________

//Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.placement.find(
  { date: { $gte: new Date("2022-10-15"), $lt: new Date("2022-10-31") } },
  { company: 1, date: 1 }
);

//ind all the company drives and students who are appeared for the placement.
db.placement.find({}, { company: 1, attendedStudent: 1 });
