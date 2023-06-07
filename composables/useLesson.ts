import { StorageSerializers } from '@vueuse/core'
import { TLessonWithPath } from '~/types/course'

export default async (
    chapterSlug: string,
    lessonSlug: string
) => {
    // Use sessionStorage to cache the lesson data
    const url: string = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
    const lesson = useSessionStorage<TLessonWithPath>(
        url,
        null,
        {
            // By passing null as default it can't automatically
            // determine which serializer to use
            serializer: StorageSerializers.object
        }
    )

    if (!lesson.value) {
        const { data, error } = await useFetch<TLessonWithPath>(url)
    
        // inna możliwa implementacja
        // const { data, error } = await useAsyncData(() =>
        //     $fetch(`/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`)
        // )
    
        if (error.value) {
            throw createError({
                ...error.value,
                statusMessage: `Could not fetch lesson ${lessonSlug} in chapter ${chapterSlug}`
            })
        }

        // updating sessionStorage
        lesson.value = data.value
    } else {
        console.log(`Getting lesson ${lessonSlug} in chapter ${chapterSlug} from cache`)
    }


    return lesson
}
