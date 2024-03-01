export const sortDataTugas = (data) => {
  const sortedTasks = data.sort((a, b) => {
    if (a.status === "completed" && b.status !== "completed") {
      return 1;
    }
    if (b.status === "completed" && a.status !== "completed") {
      return -1;
    }
    return new Date(a.deadLine) - new Date(b.deadLine);
  });

  const completedTasks = sortedTasks.filter(
    (task) => task.status === "completed"
  );

  const incompletedTasks = sortedTasks.filter(
    (task) => task.status !== "completed"
  );

  const result = [...incompletedTasks, ...completedTasks];
  return result;
};
