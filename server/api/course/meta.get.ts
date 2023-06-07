import {
    TCourse,
    TChapter,
    TLesson,
    TCourseMeta,
    TOutlineChapter,
    TOutlineLesson
} from '~/types/course'
import course from '~/server/courseData'

course as TCourse

export default defineEventHandler((event): TCourseMeta => {
    const outline: TOutlineChapter[] = course.chapters.reduce(
        (prev: TOutlineChapter[], next: TChapter) => {
            const lessons: TOutlineLesson[] = next.lessons.map((lesson: TLesson) => ({
                title: lesson.title,
                slug: lesson.slug,
                number: lesson.number,
                path: `/course/chapter/${next.slug}/lesson/${lesson.slug}`
            }))

            const chapter: TOutlineChapter = {
                title: next.title,
                slug: next.slug,
                number: next.number,
                lessons
            }

            return [...prev, chapter]
        },
        []
    )

    return {
        title: course.title,
        chapters: outline
    }
})
