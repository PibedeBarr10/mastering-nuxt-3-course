import { TLessonWithPath } from '~/types/course'

export default async (
    chapterSlug: string,
    lessonSlug: string
) => useFetchWithCache<TLessonWithPath>(`/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`)
