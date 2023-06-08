import {
    Lesson as TLesson
} from '@prisma/client'

export type TLessonWithPath = TLesson & {
    path: string
}
