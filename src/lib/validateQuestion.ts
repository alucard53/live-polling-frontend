import { FormQuestion } from './types/global'

export function validateQuestion(question: FormQuestion): boolean {
  if (question.options.length < 2) {
    alert('Add atleast 2 options!')
    return false
  }

  let correct = 0
  for (const option of question.options) {
    correct += Number(option.correct)
  }
  if (correct !== 1) {
    alert('Choose only one correct option!')
    return false
  }

  if (question.time <= 20) {
    alert('Allow atleast 20 seconds!')
    return false
  }
  return true
}
