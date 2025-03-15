const dataBaseGeneralSchema = {
  user: {
    name: "string",
    lastname: "string",
    email: "string",
    password: "string",
    analytics: {
      questions: {
        votesAccepted: "number",
        votesRejected: "number",
        questionsAsked: "number",
      },
      answers: {
        votesAccepted: "number",
        votesRejected: "number",
        answersGiven: "number",
      },
    },
  },

  tags: {
    _id: "ObjectId",
    name: "String",
    createdAt: "Date",
  },

  question: {
    userId: "ObjectId", // Usuario 1 que hizo la pregunta
    title: "string",
    content: "string",
    tags: ["ObjectId"],
    votes: [
      {
        userId: "ObjectId", // Usuario 2 que votó
        vote: {
          type: "number", // 0: Rechazado, 1: Aceptado
          enum: [0, 1],
        },
      },
    ],
  },

  answer: {
    userId: "ObjectId", // Usuario 2 que respondió
    questionId: "ObjectId", // Pregunta a la que responde
    content: "string",
    votes: [
      {
        userId: "ObjectId", // Usuario 3 que votó
        vote: {
          type: "number", // 0: Rechazado, 1: Aceptado
          enum: [0, 1],
        },
      },
    ],
  },

  resources: {
    title: "String",
    description: "String",
    url: "String",
    downloads: "Number",
    views: "Number",
    ratings: "[Number]",
    commentsCount: "Number",
  },

  comments: {
    resourceId: "ObjectId",
    userId: "ObjectId",
    body: "String",
    createdAt: "Date",
  },
};
