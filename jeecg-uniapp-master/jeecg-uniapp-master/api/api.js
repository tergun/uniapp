import { http } from '@/common/service/service.js' 
import configService from '@/common/service/config.service.js';
const apiService = {
	/**
	 * 登录
	 */
	login(params) {
		return http.post('/sys/mLogin',params)	
	},
	/**
	 * 手机号码登录
	 */
	phoneNoLogin(params) {
		return http.post('/sys/phoneLogin',params);
	},
	/**
	 * 第三方登录
	 */
	thirdLogin(token, thirdType,tenantId) {
		return http.get(`/sys/thirdLogin/getLoginUser/${token}/${thirdType}/${tenantId}`);
	},
	/**
	 * 退出
	 */
	logout(params) {
		return http.post('/sys/logout',params);
	},
	/**
	 * 获取文件访问路径
	 * @param avatar
	 * @param subStr
	 * @returns {*}
	 */
	getFileAccessHttpUrl(avatar,subStr){
		if(!subStr) subStr = 'http'
		if(avatar && avatar.startsWith(subStr)){
			return avatar;
		}else{
			return configService.staticDomainURL + "/" + avatar;
		}
	},
	/**
	 * 获取项目列表
	 */
	projectList(params) {
		return http.get('/project/basic/list', params)
	},
	/**
	 * 获取项目详情
	 */
	projectDetail(id) {
		return http.get(`/project/basic/${id}`)
	},
	/**
	 * 获取项目进度
	 */
	projectProgress(id) {
		return http.get(`/project/progress/${id}`)
	},
	/**
	 * 获取项目活跃度
	 */
	projectActivity(id) {
		return http.get(`/project/activity/${id}`)
	},
	/**
	 * 更新项目进展描述
	 */
	updateProgressDescription(projectId, description) {
		return http.post('/project/progress/updateDescription', {
			projectId: projectId,
			description: description
		})
	},
	/**
	 * 更新形象进度
	 */
	updateVisualProgress(projectId, percentage) {
		return http.post('/project/progress/updateVisualProgress', {
			projectId: projectId,
			percentage: percentage
		})
	}
};

export default apiService;
