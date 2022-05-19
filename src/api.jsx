export const getComments = async () => {
  return [
    {
      id: 1,
      body: "First comment",
      username: "manikangkandas",
      userId: 1,
      parentId: null,
      createdAt: "2021-02-16T23:00:33.010+02:00",
    },
    {
      id: 2,
      body: "Second comment",
      username: "gayatridas",
      userId: 2,
      parentId: null,
      createdAt: "2021-05-16T23:00:33.010+02:00",
    },
    {
      id: 3,
      body: "First comment first child",
      username: "dipambitabaishyadas",
      userId: 3,
      parentId: 1,
      createdAt: "2021-07-16T23:00:33.010+02:00",
    },
    {
      id: 4,
      body: "Second comment second child",
      username: "asity.tech",
      userId: 4,
      parentId: 2,
      createdAt: "2021-01-16T23:00:33.010+02:00",
    },
    {
      id: 5,
      body: "Third comment",
      username: "manikangkandas",
      userId: 1,
      parentId: null,
      createdAt: "2021-05-16T23:00:33.010+02:00",
    },
    {
      id: 6,
      body: "Fourth comment",
      username: "gayatridas",
      userId: 2,
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: 7,
      body: "Fifth comment",
      username: "dipambitabaishyadas",
      userId: 3,
      parentId: null,
      createdAt: "2021-02-16T23:00:33.010+02:00",
    },
    {
      id: 8,
      body: "Second comment second child",
      username: "manikangkandas",
      userId: 1,
      parentId: 2,
      createdAt: "2021-09-16T23:00:33.010+02:00",
    },
  ];
};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: 1,
    username: "manikangkandasdas",
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
