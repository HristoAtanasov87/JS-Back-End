const { populate } = require('../models/Course');
const Course = require('../models/Course');


async function getAllCourses(sortMethod, searchCriteria) {
    const pattern = new RegExp(searchCriteria, 'i')
    return await Course.find({ title: pattern }).sort(sortMethod).lean();
}

async function getCourseById(id) {
    return await Course.findById(id).populate('usersEnrolled').lean(); // za da imash cqloto info zad id-to na enroll-natiq chovek polzvash populate
}

async function createCourse(courseData) {
    const pattern = new RegExp(`^${courseData.title}$`, 'i');
    const existing = await Course.findOne({ title: { $regex: pattern } });

    if (existing) {
        throw new Error('Course already exists!');
    }
    const course = new Course(courseData);
    await course.save();
    return course;
}

async function deleteCourse(id) {
    await Course.findByIdAndDelete(id);
}

async function enrollCourse(courseId, userId) {
    const course = await Course.findById(courseId);

    course.usersEnrolled.push(userId);
    await course.save();
    return course;
}

async function editCourse(id, courseData) {
    const course = await Course.findById(id);

    course.title = courseData.title;
    course.description = courseData.description;
    course.imageUrl = courseData.imageUrl;
    course.duration = courseData.duration;

    await course.save();
}

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    deleteCourse,
    enrollCourse,
    editCourse
}