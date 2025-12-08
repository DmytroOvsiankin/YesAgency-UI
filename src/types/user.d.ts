type UserProfile = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone_number: string;
  user_type: string;
  date_of_birth: string;
  profile_photo: string;
  is_student: boolean;
  has_business: boolean;
  has_driving_license: boolean;
  clothing_size: string; // Add enum here
  email_verified: boolean;
  date_joined: string;
  last_login: string;
  business_info: any; //replace it in future
  job_preferences: {
    preferred_job_types: string[];
    preferred_regions: string[];
  };
};

type UpdateProfileData = Pick<Partial<UserProfile>, 'first_name', 'phone_number', 'clothing_size'>;

type ProfileErrors = any;
