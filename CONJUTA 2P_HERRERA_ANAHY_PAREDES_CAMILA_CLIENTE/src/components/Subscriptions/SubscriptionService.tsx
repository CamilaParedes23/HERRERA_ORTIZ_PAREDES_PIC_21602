import { Course, CourseStatus } from '../models/Course';
import { User, UserRole } from '../models/User';
import CourseService from './CourseService';

class SubscriptionService {
  private subscriptions: { userId: string; courseId: string }[] = [];

  async subscribeToCourse(consumer: User, courseId: string): Promise<void> {
    const course = CourseService.getCourseById(courseId);

    if (!course) throw new Error('Course not found.');
    if (course.estado !== CourseStatus.Active) throw new Error('Course is not active.');

    const existing = this.subscriptions.find(
      sub => sub.userId === consumer.id && sub.courseId === courseId
    );
    if (existing) throw new Error('Already subscribed.');

    const sameCreatorSubs = this.subscriptions.filter(sub => {
      const subCourse = CourseService.getCourseById(sub.courseId);
      return (
        sub.userId === consumer.id &&
        course.creador.id === subCourse?.creador?.id
      );
    });

    if (sameCreatorSubs.length > 0) {
      throw new Error('Cannot subscribe to more than one course from the same creator.');
    }

    this.subscriptions.push({ userId: consumer.id, courseId });
  }

  async cancelSubscription(consumer: User, courseId: string): Promise<void> {
    this.subscriptions = this.subscriptions.filter(
      sub => sub.userId !== consumer.id || sub.courseId !== courseId
    );
  }
}

export default new SubscriptionService();