import { TCourseMeta } from '~/types/course'

// fetching metadata
export default async () => useFetchWithCache<TCourseMeta>('/api/course/meta')
