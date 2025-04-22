declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    description?: string;
    message?: string;
  };

  type BaseResponseListPermission_ = {
    code?: number;
    data?: Permission[];
    description?: string;
    message?: string;
  };

  type BaseResponseListString_ = {
    code?: number;
    data?: string[];
    description?: string;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    description?: string;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    description?: string;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    description?: string;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    description?: string;
    message?: string;
  };

  type deletePermissionUsingDELETEParams = {
    /** id */
    id: number;
  };

  type deleteUserUsingDELETEParams = {
    /** id */
    id: number;
  };

  type getPermissionsByRoleUsingGETParams = {
    /** userRole */
    userRole: string;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type listUserUsingGETParams = {
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userName?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Permission = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    permissionCode?: string;
    permissionDesc?: string;
    updateTime?: string;
    userRole?: string;
  };

  type SaTokenInfo = {
    isLogin?: boolean;
    loginDevice?: string;
    loginId?: Record<string, any>;
    loginType?: string;
    sessionTimeout?: number;
    tag?: string;
    tokenActivityTimeout?: number;
    tokenName?: string;
    tokenSessionTimeout?: number;
    tokenTimeout?: number;
    tokenValue?: string;
  };

  type UserLoginRequest = {
    userAccount: string;
    userPassword: string;
  };

  type UserRegisterRequest = {
    checkPassword: string;
    userAccount: string;
    userName?: string;
    userPassword: string;
  };

  type UserUpdateRequest = {
    id: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    token?: SaTokenInfo;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
