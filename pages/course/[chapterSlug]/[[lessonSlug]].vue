<template>
    <!-- http://localhost:3000/course/hello -->
    <!-- http://localhost:3000/course/hello/world -->
    <!-- podwójne nawiasy kwadratowe, działa bez lessonSlug, wtedy jest on pusty -->
    <h2>Lesson</h2>
    <p>
        This is a lesson 4
    </p>
    <p>
        Chapter slug: {{ $route.params.chapterSlug }}
    </p>
    <p>
        Lesson slug: {{ $route.params.lessonSlug }}
    </p>
</template>
