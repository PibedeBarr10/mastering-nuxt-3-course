import { PrismaClient } from '@prisma/client'
import protectRoute from '~/server/utils/protectRoute'
import {
    TChapterOutline,
    TLessonOutline
} from '../course/meta.get'
import {
    TCourseProgress,
    TChapterProgress
} from '~/types/course'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    // Throw a 401 if there is no user logged in.
    protectRoute(event)

    // Get user email from the supabase user if there is one.
    const { user: { email: userEmail } } = event.context

    // Get the progress from the DB
    const userProgress = await prisma.lessonProgress.findMany(
        {
            where: {
                userEmail,
                // We only want to get the progress for the first course right now
                Lesson: {
                    Chapter: {
                            Course: {
                            id: 1
                        }
                    }
                }
            },
            select: {
                completed: true,
                Lesson: {
                    select: {
                        slug: true,
                        Chapter: {
                            select: {
                                slug: true
                            }
                        }
                    }
                }
            }
        }
    )

    // Get course outline from meta endpoint
    const courseOutline = await $fetch('/api/course/meta')

    if (!courseOutline) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Course outline not found'
        })
    }

    // Use the course outline and user progress to create a nested object
    // with the progress for each lesson
    const progress = courseOutline.chapters.reduce(
        (
            courseProgress: TCourseProgress,
            chapter: TChapterOutline
        ) => {
            // Collect the progress for each chapter in the course
            courseProgress[chapter.slug] = chapter.lessons.reduce(
                (
                    chapterProgress: TChapterProgress,
                    lesson: TLessonOutline
                ) => {
                    // Collect the progress for each lesson in the chapter
                    chapterProgress[lesson.slug] = userProgress
                        .find(
                            (progress) => 
                                progress.Lesson.slug === lesson.slug &&
                                progress.Lesson.Chapter.slug === chapter.slug
                        )?.completed || false

                    return chapterProgress
                },
                {}
            )

            return courseProgress
        },
        {}
    )

    return progress
})
