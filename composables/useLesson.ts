import { TLessonWithPath } from '~/types/course'
import useFetchWithCache from './useFetchWithCache'

export default async (
    chapterSlug: string,
    lessonSlug: string
) => useFetchWithCache<TLessonWithPath>(`/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`)
