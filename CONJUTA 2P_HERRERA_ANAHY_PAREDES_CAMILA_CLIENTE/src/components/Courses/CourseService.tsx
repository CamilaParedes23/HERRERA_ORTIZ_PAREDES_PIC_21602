import { Course, CourseStatus } from '../models/Course';
import { User, UserRole } from '../models/User';

class CourseService {
  private courses: Course[] = [];

  async createCourse(creator: User, courseData: Partial<Course>): Promise<Course> {
    if (creator.tipo_usuario !== UserRole.Creator) {
      throw new Error('Only creators can create courses.');
    }

    const activeCourses = this.courses.filter(
      (course) => course.creador.id === creator.id && course.estado === CourseStatus.Active
    );

    if (activeCourses.length >= 2) {
      throw new Error('Creators can only have up to two active courses.');
    }

    const newCourse: Course = {
      id: Date.now().toString(),
      ...courseData,
      estado: CourseStatus.InConstruction,
      creador: creator,
    };

    this.courses.push(newCourse);
    return newCourse;
  }

  getCourseById(id: string): Course | undefined {
    return this.courses.find(course => course.id === id);
  }
}

export default new CourseService();