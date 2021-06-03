import { Component } from '@angular/core';

const EMPTY = 'List is empty';
const toBeNull = null;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  formVisible = false;
  model: AddTask = {
    difficulty: null,
    name: '',
  };

  difficulty = Difficulty;

  todos: Task[] = [];
  inProgresses: Task[] = [];
  dones: Task[] = [];

  get emptySting(): string {
    return EMPTY;
  }

  constructor() {}

  displayForm() {
    this.formVisible = true;
  }

  addTask() {
    if (!this.model.difficulty || !this.model.name) {
      return;
    }

    this.todos = [
      ...this.todos,
      {
        name: this.model.name,
        difficulty: this.model.difficulty,
      },
    ];

    this.model = {
      difficulty: toBeNull,
      name: '',
    };

    this.formVisible = false;
  }

  remove(index: number) {
    this.todos = this.todos.filter((_, i) => i !== index);
  }

  moveToInProgressFromTodo(task: Task, index: number) {
    this.inProgresses = [
      ...this.inProgresses,
      {
        name: task.name,
        difficulty: task.difficulty,
      },
    ];

    this.todos = this.todos.filter((_, i) => i !== index);
  }

  moveToTodo(task: Task, index: number) {
    this.todos = [
      ...this.todos,
      {
        name: task.name,
        difficulty: task.difficulty,
      },
    ];

    this.inProgresses = this.inProgresses.filter((_, i) => i !== index);
  }

  moveToDone(task: Task, index: number) {
    this.dones = [
      ...this.dones,
      {
        name: task.name,
        difficulty: task.difficulty,
      },
    ];

    this.inProgresses = this.inProgresses.filter((_, i) => i !== index);
  }

  moveToInProgressFromDone(task: Task, index: number) {
    this.inProgresses = [
      ...this.inProgresses,
      {
        name: task.name,
        difficulty: task.difficulty,
      },
    ];

    this.dones = this.dones.filter((_, i) => i !== index);
  }

  getStyles(task: Task) {
    return {
      'bg-success': task.difficulty === Difficulty.Easy,
      'bg-primary': task.difficulty === Difficulty.Medium,
      'bg-danger': task.difficulty === Difficulty.Hard,
    };
  }
}

interface Task {
  name: string;
  difficulty: Difficulty;
}

interface AddTask {
  name: string;
  difficulty: Difficulty;
}

enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}
