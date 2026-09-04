import {
  getAllCourses,
  getCourseById,
} from "@/server/repositories/course.repository";

export async function listCourses() {
  return getAllCourses();
}

export async function getCourseDetails(id: string) {
  return getCourseById(id);
}