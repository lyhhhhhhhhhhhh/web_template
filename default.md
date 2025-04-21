# 后端模板项目接口文档


**简介**:后端模板项目接口文档


**HOST**:localhost:8080


**联系人**:作者


**Version**:1.0.0


**接口路径**:/v2/api-docs


[TOC]






# 权限管理接口


## 添加权限


**接口地址**:`/api/permission/add`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>添加权限</p>



**请求示例**:


```javascript
{
  "createTime": "",
  "id": 0,
  "isDelete": 0,
  "permissionCode": "",
  "permissionDesc": "",
  "updateTime": "",
  "userRole": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|permission|permission|body|true|Permission|Permission|
|&emsp;&emsp;createTime|||false|string(date-time)||
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;isDelete|||false|integer(int32)||
|&emsp;&emsp;permissionCode|||false|string||
|&emsp;&emsp;permissionDesc|||false|string||
|&emsp;&emsp;updateTime|||false|string(date-time)||
|&emsp;&emsp;userRole|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«boolean»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"description": "",
	"message": ""
}
```


## 删除权限


**接口地址**:`/api/permission/delete/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>删除权限</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«boolean»|
|204|No Content||
|401|Unauthorized||
|403|Forbidden||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"description": "",
	"message": ""
}
```


## 获取所有权限


**接口地址**:`/api/permission/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取所有权限</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«List«Permission»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array|Permission|
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;isDelete||integer(int32)||
|&emsp;&emsp;permissionCode||string||
|&emsp;&emsp;permissionDesc||string||
|&emsp;&emsp;updateTime||string(date-time)||
|&emsp;&emsp;userRole||string||
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": [
		{
			"createTime": "",
			"id": 0,
			"isDelete": 0,
			"permissionCode": "",
			"permissionDesc": "",
			"updateTime": "",
			"userRole": ""
		}
	],
	"description": "",
	"message": ""
}
```


## 获取指定角色的权限列表


**接口地址**:`/api/permission/list/{userRole}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取指定角色的权限列表</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userRole|userRole|path|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«List«string»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array||
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": [],
	"description": "",
	"message": ""
}
```


## 更新权限


**接口地址**:`/api/permission/update`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>更新权限</p>



**请求示例**:


```javascript
{
  "createTime": "",
  "id": 0,
  "isDelete": 0,
  "permissionCode": "",
  "permissionDesc": "",
  "updateTime": "",
  "userRole": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|permission|permission|body|true|Permission|Permission|
|&emsp;&emsp;createTime|||false|string(date-time)||
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;isDelete|||false|integer(int32)||
|&emsp;&emsp;permissionCode|||false|string||
|&emsp;&emsp;permissionDesc|||false|string||
|&emsp;&emsp;updateTime|||false|string(date-time)||
|&emsp;&emsp;userRole|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«boolean»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"description": "",
	"message": ""
}
```


# 用户接口


## 创建用户


**接口地址**:`/api/user/add`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>创建用户（需要admin-user-add权限）</p>



**请求示例**:


```javascript
{
  "checkPassword": "",
  "userAccount": "",
  "userName": "",
  "userPassword": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userRegisterRequest|userRegisterRequest|body|true|UserRegisterRequest|UserRegisterRequest|
|&emsp;&emsp;checkPassword|||true|string||
|&emsp;&emsp;userAccount|||true|string||
|&emsp;&emsp;userName|||false|string||
|&emsp;&emsp;userPassword|||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«long»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||integer(int64)|integer(int64)|
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": 0,
	"description": "",
	"message": ""
}
```


## 获取当前登录用户


**接口地址**:`/api/user/current`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取当前登录用户</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«UserVO»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||UserVO|UserVO|
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;userAccount||string||
|&emsp;&emsp;userAvatar||string||
|&emsp;&emsp;userName||string||
|&emsp;&emsp;userProfile||string||
|&emsp;&emsp;userRole||string||
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"createTime": "",
		"id": 0,
		"userAccount": "",
		"userAvatar": "",
		"userName": "",
		"userProfile": "",
		"userRole": ""
	},
	"description": "",
	"message": ""
}
```


## 删除用户


**接口地址**:`/api/user/delete/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>删除用户（需要admin-user-delete权限）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«boolean»|
|204|No Content||
|401|Unauthorized||
|403|Forbidden||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"description": "",
	"message": ""
}
```


## 根据id获取用户


**接口地址**:`/api/user/get/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据id获取用户（需要admin-user-select权限）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«UserVO»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||UserVO|UserVO|
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;userAccount||string||
|&emsp;&emsp;userAvatar||string||
|&emsp;&emsp;userName||string||
|&emsp;&emsp;userProfile||string||
|&emsp;&emsp;userRole||string||
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"createTime": "",
		"id": 0,
		"userAccount": "",
		"userAvatar": "",
		"userName": "",
		"userProfile": "",
		"userRole": ""
	},
	"description": "",
	"message": ""
}
```


## 获取用户列表


**接口地址**:`/api/user/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取用户列表（需要admin-user-select权限）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|current||query|false|integer(int32)||
|id||query|false|integer(int64)||
|pageSize||query|false|integer(int32)||
|sortField||query|false|string||
|sortOrder||query|false|string||
|userName||query|false|string||
|userRole||query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«Page«UserVO»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||Page«UserVO»|Page«UserVO»|
|&emsp;&emsp;countId||string||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;maxLimit||integer(int64)||
|&emsp;&emsp;optimizeCountSql||boolean||
|&emsp;&emsp;orders||array|OrderItem|
|&emsp;&emsp;&emsp;&emsp;asc||boolean||
|&emsp;&emsp;&emsp;&emsp;column||string||
|&emsp;&emsp;pages||integer(int64)||
|&emsp;&emsp;records||array|UserVO|
|&emsp;&emsp;&emsp;&emsp;createTime||string||
|&emsp;&emsp;&emsp;&emsp;id||integer||
|&emsp;&emsp;&emsp;&emsp;userAccount||string||
|&emsp;&emsp;&emsp;&emsp;userAvatar||string||
|&emsp;&emsp;&emsp;&emsp;userName||string||
|&emsp;&emsp;&emsp;&emsp;userProfile||string||
|&emsp;&emsp;&emsp;&emsp;userRole||string||
|&emsp;&emsp;searchCount||boolean||
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;total||integer(int64)||
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"countId": "",
		"current": 0,
		"maxLimit": 0,
		"optimizeCountSql": true,
		"orders": [
			{
				"asc": true,
				"column": ""
			}
		],
		"pages": 0,
		"records": [
			{
				"createTime": "",
				"id": 0,
				"userAccount": "",
				"userAvatar": "",
				"userName": "",
				"userProfile": "",
				"userRole": ""
			}
		],
		"searchCount": true,
		"size": 0,
		"total": 0
	},
	"description": "",
	"message": ""
}
```


## 用户登录


**接口地址**:`/api/user/login`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>用户登录</p>



**请求示例**:


```javascript
{
  "userAccount": "",
  "userPassword": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userLoginRequest|userLoginRequest|body|true|UserLoginRequest|UserLoginRequest|
|&emsp;&emsp;userAccount|||true|string||
|&emsp;&emsp;userPassword|||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«UserVO»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||UserVO|UserVO|
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;userAccount||string||
|&emsp;&emsp;userAvatar||string||
|&emsp;&emsp;userName||string||
|&emsp;&emsp;userProfile||string||
|&emsp;&emsp;userRole||string||
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"createTime": "",
		"id": 0,
		"userAccount": "",
		"userAvatar": "",
		"userName": "",
		"userProfile": "",
		"userRole": ""
	},
	"description": "",
	"message": ""
}
```


## 用户注销


**接口地址**:`/api/user/logout`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>用户注销</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«boolean»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"description": "",
	"message": ""
}
```


## 用户注册


**接口地址**:`/api/user/register`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>用户注册</p>



**请求示例**:


```javascript
{
  "checkPassword": "",
  "userAccount": "",
  "userName": "",
  "userPassword": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userRegisterRequest|userRegisterRequest|body|true|UserRegisterRequest|UserRegisterRequest|
|&emsp;&emsp;checkPassword|||true|string||
|&emsp;&emsp;userAccount|||true|string||
|&emsp;&emsp;userName|||false|string||
|&emsp;&emsp;userPassword|||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«long»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||integer(int64)|integer(int64)|
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": 0,
	"description": "",
	"message": ""
}
```


## 更新用户


**接口地址**:`/api/user/update`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>更新用户（需要admin-user-update权限或user-update权限）</p>



**请求示例**:


```javascript
{
  "id": 0,
  "userAvatar": "",
  "userName": "",
  "userProfile": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userUpdateRequest|userUpdateRequest|body|true|UserUpdateRequest|UserUpdateRequest|
|&emsp;&emsp;id|||true|integer(int64)||
|&emsp;&emsp;userAvatar|||false|string||
|&emsp;&emsp;userName|||false|string||
|&emsp;&emsp;userProfile|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«boolean»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"description": "",
	"message": ""
}
```


# 首页接口


## 首页


**接口地址**:`/api/`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>首页</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponse«string»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||string||
|description||string||
|message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": "",
	"description": "",
	"message": ""
}
```