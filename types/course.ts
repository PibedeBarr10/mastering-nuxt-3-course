export type TLesson = {
    title: string
    slug: string
    number: number
    downloadUrl: string
    videoId: number
    text: string
    sourceUrl?: string
}

export type TLessonWithPath = TLesson & {
    path: string
}

export type TChapter = {
    title: string
    slug: string
    number: number
    lessons: TLesson[] | TLessonWithPath[]
}

export type TCourse = {
    title: string
    chapters: TChapter[]
}
