import { TCourseOutline } from '~/server/api/course/meta.get'

// fetching metadata
export default async () => await useFetchWithCache<TCourseOutline>('/api/course/meta')
