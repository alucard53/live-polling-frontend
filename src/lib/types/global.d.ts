export class Option {
  id: number
  value: string
  correct: boolean

  constructor() {
    this.id = Math.floor(Math.random() * 1000)
    this.value = ''
    this.correct = false
  }
}

export type FormQuestion = {
  prompt: string
  time: number
  options: Option[]
}

export type StudentQuestion = {
  prompt: string
  time: number
  options: string[]
}

export type Response = {
  prompt: string
  options: {
    value: string
    correct: boolean
    count: number
  }[]
}
