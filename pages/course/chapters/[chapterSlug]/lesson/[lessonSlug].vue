<template>
    <!-- http://localhost:3000/course/chapters/chapter-1/lesson/lesson-1 -->
    <!-- UWAGA - w jednym folderze nie mogą znajdować się dwa foldery, tj. chapter i chapter-[chapterSlug]
        powód nieznany, restart serwera po zmianie nazwy nie działał; chapters i chapter-[chapterSlug] zadziała
    -->
    <h2>Lesson</h2>
    <p>
        This is a lesson 1
    </p>
    <p>
        Chapter slug: {{ $route.params.chapterSlug }}
    </p>
    <p>
        Lesson slug: {{ $route.params.lessonSlug }}
    </p>
</template>
