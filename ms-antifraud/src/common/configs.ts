export const KAFKA_TOPIC_ANTIFRAUD_VALIDATION = 'topic-notify-antifraud';

export const KAFKA_CONSUMER_GROUP_ID = 'antifraud-microservice-group';

export type AntifraudResult = 'rejected' | 'approved';

export const AntifraudValues: Record<AntifraudResult, AntifraudResult> = {
  approved: 'approved',
  rejected: 'rejected',
};
