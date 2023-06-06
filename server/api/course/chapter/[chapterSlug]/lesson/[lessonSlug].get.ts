import { TCourse, TChapter, TLesson, TLessonWithPath } from '~/types/course'
import course from '~/server/courseData'

course as TCourse

export default defineEventHandler((event): TLessonWithPath => {
    const { chapterSlug, lessonSlug } = event.context.params

    const chapter: Maybe<TChapter> = course.chapters.find((chapter: TChapter) => chapter.slug === chapterSlug)
    if (!chapter) {
        return createError({
            statusCode: 404,
            message: 'Chapter not found'
        })
    }

    const lesson: Maybe<TLesson> = chapter.lessons.find((lesson: TLesson) => lesson.slug === lessonSlug)
    if (!lesson) {
        return createError({
            statusCode: 404,
            message: 'Lesson not found'
        })
    }

    return {
        ...lesson,
        path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
    }
})
