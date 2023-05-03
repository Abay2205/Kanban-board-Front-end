import {Subtasks} from "./subtasks";

export class Tasks {
  taskId: number;
  taskName: string;
  description: string;
  status: string;
  priority: number;
  taskImageId: string;
  developer: string;
  createdAt: Date;
  deadlineHours: number;
  showInfo: boolean;
  remainTime: string;
  subtasks: Subtasks[];
}
