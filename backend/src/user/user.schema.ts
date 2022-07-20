import { Schema, Document } from 'mongoose';
import { Role } from 'src/auth/authorization';
import { v4 as uuidv4 } from 'uuid';

const defaultAvatarLinks = {
  [Role.Admin]: '',
  [Role.Organisation]: '',
  [Role.Vendor]: '',
  [Role.Facilitator]: '',
};

class Meta {
  ipAddress?: string;
}

export class AdminMeta extends Meta {
  firstName: string;
  lastName?: string;
}

export class OrganisationMeta extends Meta {
  name: string;
  address: string;
  block: string;
  district: string;
  coordinate: {
    lat: string;
    lon: string;
  };
  wardenName?: string;
}

export class VendorMeta extends Meta {
  name: string;
  regId?: string;
  address: string;
  proprietor?: string;
  coordinate: {
    lat: string;
    lon: string;
  };
}

export class FacilitatorMeta extends Meta {
  firstName: string;
  lastName?: string;
}

export class User {
  altId: string;
  username: string;
  password: string;
  isActive: boolean;
  mobile: string;
  email: string;
  avatar: string;
  role: Role;
  meta: AdminMeta | OrganisationMeta | VendorMeta | FacilitatorMeta;
}

const metaSchema = new Schema<Meta>({
  ipAddress: { type: String, required: false },
}, {discriminatorKey: "role"});

export const adminMetaSchema = new Schema<AdminMeta>({
  firstName: { type: String, required: true, minlength: 3 },
  lastName: { type: String, required: false },
});

export const organisationMetaSchema = new Schema<OrganisationMeta>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  block: { type: String, required: true },
  district: { type: String, required: true },
  coordinate: {
    lat: String,
    lon: String,
  },
  wardenName: { type: String, required: false },
});

export const vendorMetaSchema = new Schema<VendorMeta>({
  name: { type: String, required: true },
  regId: { type: String, required: false },
  address: { type: String, required: true },
  proprietor: { type: String, required: false },
  coordinate: {
    lat: String,
    lon: String,
  },
});

export const facilitatorMetaSchema = new Schema<AdminMeta>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
});

export const userSchema = new Schema<User>(
  {
    altId: { type: String, required: true, default: uuidv4() },
    username: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    avatar: {
      type: String,
      default: function () {
        return defaultAvatarLinks[this.role];
      },
    },
    role: { type: String, enum: Role, required: true },
    meta: { type: metaSchema, required: true, },
  },
  { timestamps: true },
);
export const Admin = userSchema
  .path<Schema.Types.Subdocument>('meta')
  .discriminator<AdminMeta>(Role.Admin, adminMetaSchema);
export const Organisation = userSchema
  .path<Schema.Types.Subdocument>('meta')
  .discriminator<OrganisationMeta>(Role.Organisation, organisationMetaSchema);
export const Vendor = userSchema
  .path<Schema.Types.Subdocument>('meta')
  .discriminator<VendorMeta>(Role.Vendor, vendorMetaSchema);
export const Facilitator = userSchema
  .path<Schema.Types.Subdocument>('meta')
  .discriminator<FacilitatorMeta>(Role.Facilitator, vendorMetaSchema);

export type UserDocument = User & Document;
