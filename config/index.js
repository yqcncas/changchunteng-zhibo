const chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
const chnUnitChar = ["", "十", "百", "千"];
// #ifdef H5
import _JMessage from '@/libs/web-jmessage.js'
// #endif
// #ifndef H5
import _JMessage from '@/libs/wechat-jmessage.js'
// #endif

// 当前请求路径
import api from '@/api'

export const JMessage = _JMessage

const dev = api.dev
const pro = api.pro
export const baseURL =
	process.env.NODE_ENV === 'production' ?
	pro // 生产环境接口地址
	:
	dev // 开发环境接口地址


// ws 连接基础地址
export const wsBaseUrl = process.env.NODE_ENV === 'production' ? api.wsPro : api.wsDev

export const SectionToChinese = (section) => {
	var strIns = '',
		chnStr = '';
	var unitPos = 0;
	var zero = true;
	while (section > 0) {
		var v = section % 10;
		if (v === 0) {
			if (!zero) {
				zero = true;
				chnStr = chnNumChar[v] + chnStr;
			}
		} else {
			zero = false;
			strIns = chnNumChar[v];
			strIns += chnUnitChar[unitPos];
			chnStr = strIns + chnStr;
		}
		unitPos++;
		section = Math.floor(section / 10);
	}
	return chnStr;
}

// 数字转中文数字
export const numberToChinese = (num) => {
	
	var unitPos = 0;
	var strIns = '',
		chnStr = '';
	var needZero = false;

	if (num === 0) {
		return chnNumChar[0];
	}

	while (num > 0) {
		var section = num % 10000;
		if (needZero) {
			chnStr = chnNumChar[0] + chnStr;
		}
		strIns = SectionToChinese(section);
		strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
		chnStr = strIns + chnStr;
		needZero = (section < 1000) && (section > 0);
		num = Math.floor(num / 10000);
		unitPos++;
	}

	return chnStr;
}

