import { TCourse, TChapter, TLesson, TLessonWithPath } from '~/types/course'
import courseData from '../data/courseData'

export const useCourse = (): TCourse => {
    const chapters: TChapter[] = courseData.chapters.map((chapter: TChapter) => {
        const lessons: TLessonWithPath[] = chapter.lessons.map((lesson: TLesson) => ({
            ...lesson,
            path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`
        }))

        return {
            ...chapter,
            lessons
        }
    })

    return {
        ...courseData,
        chapters
    }
}
