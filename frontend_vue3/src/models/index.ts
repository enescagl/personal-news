interface Permission {
  id: number;
  name: string;
  codename: string;
  content_type: number;
}

interface Group {
  id: number;
  permissions: Permission[];
  name: string;
}

export interface User {
  id: string;
  groups: Group[];
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
}
