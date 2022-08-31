import { JobPostEntity } from 'src/entities/jobPost.entity';

export class ProposalPostDto {
  id: number;
  jobPost: JobPostEntity;
  price: number;
  message: string;
}
