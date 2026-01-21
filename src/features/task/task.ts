import { Task } from '../../entities/task/model';

export function filterSelectedTasks(tasks: Task[]): Task[] {
  return tasks.filter((task) => {
    return task.done;
  });
}

export function mutableUpdateTask(
  tasks: Task[],
  taskId: string,
  patch: Partial<Task>,
) {
  tasks.forEach((task, index) => {
    if (task.id === taskId) {
      tasks[index] = { ...task, ...patch };
    }
  });
}

export function updateTask(
  tasks: Task[],
  taskId: string,
  patch: Partial<Task>,
) {
  return tasks.map((task, index) => {
    if (task.id === taskId) {
      tasks[index] = { ...task, ...patch };
    }
  });
}

export function showTitle(
  tasks: Task[],
  taskId: string,
): Pick<Task, 'title'> | null {
  const task = tasks.find((task) => task.id === taskId);

  return task ? { title: task.title } : null;
}

export function showNullableTitle(
  tasks: Task[],
  taskId: string,
): Pick<Task, 'title'> {
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    throw new Error(`Task with id: ${taskId} not found`);
  }

  return { title: task.title };
}
