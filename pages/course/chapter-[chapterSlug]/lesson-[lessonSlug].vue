<template>
    <!-- http://localhost:3000/course/chapter-hello/lesson-world -->
    <h2>Lesson</h2>
    <p>
        This is a lesson 2
    </p>
    <p>
        Chapter slug: {{ $route.params.chapterSlug }}
    </p>
    <p>
        Lesson slug: {{ $route.params.lessonSlug }}
    </p>
</template>
