export class SectionModel {
  name!: string;
  subSections?: SubSectionModel[];
  isReviewed?: boolean;
  reviewedBy?: string;
  reviewedDate?: Date;

  constructor(model: Partial<SectionModel> & { name: string }) {
    Object.assign(this, model);
  }
}

export class SubSectionModel {
  name!: string;
  isReviewed?: boolean;
  reviewedBy?: string;
  reviewedDate?: Date;

  constructor(model: Partial<SubSectionModel> & { name: string }) {
    Object.assign(this, model);
  }
}
