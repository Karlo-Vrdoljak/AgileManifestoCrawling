export class Signature {
  name: string;
  email?: string;
  website?: string;

  constructor(name: string, email?: string, website?: string) {
    this.name = name;
    this.email = email;
    this.website = website;
  }
}

export type Period = {
  signatures: Signature[];
  period: string;
};
