import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  expired: {
    type: Boolean,
    required: true
  }
})

const Task = mongoose.model('Task', taskSchema)

export { Task }
