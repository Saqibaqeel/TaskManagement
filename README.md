# Task Management Application

A simple task management application built with **Node.js**, **Express**, **MongoDB**, and **Joi** for input validation. This app allows users to create, view, update, and delete tasks, with the ability to mark tasks as completed. It uses **EJS** for templating and includes a basic form validation using **Joi**.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [GET /](#get-)
  - [GET /tasks/:id](#get-task-id)
  - [POST /tasks/new](#post-task-new)
  - [PUT /tasks/:id/edit](#put-task-id-edit)
  - [DELETE /tasks/:id/delete](#delete-task-id-delete)
  - [PATCH /tasks/:id/complete](#patch-task-id-complete)
- [Validation with Joi](#validation-with-joi)
- [License](#license)
- [Contributing](#contributing)

## Features
- **Create Tasks**: Add new tasks with a title, description, due date, and status.
- **Edit Tasks**: Update existing tasks.
- **Delete Tasks**: Remove tasks from the list.
- **View Tasks**: List of all tasks with detailed views for individual tasks.
- **Task Status**: Mark tasks as `pending`, `in_progress`, or `completed`.
- **Input Validation**: **Joi** is used for validating the data.

## Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-management.git
cd task-management

## note for edit delete update, click on task
