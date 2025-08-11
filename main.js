// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
try{
const result = [];
const learners ={};

const currentDate = new Date();


for(const sub of submissions){
  const assignments = ag.assignments.find( a => a.id === sub.assignment_id)

  if (!assignments){
    continue;}

  const dueDate = new Date(assignments.due_at);
  if (dueDate > currentDate){
    continue;
  }

  let score = sub.submission.score;
  const points = assignments.points_possible;

  //if the assignment is late
  const submitted_Date = new Date(sub.submission.submitted_at);
  if(submitted_Date >dueDate){
    score -= points * 0.10;
  }

  const grade = score / points;

  if (!learners[sub.learner_id]){
    learners[sub.learner_id] = {
      id: sub.learner_id,
      totalScore: 0,
      totalPoints: 0,
  }

  }

  learners[sub.learner_id][assignments.id] = Number(grade.toFixed(3));
  learners[sub.learner_id].totalScore += score;
  learners[sub.learner_id].totalPoints += points;
}

const learnerIDs = Object.keys(learners);

for (let i = 0; i < learnerIDs.length; i++) {

  const id = learnerIDs[i];
  const learner = learners[id];

  learner.avg = Number((learner.totalScore / learner.totalPoints).toFixed(3));
  delete learner.totalScore;
  delete learner.totalPoints;
  result.push(learner);
}

// this is how the out put should look 
  // const result = [
  //   {
  //     id: 125,
  //     avg: 0.985, // (47 + 150) / (50 + 150)
  //     1: 0.94, // 47 / 50
  //     2: 1.0 // 150 / 150
  //   },
  //   {
  //     id: 132,
  //     avg: 0.82, // (39 + 125) / (50 + 150)
  //     1: 0.78, // 39 / 50
  //     2: 0.833 // late: (140 - 15) / 150
  //   }
  // ];

  return result;
} catch(err){

  console.error("Failed", err.message);
  return[]
}
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
