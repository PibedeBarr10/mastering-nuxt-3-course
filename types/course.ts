import {
    Lesson as TLesson
} from '@prisma/client'

export type TLessonWithPath = TLesson & {
    path: string
}

export type TChapterProgress = {
    [key: string]: boolean
}
  
export type TCourseProgress = {
    [key: string]: TChapterProgress
}
