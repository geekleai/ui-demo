export class SectionModel {
  name!: string;
  subSections?: SectionModel[];

  constructor(model: Partial<SectionModel> & { name: string }) {
    Object.assign(this, model);
  }
}
