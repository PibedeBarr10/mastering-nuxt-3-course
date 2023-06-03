import courseData from '../data/courseData'

type TLesson = {
    title: string
    slug: string
    number: number
    downloadUrl: string
    videoId: number
    text: string
    sourceUrl?: string
}

type TChapter = {
    title: string
    slug: string
    number: number
    lessons: TLesson[]
}

type TCourse = {
    title: string
    chapters: TChapter[]
}

export const useCourse = (): TCourse => {
    const chapters: TChapter[] = courseData.chapters.map((chapter) => {
        const lessons: TLesson[] = chapter.lessons.map((lesson: TLesson) => ({
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
