import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const lessonSelect = Prisma.validator<Prisma.LessonArgs>()({
    select: {
        title: true,
        slug: true,
        number: true
    }
})

export type TLessonOutline = Prisma.LessonGetPayload<
    typeof lessonSelect
> & {
    path: string
}

const chapterSelect = Prisma.validator<Prisma.ChapterArgs>()({
    select: {
        title: true,
        slug: true,
        number: true,
        lessons: lessonSelect
    }
})

export type TChapterOutline = Omit<
    Prisma.ChapterGetPayload<typeof chapterSelect>,
    'lessons'
> & {
    lessons: TLessonOutline[]
}

const courseSelect = Prisma.validator<Prisma.CourseArgs>()({
    select: {
        title: true,
        chapters: chapterSelect
    }
})

export type TCourseOutline = Omit<
    Prisma.CourseGetPayload<typeof courseSelect>,
    'chapters'
> & {
    chapters: TChapterOutline[]
};


export default defineEventHandler(
    async (): Promise<TCourseOutline> => {
        const outline = await prisma.course.findFirst(courseSelect)
    
        // Error if there is no course
        if (!outline) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Course not found'
            })
        }
    
        // Map the outline so we can add a path to each lesson
        const chapters = outline.chapters.map((chapter) => ({
            ...chapter,
            lessons: chapter.lessons.map((lesson) => ({
                ...lesson,
                path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`
            }))
        }))
    
        return {
            ...outline,
            chapters
        }
    }
)
