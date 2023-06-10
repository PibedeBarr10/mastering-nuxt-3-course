import { StorageSerializers } from '@vueuse/core'

export default async <T>(url: string) => {
    // Use sessionStorage to cache the data
    const cached = useSessionStorage<T>(
        url,
        null,
        {
            // By passing null as default it can't automatically
            // determine which serializer to use
            serializer: StorageSerializers.object
        }
    )

    if (!cached.value) {
        const { data, error } = await useFetch<T>(url, {
            headers: useRequestHeaders(['cookie'])
        })
    
        if (error.value) {
            throw createError({
                ...error.value,
                statusMessage: `Could not fetch data from ${url}`
            })
        }

        // updating sessionStorage
        cached.value = data.value as T
    } else {
        console.log(`Getting data from cache for ${url}`)
    }


    return cached
}
