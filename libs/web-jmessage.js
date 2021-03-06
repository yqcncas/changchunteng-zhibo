! function(t, e) {
	"object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define
		.amd ? define([], e) : "object" == typeof exports ? exports.io = e() : t.io = e()
}(this, function() {
	return function(t) {
		var e = {};

		function n(o) {
			if (e[o]) return e[o].exports;
			var r = e[o] = {
				exports: {},
				id: o,
				loaded: !1
			};
			return t[o].call(r.exports, r, r.exports, n), r.loaded = !0, r.exports
		}
		return n.m = t, n.c = e, n.p = "", n(0)
	}([function(t, e, n) {
		"use strict";
		var o = n(1);
		window.JMessage = t.exports = o
	}, function(t, e, n) {
		"use strict";
		var o = n(2),
			r = n(5),
			i = n(6),
			s = n(59),
			a = n(60),
			c = n(61),
			u = n(62),
			p = n(63)(),
			h = n(64),
			l = function(t) {
				var e = t || {};
				this.opts = {
					address: e.address ? e.address : s.WSS_ADDRESS,
					upload_file: e.upload_file ? e.upload_file : s.UPLOAD_FILE,
					download_file: e.download_file ? e.download_file : s.DOWNLOAD_FILE,
					debug: !!e.debug
				}, this.channel = new i(this.opts), this.syncTask = 0, this.msgReceipTask = 0
			};
		l.prototype.init = function(t) {
			var e = this;
			return e.autoDiscon = !0, t.flag !== s.SYNC_TYPE_OPEN && t.flag !== s.SYNC_TYPE_CLOSE || (e.channel.sync_type =
				t.flag), t.fromPlatForm = s.FROM_PLATFORM, new a(this.channel).setEvent(s.EVENTS.INIT).setData(t).send().addHook(
				function(n, o) {
					e.current_appkey = t.appkey, o && o(n)
				})
		}, l.prototype.loginOut = function() {
			console.log('我执行了吗') 
			if (this.current_user) {
				this.autoDiscon = !1, this.channel.client.close();
				var t = this.channel.dataCache;
				for (var e in t) t[e].cleanAckTimeout(), t[e].cleanRespTimeout();
				this.current_user = null, this.current_appkey = null, this.channel.init(this.channel.opts)
			}
		}, l.prototype.login = function(t) {
			this.__checkInit(), t.is_md5 || (t.password = p(t.password)), t.version = s.SDK_VERSION;
			var e = this,
				n = new a(this.channel).setEvent(s.EVENTS.LOGIN).setData(t).addHook(function(n, o) {
					e.current_user = t.username, h.StorageUtils.removeItems(e.current_user), e.channel.sync_key = 0, e.channel.sync_event_key =
						0, e.channel.msg_receipt_key = 0, e.channel.ses_key = s.SESSION_KEY + e.current_appkey + "-" + e.current_user,
						e.channel.conversations_key = s.CONVERSATION_KEY + e.current_appkey + "-" + e.current_user, e.channel.event_key =
						s.EVENT_KEY + e.current_appkey + "-" + e.current_user, e._syncCheckTask(), e._receiptReportTask(), e._initConversation(),
						e.lastMsgs = {}, e.channel.client.removeListener(s.EVENTS.LOGIN), e._addEventListen(), e.firstLogin = !1, o &&
						o(n)
				});
			return setTimeout(function() {
				n.send()
			}, 500), n
		}, l.prototype._initConversation = function() {
			var t = this,
				e = h.StorageUtils.getItem(t.channel.conversations_key);
			null === e && (e = JSON.stringify({}), h.StorageUtils.addItem(t.channel.conversations_key, e)), t.conversations =
				JSON.parse(e)
		}, l.prototype._receiptReportTask = function() {
			var t = this;
			t.report = [], t.msgReceipTask = setInterval(function() {
				t._receiptReport()
			}, s.RECEIPT_REPORT_INTERVAL)
		}, l.prototype._syncCheckTask = function() {
			var t = this,
				e = h.StorageUtils.getItem(t.channel.event_key);
			null != e && (t.channel.sync_event_key = e), t._syncCheck({
				sync_key: t.channel.sync_key,
				sync_type: t.channel.sync_type,
				sync_event_key: t.channel.sync_event_key,
				msg_receipt_key: t.channel.msg_receipt_key
			}).onSuccess(function(e) {
				e && 0 === e.code && (t.channel.sync_key = e.sync_key, t.channel.sync_type = e.sync_type, t.channel.sync_event_key =
					e.sync_event_key, t.channel.msg_receipt_key = e.msg_receipt_key, h.StorageUtils.addItem(t.channel.event_key,
						e.sync_event_key))
			}), t.syncTask = setInterval(function() {
				t._syncCheck({
					sync_key: t.channel.sync_key,
					sync_type: t.channel.sync_type,
					sync_event_key: t.channel.sync_event_key,
					msg_receipt_key: t.channel.msg_receipt_key
				}).onSuccess(function(e) {
					e && 0 === e.code && (t.channel.sync_key = e.sync_key, t.channel.sync_type = e.sync_type, t.channel.sync_event_key =
						e.sync_event_key, t.channel.msg_receipt_key = e.msg_receipt_key, h.StorageUtils.addItem(t.channel.event_key,
							e.sync_event_key))
				})
			}, s.SYNC_INTERVAL)
		}, l.prototype._syncCheck = function(t) {
			return new a(this.channel).setEvent(s.EVENTS.SYNC_CHECK).setData(t).send()
		}, l.prototype.register = function(t) {
			return this.__checkInit(), t.is_md5 || (t.password = p(t.password)), new a(this.channel).setEvent(s.EVENTS.REGISTER)
				.setData(t).send()
		}, l.prototype.getUserInfo = function(t) {
			return this.__checkLogin(), h.StringUtils.isBlack(t.appkey) && (t.appkey = this.current_appkey), new a(this.channel)
				.setEvent(s.EVENTS.GET_ACROSS_USER_INFO).setData(t).send()
		}, l.prototype.updateSelfInfo = function(t) {
			return this.__checkLogin(), h.StringUtils.isBlack(t.avatar) || delete t.avatar, new a(this.channel).setEvent(s.EVENTS
				.UPDATE_SELF_INFO).setData(t).send()
		}, l.prototype.updateSelfAvatar = function(t) {
			this.__checkLogin();
			var e = new a(this.channel).setEvent(s.EVENTS.UPDATE_SELF_INFO);
			return this.__uploadFile({
				appkey: this.current_appkey,
				username: this.current_user,
				file: t.avatar,
				type: "image"
			}, function(t, n) {
				if (t) return t.is_timeout ? e.timeout && e.timeout(t.data) : e.fail && e.fail(t.data);
				e.setData({
					avatar: n.media_id
				}).send()
			}), e
		}, l.prototype.updateSelfPwd = function(t) {
			return this.__checkLogin(), t.is_md5 || (t.old_pwd = p(t.old_pwd), t.new_pwd = p(t.new_pwd)), new a(this.channel)
				.setEvent(s.EVENTS.UPDATE_SELF_PWD).setData(t).send()
		}, l.prototype.getConversation = function() {
			this.__checkLogin();
			var t = this;
			return new a(this.channel).setEvent(s.EVENTS.GET_CONVERSATIONS).setData({}).send().addHook(function(e, n) {
				e.conversations.forEach(function(e) {
					var n;
					3 === e.type ? (t[e.key] = e.utime, delete e.utime, n = e.appkey + e.username) : (n = e.key, e.gid = e.key),
						t.conversations[n] ? (t.conversations[n].extras ? e.extras = t.conversations[n].extras : e.extras = {},
							e.unread_msg_count = t.conversations[n].unread_msg_count) : (e.extras = {}, e.unread_msg_count = 0, t.conversations[
							n] = {}, t.conversations[n].extras = {}, t.conversations[n].unread_msg_count = 0, t.conversations[n].msg_time = [])
				}), h.StorageUtils.addItem(t.channel.conversations_key, JSON.stringify(t.conversations)), n && n(e)
			})
		}, l.prototype.resetUnreadCount = function(t) {
			this.__checkLogin();
			var e, n = this;
			t.gid ? e = String(t.gid) : (t.appkey || (t.appkey = n.current_appkey), e = t.appkey + t.username), n.conversations[
				e] = void 0 === n.conversations[e] ? {} : n.conversations[e], t.gid ? n._updateGroupUnreadCount({
				gid: t.gid
			}) : n._updateSingleUnreadCount({
				appkey: t.appkey,
				username: t.username
			}), n.conversations[e].unread_msg_count = 0, n.conversations[e].msg_time = [];
			var o = (new Date).getTime();
			n.lastMsgs[e] && (o = n.lastMsgs[e].last_msg_time), n.conversations[e].recent_time = o, n.current_conversation =
				e, h.StorageUtils.addItem(n.channel.conversations_key, JSON.stringify(n.conversations))
		}, l.prototype.getUnreadMsgCnt = function(t) {
			this.__checkLogin();
			var e, n = this;
			return t.gid ? e = String(t.gid) : (t.appkey || (t.appkey = n.current_appkey), e = t.appkey + t.username), n.conversations[
					e] || (n.conversations[e] = {}), n.conversations[e].unread_msg_count ? n.conversations[e].unread_msg_count :
				0
		}, l.prototype.msgRetract = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.MSG_RETRACT).setData(t).send()
		}, l.prototype.sendSingleMsg = function(t) {
			return this.__sendMsg({
				type: "single",
				target_id: t.target_username,
				target_name: t.target_nickname,
				content: t.content,
				extras: t.extras,
				msg_body: t.msg_body,
				appkey: t.appkey,
				no_offline: t.no_offline,
				no_notification: t.no_notification,
				custom_notification: t.custom_notification,
				need_receipt: t.need_receipt
			})
		}, l.prototype.sendGroupMsg = function(t) {
			return this.__sendMsg({
				type: "group",
				target_id: t.target_gid,
				target_name: t.target_gname,
				content: t.content,
				extras: t.extras,
				msg_body: t.msg_body,
				at_list: t.at_list,
				no_offline: t.no_offline,
				no_notification: t.no_notification,
				custom_notification: t.custom_notification,
				need_receipt: t.need_receipt
			})
		}, l.prototype.sendSinglePic = function(t) {
			return this.__sendPic({
				type: "single",
				target_id: t.target_username,
				target_name: t.target_nickname,
				file: t.image,
				msg_body: t.msg_body,
				extras: t.extras,
				appkey: t.appkey,
				no_offline: t.no_offline,
				no_notification: t.no_notification,
				custom_notification: t.custom_notification,
				need_receipt: t.need_receipt
			})
		}, l.prototype.sendGroupPic = function(t) {
			return this.__sendPic({
				type: "group",
				target_id: t.target_gid,
				target_name: t.target_gname,
				file: t.image,
				msg_body: t.msg_body,
				extras: t.extras,
				no_offline: t.no_offline,
				no_notification: t.no_notification,
				custom_notification: t.custom_notification,
				need_receipt: t.need_receipt
			})
		}, l.prototype.sendSingleFile = function(t) {
			return this.__sendFile({
				type: "single",
				target_id: t.target_username,
				target_name: t.target_nickname,
				file: t.file,
				msg_body: t.msg_body,
				extras: t.extras,
				appkey: t.appkey,
				no_offline: t.no_offline,
				no_notification: t.no_notification,
				custom_notification: t.custom_notification,
				need_receipt: t.need_receipt
			})
		}, l.prototype.sendGroupFile = function(t) {
			return this.__sendFile({
				type: "group",
				target_id: t.target_gid,
				target_name: t.target_gname,
				file: t.file,
				msg_body: t.msg_body,
				extras: t.extras,
				no_offline: t.no_offline,
				no_notification: t.no_notification,
				custom_notification: t.custom_notification,
				need_receipt: t.need_receipt
			})
		}, l.prototype.sendSingleLocation = function(t) {
			return this.__sendLocation({
				type: "single",
				target_id: t.target_username,
				target_name: t.target_nickname,
				latitude: t.latitude,
				longitude: t.longitude,
				scale: t.scale,
				label: t.label,
				msg_body: t.msg_body,
				extras: t.extras,
				appkey: t.appkey,
				no_offline: t.no_offline,
				no_notification: t.no_notification,
				custom_notification: t.custom_notification,
				need_receipt: t.need_receipt
			})
		}, l.prototype.sendGroupLocation = function(t) {
			return this.__sendLocation({
				type: "group",
				target_id: t.target_gid,
				target_name: t.target_gname,
				latitude: t.latitude,
				longitude: t.longitude,
				scale: t.scale,
				label: t.label,
				msg_body: t.msg_body,
				extras: t.extras,
				no_offline: t.no_offline,
				no_notification: t.no_notification,
				custom_notification: t.custom_notification,
				need_receipt: t.need_receipt
			})
		}, l.prototype.sendSingleCustom = function(t) {
			return this.__sendCustom({
				type: "single",
				target_id: t.target_username,
				target_name: t.target_nickname,
				custom: t.custom,
				extras: t.extras,
				msg_body: t.msg_body,
				appkey: t.appkey,
				no_offline: t.no_offline,
				no_notification: t.no_notification,
				custom_notification: t.custom_notification,
				need_receipt: t.need_receipt
			})
		}, l.prototype.sendGroupCustom = function(t) {
			return this.__sendCustom({
				type: "group",
				target_id: t.target_gid,
				target_name: t.target_gname,
				custom: t.custom,
				msg_body: t.msg_body,
				extras: t.extras,
				no_offline: t.no_offline,
				no_notification: t.no_notification,
				custom_notification: t.custom_notification,
				need_receipt: t.need_receipt
			})
		}, l.prototype.createGroup = function(t) {
			this.__checkLogin();
			var e = new a(this.channel).setEvent(s.EVENTS.CREATE_GROUP);
			return t.avatar ? this.__uploadFile({
				appkey: this.current_appkey,
				username: this.current_user,
				file: t.avatar,
				type: "image"
			}, function(n, o) {
				if (n) return n.is_timeout ? e.timeout && e.timeout(n.data) : e.fail && e.fail(n.data);
				delete t.avatar, t.media_id = o.media_id, e.setData(t).send()
			}) : e.setData(t).send(), e
		}, l.prototype.exitGroup = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.EXIT_GROUP).setData(t).send()
		}, l.prototype.getGroups = function() {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.GET_GROUPS_LIST).setData({}).send().addHook(
				function(t, e) {
					t.group_list.forEach(function(t) {
						t.group_type = t.flag, delete t.flag
					}), e && e(t)
				})
		}, l.prototype.getGroupInfo = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.GET_GROUP_INFO).setData(t).send().addHook(
				function(t, e) {
					t.group_info.group_type = t.group_info.flag, delete t.group_info.flag, e && e(t)
				})
		}, l.prototype.updateGroupInfo = function(t) {
			this.__checkLogin();
			var e = new a(this.channel).setEvent(s.EVENTS.UPDATE_GROUP_INFO);
			return t.avatar ? this.__uploadFile({
				appkey: this.current_appkey,
				username: this.current_user,
				file: t.avatar,
				type: "image"
			}, function(n, o) {
				if (n) return n.is_timeout ? e.timeout && e.timeout(n.data) : e.fail && e.fail(n.data);
				delete t.avatar, t.media_id = o.media_id, e.setData(t).send()
			}) : e.setData(t).send(), e
		}, l.prototype.getGroupMembers = function(t) {
			this.__checkLogin();
			var e = this;
			return new a(this.channel).setEvent(s.EVENTS.GET_GROUP_MEMBERS).setData(t).send().onUserInfoGet(function(t, n) {
				e[t] = n
			})
		}, l.prototype.addGroupMembers = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.ADD_ACROSS_GROUP_MEMBER).setData(t).send()
		}, l.prototype.delGroupMembers = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.DEL_ACROSS_GROUP_MEMBER).setData(t).send()
		}, l.prototype.getNoDisturb = function() {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.NO_DISTURB).setData({
				version: 0
			}).send().addHook(function(t, e) {
				t.no_disturb.groups.forEach(function(t) {
					t.group_type = t.flag, delete t.flag
				}), e && e(t)
			})
		}, l.prototype.addSingleNoDisturb = function(t) {
			return this.__checkLogin(), t.version = 0, new a(this.channel).setEvent(s.EVENTS.ADD_MSG_NO_DISTURB_SINGLE).setData(
				t).send()
		}, l.prototype.delSingleNoDisturb = function(t) {
			return this.__checkLogin(), t.version = 0, new a(this.channel).setEvent(s.EVENTS.DELETE_MSG_NO_DISTURB_SINGLE).setData(
				t).send()
		}, l.prototype.addGroupNoDisturb = function(t) {
			return this.__checkLogin(), t.version = 0, new a(this.channel).setEvent(s.EVENTS.ADD_MSG_NO_DISTURB_GROUP).setData(
				t).send()
		}, l.prototype.delGroupNoDisturb = function(t) {
			return this.__checkLogin(), t.version = 0, new a(this.channel).setEvent(s.EVENTS.DELETE_MSG_NO_DISTURB_GROUP).setData(
				t).send()
		}, l.prototype.addGlobalNoDisturb = function() {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.ADD_MSG_NO_DISTURB_GLOBAL).setData({
				version: 0
			}).send()
		}, l.prototype.delGlobalNoDisturb = function() {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.DELETE_MSG_NO_DISTURB_GLOBAL).setData({
				version: 0
			}).send()
		}, l.prototype.getBlacks = function() {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.GET_BLACK_LIST).setData({
				version: 0
			}).send()
		}, l.prototype.addSingleBlacks = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.ADD_BLACK_LIST).setData(t).send()
		}, l.prototype.delSingleBlacks = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.DEL_BLACK_LIST).setData(t).send()
		}, l.prototype.getFriendList = function() {
			this.__checkLogin();
			var t = this;
			return new a(this.channel).setEvent(s.EVENTS.GET_FRIEND_LIST).setData({}).send().onUserInfoGet(function(e, n) {
				t[e] = n
			})
		}, l.prototype.addFriend = function(t) {
			return this.__checkLogin(), t.from_type = s.FRIEND_INVITE, new a(this.channel).setEvent(s.EVENTS.ADD_FRIEND).setData(
				t).send()
		}, l.prototype.acceptFriend = function(t) {
			return this.__checkLogin(), t.why = "yes", t.from_type = s.FRIEND_INVITED, new a(this.channel).setEvent(s.EVENTS
				.ADD_FRIEND).setData(t).send()
		}, l.prototype.declineFriend = function(t) {
			return this.__checkLogin(), t.why && "" != t.why.trim() || (t.why = "no"), t.from_type = s.FRIEND_INVITED, new a(
				this.channel).setEvent(s.EVENTS.ADD_FRIEND).setData(t).send()
		}, l.prototype.delFriend = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.DEL_FRIEND).setData(t).send()
		}, l.prototype.updateFriendMemo = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.UPDATE_FRIEND_MEMO).setData(t).send()
		}, l.prototype.addGroupShield = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.ADD_MSG_SHIELD_GROUP).setData(t).send()
		}, l.prototype.delGroupShield = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.DEL_MSG_SHIELD_GROUP).setData(t).send()
		}, l.prototype.groupShieldList = function() {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.LIST_SHIELD_GROUP).setData({}).send().addHook(
				function(t, e) {
					t.groups.forEach(function(t) {
						t.group_type = t.flag, delete t.flag
					}), e && e(t)
				})
		}, l.prototype.getResource = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.GET_RESOURCE).setData(t).send()
		}, l.prototype._updateGroupUnreadCount = function(t) {
			this.__checkLogin(), t.type = 4, new a(this.channel).setEvent(s.EVENTS.UNREAD_GROUP_COUNT).setData(t).send()
		}, l.prototype._updateSingleUnreadCount = function(t) {
			this.__checkLogin(), t.type = 3, new a(this.channel).setEvent(s.EVENTS.UNREAD_SINGLE_COUNT).setData(t).send()
		}, l.prototype.msgUnreadList = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.MSG_UNREAD_LIST).setData(t).send()
		}, l.prototype.addGroupReceiptReport = function(t) {
			this.__checkLogin();
			var e = this;
			if (t.msg_ids instanceof Array && 0 !== t.msg_ids.length) {
				t.key = t.gid, t.type = 4;
				var n = new c(t);
				return e.report.push(n), setTimeout(function() {
					e._checkReportSize() >= s.RECEIPT_REPORT_MAX_SIZE && e._receiptReport()
				}, 50), n
			}
			console.error("msg_ids is not Array type or msg_ids size=0")
		}, l.prototype.addSingleReceiptReport = function(t) {
			this.__checkLogin();
			var e = this;
			if (t.msg_ids instanceof Array && 0 !== t.msg_ids.length) {
				t.appkey || (t.appkey = e.current_appkey), t.type = 3, t.key = t.appkey + t.username;
				var n = new c(t);
				return e.report.push(n), setTimeout(function() {
					e._checkReportSize() >= s.RECEIPT_REPORT_MAX_SIZE && e._receiptReport()
				}, 50), n
			}
			console.error("msg_ids is not Array type or msg_ids size=0")
		}, l.prototype._checkReportSize = function() {
			var t = 0;
			return this.report.forEach(function(e) {
				t += e.args.msg_ids.length
			}), t
		}, l.prototype.transSingleMsg = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.TRANS_MSG_SINGLE).setData(t).send()
		}, l.prototype.transGroupMsg = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.TRANS_MSG_GROUP).setData(t).send()
		}, l.prototype.transPlatMsg = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.TRANS_MSG_PLATFORM).setData(t).send()
		}, l.prototype.updateConversation = function(t) {
			this.__checkLogin();
			var e, n = this;
			t.appkey || (t.appkey = n.current_appkey), t.gid ? e = t.gid : t.username && (e = t.appkey + t.username), e &&
				t.extras && (n.conversations[e] || (n.conversations[e] = {}), n.conversations[e].extras = t.extras), h.StorageUtils
				.addItem(n.channel.conversations_key, JSON.stringify(n.conversations))
		}, l.prototype.addGroupMemberResp = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.ADMIN_ADD_GROUP_MEMBER).setData(t).send()
		}, l.prototype.joinGroup = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.APPLY_JOIN_GROUP).setData(t).send()
		}, l.prototype.getAppkeyChatrooms = function(t) {
			return this.__checkLogin(), !t && (t = {}), new a(this.channel).setEvent(s.EVENTS.ROOM_LIST).setData(t).send().addHook(
				function(t, e) {
					t.result.rooms.forEach(function(t) {
						h.Cache.rooms[t.id] = t
					}), e && e(t)
				})
		}, l.prototype.getSelfChatrooms = function() {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.ROOM_LIST_SELF).setData({}).send().addHook(
				function(t, e) {
					t.chat_rooms.forEach(function(t) {
						h.Cache.rooms[t.id] = t
					}), e && e(t)
				})
		}, l.prototype.getChatroomInfo = function(t) {
			this.__checkLogin();
			var e = new a(this.channel);
			return h.Cache.rooms[t.id] ? setTimeout(function() {
				var n = {
					code: 0,
					message: "success"
				};
				n.info = h.Cache.rooms[t.id], e.cleanRespTimeout(), e.success && e.success(n)
			}, 100) : e.setEvent(s.EVENTS.ROOM_INFO).setData(t).send().addHook(function(t, e) {
				h.Cache.rooms[t.info.id] = t.info, e && e(t)
			}), e
		}, l.prototype.enterChatroom = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.JOIN_ROOM).setData(t).send()
		}, l.prototype.exitChatroom = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.EXIT_ROOM).setData(t).send()
		}, l.prototype.sendChatroomMsg = function(t) {
			return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === h.Cache.rooms[t.target_rid] ? "" : h
				.Cache.rooms[t.target_rid].name), this.__sendMsg({
				type: "chatroom",
				target_id: t.target_rid,
				target_name: t.target_rname,
				content: t.content,
				extras: t.extras,
				msg_body: t.msg_body
			})
		}, l.prototype.sendChatroomPic = function(t) {
			return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === h.Cache.rooms[t.target_rid] ? "" : h
				.Cache.rooms[t.target_rid].name), this.__sendPic({
				type: "chatroom",
				target_id: t.target_rid,
				target_name: t.target_rname,
				file: t.image,
				extras: t.extras,
				msg_body: t.msg_body
			})
		}, l.prototype.sendChatroomFile = function(t) {
			return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === h.Cache.rooms[t.target_rid] ? "" : h
				.Cache.rooms[t.target_rid].name), this.__sendFile({
				type: "chatroom",
				target_id: t.target_rid,
				target_name: t.target_rname,
				file: t.file,
				extras: t.extras,
				msg_body: t.msg_body
			})
		}, l.prototype.sendChatroomCustom = function(t) {
			return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === h.Cache.rooms[t.target_rid] ? "" : h
				.Cache.rooms[t.target_rid].name), this.__sendCustom({
				type: "chatroom",
				target_id: t.target_rid,
				target_name: t.target_rname,
				custom: t.custom,
				extras: t.extras,
				msg_body: t.msg_body
			})
		}, l.prototype.sendChatroomLocation = function(t) {
			return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === h.Cache.rooms[t.target_rid] ? "" : h
				.Cache.rooms[t.target_rid].name), this.__sendLocation({
				type: "chatroom",
				target_id: t.target_rid,
				target_name: t.target_rname,
				latitude: t.latitude,
				longitude: t.longitude,
				scale: t.scale,
				label: t.label,
				extras: t.extras,
				msg_body: t.msg_body
			})
		}, l.prototype.addGroupMemSilence = function(t) {
			return this.__checkLogin(), t.keep_silence = !0, new a(this.channel).setEvent(s.EVENTS.GROUP_MEM_SILENCE).setData(
				t).send()
		}, l.prototype.delGroupMemSilence = function(t) {
			return this.__checkLogin(), t.keep_silence = !1, new a(this.channel).setEvent(s.EVENTS.GROUP_MEM_SILENCE).setData(
				t).send()
		}, l.prototype.dissolveGroup = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.DISSOLVE_GROUP).setData(t).send()
		}, l.prototype.addGroupKeeper = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.ADD_GROUP_KEEPER).setData(t).send()
		}, l.prototype.delGroupKeeper = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.DEL_GROUP_KEEPER).setData(t).send()
		}, l.prototype.changeGroupAdmin = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.CHANGE_GROUP_ADMIN).setData(t).send()
		}, l.prototype.getAppkeyPublicGroups = function(t) {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.PUBLIC_GROUP_LIST).setData(t).send().addHook(
				function(t, e) {
					t.result.groups.forEach(function(t) {
						t.group_type = t.flag, delete t.flag
					}), e && e(t)
				})
		}, l.prototype.isInit = function() {
			return !!this.current_appkey
		}, l.prototype.isLogin = function() {
			return !!this.current_user
		}, l.prototype.isConnect = function() {
			return !!this.channel.client.connected
		}, l.prototype._addEventListen = function() {
			var t = this;
			t.channel.client.on(s.EVENTS.MSG_SYNC, function(e) {
				t._onMsgReceive(e)
			}), t.channel.client.on(s.EVENTS.EVENT_NOTIFICATION, function(e) {
				t._onEventNotification(e)
			}), t.channel.client.on(s.EVENTS.SYNC_CONVERSATION, function(e) {
				t._onSyncConversation(e)
			}), t.channel.client.on(s.EVENTS.SYNC_EVENT, function(e) {
				t._onSyncEvent(e)
			}), t.channel.client.on(s.EVENTS.SYNC_RECEIPT, function(e) {
				t._onSyncMsgReceipt(e)
			}), t.channel.client.on(s.EVENTS.RECEIPT_CHANGE, function(e) {
				t._onMsgReceiptChange(e)
			}), t.channel.client.on(s.EVENTS.TRANS_MSG_REC, function(e) {
				t._onTransMsgRec(e)
			}), t.channel.client.on(s.EVENTS.ROOM_MSG_SYNC, function(e) {
				t._onRoomMsg(e)
			}), t.channel.client.on(s.EVENTS.ROOM_MSG_SYNC_HIS, function(e) {
				t._onSyncRoomMsg(e)
			}), t.channel.client.on("disconnect", function() {
				t._onDisconnect()
			})
		}, l.prototype.onRoomMsg = function(t) {
			this._onRoomMsgFn = t
		}, l.prototype._onRoomMsg = function(t) {
			this._onRoomMsgFn && this._onRoomMsgFn(t)
		}, l.prototype._onSyncRoomMsg = function(t) {
			var e = this;
			t.messages.forEach(function(n) {
				h.Cache.rooms[n.room_id] || e.getChatroomInfo({
					id: t.room_id
				}), n.msgs && n.msgs.forEach(function(t) {
					e._onRoomMsgFn && e._onRoomMsgFn(t)
				})
			})
		}, l.prototype.onMsgReceive = function(t) {
			this._onMsgReceiveFn = t
		}, l.prototype._onMsgReceive = function(t) {
			var e = this;
			Array.prototype.push.apply([], t.messages.map(function(t) {
					return {
						msg_id: t.msg_id,
						msg_type: t.msg_type,
						from_uid: t.from_uid,
						from_gid: t.from_gid
					}
				})), t.messages.forEach(function(t) {
					if (t.content.sui_mtime && e[t.from_uid] && t.content.sui_mtime > new Date(e[t.from_uid]).getTime() / 1e3) {
						e[t.from_uid] = 1e3 * t.content.sui_mtime;
						var n = {};
						n.from_username = t.content.from_id, n.from_appkey = t.content.from_appkey, n.mtime = t.content.sui_mtime,
							delete t.content.sui_mtime, e._updateInfoEventFun && e._updateInfoEventFun(n)
					}
					var o;
					3 === t.msg_type ? (t.key = t.from_uid, t.from_username = t.content.from_id, t.from_appkey = t.content.from_appkey,
							o = t.from_appkey + t.from_username) : (t.key = t.from_gid, o = String(t.from_gid)), 0 === t.msg_level ? t
						.msg_level = "normal" : 1 === t.msg_level && (t.msg_level = "across");
					var r = !1;
					t.from_appkey === e.current_appkey && t.from_username === e.current_user && (r = !0, o = (void 0 === t.content
							.target_appkey || "" === t.content.target_appkey ? t.content.from_appkey : t.content.target_appkey) + t.content
						.target_id);
					e.lastMsgs[o] = {
							last_msg_time: t.ctime_ms
						}, e.conversations[o] || (e.conversations[o] = {}, e.conversations[o].extras = {}, e.conversations[o].unread_msg_count =
							0, e.conversations[o].msg_time = []), e.current_conversation === o || r ? (e.conversations[o].recent_time =
							t.ctime_ms, e.conversations[o].unread_msg_count = 0, e.conversations[o].msg_time = []) : (e.conversations[
							o].unread_msg_count = e.conversations[o].unread_msg_count + 1, e.conversations[o].msg_time.push(t.ctime_ms)),
						new a(e.channel).setEvent(s.EVENTS.MSG_RECV_V2).setData({
							msg_id: t.msg_id,
							msg_type: t.msg_type,
							from_uid: t.from_uid,
							from_gid: t.from_gid
						}).send()
				}), h.StorageUtils.addItem(e.channel.conversations_key, JSON.stringify(e.conversations)), this._onMsgReceiveFn &&
				this._onMsgReceiveFn(t)
		}, l.prototype.onEventNotification = function(t) {
			this._onEventNotificationFn = t
		}, l.prototype._onEventNotification = function(t) {
			var e = this;
			if (200 !== t.event_type) {
				var n = e.__eventDateFilter(t);
				if (56 === t.event_type && 10 == t.extra ? (n.by_self = !1, delete n.extra) : 56 === t.event_type && 59 == t.extra &&
					(n.by_self = !0, delete n.extra), 1 === t.event_type) {
					var o = {
						event_id: t.event_id,
						event_type: t.event_type,
						from_uid: t.from_uid,
						gid: t.gid
					};
					new a(e.channel).setEvent(s.EVENTS.EVENT_NOTIFICATION).setData(o).send()
				}
				e._onEventNotificationFn && e._onEventNotificationFn(n), -1 != s.LOGIN_OUT_EVENT.indexOf(t.event_type) && e.loginOut()
			} else 3 === t.description.type ? e._dealMutlReadEvent(t.description.type, t.ctime_ms, t.description.appkey, t.description
				.username) : e._dealMutlReadEvent(t.description.type, t.ctime_ms, t.description.gid)
		}, l.prototype.onSyncConversation = function(t) {
			this._onSyncConversationFn = t
		}, l.prototype._onSyncConversation = function(t) {
			var e = this;
			e.channel.sync_key = t.sync_key, t.messages && (t.messages.forEach(function(t) {
					var n, o = 0;
					n = 3 === t.msg_type ? t.from_appkey + t.from_username : String(t.from_gid);
					var r = t.msgs[t.msgs.length - 1].ctime_ms;
					if (e.current_conversation === n) e.conversations[n] = void 0 === e.conversations[n] ? {} : e.conversations[
						n], e.conversations[n].unread_msg_count = o, e.conversations[n].recent_time = r, e.conversations[n].msg_time = [];
					else if (e.conversations[n] && e.conversations[n].recent_time) {
						var i = e.conversations[n].recent_time;
						t.msgs.forEach(function(t) {
							t.ctime_ms <= i || t.content.from_appkey === e.current_appkey && t.content.from_id === e.current_user ?
								(o = 0, e.conversations[n].msg_time = []) : (o++, e.conversations[n].msg_time.push(t.ctime_ms))
						}), e.channel.sync_type === s.SYNC_TYPE_OPEN ? e.conversations[n].unread_msg_count = o : e.conversations[
							n].unread_msg_count += o
					} else o = t.unsync_count, e.conversations[n] = void 0 === e.conversations[n] ? {} : e.conversations[n], e.conversations[
						n].unread_msg_count = o, t.msgs.length - 1 - o < 0 ? e.conversations[n].recent_time = -1 : e.conversations[
						n].recent_time = t.msgs[t.msgs.length - 1 - o].ctime_ms, e.conversations[n].msg_time = [];
					e.lastMsgs[n] = {
						last_msg_time: r
					}, delete t.unsync_count, t.unread_msg_count = e.conversations[n].unread_msg_count
				}), h.StorageUtils.addItem(e.channel.conversations_key, JSON.stringify(e.conversations)), e._onSyncConversationFn &&
				t.messages.length > 0 && e._onSyncConversationFn(t.messages));
			var n = {
				sync_key: e.channel.sync_key
			};
			new a(e.channel).setEvent(s.EVENTS.SYNC_CONVERSATION_ACK).setData(n).send()
		}, l.prototype.onSyncEvent = function(t) {
			this._onSyncEventFn = t
		}, l.prototype._onSyncEvent = function(t) {
			var e = this;
			e.channel.sync_event_key = t.sync_key, h.StorageUtils.addItem(e.channel.event_key, t.sync_key);
			var n = {
				sync_key: e.channel.sync_event_key
			};
			new a(e.channel).setEvent(s.EVENTS.SYNC_EVENT_ACK).setData(n).send(), setTimeout(function() {
				if (e._onSyncEventFn && t.events && t.events.length > 0) {
					var n = [];
					t.events.forEach(function(o) {
						if (200 === o.event_type) 3 === o.description.type ? e._dealMutlReadEvent(o.description.type, o.ctime_ms,
							o.description.appkey, o.description.username) : e._dealMutlReadEvent(o.description.type, o.ctime_ms, o
							.description.gid);
						else {
							var r = e.__eventDateFilter(o);
							56 === t.event_type && 10 == t.extra ? (delete r.extra, r.by_self = !1) : 56 === t.event_type && 59 ==
								t.extra && (delete r.extra, r.by_self = !0), n.push(r)
						}
					}), e._onSyncEventFn(n)
				}
			}, 1700)
		}, l.prototype.onSyncMsgReceipt = function(t) {
			this._onSyncMsgReceiptFn = t
		}, l.prototype._onSyncMsgReceipt = function(t) {
			var e = this;
			if (e.channel.msg_receipt_key = t.sync_key, e._onSyncMsgReceiptFn && t.receipts && t.receipts.length > 0) {
				var n = {},
					o = [];
				t.receipts.forEach(function(t) {
					var e = t.gid;
					if (3 === t.type && (e = t.appkey + t.username), n[e]) {
						var r = Number(n[e]);
						Array.prototype.push.apply(o[r].receipt_msgs, t.receipt_msgs)
					} else t.receipt_msgs.length > 0 && (n[e] = String(o.length), o.push(t))
				}), setTimeout(function() {
					e._onSyncMsgReceiptFn && o.length > 0 && e._onSyncMsgReceiptFn(o)
				}, 1500)
			}
			var r = {
				sync_key: e.channel.msg_receipt_key
			};
			new a(e.channel).setEvent(s.EVENTS.SYNC_RECEIPT_ACK).setData(r).send()
		}, l.prototype.onMsgReceiptChange = function(t) {
			this._onMsgReceiptChangeFn = t
		}, l.prototype._onMsgReceiptChange = function(t) {
			this._onMsgReceiptChangeFn && this._onMsgReceiptChangeFn(t)
		}, l.prototype.onUserInfUpdate = function(t) {
			this._updateInfoEventFun = t
		}, l.prototype.onMutiUnreadMsgUpdate = function(t) {
			this._conversationUpdateFun = t
		}, l.prototype.onTransMsgRec = function(t) {
			this._onTransMsgRecFn = t
		}, l.prototype._onTransMsgRec = function(t) {
			this._onTransMsgRecFn && this._onTransMsgRecFn(t)
		}, l.prototype.onDisconnect = function(t) {
			this._onDisconnectFn = t
		}, l.prototype._onDisconnect = function() {
			var t = this;
			clearTimeout(t.syncTask), clearTimeout(t.msgReceipTask), t.autoDiscon && (t.current_appkey = null, t.current_user =
				null, t._onDisconnectFn && t._onDisconnectFn()), this.channel.init(this.channel.opts)
		}, l.prototype._dealMutlReadEvent = function(t, e, n, o) {
			var r, i = this,
				s = {};
			if (s.type = t, 3 === t ? (r = n + o, s.username = o, s.appkey = n) : (r = String(n), s.gid = n), i.conversations[
					r] = void 0 === i.conversations[r] ? {
					msg_time: [],
					unread_msg_count: 0
				} : i.conversations[r], i.conversations[r].recent_time = e, i.current_conversation === r) i.conversations[r].unread_msg_count =
				0, i.conversations[r].msg_time = [];
			else {
				var a = i.conversations[r].unread_msg_count,
					c = [],
					u = 0;
				i.conversations[r].msg_time.forEach(function(t) {
					t > e && (u++, c.push(t))
				}), i.conversations[r].msg_time = c, u < a && (i.conversations[r].unread_msg_count = u, s.unreadCount = u, h.StorageUtils
					.addItem(i.channel.conversations_key, JSON.stringify(i.conversations)), i._conversationUpdateFun && i._conversationUpdateFun(
						s))
			}
		}, l.prototype._receiptReport = function() {
			if (this.report.length > 0) {
				var t = {},
					e = [];
				this.report.forEach(function(n) {
					if (t[n.args.key]) {
						var o = Number(t[n.args.key]);
						Array.prototype.push.apply(e[o].result.msg_ids, n.args.msg_ids), e[o].msg_reports.push(n)
					} else t[n.args.key] = String(e.length), e.push({
						result: n.args,
						msg_reports: [n]
					})
				}), this.report = [];
				for (var n = 0; n < e.length; n++) e[n].result.msg_ids = h.ArrayUtils.delRepeatItem(e[n].result.msg_ids),
					delete e[n].result.key, this._msgReceipt(e[n])
			}
		}, l.prototype._msgReceipt = function(t) {
			new a(this.channel).setEvent(s.EVENTS.RECEIPT_REPORT).setData({
				sessions: [t.result]
			}).send().onSuccess(function(e) {
				t.msg_reports.forEach(function(t) {
					t.success && t.success(e, t.args.msg_ids)
				})
			}).onFail(function(e) {
				t.msg_reports.forEach(function(t) {
					t.fail && t.fail(e, t.args.msg_ids)
				})
			}).onAck(function(e) {
				t.msg_reports.forEach(function(t) {
					t.ack && t.ack(e, t.args.msg_ids)
				})
			}).onTimeout(function(e) {
				t.msg_reports.forEach(function(t) {
					t.timeout && t.timeout(e, t.args.msg_ids)
				})
			})
		}, l.prototype.__eventDateFilter = function(t) {
			var e = {};
			return e.event_id = t.event_id, e.event_type = t.event_type, e.from_username = t.from_username, e.gid = t.gid,
				e.to_usernames = t.to_usernames, e.ctime = t.ctime, e.extra = t.extra, e.return_code = t.return_code, e.from_appkey =
				t.from_appkey, e.msg_ids = t.msg_ids, e.from_gid = t.from_gid, e.msgid_list = t.msgid_list, e.to_groups = t.to_groups,
				e.new_owner = t.new_owner, e.group_name = t.group_name, e.ctime_ms = t.ctime_ms, e.media_id = t.media_id, e.from_nickname =
				t.from_nickname, e.from_eventid = t.from_eventid, 100 === t.event_type && 7 === t.extra ? e.description = JSON
				.parse(t.description) : e.description = t.description, 55 === t.event_type && 0 === t.from_gid ? e.type = 0 :
				55 === t.event_type && 0 != t.from_gid && (e.type = 1), e
		}, l.prototype.__checkConnect = function() {
			if (!this.channel.client.connected) throw new Error("wss socket not connect")
		}, l.prototype.__checkInit = function() {
			if (!this.current_appkey) throw new Error("must init first")
		}, l.prototype.__checkLogin = function() {
			if (!this.current_user) throw new Error("must login first")
		}, l.prototype.__getUploadToken = function() {
			return this.__checkLogin(), new a(this.channel).setEvent(s.EVENTS.GET_UPLOAD_TOKEN).setData({}).send()
		}, l.prototype.__uploadFile0 = function(t, e) {
			var n = new XMLHttpRequest;
			n.open("POST", this.opts.upload_file + "?type=" + t.type), n.setRequestHeader("X-App-Key", t.appkey), n.setRequestHeader(
					"jm-channel", s.PLAT_CHANNEL), n.setRequestHeader("Authorization", "Basic " + r.btoa(t.username + ":" + t.token)),
				n.onreadystatechange = function() {
					if (4 === this.readyState)
						if (200 === this.status) {
							var t = JSON.parse(this.responseText);
							e(null, t)
						} else try {
							var n = JSON.parse(this.responseText);
							898061 === n.error.code ? e({
								code: 880210,
								message: "file size exceed limit"
							}) : e(n)
						} catch (t) {
							e({
								code: 880210,
								message: "file size exceed the limit"
							})
						}
				}, n.send(t.file)
		}, l.prototype.__uploadFile = function(t, e) {
			var n = this;
			o(function(t) {
				n.__getUploadToken().onSuccess(function(e) {
					t(null, e.uptoken)
				}).onFail(function(e) {
					t(e)
				}).onTimeout(function(t) {
					e({
						is_timeout: !0,
						data: t
					})
				})
			}).then(function(e, o) {
				n.__uploadFile0({
					type: t.type,
					file: t.file,
					appkey: t.appkey,
					username: t.username,
					token: o
				}, e)
			}).then(function(t, n) {
				e(null, n)
			}).fail(function(t, n) {
				e({
					data: n
				})
			})
		}, l.prototype.__sendMsg = function(t) {
			this.__checkLogin();
			return new a(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS
				.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG).setData(new u(this.current_user, this.current_appkey).setType(t.type)
				.setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setText(t.content ?
					t.content : t.msg_body.text, t.content ? t.extras : t.msg_body.extras).setAtList(t.at_list).setNoOffline(!0 ===
					t.no_offline).setNoNotification(!0 === t.no_notification).setCustomNotification(t.custom_notification).build()
			).send()
		}, l.prototype.__sendPic = function(t) {
			this.__checkLogin();
			var e = new a(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS
					.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG),
				n = new u(this.current_user, this.current_appkey).setType(t.type).setAppkey(t.appkey).setNeedReceipt(t.need_receipt)
				.setTarget(t.target_id, t.target_name).setNoOffline(!0 === t.no_offline).setNoNotification(!0 === t.no_notification)
				.setCustomNotification(t.custom_notification);
			return t.file ? this.__uploadFile({
				appkey: this.current_appkey,
				username: this.current_user,
				file: t.file,
				type: "image"
			}, function(o, r) {
				if (o) return o.is_timeout ? e.timeout && e.timeout(o.data) : e.fail && e.fail(o.data);
				e.setData(n.setImage(r, t.extras).build()).send()
			}) : e.setData(n.setImage(t.msg_body, t.msg_body.extras).build()).send(), e
		}, l.prototype.__sendFile = function(t) {
			this.__checkLogin();
			var e = new a(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS
					.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG),
				n = new u(this.current_user, this.current_appkey).setType(t.type).setAppkey(t.appkey).setNeedReceipt(t.need_receipt)
				.setTarget(t.target_id, t.target_name).setNoOffline(!0 === t.no_offline).setNoNotification(!0 === t.no_notification)
				.setCustomNotification(t.custom_notification);
			return t.file ? this.__uploadFile({
				appkey: this.current_appkey,
				username: this.current_user,
				file: t.file,
				type: "file"
			}, function(o, r) {
				if (o) return o.is_timeout ? e.timeout && e.timeout(o.data) : e.fail && e.fail(o.data);
				e.setData(n.setFile(r, t.extras).build()).send()
			}) : e.setData(n.setFile(t.msg_body, t.msg_body.extras).build()).send(), e
		}, l.prototype.__sendLocation = function(t) {
			this.__checkLogin();
			return new a(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS
				.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG).setData(new u(this.current_user, this.current_appkey).setType(t.type)
				.setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setLocation(t.latitude ?
					t : t.msg_body, t.latitude ? t.extras : t.msg_body.extras).setNoOffline(!0 === t.no_offline).setNoNotification(
					!0 === t.no_notification).setCustomNotification(t.custom_notification).build()).send()
		}, l.prototype.__sendCustom = function(t) {
			this.__checkLogin();
			return new a(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS
				.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG).setData(new u(this.current_user, this.current_appkey).setType(t.type)
				.setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setCustom(t.custom ?
					t.custom : t.msg_body, t.custom ? t.extras : t.msg_body.extras).setNoOffline(!0 === t.no_offline).setNoNotification(
					!0 === t.no_notification).setCustomNotification(t.custom_notification).build()).send()
		}, t.exports = l
	}, function(t, e, n) {
		var o, r, i;
		(function(n) {
			! function(n, s) {
				"use strict";
				"object" == typeof t && "object" == typeof t.exports ? t.exports = s() : (r = [], void 0 === (i = "function" ==
					typeof(o = s) ? o.apply(e, r) : o) || (t.exports = i))
			}("object" == typeof window && window, function() {
				"use strict";
				var t = 100,
					e = Object.prototype.toString,
					o = Object.prototype.hasOwnProperty,
					r = "function" == typeof n ? n : function(t) {
						setTimeout(t, 0)
					},
					i = Array.isArray || function(t) {
						return "[object Array]" === e.call(t)
					};

				function s(t, e) {
					if ((e = e || 0) >= t.length) return [];
					for (var n = t.length, o = Array(n - e); n-- > e;) o[n - e] = t[n];
					return o
				}

				function a(t, e) {
					try {
						e.apply(null, s(arguments, 2))
					} catch (e) {
						t(e)
					}
				}

				function c(t, e) {
					var n = arguments;
					r(function() {
						a.apply(null, n)
					})
				}

				function u(t, e) {
					return function(t, e) {
						for (var n = [], o = 0, r = t.length; o < r; o++) n.push(e(t[o], o, t));
						return n
					}(t, function(t, n, o) {
						return function(r) {
							e(r, t, n, o)
						}
					})
				}

				function p(t, e) {
					var n, o, r = this;
					return t instanceof p ? t : r instanceof p ? (r._chain = 0, r._success = r._parallel = r._series = null, r._finally =
						r._error = r._result = r._nextThen = null, arguments.length ? (n = d(r, e), void(void 0 === (t = null == (
							o = t) ? o : "function" == typeof o.toThunk ? o.toThunk() : "function" == typeof o.then ? function(t) {
							o.then(function(e) {
								t(null, e)
							}, t)
						} : o) ? n() : "function" == typeof t ? c(n, t, n) : n(null, t))) : r) : new p(t, e)
				}
				p.defer = c, p.parallel = function(t, e) {
					return new p(function(e) {
						a(e, g, e, t)
					}, e)
				}, p.series = function(t, e) {
					return new p(function(e) {
						a(e, m, e, t)
					}, e)
				}, p.each = function(t, e, n) {
					return new p(function(n) {
						a(n, g, n, u(t, e))
					}, n)
				}, p.eachSeries = function(t, e, n) {
					return new p(function(n) {
						a(n, m, n, u(t, e))
					}, n)
				}, p.parallelLimit = function(t, e, n) {
					return new p(function(n) {
						v(n, t, e)
					}, n)
				}, p.eachLimit = function(t, e, n, o) {
					return new p(function(o) {
						v(o, u(t, e), n)
					}, o)
				}, p.nextTick = function(t) {
					var e = s(arguments, 1);
					r(function() {
						t.apply(null, e)
					})
				}, p.onerror = function(t) {
					throw console.error("Thenjs caught error: ", t), t
				};
				var h = p.prototype;

				function l() {
					var t = this,
						e = s(arguments);
					!1 !== t._result && (!t._result && t._chain && t.debug.apply(t, ["\nChain " + t._chain + ": "].concat(s(e))),
						t._result = !1, a(function(n) {
							n === e[0] ? function(t, e) {
								var n = t,
									o = t._error || t._finally;
								for (; !o && n._nextThen;) n = n._nextThen, o = n._error || n._finally;
								if (o) return a(function(t) {
									l.call(n._nextThen, t)
								}, o, e);
								if (p.onerror) return p.onerror(e);
								for (; n._nextThen;) n = n._nextThen;
								n._result = [e]
							}(t, n) : l.call(t._nextThen, n)
						}, f, t, e))
				}

				function f(t, e) {
					if (null == e[0]) e[0] = null;
					else if (e = [e[0]], !t._finally) throw e[0];
					if (t._finally) return t._finally.apply(null, e);
					var n = t._success || t._parallel || t._series;
					if (n) return n.apply(null, s(e, 1));
					t._result = e
				}

				function d(t, e) {
					function n() {
						return l.apply(t, arguments)
					}
					return n._isCont = !0, e && (h.debug = "function" == typeof e ? e : E, t._chain = 1), n
				}

				function _(t, e, n) {
					var o = new p;
					return t(d(o, n), e), e ? (e._nextThen = o, e._chain && (o._chain = e._chain + 1), e._result && r(function() {
						l.apply(e, e._result)
					}), o) : o
				}

				function y(t, e) {
					return e._isCont ? e : function() {
						var n = s(arguments);
						n.unshift(t), e.apply(null, n)
					}
				}

				function g(t, e) {
					if (!i(e)) return t(k(e, "parallel"));
					var n = e.length,
						o = [];
					if (n <= 0) return t(null, o);
					for (var r = 0, s = n; r < s; r++) e[r](a(r));

					function a(e) {
						function r(r, i) {
							if (!(n <= 0)) return null == r ? (o[e] = i, !--n && t(null, o)) : (n = 0, void t(r))
						}
						return r._isCont = !0, r
					}
				}

				function m(e, n) {
					if (!i(n)) return e(k(n, "series"));
					var o = 0,
						r = n.length - 1,
						s = [],
						u = t;
					if (r < 0) return e(null, s);

					function p(i, h) {
						return null != i ? e(i) : (s[o] = h, ++o > r ? e(null, s) : void(--u > 0 ? a : (u = t, c))(e, n[o], p))
					}
					p._isCont = !0, n[0](p)
				}

				function v(t, e, n) {
					var o = 0,
						r = 0,
						i = e.length,
						s = [],
						a = !1;
					n = n >= 1 ? Math.floor(n) : Number.MAX_VALUE;
					do {
						c()
					} while (o < i && r < n);

					function c() {
						if (!a) return o >= i ? (a = !0, g(t, s)) : void(r >= n || (r++, s.push(new p(e[o++]).fin(function(e, n, o) {
							if (null != n) return a = !0, t(n);
							r--, c(), e(null, o)
						}).toThunk())))
					}
				}

				function E() {
					console.log.apply(console, arguments)
				}

				function k(t, e) {
					return new Error("The argument " + (t && t.toString()) + ' in "' + e + '" is not Array!')
				}
				return h.fin = h.finally = function(t) {
					return _(function(e, n) {
						n._finally = y(e, t)
					}, this)
				}, h.then = function(t, e) {
					return _(function(n, o) {
						t && (o._success = y(n, t)), e && (o._error = y(n, e))
					}, this)
				}, h.fail = h.catch = function(t) {
					return _(function(e, n) {
						n._error = y(e, t), n._success = function() {
							var t = s(arguments);
							t.unshift(null), e.apply(null, t)
						}
					}, this)
				}, h.parallel = function(t) {
					return _(function(e, n) {
						n._parallel = function(n) {
							g(e, t || n)
						}
					}, this)
				}, h.series = function(t) {
					return _(function(e, n) {
						n._series = function(n) {
							m(e, t || n)
						}
					}, this)
				}, h.each = function(t, e) {
					return _(function(n, o) {
						o._parallel = function(o, r) {
							g(n, u(t || o, e || r))
						}
					}, this)
				}, h.eachSeries = function(t, e) {
					return _(function(n, o) {
						o._series = function(o, r) {
							m(n, u(t || o, e || r))
						}
					}, this)
				}, h.parallelLimit = function(t, e) {
					return _(function(n, o) {
						o._parallel = function(o) {
							v(n, t || o, e)
						}
					}, this)
				}, h.eachLimit = function(t, e, n) {
					return _(function(o, r) {
						r._series = function(r, i) {
							v(o, u(t || r, e || i), n)
						}
					}, this)
				}, h.toThunk = function() {
					var t = this;
					return function(e) {
						t._result ? (e.apply(null, t._result), t._result = !1) : !1 !== t._result && (t._finally = t._error = e)
					}
				}, h.inspect = function() {
					var t = {};
					for (var e in this) o.call(this, e) && (t[e] = "_nextThen" === e ? this[e] && this[e]._chain : this[e]);
					return t
				}, p.NAME = "Thenjs", p.VERSION = "2.0.3", p
			})
		}).call(e, n(3).setImmediate)
	}, function(t, e, n) {
		(function(t, o) {
			var r = n(4).nextTick,
				i = Function.prototype.apply,
				s = Array.prototype.slice,
				a = {},
				c = 0;

			function u(t, e) {
				this._id = t, this._clearFn = e
			}
			e.setTimeout = function() {
				return new u(i.call(setTimeout, window, arguments), clearTimeout)
			}, e.setInterval = function() {
				return new u(i.call(setInterval, window, arguments), clearInterval)
			}, e.clearTimeout = e.clearInterval = function(t) {
				t.close()
			}, u.prototype.unref = u.prototype.ref = function() {}, u.prototype.close = function() {
				this._clearFn.call(window, this._id)
			}, e.enroll = function(t, e) {
				clearTimeout(t._idleTimeoutId), t._idleTimeout = e
			}, e.unenroll = function(t) {
				clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
			}, e._unrefActive = e.active = function(t) {
				clearTimeout(t._idleTimeoutId);
				var e = t._idleTimeout;
				e >= 0 && (t._idleTimeoutId = setTimeout(function() {
					t._onTimeout && t._onTimeout()
				}, e))
			}, e.setImmediate = "function" == typeof t ? t : function(t) {
				var n = c++,
					o = !(arguments.length < 2) && s.call(arguments, 1);
				return a[n] = !0, r(function() {
					a[n] && (o ? t.apply(null, o) : t.call(null), e.clearImmediate(n))
				}), n
			}, e.clearImmediate = "function" == typeof o ? o : function(t) {
				delete a[t]
			}
		}).call(e, n(3).setImmediate, n(3).clearImmediate)
	}, function(t, e) {
		var n, o, r = t.exports = {};

		function i() {
			throw new Error("setTimeout has not been defined")
		}

		function s() {
			throw new Error("clearTimeout has not been defined")
		}

		function a(t) {
			if (n === setTimeout) return setTimeout(t, 0);
			if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
			try {
				return n(t, 0)
			} catch (e) {
				try {
					return n.call(null, t, 0)
				} catch (e) {
					return n.call(this, t, 0)
				}
			}
		}! function() {
			try {
				n = "function" == typeof setTimeout ? setTimeout : i
			} catch (t) {
				n = i
			}
			try {
				o = "function" == typeof clearTimeout ? clearTimeout : s
			} catch (t) {
				o = s
			}
		}();
		var c, u = [],
			p = !1,
			h = -1;

		function l() {
			p && c && (p = !1, c.length ? u = c.concat(u) : h = -1, u.length && f())
		}

		function f() {
			if (!p) {
				var t = a(l);
				p = !0;
				for (var e = u.length; e;) {
					for (c = u, u = []; ++h < e;) c && c[h].run();
					h = -1, e = u.length
				}
				c = null, p = !1,
					function(t) {
						if (o === clearTimeout) return clearTimeout(t);
						if ((o === s || !o) && clearTimeout) return o = clearTimeout, clearTimeout(t);
						try {
							o(t)
						} catch (e) {
							try {
								return o.call(null, t)
							} catch (e) {
								return o.call(this, t)
							}
						}
					}(t)
			}
		}

		function d(t, e) {
			this.fun = t, this.array = e
		}

		function _() {}
		r.nextTick = function(t) {
				var e = new Array(arguments.length - 1);
				if (arguments.length > 1)
					for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
				u.push(new d(t, e)), 1 !== u.length || p || a(f)
			}, d.prototype.run = function() {
				this.fun.apply(null, this.array)
			}, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = _, r.addListener =
			_, r.once = _, r.off = _, r.removeListener = _, r.removeAllListeners = _, r.emit = _, r.binding = function(t) {
				throw new Error("process.binding is not supported")
			}, r.cwd = function() {
				return "/"
			}, r.chdir = function(t) {
				throw new Error("process.chdir is not supported")
			}, r.umask = function() {
				return 0
			}
	}, function(t, e, n) {
		! function() {
			var t = e,
				n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

			function o(t) {
				this.message = t
			}
			o.prototype = new Error, o.prototype.name = "InvalidCharacterError", t.btoa || (t.btoa = function(t) {
				for (var e, r, i = String(t), s = 0, a = n, c = ""; i.charAt(0 | s) || (a = "=", s % 1); c += a.charAt(63 & e >>
						8 - s % 1 * 8)) {
					if ((r = i.charCodeAt(s += .75)) > 255) throw new o(
						"'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
					e = e << 8 | r
				}
				return c
			}), t.atob || (t.atob = function(t) {
				var e = String(t).replace(/=+$/, "");
				if (e.length % 4 == 1) throw new o("'atob' failed: The string to be decoded is not correctly encoded.");
				for (var r, i, s = 0, a = 0, c = ""; i = e.charAt(a++); ~i && (r = s % 4 ? 64 * r + i : i, s++ % 4) ? c +=
					String.fromCharCode(255 & r >> (-2 * s & 6)) : 0) i = n.indexOf(i);
				return c
			})
		}()
	}, function(t, e, n) {
		"use strict";
		var o = n(7),
			r = n(8),
			i = n(59),
			s = function(t) {
				this.init(t)
			};
		s.prototype.init = function(t) {
			this.opts = t, this.dataCache = {}, this.memStore = {}, this.sync_key = 0, this.sync_type = 0, this.client = r(
				this.opts.address, {
					transports: ["websocket", "polling"]
				});
			var e = this,
				n = o.prototype.emit,
				i = this.client.onevent;
			this.client.onevent = function(t) {
				var o = t.data || [];
				i.call(e.client, t), n.apply(e.client, ["*"].concat(o))
			}, this.client.on("*", function(t, n) {
				e.onReceive(t, n)
			})
		}, s.prototype.onReceive = function(t, e) {
			if (this.opts.debug && console.info("---<- event:%s, data:%s", t, JSON.stringify(e)), t !== i.EVENTS.EVENT_NOTIFICATION &&
				t !== i.EVENTS.MSG_SYNC && t !== i.EVENTS.SYNC_CONVERSATION && t !== i.EVENTS.SYNC_EVENT && t !== i.EVENTS.SYNC_RECEIPT &&
				t !== i.EVENTS.RECEIPT_CHANGE && t !== i.ROOM_MSG_SYNC && t !== i.ROOM_MSG_SYNC_HIS) {
				var n = this.dataCache[e.rid];
				delete e.rid, n && (0 === e.code && t === i.EVENTS.GET_GROUP_MEMBERS ? e.member_list.forEach(function(t) {
					n.userInfoGet && n.userInfoGet(t.uid, t.mtime), delete t.uid, delete t.mtime
				}) : 0 === e.code && t === i.EVENTS.GET_FRIEND_LIST ? e.friend_list.forEach(function(t) {
					n.userInfoGet && n.userInfoGet(t.uid, 1e3 * t.mtime), delete t.uid
				}) : 0 === e.code && t === i.EVENTS.GET_BLACK_LIST ? e.black_list.forEach(function(t) {
					delete t.uid
				}) : 0 === e.code && t === i.EVENTS.GET_ACROSS_USER_INFO && delete e.user_info.uid, t === i.EVENTS.ACK ? (n.ack &&
					n.ack({
						rid: e.rid,
						data: n.data
					}), n.cleanAckTimeout()) : (n.cleanRespTimeout(), delete this.dataCache[n.rid], e.code && 0 !== e.code ? n.fail &&
					n.fail(e) : t != i.EVENTS.S_SINGLE_TEXT_ && t != i.EVENTS.SEND_GROUP_MSG && t != i.EVENTS.SEND_ROOM_MSG ? n
					.hook ? n.hook(e, n.success) : n.success && n.success(e) : (n.data.msg_id = e.msg_id, t === i.EVENTS.S_SINGLE_TEXT_ &&
						(e.target_username = n.data.target_id, e.appkey = n.data.appkey), n.success && n.success(e, n.data), n.innerCall &&
						n.innerCall(e.msg_id))))
			}
		}, s.prototype.generateRid = function() {
			for (var t = Math.floor(-2147483646 * Math.random() + 2147483647); this.dataCache[t];) t = Math.floor(-
				2147483646 * Math.random() + 2147483647);
			return t
		}, s.prototype.send = function(t, e) {
			this.opts.debug && console.info("---\x3e- event:%s, data:%s", t, JSON.stringify(e)), this.client.emit(t, e)
		}, t.exports = s
	}, function(t, e, n) {
		function o(t) {
			if (t) return function(t) {
				for (var e in o.prototype) t[e] = o.prototype[e];
				return t
			}(t)
		}
		t.exports = o, o.prototype.on = o.prototype.addEventListener = function(t, e) {
				return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(
					e), this
			}, o.prototype.once = function(t, e) {
				function n() {
					this.off(t, n), e.apply(this, arguments)
				}
				return n.fn = e, this.on(t, n), this
			}, o.prototype.off = o.prototype.removeListener = o.prototype.removeAllListeners = o.prototype.removeEventListener =
			function(t, e) {
				if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
				var n, o = this._callbacks["$" + t];
				if (!o) return this;
				if (1 == arguments.length) return delete this._callbacks["$" + t], this;
				for (var r = 0; r < o.length; r++)
					if ((n = o[r]) === e || n.fn === e) {
						o.splice(r, 1);
						break
					} return this
			}, o.prototype.emit = function(t) {
				this._callbacks = this._callbacks || {};
				var e = [].slice.call(arguments, 1),
					n = this._callbacks["$" + t];
				if (n)
					for (var o = 0, r = (n = n.slice(0)).length; o < r; ++o) n[o].apply(this, e);
				return this
			}, o.prototype.listeners = function(t) {
				return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
			}, o.prototype.hasListeners = function(t) {
				return !!this.listeners(t).length
			}
	}, function(t, e, n) {
		var o = n(9),
			r = n(14),
			i = n(25),
			s = n(11)("socket.io-client");
		t.exports = e = c;
		var a = e.managers = {};

		function c(t, e) {
			"object" == typeof t && (e = t, t = void 0), e = e || {};
			var n, r = o(t),
				c = r.source,
				u = r.id,
				p = r.path,
				h = a[u] && p in a[u].nsps;
			return e.forceNew || e["force new connection"] || !1 === e.multiplex || h ? (s("ignoring socket cache for %s", c),
					n = i(c, e)) : (a[u] || (s("new io instance for %s", c), a[u] = i(c, e)), n = a[u]), r.query && !e.query ? e.query =
				r.query : e && "object" == typeof e.query && (e.query = function(t) {
					var e = [];
					for (var n in t) t.hasOwnProperty(n) && e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
					return e.join("&")
				}(e.query)), n.socket(r.path, e)
		}
		e.protocol = r.protocol, e.connect = c, e.Manager = n(25), e.Socket = n(54)
	}, function(t, e, n) {
		(function(e) {
			var o = n(10),
				r = n(11)("socket.io-client:url");
			t.exports = function(t, n) {
				var i = t;
				n = n || e.location, null == t && (t = n.protocol + "//" + n.host);
				"string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? n.protocol + t : n.host + t),
					/^(https?|wss?):\/\//.test(t) || (r("protocol-less url %s", t), t = void 0 !== n ? n.protocol + "//" + t :
						"https://" + t), r("parse %s", t), i = o(t));
				i.port || (/^(http|ws)$/.test(i.protocol) ? i.port = "80" : /^(http|ws)s$/.test(i.protocol) && (i.port =
					"443"));
				i.path = i.path || "/";
				var s = -1 !== i.host.indexOf(":") ? "[" + i.host + "]" : i.host;
				return i.id = i.protocol + "://" + s + ":" + i.port, i.href = i.protocol + "://" + s + (n && n.port === i.port ?
					"" : ":" + i.port), i
			}
		}).call(e, window)
	}, function(t, e) {
		var n =
			/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
			o = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path",
				"directory", "file", "query", "anchor"
			];
		t.exports = function(t) {
			var e = t,
				r = t.indexOf("["),
				i = t.indexOf("]"); - 1 != r && -1 != i && (t = t.substring(0, r) + t.substring(r, i).replace(/:/g, ";") + t.substring(
				i, t.length));
			for (var s = n.exec(t || ""), a = {}, c = 14; c--;) a[o[c]] = s[c] || "";
			return -1 != r && -1 != i && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"),
				a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a
		}
	}, function(t, e, n) {
		(function(o) {
			function r() {
				try {
					return e.storage.debug
				} catch (t) {}
				if (void 0 !== o && "env" in o) return o.env.DEBUG
			}(e = t.exports = n(12)).log = function() {
					return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console,
						arguments)
				}, e.formatArgs = function() {
					var t = arguments,
						n = this.useColors;
					if (t[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + t[0] + (n ? "%c " : " ") + "+" + e.humanize(
							this.diff), !n) return t;
					var o = "color: " + this.color,
						r = 0,
						i = 0;
					return (t = [t[0], o, "color: inherit"].concat(Array.prototype.slice.call(t, 1)))[0].replace(/%[a-z%]/g,
						function(t) {
							"%%" !== t && "%c" === t && (i = ++r)
						}), t.splice(i, 0, o), t
				}, e.save = function(t) {
					try {
						null == t ? e.storage.removeItem("debug") : e.storage.debug = t
					} catch (t) {}
				}, e.load = r, e.useColors = function() {
					return "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style || window.console &&
						(console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(
							/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
				}, e.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
					try {
						return window.localStorage
					} catch (t) {}
				}(), e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], e.formatters
				.j = function(t) {
					try {
						return JSON.stringify(t)
					} catch (t) {
						return "[UnexpectedJSONParseError]: " + t.message
					}
				}, e.enable(r())
		}).call(e, n(4))
	}, function(t, e, n) {
		(e = t.exports = i.debug = i).coerce = function(t) {
			return t instanceof Error ? t.stack || t.message : t
		}, e.disable = function() {
			e.enable("")
		}, e.enable = function(t) {
			e.save(t);
			for (var n = (t || "").split(/[\s,]+/), o = n.length, r = 0; r < o; r++) n[r] && ("-" === (t = n[r].replace(
					/[\\^$+?.()|[\]{}]/g, "\\$&").replace(/\*/g, ".*?"))[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) :
				e.names.push(new RegExp("^" + t + "$")))
		}, e.enabled = function(t) {
			var n, o;
			for (n = 0, o = e.skips.length; n < o; n++)
				if (e.skips[n].test(t)) return !1;
			for (n = 0, o = e.names.length; n < o; n++)
				if (e.names[n].test(t)) return !0;
			return !1
		}, e.humanize = n(13), e.names = [], e.skips = [], e.formatters = {};
		var o, r = 0;

		function i(t) {
			function n() {}

			function i() {
				var t = i,
					n = +new Date,
					s = n - (o || n);
				t.diff = s, t.prev = o, t.curr = n, o = n, null == t.useColors && (t.useColors = e.useColors()), null == t.color &&
					t.useColors && (t.color = e.colors[r++ % e.colors.length]);
				for (var a = new Array(arguments.length), c = 0; c < a.length; c++) a[c] = arguments[c];
				a[0] = e.coerce(a[0]), "string" != typeof a[0] && (a = ["%o"].concat(a));
				var u = 0;
				a[0] = a[0].replace(/%([a-z%])/g, function(n, o) {
					if ("%%" === n) return n;
					u++;
					var r = e.formatters[o];
					if ("function" == typeof r) {
						var i = a[u];
						n = r.call(t, i), a.splice(u, 1), u--
					}
					return n
				}), a = e.formatArgs.apply(t, a), (i.log || e.log || console.log.bind(console)).apply(t, a)
			}
			n.enabled = !1, i.enabled = !0;
			var s = e.enabled(t) ? i : n;
			return s.namespace = t, s
		}
	}, function(t, e) {
		var n = 1e3,
			o = 60 * n,
			r = 60 * o,
			i = 24 * r,
			s = 365.25 * i;

		function a(t, e, n) {
			if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + " " + n : Math.ceil(t / e) + " " + n + "s"
		}
		t.exports = function(t, e) {
			e = e || {};
			var c, u = typeof t;
			if ("string" === u && t.length > 0) return function(t) {
				if ((t = String(t)).length > 1e4) return;
				var e =
					/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i
					.exec(t);
				if (!e) return;
				var a = parseFloat(e[1]);
				switch ((e[2] || "ms").toLowerCase()) {
					case "years":
					case "year":
					case "yrs":
					case "yr":
					case "y":
						return a * s;
					case "days":
					case "day":
					case "d":
						return a * i;
					case "hours":
					case "hour":
					case "hrs":
					case "hr":
					case "h":
						return a * r;
					case "minutes":
					case "minute":
					case "mins":
					case "min":
					case "m":
						return a * o;
					case "seconds":
					case "second":
					case "secs":
					case "sec":
					case "s":
						return a * n;
					case "milliseconds":
					case "millisecond":
					case "msecs":
					case "msec":
					case "ms":
						return a;
					default:
						return
				}
			}(t);
			if ("number" === u && !1 === isNaN(t)) return e.long ? a(c = t, i, "day") || a(c, r, "hour") || a(c, o,
				"minute") || a(c, n, "second") || c + " ms" : function(t) {
				if (t >= i) return Math.round(t / i) + "d";
				if (t >= r) return Math.round(t / r) + "h";
				if (t >= o) return Math.round(t / o) + "m";
				if (t >= n) return Math.round(t / n) + "s";
				return t + "ms"
			}(t);
			throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t))
		}
	}, function(t, e, n) {
		var o = n(15)("socket.io-parser"),
			r = n(18),
			i = n(21),
			s = n(22),
			a = n(24);

		function c() {}

		function u(t) {
			var n = "",
				i = !1;
			return n += t.type, e.BINARY_EVENT != t.type && e.BINARY_ACK != t.type || (n += t.attachments, n += "-"), t.nsp &&
				"/" != t.nsp && (i = !0, n += t.nsp), null != t.id && (i && (n += ",", i = !1), n += t.id), null != t.data && (
					i && (n += ","), n += r.stringify(t.data)), o("encoded %j as %s", t, n), n
		}

		function p() {
			this.reconstructor = null
		}

		function h(t) {
			this.reconPack = t, this.buffers = []
		}

		function l(t) {
			return {
				type: e.ERROR,
				data: "parser error"
			}
		}
		e.protocol = 4, e.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], e.CONNECT =
			0, e.DISCONNECT = 1, e.EVENT = 2, e.ACK = 3, e.ERROR = 4, e.BINARY_EVENT = 5, e.BINARY_ACK = 6, e.Encoder = c, e
			.Decoder = p, c.prototype.encode = function(t, n) {
				(o("encoding packet %j", t), e.BINARY_EVENT == t.type || e.BINARY_ACK == t.type) ? function(t, e) {
					s.removeBlobs(t, function(t) {
						var n = s.deconstructPacket(t),
							o = u(n.packet),
							r = n.buffers;
						r.unshift(o), e(r)
					})
				}(t, n) : n([u(t)])
			}, i(p.prototype), p.prototype.add = function(t) {
				var n;
				if ("string" == typeof t) n = function(t) {
					var n = {},
						i = 0;
					if (n.type = Number(t.charAt(0)), null == e.types[n.type]) return l();
					if (e.BINARY_EVENT == n.type || e.BINARY_ACK == n.type) {
						for (var s = "";
							"-" != t.charAt(++i) && (s += t.charAt(i), i != t.length););
						if (s != Number(s) || "-" != t.charAt(i)) throw new Error("Illegal attachments");
						n.attachments = Number(s)
					}
					if ("/" == t.charAt(i + 1))
						for (n.nsp = ""; ++i;) {
							var a = t.charAt(i);
							if ("," == a) break;
							if (n.nsp += a, i == t.length) break
						} else n.nsp = "/";
					var c = t.charAt(i + 1);
					if ("" !== c && Number(c) == c) {
						for (n.id = ""; ++i;) {
							var a = t.charAt(i);
							if (null == a || Number(a) != a) {
								--i;
								break
							}
							if (n.id += t.charAt(i), i == t.length) break
						}
						n.id = Number(n.id)
					}
					t.charAt(++i) && (n = function(t, e) {
						try {
							t.data = r.parse(e)
						} catch (t) {
							return l()
						}
						return t
					}(n, t.substr(i)));
					return o("decoded %s as %j", t, n), n
				}(t), e.BINARY_EVENT == n.type || e.BINARY_ACK == n.type ? (this.reconstructor = new h(n), 0 === this.reconstructor
					.reconPack.attachments && this.emit("decoded", n)) : this.emit("decoded", n);
				else {
					if (!a(t) && !t.base64) throw new Error("Unknown type: " + t);
					if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
					(n = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null, this.emit("decoded", n))
				}
			}, p.prototype.destroy = function() {
				this.reconstructor && this.reconstructor.finishedReconstruction()
			}, h.prototype.takeBinaryData = function(t) {
				if (this.buffers.push(t), this.buffers.length == this.reconPack.attachments) {
					var e = s.reconstructPacket(this.reconPack, this.buffers);
					return this.finishedReconstruction(), e
				}
				return null
			}, h.prototype.finishedReconstruction = function() {
				this.reconPack = null, this.buffers = []
			}
	}, function(t, e, n) {
		function o() {
			var t;
			try {
				t = e.storage.debug
			} catch (t) {}
			return t
		}(e = t.exports = n(16)).log = function() {
				return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console,
					arguments)
			}, e.formatArgs = function() {
				var t = arguments,
					n = this.useColors;
				if (t[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + t[0] + (n ? "%c " : " ") + "+" + e.humanize(
						this.diff), !n) return t;
				var o = "color: " + this.color,
					r = 0,
					i = 0;
				return (t = [t[0], o, "color: inherit"].concat(Array.prototype.slice.call(t, 1)))[0].replace(/%[a-z%]/g,
					function(t) {
						"%%" !== t && "%c" === t && (i = ++r)
					}), t.splice(i, 0, o), t
			}, e.save = function(t) {
				try {
					null == t ? e.storage.removeItem("debug") : e.storage.debug = t
				} catch (t) {}
			}, e.load = o, e.useColors = function() {
				return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception &&
					console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
			}, e.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
				try {
					return window.localStorage
				} catch (t) {}
			}(), e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], e.formatters
			.j = function(t) {
				return JSON.stringify(t)
			}, e.enable(o())
	}, function(t, e, n) {
		(e = t.exports = function(t) {
			function n() {}

			function i() {
				var t = i,
					n = +new Date,
					s = n - (o || n);
				t.diff = s, t.prev = o, t.curr = n, o = n, null == t.useColors && (t.useColors = e.useColors()), null == t.color &&
					t.useColors && (t.color = e.colors[r++ % e.colors.length]);
				var a = Array.prototype.slice.call(arguments);
				a[0] = e.coerce(a[0]), "string" != typeof a[0] && (a = ["%o"].concat(a));
				var c = 0;
				a[0] = a[0].replace(/%([a-z%])/g, function(n, o) {
					if ("%%" === n) return n;
					c++;
					var r = e.formatters[o];
					if ("function" == typeof r) {
						var i = a[c];
						n = r.call(t, i), a.splice(c, 1), c--
					}
					return n
				}), "function" == typeof e.formatArgs && (a = e.formatArgs.apply(t, a));
				var u = i.log || e.log || console.log.bind(console);
				u.apply(t, a)
			}
			n.enabled = !1, i.enabled = !0;
			var s = e.enabled(t) ? i : n;
			return s.namespace = t, s
		}).coerce = function(t) {
			return t instanceof Error ? t.stack || t.message : t
		}, e.disable = function() {
			e.enable("")
		}, e.enable = function(t) {
			e.save(t);
			for (var n = (t || "").split(/[\s,]+/), o = n.length, r = 0; r < o; r++) n[r] && ("-" === (t = n[r].replace(
				/\*/g, ".*?"))[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t +
				"$")))
		}, e.enabled = function(t) {
			var n, o;
			for (n = 0, o = e.skips.length; n < o; n++)
				if (e.skips[n].test(t)) return !1;
			for (n = 0, o = e.names.length; n < o; n++)
				if (e.names[n].test(t)) return !0;
			return !1
		}, e.humanize = n(17), e.names = [], e.skips = [], e.formatters = {};
		var o, r = 0
	}, function(t, e) {
		var n = 1e3,
			o = 60 * n,
			r = 60 * o,
			i = 24 * r,
			s = 365.25 * i;

		function a(t, e, n) {
			if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + " " + n : Math.ceil(t / e) + " " + n + "s"
		}
		t.exports = function(t, e) {
			return e = e || {}, "string" == typeof t ? function(t) {
					if ((t = "" + t).length > 1e4) return;
					var e =
						/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i
						.exec(t);
					if (!e) return;
					var a = parseFloat(e[1]);
					switch ((e[2] || "ms").toLowerCase()) {
						case "years":
						case "year":
						case "yrs":
						case "yr":
						case "y":
							return a * s;
						case "days":
						case "day":
						case "d":
							return a * i;
						case "hours":
						case "hour":
						case "hrs":
						case "hr":
						case "h":
							return a * r;
						case "minutes":
						case "minute":
						case "mins":
						case "min":
						case "m":
							return a * o;
						case "seconds":
						case "second":
						case "secs":
						case "sec":
						case "s":
							return a * n;
						case "milliseconds":
						case "millisecond":
						case "msecs":
						case "msec":
						case "ms":
							return a
					}
				}(t) : e.long ? a(u = t, i, "day") || a(u, r, "hour") || a(u, o, "minute") || a(u, n, "second") || u + " ms" :
				(c = t) >= i ? Math.round(c / i) + "d" : c >= r ? Math.round(c / r) + "h" : c >= o ? Math.round(c / o) + "m" :
				c >= n ? Math.round(c / n) + "s" : c + "ms";
			var c, u
		}
	}, function(t, e, n) {
		var o;
		(function(t, r) {
			(function() {
				var i = n(20),
					s = {
						function: !0,
						object: !0
					},
					a = s[typeof e] && e && !e.nodeType && e,
					c = s[typeof window] && window || this,
					u = a && s[typeof t] && t && !t.nodeType && "object" == typeof r && r;

				function p(t, e) {
					t || (t = c.Object()), e || (e = c.Object());
					var n = t.Number || c.Number,
						o = t.String || c.String,
						r = t.Object || c.Object,
						i = t.Date || c.Date,
						a = t.SyntaxError || c.SyntaxError,
						u = t.TypeError || c.TypeError,
						h = t.Math || c.Math,
						l = t.JSON || c.JSON;
					"object" == typeof l && l && (e.stringify = l.stringify, e.parse = l.parse);
					var f, d, _, y = r.prototype,
						g = y.toString,
						m = new i(-0xc782b5b800cec);
					try {
						m = -109252 == m.getUTCFullYear() && 0 === m.getUTCMonth() && 1 === m.getUTCDate() && 10 == m.getUTCHours() &&
							37 == m.getUTCMinutes() && 6 == m.getUTCSeconds() && 708 == m.getUTCMilliseconds()
					} catch (t) {}

					function v(t) {
						if (v[t] !== _) return v[t];
						var r;
						if ("bug-string-char-index" == t) r = "a" != "a" [0];
						else if ("json" == t) r = v("json-stringify") && v("json-parse");
						else {
							var s, a = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
							if ("json-stringify" == t) {
								var c = e.stringify,
									u = "function" == typeof c && m;
								if (u) {
									(s = function() {
										return 1
									}).toJSON = s;
									try {
										u = "0" === c(0) && "0" === c(new n) && '""' == c(new o) && c(g) === _ && c(_) === _ && c() === _ &&
											"1" === c(s) && "[1]" == c([s]) && "[null]" == c([_]) && "null" == c(null) && "[null,null,null]" == c(
												[_, g, null]) && c({
												a: [s, !0, !1, null, "\0\b\n\f\r\t"]
											}) == a && "1" === c(null, s) && "[\n 1,\n 2\n]" == c([1, 2], null, 1) &&
											'"-271821-04-20T00:00:00.000Z"' == c(new i(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == c(new i(
												864e13)) && '"-000001-01-01T00:00:00.000Z"' == c(new i(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' ==
											c(new i(-1))
									} catch (t) {
										u = !1
									}
								}
								r = u
							}
							if ("json-parse" == t) {
								var p = e.parse;
								if ("function" == typeof p) try {
									if (0 === p("0") && !p(!1)) {
										var h = 5 == (s = p(a)).a.length && 1 === s.a[0];
										if (h) {
											try {
												h = !p('"\t"')
											} catch (t) {}
											if (h) try {
												h = 1 !== p("01")
											} catch (t) {}
											if (h) try {
												h = 1 !== p("1.")
											} catch (t) {}
										}
									}
								} catch (t) {
									h = !1
								}
								r = h
							}
						}
						return v[t] = !!r
					}
					if (!v("json")) {
						var E = "[object Function]",
							k = "[object Number]",
							S = "[object String]",
							T = "[object Array]",
							b = v("bug-string-char-index");
						if (!m) var N = h.floor,
							w = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
							R = function(t, e) {
								return w[e] + 365 * (t - 1970) + N((t - 1969 + (e = +(e > 1))) / 4) - N((t - 1901 + e) / 100) + N((t -
									1601 + e) / 400)
							};
						if ((f = y.hasOwnProperty) || (f = function(t) {
								var e, n = {};
								return (n.__proto__ = null, n.__proto__ = {
									toString: 1
								}, n).toString != g ? f = function(t) {
									var e = this.__proto__,
										n = t in (this.__proto__ = null, this);
									return this.__proto__ = e, n
								} : (e = n.constructor, f = function(t) {
									var n = (this.constructor || e).prototype;
									return t in this && !(t in n && this[t] === n[t])
								}), n = null, f.call(this, t)
							}), d = function(t, e) {
								var n, o, r, i = 0;
								for (r in (n = function() {
										this.valueOf = 0
									}).prototype.valueOf = 0, o = new n) f.call(o, r) && i++;
								return n = o = null, i ? d = 2 == i ? function(t, e) {
									var n, o = {},
										r = g.call(t) == E;
									for (n in t) r && "prototype" == n || f.call(o, n) || !(o[n] = 1) || !f.call(t, n) || e(n)
								} : function(t, e) {
									var n, o, r = g.call(t) == E;
									for (n in t) r && "prototype" == n || !f.call(t, n) || (o = "constructor" === n) || e(n);
									(o || f.call(t, n = "constructor")) && e(n)
								} : (o = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf",
									"hasOwnProperty", "constructor"
								], d = function(t, e) {
									var n, r, i = g.call(t) == E,
										a = !i && "function" != typeof t.constructor && s[typeof t.hasOwnProperty] && t.hasOwnProperty || f;
									for (n in t) i && "prototype" == n || !a.call(t, n) || e(n);
									for (r = o.length; n = o[--r]; a.call(t, n) && e(n));
								}), d(t, e)
							}, !v("json-stringify")) {
							var C = {
									92: "\\\\",
									34: '\\"',
									8: "\\b",
									12: "\\f",
									10: "\\n",
									13: "\\r",
									9: "\\t"
								},
								A = function(t, e) {
									return ("000000" + (e || 0)).slice(-t)
								},
								O = function(t) {
									for (var e = '"', n = 0, o = t.length, r = !b || o > 10, i = r && (b ? t.split("") : t); n < o; n++) {
										var s = t.charCodeAt(n);
										switch (s) {
											case 8:
											case 9:
											case 10:
											case 12:
											case 13:
											case 34:
											case 92:
												e += C[s];
												break;
											default:
												if (s < 32) {
													e += "\\u00" + A(2, s.toString(16));
													break
												}
												e += r ? i[n] : t.charAt(n)
										}
									}
									return e + '"'
								},
								D = function(t, e, n, o, r, i, s) {
									var a, c, p, h, l, y, m, v, E, b, w, C, I, x, L, M;
									try {
										a = e[t]
									} catch (t) {}
									if ("object" == typeof a && a)
										if ("[object Date]" != (c = g.call(a)) || f.call(a, "toJSON")) "function" == typeof a.toJSON && (c != k &&
											c != S && c != T || f.call(a, "toJSON")) && (a = a.toJSON(t));
										else if (a > -1 / 0 && a < 1 / 0) {
										if (R) {
											for (l = N(a / 864e5), p = N(l / 365.2425) + 1970 - 1; R(p + 1, 0) <= l; p++);
											for (h = N((l - R(p, 0)) / 30.42); R(p, h + 1) <= l; h++);
											l = 1 + l - R(p, h), m = N((y = (a % 864e5 + 864e5) % 864e5) / 36e5) % 24, v = N(y / 6e4) % 60, E = N(
												y / 1e3) % 60, b = y % 1e3
										} else p = a.getUTCFullYear(), h = a.getUTCMonth(), l = a.getUTCDate(), m = a.getUTCHours(), v = a.getUTCMinutes(),
											E = a.getUTCSeconds(), b = a.getUTCMilliseconds();
										a = (p <= 0 || p >= 1e4 ? (p < 0 ? "-" : "+") + A(6, p < 0 ? -p : p) : A(4, p)) + "-" + A(2, h + 1) +
											"-" + A(2, l) + "T" + A(2, m) + ":" + A(2, v) + ":" + A(2, E) + "." + A(3, b) + "Z"
									} else a = null;
									if (n && (a = n.call(e, t, a)), null === a) return "null";
									if ("[object Boolean]" == (c = g.call(a))) return "" + a;
									if (c == k) return a > -1 / 0 && a < 1 / 0 ? "" + a : "null";
									if (c == S) return O("" + a);
									if ("object" == typeof a) {
										for (x = s.length; x--;)
											if (s[x] === a) throw u();
										if (s.push(a), w = [], L = i, i += r, c == T) {
											for (I = 0, x = a.length; I < x; I++) C = D(I, a, n, o, r, i, s), w.push(C === _ ? "null" : C);
											M = w.length ? r ? "[\n" + i + w.join(",\n" + i) + "\n" + L + "]" : "[" + w.join(",") + "]" : "[]"
										} else d(o || a, function(t) {
											var e = D(t, a, n, o, r, i, s);
											e !== _ && w.push(O(t) + ":" + (r ? " " : "") + e)
										}), M = w.length ? r ? "{\n" + i + w.join(",\n" + i) + "\n" + L + "}" : "{" + w.join(",") + "}" : "{}";
										return s.pop(), M
									}
								};
							e.stringify = function(t, e, n) {
								var o, r, i, a;
								if (s[typeof e] && e)
									if ((a = g.call(e)) == E) r = e;
									else if (a == T) {
									i = {};
									for (var c, u = 0, p = e.length; u < p; c = e[u++], ((a = g.call(c)) == S || a == k) && (i[c] = 1));
								}
								if (n)
									if ((a = g.call(n)) == k) {
										if ((n -= n % 1) > 0)
											for (o = "", n > 10 && (n = 10); o.length < n; o += " ");
									} else a == S && (o = n.length <= 10 ? n : n.slice(0, 10));
								return D("", ((c = {})[""] = t, c), r, i, o, "", [])
							}
						}
						if (!v("json-parse")) {
							var I, x, L = o.fromCharCode,
								M = {
									92: "\\",
									34: '"',
									47: "/",
									98: "\b",
									116: "\t",
									110: "\n",
									102: "\f",
									114: "\r"
								},
								P = function() {
									throw I = x = null, a()
								},
								U = function() {
									for (var t, e, n, o, r, i = x, s = i.length; I < s;) switch (r = i.charCodeAt(I)) {
										case 9:
										case 10:
										case 13:
										case 32:
											I++;
											break;
										case 123:
										case 125:
										case 91:
										case 93:
										case 58:
										case 44:
											return t = b ? i.charAt(I) : i[I], I++, t;
										case 34:
											for (t = "@", I++; I < s;)
												if ((r = i.charCodeAt(I)) < 32) P();
												else if (92 == r) switch (r = i.charCodeAt(++I)) {
												case 92:
												case 34:
												case 47:
												case 98:
												case 116:
												case 110:
												case 102:
												case 114:
													t += M[r], I++;
													break;
												case 117:
													for (e = ++I, n = I + 4; I < n; I++)(r = i.charCodeAt(I)) >= 48 && r <= 57 || r >= 97 && r <= 102 ||
														r >= 65 && r <= 70 || P();
													t += L("0x" + i.slice(e, I));
													break;
												default:
													P()
											} else {
												if (34 == r) break;
												for (r = i.charCodeAt(I), e = I; r >= 32 && 92 != r && 34 != r;) r = i.charCodeAt(++I);
												t += i.slice(e, I)
											}
											if (34 == i.charCodeAt(I)) return I++, t;
											P();
										default:
											if (e = I, 45 == r && (o = !0, r = i.charCodeAt(++I)), r >= 48 && r <= 57) {
												for (48 == r && ((r = i.charCodeAt(I + 1)) >= 48 && r <= 57) && P(), o = !1; I < s && ((r = i.charCodeAt(
														I)) >= 48 && r <= 57); I++);
												if (46 == i.charCodeAt(I)) {
													for (n = ++I; n < s && ((r = i.charCodeAt(n)) >= 48 && r <= 57); n++);
													n == I && P(), I = n
												}
												if (101 == (r = i.charCodeAt(I)) || 69 == r) {
													for (43 != (r = i.charCodeAt(++I)) && 45 != r || I++, n = I; n < s && ((r = i.charCodeAt(n)) >= 48 &&
															r <= 57); n++);
													n == I && P(), I = n
												}
												return +i.slice(e, I)
											}
											if (o && P(), "true" == i.slice(I, I + 4)) return I += 4, !0;
											if ("false" == i.slice(I, I + 5)) return I += 5, !1;
											if ("null" == i.slice(I, I + 4)) return I += 4, null;
											P()
									}
									return "$"
								},
								G = function(t) {
									var e, n;
									if ("$" == t && P(), "string" == typeof t) {
										if ("@" == (b ? t.charAt(0) : t[0])) return t.slice(1);
										if ("[" == t) {
											for (e = [];
												"]" != (t = U()); n || (n = !0)) n && ("," == t ? "]" == (t = U()) && P() : P()), "," == t && P(), e.push(
												G(t));
											return e
										}
										if ("{" == t) {
											for (e = {};
												"}" != (t = U()); n || (n = !0)) n && ("," == t ? "}" == (t = U()) && P() : P()), "," != t &&
												"string" == typeof t && "@" == (b ? t.charAt(0) : t[0]) && ":" == U() || P(), e[t.slice(1)] = G(U());
											return e
										}
										P()
									}
									return t
								},
								B = function(t, e, n) {
									var o = V(t, e, n);
									o === _ ? delete t[e] : t[e] = o
								},
								V = function(t, e, n) {
									var o, r = t[e];
									if ("object" == typeof r && r)
										if (g.call(r) == T)
											for (o = r.length; o--;) B(r, o, n);
										else d(r, function(t) {
											B(r, t, n)
										});
									return n.call(t, e, r)
								};
							e.parse = function(t, e) {
								var n, o;
								return I = 0, x = "" + t, n = G(U()), "$" != U() && P(), I = x = null, e && g.call(e) == E ? V(((o = {})[
									""] = n, o), "", e) : n
							}
						}
					}
					return e.runInContext = p, e
				}
				if (!u || u.global !== u && u.window !== u && u.self !== u || (c = u), a && !i) p(c, a);
				else {
					var h = c.JSON,
						l = c.JSON3,
						f = !1,
						d = p(c, c.JSON3 = {
							noConflict: function() {
								return f || (f = !0, c.JSON = h, c.JSON3 = l, h = l = null), d
							}
						});
					c.JSON = {
						parse: d.parse,
						stringify: d.stringify
					}
				}
				i && (void 0 === (o = function() {
					return d
				}.call(e, n, e, t)) || (t.exports = o))
			}).call(this)
		}).call(e, n(19)(t), window)
	}, function(t, e) {
		t.exports = function(t) {
			return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children = [], t.webpackPolyfill = 1),
				t
		}
	}, function(t, e) {
		(function(e) {
			t.exports = e
		}).call(e, {})
	}, function(t, e) {
		function n(t) {
			if (t) return function(t) {
				for (var e in n.prototype) t[e] = n.prototype[e];
				return t
			}(t)
		}
		t.exports = n, n.prototype.on = n.prototype.addEventListener = function(t, e) {
				return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this
			}, n.prototype.once = function(t, e) {
				var n = this;

				function o() {
					n.off(t, o), e.apply(this, arguments)
				}
				return this._callbacks = this._callbacks || {}, o.fn = e, this.on(t, o), this
			}, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener =
			function(t, e) {
				if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
				var n, o = this._callbacks[t];
				if (!o) return this;
				if (1 == arguments.length) return delete this._callbacks[t], this;
				for (var r = 0; r < o.length; r++)
					if ((n = o[r]) === e || n.fn === e) {
						o.splice(r, 1);
						break
					} return this
			}, n.prototype.emit = function(t) {
				this._callbacks = this._callbacks || {};
				var e = [].slice.call(arguments, 1),
					n = this._callbacks[t];
				if (n)
					for (var o = 0, r = (n = n.slice(0)).length; o < r; ++o) n[o].apply(this, e);
				return this
			}, n.prototype.listeners = function(t) {
				return this._callbacks = this._callbacks || {}, this._callbacks[t] || []
			}, n.prototype.hasListeners = function(t) {
				return !!this.listeners(t).length
			}
	}, function(t, e, n) {
		(function(t) {
			var o = n(23),
				r = n(24);
			e.deconstructPacket = function(t) {
				var e = [],
					n = t.data;
				var i = t;
				return i.data = function t(n) {
					if (!n) return n;
					if (r(n)) {
						var i = {
							_placeholder: !0,
							num: e.length
						};
						return e.push(n), i
					}
					if (o(n)) {
						for (var s = new Array(n.length), a = 0; a < n.length; a++) s[a] = t(n[a]);
						return s
					}
					if ("object" == typeof n && !(n instanceof Date)) {
						for (var c in s = {}, n) s[c] = t(n[c]);
						return s
					}
					return n
				}(n), i.attachments = e.length, {
					packet: i,
					buffers: e
				}
			}, e.reconstructPacket = function(t, e) {
				return t.data = function t(n) {
					if (n && n._placeholder) return e[n.num];
					if (o(n)) {
						for (var r = 0; r < n.length; r++) n[r] = t(n[r]);
						return n
					}
					if (n && "object" == typeof n) {
						for (var i in n) n[i] = t(n[i]);
						return n
					}
					return n
				}(t.data), t.attachments = void 0, t
			}, e.removeBlobs = function(e, n) {
				var i = 0,
					s = e;
				! function e(a, c, u) {
					if (!a) return a;
					if (t.Blob && a instanceof Blob || t.File && a instanceof File) {
						i++;
						var p = new FileReader;
						p.onload = function() {
							u ? u[c] = this.result : s = this.result, --i || n(s)
						}, p.readAsArrayBuffer(a)
					} else if (o(a))
						for (var h = 0; h < a.length; h++) e(a[h], h, a);
					else if (a && "object" == typeof a && !r(a))
						for (var l in a) e(a[l], l, a)
				}(s), i || n(s)
			}
		}).call(e, window)
	}, function(t, e) {
		t.exports = Array.isArray || function(t) {
			return "[object Array]" == Object.prototype.toString.call(t)
		}
	}, function(t, e) {
		(function(e) {
			t.exports = function(t) {
				return e.Buffer && e.Buffer.isBuffer(t) || e.ArrayBuffer && t instanceof ArrayBuffer
			}
		}).call(e, window)
	}, function(t, e, n) {
		var o = n(26),
			r = n(54),
			i = n(7),
			s = n(14),
			a = n(56),
			c = n(57),
			u = n(11)("socket.io-client:manager"),
			p = n(52),
			h = n(58),
			l = Object.prototype.hasOwnProperty;

		function f(t, e) {
			if (!(this instanceof f)) return new f(t, e);
			t && "object" == typeof t && (e = t, t = void 0), (e = e || {}).path = e.path || "/socket.io", this.nsps = {},
				this.subs = [], this.opts = e, this.reconnection(!1 !== e.reconnection), this.reconnectionAttempts(e.reconnectionAttempts ||
					1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), this.reconnectionDelayMax(e.reconnectionDelayMax ||
					5e3), this.randomizationFactor(e.randomizationFactor || .5), this.backoff = new h({
					min: this.reconnectionDelay(),
					max: this.reconnectionDelayMax(),
					jitter: this.randomizationFactor()
				}), this.timeout(null == e.timeout ? 2e4 : e.timeout), this.readyState = "closed", this.uri = t, this.connecting = [],
				this.lastPing = null, this.encoding = !1, this.packetBuffer = [], this.encoder = new s.Encoder, this.decoder =
				new s.Decoder, this.autoConnect = !1 !== e.autoConnect, this.autoConnect && this.open()
		}
		t.exports = f, f.prototype.emitAll = function() {
			for (var t in this.emit.apply(this, arguments), this.nsps) l.call(this.nsps, t) && this.nsps[t].emit.apply(this
				.nsps[t], arguments)
		}, f.prototype.updateSocketIds = function() {
			for (var t in this.nsps) l.call(this.nsps, t) && (this.nsps[t].id = this.engine.id)
		}, i(f.prototype), f.prototype.reconnection = function(t) {
			return arguments.length ? (this._reconnection = !!t, this) : this._reconnection
		}, f.prototype.reconnectionAttempts = function(t) {
			return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts
		}, f.prototype.reconnectionDelay = function(t) {
			return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), this) : this._reconnectionDelay
		}, f.prototype.randomizationFactor = function(t) {
			return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), this) :
				this._randomizationFactor
		}, f.prototype.reconnectionDelayMax = function(t) {
			return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), this) : this
				._reconnectionDelayMax
		}, f.prototype.timeout = function(t) {
			return arguments.length ? (this._timeout = t, this) : this._timeout
		}, f.prototype.maybeReconnectOnOpen = function() {
			!this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
		}, f.prototype.open = f.prototype.connect = function(t, e) {
			if (u("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
			u("opening %s", this.uri), this.engine = o(this.uri, this.opts);
			var n = this.engine,
				r = this;
			this.readyState = "opening", this.skipReconnect = !1;
			var i = a(n, "open", function() {
					r.onopen(), t && t()
				}),
				s = a(n, "error", function(e) {
					if (u("connect_error"), r.cleanup(), r.readyState = "closed", r.emitAll("connect_error", e), t) {
						var n = new Error("Connection error");
						n.data = e, t(n)
					} else r.maybeReconnectOnOpen()
				});
			if (!1 !== this._timeout) {
				var c = this._timeout;
				u("connect attempt will timeout after %d", c);
				var p = setTimeout(function() {
					u("connect attempt timed out after %d", c), i.destroy(), n.close(), n.emit("error", "timeout"), r.emitAll(
						"connect_timeout", c)
				}, c);
				this.subs.push({
					destroy: function() {
						clearTimeout(p)
					}
				})
			}
			return this.subs.push(i), this.subs.push(s), this
		}, f.prototype.onopen = function() {
			u("open"), this.cleanup(), this.readyState = "open", this.emit("open");
			var t = this.engine;
			this.subs.push(a(t, "data", c(this, "ondata"))), this.subs.push(a(t, "ping", c(this, "onping"))), this.subs.push(
				a(t, "pong", c(this, "onpong"))), this.subs.push(a(t, "error", c(this, "onerror"))), this.subs.push(a(t,
				"close", c(this, "onclose"))), this.subs.push(a(this.decoder, "decoded", c(this, "ondecoded")))
		}, f.prototype.onping = function() {
			this.lastPing = new Date, this.emitAll("ping")
		}, f.prototype.onpong = function() {
			this.emitAll("pong", new Date - this.lastPing)
		}, f.prototype.ondata = function(t) {
			this.decoder.add(t)
		}, f.prototype.ondecoded = function(t) {
			this.emit("packet", t)
		}, f.prototype.onerror = function(t) {
			u("error", t), this.emitAll("error", t)
		}, f.prototype.socket = function(t, e) {
			var n = this.nsps[t];
			if (!n) {
				n = new r(this, t, e), this.nsps[t] = n;
				var o = this;
				n.on("connecting", i), n.on("connect", function() {
					n.id = o.engine.id
				}), this.autoConnect && i()
			}

			function i() {
				~p(o.connecting, n) || o.connecting.push(n)
			}
			return n
		}, f.prototype.destroy = function(t) {
			var e = p(this.connecting, t);
			~e && this.connecting.splice(e, 1), this.connecting.length || this.close()
		}, f.prototype.packet = function(t) {
			u("writing packet %j", t);
			var e = this;
			t.query && 0 === t.type && (t.nsp += "?" + t.query), e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0,
				this.encoder.encode(t, function(n) {
					for (var o = 0; o < n.length; o++) e.engine.write(n[o], t.options);
					e.encoding = !1, e.processPacketQueue()
				}))
		}, f.prototype.processPacketQueue = function() {
			if (this.packetBuffer.length > 0 && !this.encoding) {
				var t = this.packetBuffer.shift();
				this.packet(t)
			}
		}, f.prototype.cleanup = function() {
			u("cleanup");
			for (var t = this.subs.length, e = 0; e < t; e++) {
				this.subs.shift().destroy()
			}
			this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy()
		}, f.prototype.close = f.prototype.disconnect = function() {
			u("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(),
				this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
		}, f.prototype.onclose = function(t) {
			u("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", t), this._reconnection &&
				!this.skipReconnect && this.reconnect()
		}, f.prototype.reconnect = function() {
			if (this.reconnecting || this.skipReconnect) return this;
			var t = this;
			if (this.backoff.attempts >= this._reconnectionAttempts) u("reconnect failed"), this.backoff.reset(), this.emitAll(
				"reconnect_failed"), this.reconnecting = !1;
			else {
				var e = this.backoff.duration();
				u("will wait %dms before reconnect attempt", e), this.reconnecting = !0;
				var n = setTimeout(function() {
					t.skipReconnect || (u("attempting reconnect"), t.emitAll("reconnect_attempt", t.backoff.attempts), t.emitAll(
						"reconnecting", t.backoff.attempts), t.skipReconnect || t.open(function(e) {
						e ? (u("reconnect attempt error"), t.reconnecting = !1, t.reconnect(), t.emitAll("reconnect_error", e.data)) :
							(u("reconnect success"), t.onreconnect())
					}))
				}, e);
				this.subs.push({
					destroy: function() {
						clearTimeout(n)
					}
				})
			}
		}, f.prototype.onreconnect = function() {
			var t = this.backoff.attempts;
			this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t)
		}
	}, function(t, e, n) {
		t.exports = n(27)
	}, function(t, e, n) {
		t.exports = n(28), t.exports.parser = n(35)
	}, function(t, e, n) {
		(function(e) {
			var o = n(29),
				r = n(7),
				i = n(46)("engine.io-client:socket"),
				s = n(52),
				a = n(35),
				c = n(10),
				u = n(53),
				p = n(43);

			function h(t, n) {
				if (!(this instanceof h)) return new h(t, n);
				n = n || {}, t && "object" == typeof t && (n = t, t = null), t ? (t = c(t), n.hostname = t.host, n.secure =
						"https" === t.protocol || "wss" === t.protocol, n.port = t.port, t.query && (n.query = t.query)) : n.host &&
					(n.hostname = c(n.host).host), this.secure = null != n.secure ? n.secure : e.location && "https:" ===
					location.protocol, n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.agent = n.agent || !1,
					this.hostname = n.hostname || (e.location ? location.hostname : "localhost"), this.port = n.port || (e.location &&
						location.port ? location.port : this.secure ? 443 : 80), this.query = n.query || {}, "string" == typeof this
					.query && (this.query = p.decode(this.query)), this.upgrade = !1 !== n.upgrade, this.path = (n.path ||
						"/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!n.forceJSONP, this.jsonp = !1 !== n.jsonp, this.forceBase64 = !
					!n.forceBase64, this.enablesXDR = !!n.enablesXDR, this.timestampParam = n.timestampParam || "t", this.timestampRequests =
					n.timestampRequests, this.transports = n.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [],
					this.prevBufferLen = 0, this.policyPort = n.policyPort || 843, this.rememberUpgrade = n.rememberUpgrade || !1,
					this.binaryType = null, this.onlyBinaryUpgrades = n.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== n.perMessageDeflate &&
					(n.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate &&
					null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = n.pfx ||
					null, this.key = n.key || null, this.passphrase = n.passphrase || null, this.cert = n.cert || null, this.ca =
					n.ca || null, this.ciphers = n.ciphers || null, this.rejectUnauthorized = void 0 === n.rejectUnauthorized ?
					null : n.rejectUnauthorized, this.forceNode = !!n.forceNode;
				var o = "object" == typeof e && e;
				o.global === o && (n.extraHeaders && Object.keys(n.extraHeaders).length > 0 && (this.extraHeaders = n.extraHeaders),
						n.localAddress && (this.localAddress = n.localAddress)), this.id = null, this.upgrades = null, this.pingInterval =
					null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, this.open()
			}
			t.exports = h, h.priorWebsocketSuccess = !1, r(h.prototype), h.protocol = a.protocol, h.Socket = h, h.Transport =
				n(34), h.transports = n(29), h.parser = n(35), h.prototype.createTransport = function(t) {
					i('creating transport "%s"', t);
					var e = function(t) {
						var e = {};
						for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
						return e
					}(this.query);
					return e.EIO = a.protocol, e.transport = t, this.id && (e.sid = this.id), new o[t]({
						agent: this.agent,
						hostname: this.hostname,
						port: this.port,
						secure: this.secure,
						path: this.path,
						query: e,
						forceJSONP: this.forceJSONP,
						jsonp: this.jsonp,
						forceBase64: this.forceBase64,
						enablesXDR: this.enablesXDR,
						timestampRequests: this.timestampRequests,
						timestampParam: this.timestampParam,
						policyPort: this.policyPort,
						socket: this,
						pfx: this.pfx,
						key: this.key,
						passphrase: this.passphrase,
						cert: this.cert,
						ca: this.ca,
						ciphers: this.ciphers,
						rejectUnauthorized: this.rejectUnauthorized,
						perMessageDeflate: this.perMessageDeflate,
						extraHeaders: this.extraHeaders,
						forceNode: this.forceNode,
						localAddress: this.localAddress
					})
				}, h.prototype.open = function() {
					var t;
					if (this.rememberUpgrade && h.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t =
						"websocket";
					else {
						if (0 === this.transports.length) {
							var e = this;
							return void setTimeout(function() {
								e.emit("error", "No transports available")
							}, 0)
						}
						t = this.transports[0]
					}
					this.readyState = "opening";
					try {
						t = this.createTransport(t)
					} catch (t) {
						return this.transports.shift(), void this.open()
					}
					t.open(), this.setTransport(t)
				}, h.prototype.setTransport = function(t) {
					i("setting transport %s", t.name);
					var e = this;
					this.transport && (i("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()),
						this.transport = t, t.on("drain", function() {
							e.onDrain()
						}).on("packet", function(t) {
							e.onPacket(t)
						}).on("error", function(t) {
							e.onError(t)
						}).on("close", function() {
							e.onClose("transport close")
						})
				}, h.prototype.probe = function(t) {
					i('probing transport "%s"', t);
					var e = this.createTransport(t, {
							probe: 1
						}),
						n = !1,
						o = this;

					function r() {
						if (o.onlyBinaryUpgrades) {
							var r = !this.supportsBinary && o.transport.supportsBinary;
							n = n || r
						}
						n || (i('probe transport "%s" opened', t), e.send([{
							type: "ping",
							data: "probe"
						}]), e.once("packet", function(r) {
							if (!n)
								if ("pong" === r.type && "probe" === r.data) {
									if (i('probe transport "%s" pong', t), o.upgrading = !0, o.emit("upgrading", e), !e) return;
									h.priorWebsocketSuccess = "websocket" === e.name, i('pausing current transport "%s"', o.transport.name),
										o.transport.pause(function() {
											n || "closed" !== o.readyState && (i("changing transport and sending upgrade packet"), l(), o.setTransport(
												e), e.send([{
												type: "upgrade"
											}]), o.emit("upgrade", e), e = null, o.upgrading = !1, o.flush())
										})
								} else {
									i('probe transport "%s" failed', t);
									var s = new Error("probe error");
									s.transport = e.name, o.emit("upgradeError", s)
								}
						}))
					}

					function s() {
						n || (n = !0, l(), e.close(), e = null)
					}

					function a(n) {
						var r = new Error("probe error: " + n);
						r.transport = e.name, s(), i('probe transport "%s" failed because of error: %s', t, n), o.emit(
							"upgradeError", r)
					}

					function c() {
						a("transport closed")
					}

					function u() {
						a("socket closed")
					}

					function p(t) {
						e && t.name !== e.name && (i('"%s" works - aborting "%s"', t.name, e.name), s())
					}

					function l() {
						e.removeListener("open", r), e.removeListener("error", a), e.removeListener("close", c), o.removeListener(
							"close", u), o.removeListener("upgrading", p)
					}
					h.priorWebsocketSuccess = !1, e.once("open", r), e.once("error", a), e.once("close", c), this.once("close", u),
						this.once("upgrading", p), e.open()
				}, h.prototype.onOpen = function() {
					if (i("socket open"), this.readyState = "open", h.priorWebsocketSuccess = "websocket" === this.transport.name,
						this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
						i("starting upgrade probes");
						for (var t = 0, e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t])
					}
				}, h.prototype.onPacket = function(t) {
					if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (i(
							'socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t
						.type) {
						case "open":
							this.onHandshake(u(t.data));
							break;
						case "pong":
							this.setPing(), this.emit("pong");
							break;
						case "error":
							var e = new Error("server error");
							e.code = t.data, this.onError(e);
							break;
						case "message":
							this.emit("data", t.data), this.emit("message", t.data)
					} else i('packet received with socket readyState "%s"', this.readyState)
				}, h.prototype.onHandshake = function(t) {
					this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(
							t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" !==
						this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat",
							this.onHeartbeat))
				}, h.prototype.onHeartbeat = function(t) {
					clearTimeout(this.pingTimeoutTimer);
					var e = this;
					e.pingTimeoutTimer = setTimeout(function() {
						"closed" !== e.readyState && e.onClose("ping timeout")
					}, t || e.pingInterval + e.pingTimeout)
				}, h.prototype.setPing = function() {
					var t = this;
					clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function() {
						i("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout)
					}, t.pingInterval)
				}, h.prototype.ping = function() {
					var t = this;
					this.sendPacket("ping", function() {
						t.emit("ping")
					})
				}, h.prototype.onDrain = function() {
					this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit(
						"drain") : this.flush()
				}, h.prototype.flush = function() {
					"closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (i(
							"flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen =
						this.writeBuffer.length, this.emit("flush"))
				}, h.prototype.write = h.prototype.send = function(t, e, n) {
					return this.sendPacket("message", t, e, n), this
				}, h.prototype.sendPacket = function(t, e, n, o) {
					if ("function" == typeof e && (o = e, e = void 0), "function" == typeof n && (o = n, n = null), "closing" !==
						this.readyState && "closed" !== this.readyState) {
						(n = n || {}).compress = !1 !== n.compress;
						var r = {
							type: t,
							data: e,
							options: n
						};
						this.emit("packetCreate", r), this.writeBuffer.push(r), o && this.once("flush", o), this.flush()
					}
				}, h.prototype.close = function() {
					if ("opening" === this.readyState || "open" === this.readyState) {
						this.readyState = "closing";
						var t = this;
						this.writeBuffer.length ? this.once("drain", function() {
							this.upgrading ? o() : e()
						}) : this.upgrading ? o() : e()
					}

					function e() {
						t.onClose("forced close"), i("socket closing - telling transport to close"), t.transport.close()
					}

					function n() {
						t.removeListener("upgrade", n), t.removeListener("upgradeError", n), e()
					}

					function o() {
						t.once("upgrade", n), t.once("upgradeError", n)
					}
					return this
				}, h.prototype.onError = function(t) {
					i("socket error %j", t), h.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error",
						t)
				}, h.prototype.onClose = function(t, e) {
					if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
						i('socket close with reason: "%s"', t);
						clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners(
								"close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id =
							null, this.emit("close", t, e), this.writeBuffer = [], this.prevBufferLen = 0
					}
				}, h.prototype.filterUpgrades = function(t) {
					for (var e = [], n = 0, o = t.length; n < o; n++) ~s(this.transports, t[n]) && e.push(t[n]);
					return e
				}
		}).call(e, window)
	}, function(t, e, n) {
		(function(t) {
			var o = n(30),
				r = n(32),
				i = n(49),
				s = n(50);
			e.polling = function(e) {
				var n = !1,
					s = !1,
					a = !1 !== e.jsonp;
				if (t.location) {
					var c = "https:" === location.protocol,
						u = location.port;
					u || (u = c ? 443 : 80), n = e.hostname !== location.hostname || u !== e.port, s = e.secure !== c
				} {
					if (e.xdomain = n, e.xscheme = s, "open" in new o(e) && !e.forceJSONP) return new r(e);
					if (!a) throw new Error("JSONP disabled");
					return new i(e)
				}
			}, e.websocket = s
		}).call(e, window)
	}, function(t, e, n) {
		(function(e) {
			var o = n(31);
			t.exports = function(t) {
				var n = t.xdomain,
					r = t.xscheme,
					i = t.enablesXDR;
				try {
					if ("undefined" != typeof XMLHttpRequest && (!n || o)) return new XMLHttpRequest
				} catch (t) {}
				try {
					if ("undefined" != typeof XDomainRequest && !r && i) return new XDomainRequest
				} catch (t) {}
				if (!n) try {
					return new(e[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
				} catch (t) {}
			}
		}).call(e, window)
	}, function(t, e) {
		try {
			t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
		} catch (e) {
			t.exports = !1
		}
	}, function(t, e, n) {
		(function(e) {
			var o = n(30),
				r = n(33),
				i = n(7),
				s = n(44),
				a = n(46)("engine.io-client:polling-xhr");

			function c() {}

			function u(t) {
				if (r.call(this, t), this.requestTimeout = t.requestTimeout, e.location) {
					var n = "https:" === location.protocol,
						o = location.port;
					o || (o = n ? 443 : 80), this.xd = t.hostname !== e.location.hostname || o !== t.port, this.xs = t.secure !==
						n
				} else this.extraHeaders = t.extraHeaders
			}

			function p(t) {
				this.method = t.method || "GET", this.uri = t.uri, this.xd = !!t.xd, this.xs = !!t.xs, this.async = !1 !== t.async,
					this.data = void 0 !== t.data ? t.data : null, this.agent = t.agent, this.isBinary = t.isBinary, this.supportsBinary =
					t.supportsBinary, this.enablesXDR = t.enablesXDR, this.requestTimeout = t.requestTimeout, this.pfx = t.pfx,
					this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers,
					this.rejectUnauthorized = t.rejectUnauthorized, this.extraHeaders = t.extraHeaders, this.create()
			}

			function h() {
				for (var t in p.requests) p.requests.hasOwnProperty(t) && p.requests[t].abort()
			}
			t.exports = u, t.exports.Request = p, s(u, r), u.prototype.supportsBinary = !0, u.prototype.request = function(
				t) {
				return (t = t || {}).uri = this.uri(), t.xd = this.xd, t.xs = this.xs, t.agent = this.agent || !1, t.supportsBinary =
					this.supportsBinary, t.enablesXDR = this.enablesXDR, t.pfx = this.pfx, t.key = this.key, t.passphrase = this
					.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized,
					t.requestTimeout = this.requestTimeout, t.extraHeaders = this.extraHeaders, new p(t)
			}, u.prototype.doWrite = function(t, e) {
				var n = "string" != typeof t && void 0 !== t,
					o = this.request({
						method: "POST",
						data: t,
						isBinary: n
					}),
					r = this;
				o.on("success", e), o.on("error", function(t) {
					r.onError("xhr post error", t)
				}), this.sendXhr = o
			}, u.prototype.doPoll = function() {
				a("xhr poll");
				var t = this.request(),
					e = this;
				t.on("data", function(t) {
					e.onData(t)
				}), t.on("error", function(t) {
					e.onError("xhr poll error", t)
				}), this.pollXhr = t
			}, i(p.prototype), p.prototype.create = function() {
				var t = {
					agent: this.agent,
					xdomain: this.xd,
					xscheme: this.xs,
					enablesXDR: this.enablesXDR
				};
				t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers =
					this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized;
				var n = this.xhr = new o(t),
					r = this;
				try {
					a("xhr open %s: %s", this.method, this.uri), n.open(this.method, this.uri, this.async);
					try {
						if (this.extraHeaders)
							for (var i in n.setDisableHeaderCheck(!0), this.extraHeaders) this.extraHeaders.hasOwnProperty(i) && n.setRequestHeader(
								i, this.extraHeaders[i])
					} catch (t) {}
					if (this.supportsBinary && (n.responseType = "arraybuffer"), "POST" === this.method) try {
						this.isBinary ? n.setRequestHeader("Content-type", "application/octet-stream") : n.setRequestHeader(
							"Content-type", "text/plain;charset=UTF-8")
					} catch (t) {}
					try {
						n.setRequestHeader("Accept", "*/*")
					} catch (t) {}
					"withCredentials" in n && (n.withCredentials = !0), this.requestTimeout && (n.timeout = this.requestTimeout),
						this.hasXDR() ? (n.onload = function() {
							r.onLoad()
						}, n.onerror = function() {
							r.onError(n.responseText)
						}) : n.onreadystatechange = function() {
							4 === n.readyState && (200 === n.status || 1223 === n.status ? r.onLoad() : setTimeout(function() {
								r.onError(n.status)
							}, 0))
						}, a("xhr data %s", this.data), n.send(this.data)
				} catch (t) {
					return void setTimeout(function() {
						r.onError(t)
					}, 0)
				}
				e.document && (this.index = p.requestsCount++, p.requests[this.index] = this)
			}, p.prototype.onSuccess = function() {
				this.emit("success"), this.cleanup()
			}, p.prototype.onData = function(t) {
				this.emit("data", t), this.onSuccess()
			}, p.prototype.onError = function(t) {
				this.emit("error", t), this.cleanup(!0)
			}, p.prototype.cleanup = function(t) {
				if (void 0 !== this.xhr && null !== this.xhr) {
					if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = c : this.xhr.onreadystatechange = c, t) try {
						this.xhr.abort()
					} catch (t) {}
					e.document && delete p.requests[this.index], this.xhr = null
				}
			}, p.prototype.onLoad = function() {
				var t;
				try {
					var e;
					try {
						e = this.xhr.getResponseHeader("Content-Type").split(";")[0]
					} catch (t) {}
					if ("application/octet-stream" === e) t = this.xhr.response || this.xhr.responseText;
					else if (this.supportsBinary) try {
						t = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response))
					} catch (e) {
						for (var n = new Uint8Array(this.xhr.response), o = [], r = 0, i = n.length; r < i; r++) o.push(n[r]);
						t = String.fromCharCode.apply(null, o)
					} else t = this.xhr.responseText
				} catch (t) {
					this.onError(t)
				}
				null != t && this.onData(t)
			}, p.prototype.hasXDR = function() {
				return void 0 !== e.XDomainRequest && !this.xs && this.enablesXDR
			}, p.prototype.abort = function() {
				this.cleanup()
			}, p.requestsCount = 0, p.requests = {}, e.document && (e.attachEvent ? e.attachEvent("onunload", h) : e.addEventListener &&
				e.addEventListener("beforeunload", h, !1))
		}).call(e, window)
	}, function(t, e, n) {
		var o = n(34),
			r = n(43),
			i = n(35),
			s = n(44),
			a = n(45),
			c = n(46)("engine.io-client:polling");
		t.exports = p;
		var u = null != new(n(30))({
			xdomain: !1
		}).responseType;

		function p(t) {
			var e = t && t.forceBase64;
			u && !e || (this.supportsBinary = !1), o.call(this, t)
		}
		s(p, o), p.prototype.name = "polling", p.prototype.doOpen = function() {
			this.poll()
		}, p.prototype.pause = function(t) {
			var e = this;

			function n() {
				c("paused"), e.readyState = "paused", t()
			}
			if (this.readyState = "pausing", this.polling || !this.writable) {
				var o = 0;
				this.polling && (c("we are currently polling - waiting to pause"), o++, this.once("pollComplete", function() {
					c("pre-pause polling complete"), --o || n()
				})), this.writable || (c("we are currently writing - waiting to pause"), o++, this.once("drain", function() {
					c("pre-pause writing complete"), --o || n()
				}))
			} else n()
		}, p.prototype.poll = function() {
			c("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
		}, p.prototype.onData = function(t) {
			var e = this;
			c("polling got data %s", t);
			i.decodePayload(t, this.socket.binaryType, function(t, n, o) {
				if ("opening" === e.readyState && e.onOpen(), "close" === t.type) return e.onClose(), !1;
				e.onPacket(t)
			}), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState ?
				this.poll() : c('ignoring poll - transport state "%s"', this.readyState))
		}, p.prototype.doClose = function() {
			var t = this;

			function e() {
				c("writing close packet"), t.write([{
					type: "close"
				}])
			}
			"open" === this.readyState ? (c("transport open - closing"), e()) : (c("transport not open - deferring close"),
				this.once("open", e))
		}, p.prototype.write = function(t) {
			var e = this;
			this.writable = !1;
			var n = function() {
				e.writable = !0, e.emit("drain")
			};
			i.encodePayload(t, this.supportsBinary, function(t) {
				e.doWrite(t, n)
			})
		}, p.prototype.uri = function() {
			var t = this.query || {},
				e = this.secure ? "https" : "http",
				n = "";
			return !1 !== this.timestampRequests && (t[this.timestampParam] = a()), this.supportsBinary || t.sid || (t.b64 =
				1), t = r.encode(t), this.port && ("https" === e && 443 !== Number(this.port) || "http" === e && 80 !==
				Number(this.port)) && (n = ":" + this.port), t.length && (t = "?" + t), e + "://" + (-1 !== this.hostname.indexOf(
				":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t
		}
	}, function(t, e, n) {
		var o = n(35),
			r = n(7);

		function i(t) {
			this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query,
				this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "",
				this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key =
				t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized =
				t.rejectUnauthorized, this.forceNode = t.forceNode, this.extraHeaders = t.extraHeaders, this.localAddress = t.localAddress
		}
		t.exports = i, r(i.prototype), i.prototype.onError = function(t, e) {
			var n = new Error(t);
			return n.type = "TransportError", n.description = e, this.emit("error", n), this
		}, i.prototype.open = function() {
			return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()),
				this
		}, i.prototype.close = function() {
			return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
		}, i.prototype.send = function(t) {
			if ("open" !== this.readyState) throw new Error("Transport not open");
			this.write(t)
		}, i.prototype.onOpen = function() {
			this.readyState = "open", this.writable = !0, this.emit("open")
		}, i.prototype.onData = function(t) {
			var e = o.decodePacket(t, this.socket.binaryType);
			this.onPacket(e)
		}, i.prototype.onPacket = function(t) {
			this.emit("packet", t)
		}, i.prototype.onClose = function() {
			this.readyState = "closed", this.emit("close")
		}
	}, function(t, e, n) {
		(function(t) {
			var o, r = n(36),
				i = n(37),
				s = n(38),
				a = n(39),
				c = n(40);
			t && t.ArrayBuffer && (o = n(41));
			var u = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
				p = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
				h = u || p;
			e.protocol = 3;
			var l = e.packets = {
					open: 0,
					close: 1,
					ping: 2,
					pong: 3,
					message: 4,
					upgrade: 5,
					noop: 6
				},
				f = r(l),
				d = {
					type: "error",
					data: "parser error"
				},
				_ = n(42);

			function y(t, e, n) {
				for (var o = new Array(t.length), r = a(t.length, n), i = function(t, n, r) {
						e(n, function(e, n) {
							o[t] = n, r(e, o)
						})
					}, s = 0; s < t.length; s++) i(s, t[s], r)
			}
			e.encodePacket = function(n, o, r, i) {
				"function" == typeof o && (i = o, o = !1), "function" == typeof r && (i = r, r = null);
				var s, a, u, p = void 0 === n.data ? void 0 : n.data.buffer || n.data;
				if (t.ArrayBuffer && p instanceof ArrayBuffer) return function(t, n, o) {
					if (!n) return e.encodeBase64Packet(t, o);
					var r = t.data,
						i = new Uint8Array(r),
						s = new Uint8Array(1 + r.byteLength);
					s[0] = l[t.type];
					for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
					return o(s.buffer)
				}(n, o, i);
				if (_ && p instanceof t.Blob) return function(t, n, o) {
					if (!n) return e.encodeBase64Packet(t, o);
					if (h) return function(t, n, o) {
						if (!n) return e.encodeBase64Packet(t, o);
						var r = new FileReader;
						return r.onload = function() {
							t.data = r.result, e.encodePacket(t, n, !0, o)
						}, r.readAsArrayBuffer(t.data)
					}(t, n, o);
					var r = new Uint8Array(1);
					r[0] = l[t.type];
					var i = new _([r.buffer, t.data]);
					return o(i)
				}(n, o, i);
				if (p && p.base64) return s = n, a = i, u = "b" + e.packets[s.type] + s.data.data, a(u);
				var f = l[n.type];
				return void 0 !== n.data && (f += r ? c.encode(String(n.data)) : String(n.data)), i("" + f)
			}, e.encodeBase64Packet = function(n, o) {
				var r, i = "b" + e.packets[n.type];
				if (_ && n.data instanceof t.Blob) {
					var s = new FileReader;
					return s.onload = function() {
						var t = s.result.split(",")[1];
						o(i + t)
					}, s.readAsDataURL(n.data)
				}
				try {
					r = String.fromCharCode.apply(null, new Uint8Array(n.data))
				} catch (t) {
					for (var a = new Uint8Array(n.data), c = new Array(a.length), u = 0; u < a.length; u++) c[u] = a[u];
					r = String.fromCharCode.apply(null, c)
				}
				return i += t.btoa(r), o(i)
			}, e.decodePacket = function(t, n, o) {
				if (void 0 === t) return d;
				if ("string" == typeof t) {
					if ("b" == t.charAt(0)) return e.decodeBase64Packet(t.substr(1), n);
					if (o && !1 === (t = function(t) {
							try {
								t = c.decode(t)
							} catch (t) {
								return !1
							}
							return t
						}(t))) return d;
					var r = t.charAt(0);
					return Number(r) == r && f[r] ? t.length > 1 ? {
						type: f[r],
						data: t.substring(1)
					} : {
						type: f[r]
					} : d
				}
				r = new Uint8Array(t)[0];
				var i = s(t, 1);
				return _ && "blob" === n && (i = new _([i])), {
					type: f[r],
					data: i
				}
			}, e.decodeBase64Packet = function(t, e) {
				var n = f[t.charAt(0)];
				if (!o) return {
					type: n,
					data: {
						base64: !0,
						data: t.substr(1)
					}
				};
				var r = o.decode(t.substr(1));
				return "blob" === e && _ && (r = new _([r])), {
					type: n,
					data: r
				}
			}, e.encodePayload = function(t, n, o) {
				"function" == typeof n && (o = n, n = null);
				var r = i(t);
				if (n && r) return _ && !h ? e.encodePayloadAsBlob(t, o) : e.encodePayloadAsArrayBuffer(t, o);
				if (!t.length) return o("0:");
				y(t, function(t, o) {
					e.encodePacket(t, !!r && n, !0, function(t) {
						var e;
						o(null, (e = t).length + ":" + e)
					})
				}, function(t, e) {
					return o(e.join(""))
				})
			}, e.decodePayload = function(t, n, o) {
				if ("string" != typeof t) return e.decodePayloadAsBinary(t, n, o);
				var r;
				if ("function" == typeof n && (o = n, n = null), "" == t) return o(d, 0, 1);
				for (var i, s, a = "", c = 0, u = t.length; c < u; c++) {
					var p = t.charAt(c);
					if (":" != p) a += p;
					else {
						if ("" == a || a != (i = Number(a))) return o(d, 0, 1);
						if (a != (s = t.substr(c + 1, i)).length) return o(d, 0, 1);
						if (s.length) {
							if (r = e.decodePacket(s, n, !0), d.type == r.type && d.data == r.data) return o(d, 0, 1);
							if (!1 === o(r, c + i, u)) return
						}
						c += i, a = ""
					}
				}
				return "" != a ? o(d, 0, 1) : void 0
			}, e.encodePayloadAsArrayBuffer = function(t, n) {
				if (!t.length) return n(new ArrayBuffer(0));
				y(t, function(t, n) {
					e.encodePacket(t, !0, !0, function(t) {
						return n(null, t)
					})
				}, function(t, e) {
					var o = e.reduce(function(t, e) {
							var n;
							return t + (n = "string" == typeof e ? e.length : e.byteLength).toString().length + n + 2
						}, 0),
						r = new Uint8Array(o),
						i = 0;
					return e.forEach(function(t) {
						var e = "string" == typeof t,
							n = t;
						if (e) {
							for (var o = new Uint8Array(t.length), s = 0; s < t.length; s++) o[s] = t.charCodeAt(s);
							n = o.buffer
						}
						r[i++] = e ? 0 : 1;
						var a = n.byteLength.toString();
						for (s = 0; s < a.length; s++) r[i++] = parseInt(a[s]);
						r[i++] = 255;
						for (o = new Uint8Array(n), s = 0; s < o.length; s++) r[i++] = o[s]
					}), n(r.buffer)
				})
			}, e.encodePayloadAsBlob = function(t, n) {
				y(t, function(t, n) {
					e.encodePacket(t, !0, !0, function(t) {
						var e = new Uint8Array(1);
						if (e[0] = 1, "string" == typeof t) {
							for (var o = new Uint8Array(t.length), r = 0; r < t.length; r++) o[r] = t.charCodeAt(r);
							t = o.buffer, e[0] = 0
						}
						var i = (t instanceof ArrayBuffer ? t.byteLength : t.size).toString(),
							s = new Uint8Array(i.length + 1);
						for (r = 0; r < i.length; r++) s[r] = parseInt(i[r]);
						if (s[i.length] = 255, _) {
							var a = new _([e.buffer, s.buffer, t]);
							n(null, a)
						}
					})
				}, function(t, e) {
					return n(new _(e))
				})
			}, e.decodePayloadAsBinary = function(t, n, o) {
				"function" == typeof n && (o = n, n = null);
				for (var r = t, i = [], a = !1; r.byteLength > 0;) {
					for (var c = new Uint8Array(r), u = 0 === c[0], p = "", h = 1; 255 != c[h]; h++) {
						if (p.length > 310) {
							a = !0;
							break
						}
						p += c[h]
					}
					if (a) return o(d, 0, 1);
					r = s(r, 2 + p.length), p = parseInt(p);
					var l = s(r, 0, p);
					if (u) try {
						l = String.fromCharCode.apply(null, new Uint8Array(l))
					} catch (t) {
						var f = new Uint8Array(l);
						l = "";
						for (h = 0; h < f.length; h++) l += String.fromCharCode(f[h])
					}
					i.push(l), r = s(r, p)
				}
				var _ = i.length;
				i.forEach(function(t, r) {
					o(e.decodePacket(t, n, !0), r, _)
				})
			}
		}).call(e, window)
	}, function(t, e) {
		t.exports = Object.keys || function(t) {
			var e = [],
				n = Object.prototype.hasOwnProperty;
			for (var o in t) n.call(t, o) && e.push(o);
			return e
		}
	}, function(t, e, n) {
		(function(e) {
			var o = n(23);
			t.exports = function(t) {
				return function t(n) {
					if (!n) return !1;
					if (e.Buffer && e.Buffer.isBuffer && e.Buffer.isBuffer(n) || e.ArrayBuffer && n instanceof ArrayBuffer || e
						.Blob && n instanceof Blob || e.File && n instanceof File) return !0;
					if (o(n)) {
						for (var r = 0; r < n.length; r++)
							if (t(n[r])) return !0
					} else if (n && "object" == typeof n)
						for (var i in n.toJSON && "function" == typeof n.toJSON && (n = n.toJSON()), n)
							if (Object.prototype.hasOwnProperty.call(n, i) && t(n[i])) return !0;
					return !1
				}(t)
			}
		}).call(e, window)
	}, function(t, e) {
		t.exports = function(t, e, n) {
			var o = t.byteLength;
			if (e = e || 0, n = n || o, t.slice) return t.slice(e, n);
			if (e < 0 && (e += o), n < 0 && (n += o), n > o && (n = o), e >= o || e >= n || 0 === o) return new ArrayBuffer(
				0);
			for (var r = new Uint8Array(t), i = new Uint8Array(n - e), s = e, a = 0; s < n; s++, a++) i[a] = r[s];
			return i.buffer
		}
	}, function(t, e) {
		function n() {}
		t.exports = function(t, e, o) {
			var r = !1;
			return o = o || n, i.count = t, 0 === t ? e() : i;

			function i(t, n) {
				if (i.count <= 0) throw new Error("after called too many times");
				--i.count, t ? (r = !0, e(t), e = o) : 0 !== i.count || r || e(null, n)
			}
		}
	}, function(t, e, n) {
		var o;
		(function(t, r) {
			! function(i) {
				var s = "object" == typeof e && e,
					a = ("object" == typeof t && t && t.exports, "object" == typeof r && r);
				a.global !== a && a.window;
				var c, u, p, h = String.fromCharCode;

				function l(t) {
					for (var e, n, o = [], r = 0, i = t.length; r < i;)(e = t.charCodeAt(r++)) >= 55296 && e <= 56319 && r < i ?
						56320 == (64512 & (n = t.charCodeAt(r++))) ? o.push(((1023 & e) << 10) + (1023 & n) + 65536) : (o.push(e), r--) :
						o.push(e);
					return o
				}

				function f(t, e) {
					return h(t >> e & 63 | 128)
				}

				function d(t) {
					if (0 == (4294967168 & t)) return h(t);
					var e = "";
					return 0 == (4294965248 & t) ? e = h(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (e = h(t >> 12 & 15 | 224),
						e += f(t, 6)) : 0 == (4292870144 & t) && (e = h(t >> 18 & 7 | 240), e += f(t, 12), e += f(t, 6)), e += h(63 &
						t | 128)
				}

				function _() {
					if (p >= u) throw Error("Invalid byte index");
					var t = 255 & c[p];
					if (p++, 128 == (192 & t)) return 63 & t;
					throw Error("Invalid continuation byte")
				}

				function y() {
					var t, e;
					if (p > u) throw Error("Invalid byte index");
					if (p == u) return !1;
					if (t = 255 & c[p], p++, 0 == (128 & t)) return t;
					if (192 == (224 & t)) {
						if ((e = (31 & t) << 6 | _()) >= 128) return e;
						throw Error("Invalid continuation byte")
					}
					if (224 == (240 & t)) {
						if ((e = (15 & t) << 12 | _() << 6 | _()) >= 2048) return e;
						throw Error("Invalid continuation byte")
					}
					if (240 == (248 & t) && (e = (15 & t) << 18 | _() << 12 | _() << 6 | _()) >= 65536 && e <= 1114111) return e;
					throw Error("Invalid WTF-8 detected")
				}
				var g = {
					version: "1.0.0",
					encode: function(t) {
						for (var e = l(t), n = e.length, o = -1, r = ""; ++o < n;) r += d(e[o]);
						return r
					},
					decode: function(t) {
						c = l(t), u = c.length, p = 0;
						for (var e, n = []; !1 !== (e = y());) n.push(e);
						return function(t) {
							for (var e, n = t.length, o = -1, r = ""; ++o < n;)(e = t[o]) > 65535 && (r += h((e -= 65536) >>> 10 &
								1023 | 55296), e = 56320 | 1023 & e), r += h(e);
							return r
						}(n)
					}
				};
				void 0 === (o = function() {
					return g
				}.call(e, n, e, t)) || (t.exports = o)
			}()
		}).call(e, n(19)(t), window)
	}, function(t, e) {
		! function() {
			"use strict";
			for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = new Uint8Array(256), o = 0; o <
				t.length; o++) n[t.charCodeAt(o)] = o;
			e.encode = function(e) {
				var n, o = new Uint8Array(e),
					r = o.length,
					i = "";
				for (n = 0; n < r; n += 3) i += t[o[n] >> 2], i += t[(3 & o[n]) << 4 | o[n + 1] >> 4], i += t[(15 & o[n + 1]) <<
					2 | o[n + 2] >> 6], i += t[63 & o[n + 2]];
				return r % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : r % 3 == 1 && (i = i.substring(0, i.length - 2) +
					"=="), i
			}, e.decode = function(t) {
				var e, o, r, i, s, a = .75 * t.length,
					c = t.length,
					u = 0;
				"=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
				var p = new ArrayBuffer(a),
					h = new Uint8Array(p);
				for (e = 0; e < c; e += 4) o = n[t.charCodeAt(e)], r = n[t.charCodeAt(e + 1)], i = n[t.charCodeAt(e + 2)], s =
					n[t.charCodeAt(e + 3)], h[u++] = o << 2 | r >> 4, h[u++] = (15 & r) << 4 | i >> 2, h[u++] = (3 & i) << 6 | 63 &
					s;
				return p
			}
		}()
	}, function(t, e) {
		(function(e) {
			var n = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder,
				o = function() {
					try {
						return 2 === new Blob(["hi"]).size
					} catch (t) {
						return !1
					}
				}(),
				r = o && function() {
					try {
						return 2 === new Blob([new Uint8Array([1, 2])]).size
					} catch (t) {
						return !1
					}
				}(),
				i = n && n.prototype.append && n.prototype.getBlob;

			function s(t) {
				for (var e = 0; e < t.length; e++) {
					var n = t[e];
					if (n.buffer instanceof ArrayBuffer) {
						var o = n.buffer;
						if (n.byteLength !== o.byteLength) {
							var r = new Uint8Array(n.byteLength);
							r.set(new Uint8Array(o, n.byteOffset, n.byteLength)), o = r.buffer
						}
						t[e] = o
					}
				}
			}

			function a(t, e) {
				e = e || {};
				var o = new n;
				s(t);
				for (var r = 0; r < t.length; r++) o.append(t[r]);
				return e.type ? o.getBlob(e.type) : o.getBlob()
			}

			function c(t, e) {
				return s(t), new Blob(t, e || {})
			}
			t.exports = o ? r ? e.Blob : c : i ? a : void 0
		}).call(e, window)
	}, function(t, e) {
		e.encode = function(t) {
			var e = "";
			for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" +
				encodeURIComponent(t[n]));
			return e
		}, e.decode = function(t) {
			for (var e = {}, n = t.split("&"), o = 0, r = n.length; o < r; o++) {
				var i = n[o].split("=");
				e[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
			}
			return e
		}
	}, function(t, e) {
		t.exports = function(t, e) {
			var n = function() {};
			n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
		}
	}, function(t, e) {
		"use strict";
		var n, o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
			r = 64,
			i = {},
			s = 0,
			a = 0;

		function c(t) {
			var e = "";
			do {
				e = o[t % r] + e, t = Math.floor(t / r)
			} while (t > 0);
			return e
		}

		function u() {
			var t = c(+new Date);
			return t !== n ? (s = 0, n = t) : t + "." + c(s++)
		}
		for (; a < r; a++) i[o[a]] = a;
		u.encode = c, u.decode = function(t) {
			var e = 0;
			for (a = 0; a < t.length; a++) e = e * r + i[t.charAt(a)];
			return e
		}, t.exports = u
	}, function(t, e, n) {
		(function(o) {
			function r() {
				try {
					return e.storage.debug
				} catch (t) {}
				if (void 0 !== o && "env" in o) return o.env.DEBUG
			}(e = t.exports = n(47)).log = function() {
					return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console,
						arguments)
				}, e.formatArgs = function() {
					var t = arguments,
						n = this.useColors;
					if (t[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + t[0] + (n ? "%c " : " ") + "+" + e.humanize(
							this.diff), !n) return t;
					var o = "color: " + this.color,
						r = 0,
						i = 0;
					return (t = [t[0], o, "color: inherit"].concat(Array.prototype.slice.call(t, 1)))[0].replace(/%[a-z%]/g,
						function(t) {
							"%%" !== t && "%c" === t && (i = ++r)
						}), t.splice(i, 0, o), t
				}, e.save = function(t) {
					try {
						null == t ? e.storage.removeItem("debug") : e.storage.debug = t
					} catch (t) {}
				}, e.load = r, e.useColors = function() {
					return "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style || window.console &&
						(console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(
							/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
				}, e.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
					try {
						return window.localStorage
					} catch (t) {}
				}(), e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], e.formatters
				.j = function(t) {
					try {
						return JSON.stringify(t)
					} catch (t) {
						return "[UnexpectedJSONParseError]: " + t.message
					}
				}, e.enable(r())
		}).call(e, n(4))
	}, function(t, e, n) {
		(e = t.exports = i.debug = i).coerce = function(t) {
			return t instanceof Error ? t.stack || t.message : t
		}, e.disable = function() {
			e.enable("")
		}, e.enable = function(t) {
			e.save(t);
			for (var n = (t || "").split(/[\s,]+/), o = n.length, r = 0; r < o; r++) n[r] && ("-" === (t = n[r].replace(
					/[\\^$+?.()|[\]{}]/g, "\\$&").replace(/\*/g, ".*?"))[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) :
				e.names.push(new RegExp("^" + t + "$")))
		}, e.enabled = function(t) {
			var n, o;
			for (n = 0, o = e.skips.length; n < o; n++)
				if (e.skips[n].test(t)) return !1;
			for (n = 0, o = e.names.length; n < o; n++)
				if (e.names[n].test(t)) return !0;
			return !1
		}, e.humanize = n(48), e.names = [], e.skips = [], e.formatters = {};
		var o, r = 0;

		function i(t) {
			function n() {}

			function i() {
				var t = i,
					n = +new Date,
					s = n - (o || n);
				t.diff = s, t.prev = o, t.curr = n, o = n, null == t.useColors && (t.useColors = e.useColors()), null == t.color &&
					t.useColors && (t.color = e.colors[r++ % e.colors.length]);
				for (var a = new Array(arguments.length), c = 0; c < a.length; c++) a[c] = arguments[c];
				a[0] = e.coerce(a[0]), "string" != typeof a[0] && (a = ["%o"].concat(a));
				var u = 0;
				a[0] = a[0].replace(/%([a-z%])/g, function(n, o) {
					if ("%%" === n) return n;
					u++;
					var r = e.formatters[o];
					if ("function" == typeof r) {
						var i = a[u];
						n = r.call(t, i), a.splice(u, 1), u--
					}
					return n
				}), a = e.formatArgs.apply(t, a), (i.log || e.log || console.log.bind(console)).apply(t, a)
			}
			n.enabled = !1, i.enabled = !0;
			var s = e.enabled(t) ? i : n;
			return s.namespace = t, s
		}
	}, function(t, e) {
		var n = 1e3,
			o = 60 * n,
			r = 60 * o,
			i = 24 * r,
			s = 365.25 * i;

		function a(t, e, n) {
			if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + " " + n : Math.ceil(t / e) + " " + n + "s"
		}
		t.exports = function(t, e) {
			e = e || {};
			var c, u = typeof t;
			if ("string" === u && t.length > 0) return function(t) {
				if ((t = String(t)).length > 1e4) return;
				var e =
					/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i
					.exec(t);
				if (!e) return;
				var a = parseFloat(e[1]);
				switch ((e[2] || "ms").toLowerCase()) {
					case "years":
					case "year":
					case "yrs":
					case "yr":
					case "y":
						return a * s;
					case "days":
					case "day":
					case "d":
						return a * i;
					case "hours":
					case "hour":
					case "hrs":
					case "hr":
					case "h":
						return a * r;
					case "minutes":
					case "minute":
					case "mins":
					case "min":
					case "m":
						return a * o;
					case "seconds":
					case "second":
					case "secs":
					case "sec":
					case "s":
						return a * n;
					case "milliseconds":
					case "millisecond":
					case "msecs":
					case "msec":
					case "ms":
						return a;
					default:
						return
				}
			}(t);
			if ("number" === u && !1 === isNaN(t)) return e.long ? a(c = t, i, "day") || a(c, r, "hour") || a(c, o,
				"minute") || a(c, n, "second") || c + " ms" : function(t) {
				if (t >= i) return Math.round(t / i) + "d";
				if (t >= r) return Math.round(t / r) + "h";
				if (t >= o) return Math.round(t / o) + "m";
				if (t >= n) return Math.round(t / n) + "s";
				return t + "ms"
			}(t);
			throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t))
		}
	}, function(t, e, n) {
		(function(e) {
			var o = n(33),
				r = n(44);
			t.exports = u;
			var i, s = /\n/g,
				a = /\\n/g;

			function c() {}

			function u(t) {
				o.call(this, t), this.query = this.query || {}, i || (e.___eio || (e.___eio = []), i = e.___eio), this.index =
					i.length;
				var n = this;
				i.push(function(t) {
					n.onData(t)
				}), this.query.j = this.index, e.document && e.addEventListener && e.addEventListener("beforeunload",
					function() {
						n.script && (n.script.onerror = c)
					}, !1)
			}
			r(u, o), u.prototype.supportsBinary = !1, u.prototype.doClose = function() {
				this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form
					.parentNode.removeChild(this.form), this.form = null, this.iframe = null), o.prototype.doClose.call(this)
			}, u.prototype.doPoll = function() {
				var t = this,
					e = document.createElement("script");
				this.script && (this.script.parentNode.removeChild(this.script), this.script = null), e.async = !0, e.src =
					this.uri(), e.onerror = function(e) {
						t.onError("jsonp poll error", e)
					};
				var n = document.getElementsByTagName("script")[0];
				n ? n.parentNode.insertBefore(e, n) : (document.head || document.body).appendChild(e), this.script = e,
					"undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
						var t = document.createElement("iframe");
						document.body.appendChild(t), document.body.removeChild(t)
					}, 100)
			}, u.prototype.doWrite = function(t, e) {
				var n = this;
				if (!this.form) {
					var o, r = document.createElement("form"),
						i = document.createElement("textarea"),
						c = this.iframeId = "eio_iframe_" + this.index;
					r.className = "socketio", r.style.position = "absolute", r.style.top = "-1000px", r.style.left = "-1000px",
						r.target = c, r.method = "POST", r.setAttribute("accept-charset", "utf-8"), i.name = "d", r.appendChild(i),
						document.body.appendChild(r), this.form = r, this.area = i
				}

				function u() {
					p(), e()
				}

				function p() {
					if (n.iframe) try {
						n.form.removeChild(n.iframe)
					} catch (t) {
						n.onError("jsonp polling iframe removal error", t)
					}
					try {
						var t = '<iframe src="javascript:0" name="' + n.iframeId + '">';
						o = document.createElement(t)
					} catch (t) {
						(o = document.createElement("iframe")).name = n.iframeId, o.src = "javascript:0"
					}
					o.id = n.iframeId, n.form.appendChild(o), n.iframe = o
				}
				this.form.action = this.uri(), p(), t = t.replace(a, "\\\n"), this.area.value = t.replace(s, "\\n");
				try {
					this.form.submit()
				} catch (t) {}
				this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
					"complete" === n.iframe.readyState && u()
				} : this.iframe.onload = u
			}
		}).call(e, window)
	}, function(t, e, n) {
		(function(e) {
			var o, r = n(34),
				i = n(35),
				s = n(43),
				a = n(44),
				c = n(45),
				u = n(46)("engine.io-client:websocket"),
				p = e.WebSocket || e.MozWebSocket;
			if ("undefined" == typeof window) try {
				o = n(51)
			} catch (t) {}
			var h = p;

			function l(t) {
				t && t.forceBase64 && (this.supportsBinary = !1), this.perMessageDeflate = t.perMessageDeflate, this.usingBrowserWebSocket =
					p && !t.forceNode, this.usingBrowserWebSocket || (h = o), r.call(this, t)
			}
			h || "undefined" != typeof window || (h = o), t.exports = l, a(l, r), l.prototype.name = "websocket", l.prototype
				.supportsBinary = !0, l.prototype.doOpen = function() {
					if (this.check()) {
						var t = this.uri(),
							e = {
								agent: this.agent,
								perMessageDeflate: this.perMessageDeflate
							};
						e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers =
							this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (e.headers = this.extraHeaders),
							this.localAddress && (e.localAddress = this.localAddress);
						try {
							this.ws = this.usingBrowserWebSocket ? new h(t) : new h(t, void 0, e)
						} catch (t) {
							return this.emit("error", t)
						}
						void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (
							this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners()
					}
				}, l.prototype.addEventListeners = function() {
					var t = this;
					this.ws.onopen = function() {
						t.onOpen()
					}, this.ws.onclose = function() {
						t.onClose()
					}, this.ws.onmessage = function(e) {
						t.onData(e.data)
					}, this.ws.onerror = function(e) {
						t.onError("websocket error", e)
					}
				}, l.prototype.write = function(t) {
					var n = this;
					this.writable = !1;
					for (var o = t.length, r = 0, s = o; r < s; r++) ! function(t) {
						i.encodePacket(t, n.supportsBinary, function(r) {
							if (!n.usingBrowserWebSocket) {
								var i = {};
								if (t.options && (i.compress = t.options.compress), n.perMessageDeflate)("string" == typeof r ? e.Buffer
									.byteLength(r) : r.length) < n.perMessageDeflate.threshold && (i.compress = !1)
							}
							try {
								n.usingBrowserWebSocket ? n.ws.send(r) : n.ws.send(r, i)
							} catch (t) {
								u("websocket closed before onclose event")
							}--o || a()
						})
					}(t[r]);

					function a() {
						n.emit("flush"), setTimeout(function() {
							n.writable = !0, n.emit("drain")
						}, 0)
					}
				}, l.prototype.onClose = function() {
					r.prototype.onClose.call(this)
				}, l.prototype.doClose = function() {
					void 0 !== this.ws && this.ws.close()
				}, l.prototype.uri = function() {
					var t = this.query || {},
						e = this.secure ? "wss" : "ws",
						n = "";
					return this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (
						n = ":" + this.port), this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || (t.b64 =
						1), (t = s.encode(t)).length && (t = "?" + t), e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname +
						"]" : this.hostname) + n + this.path + t
				}, l.prototype.check = function() {
					return !(!h || "__initialize" in h && this.name === l.prototype.name)
				}
		}).call(e, window)
	}, function(t, e) {}, function(t, e) {
		var n = [].indexOf;
		t.exports = function(t, e) {
			if (n) return t.indexOf(e);
			for (var o = 0; o < t.length; ++o)
				if (t[o] === e) return o;
			return -1
		}
	}, function(t, e) {
		(function(e) {
			var n = /^[\],:{}\s]*$/,
				o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
				r = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
				i = /(?:^|:|,)(?:\s*\[)+/g,
				s = /^\s+/,
				a = /\s+$/;
			t.exports = function(t) {
				return "string" == typeof t && t ? (t = t.replace(s, "").replace(a, ""), e.JSON && JSON.parse ? JSON.parse(t) :
					n.test(t.replace(o, "@").replace(r, "]").replace(i, "")) ? new Function("return " + t)() : void 0) : null
			}
		}).call(e, window)
	}, function(t, e, n) {
		var o = n(14),
			r = n(7),
			i = n(55),
			s = n(56),
			a = n(57),
			c = n(11)("socket.io-client:socket"),
			u = n(37);
		t.exports = l;
		var p = {
				connect: 1,
				connect_error: 1,
				connect_timeout: 1,
				connecting: 1,
				disconnect: 1,
				error: 1,
				reconnect: 1,
				reconnect_attempt: 1,
				reconnect_failed: 1,
				reconnect_error: 1,
				reconnecting: 1,
				ping: 1,
				pong: 1
			},
			h = r.prototype.emit;

		function l(t, e, n) {
			this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [],
				this.connected = !1, this.disconnected = !0, n && n.query && (this.query = n.query), this.io.autoConnect &&
				this.open()
		}
		r(l.prototype), l.prototype.subEvents = function() {
			if (!this.subs) {
				var t = this.io;
				this.subs = [s(t, "open", a(this, "onopen")), s(t, "packet", a(this, "onpacket")), s(t, "close", a(this,
					"onclose"))]
			}
		}, l.prototype.open = l.prototype.connect = function() {
			return this.connected ? this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(),
				this.emit("connecting"), this)
		}, l.prototype.send = function() {
			var t = i(arguments);
			return t.unshift("message"), this.emit.apply(this, t), this
		}, l.prototype.emit = function(t) {
			if (p.hasOwnProperty(t)) return h.apply(this, arguments), this;
			var e = i(arguments),
				n = o.EVENT;
			u(e) && (n = o.BINARY_EVENT);
			var r = {
				type: n,
				data: e,
				options: {}
			};
			return r.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof e[e.length - 1] &&
				(c("emitting packet with ack id %d", this.ids), this.acks[this.ids] = e.pop(), r.id = this.ids++), this.connected ?
				this.packet(r) : this.sendBuffer.push(r), delete this.flags, this
		}, l.prototype.packet = function(t) {
			t.nsp = this.nsp, this.io.packet(t)
		}, l.prototype.onopen = function() {
			c("transport is open - connecting"), "/" !== this.nsp && (this.query ? this.packet({
				type: o.CONNECT,
				query: this.query
			}) : this.packet({
				type: o.CONNECT
			}))
		}, l.prototype.onclose = function(t) {
			c("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", t)
		}, l.prototype.onpacket = function(t) {
			if (t.nsp === this.nsp) switch (t.type) {
				case o.CONNECT:
					this.onconnect();
					break;
				case o.EVENT:
				case o.BINARY_EVENT:
					this.onevent(t);
					break;
				case o.ACK:
				case o.BINARY_ACK:
					this.onack(t);
					break;
				case o.DISCONNECT:
					this.ondisconnect();
					break;
				case o.ERROR:
					this.emit("error", t.data)
			}
		}, l.prototype.onevent = function(t) {
			var e = t.data || [];
			c("emitting event %j", e), null != t.id && (c("attaching ack callback to event"), e.push(this.ack(t.id))), this
				.connected ? h.apply(this, e) : this.receiveBuffer.push(e)
		}, l.prototype.ack = function(t) {
			var e = this,
				n = !1;
			return function() {
				if (!n) {
					n = !0;
					var r = i(arguments);
					c("sending ack %j", r);
					var s = u(r) ? o.BINARY_ACK : o.ACK;
					e.packet({
						type: s,
						id: t,
						data: r
					})
				}
			}
		}, l.prototype.onack = function(t) {
			var e = this.acks[t.id];
			"function" == typeof e ? (c("calling ack %s with %j", t.id, t.data), e.apply(this, t.data), delete this.acks[t.id]) :
				c("bad ack %s", t.id)
		}, l.prototype.onconnect = function() {
			this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
		}, l.prototype.emitBuffered = function() {
			var t;
			for (t = 0; t < this.receiveBuffer.length; t++) h.apply(this, this.receiveBuffer[t]);
			for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
			this.sendBuffer = []
		}, l.prototype.ondisconnect = function() {
			c("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
		}, l.prototype.destroy = function() {
			if (this.subs) {
				for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
				this.subs = null
			}
			this.io.destroy(this)
		}, l.prototype.close = l.prototype.disconnect = function() {
			return this.connected && (c("performing disconnect (%s)", this.nsp), this.packet({
				type: o.DISCONNECT
			})), this.destroy(), this.connected && this.onclose("io client disconnect"), this
		}, l.prototype.compress = function(t) {
			return this.flags = this.flags || {}, this.flags.compress = t, this
		}
	}, function(t, e) {
		t.exports = function(t, e) {
			for (var n = [], o = (e = e || 0) || 0; o < t.length; o++) n[o - e] = t[o];
			return n
		}
	}, function(t, e) {
		t.exports = function(t, e, n) {
			return t.on(e, n), {
				destroy: function() {
					t.removeListener(e, n)
				}
			}
		}
	}, function(t, e) {
		var n = [].slice;
		t.exports = function(t, e) {
			if ("string" == typeof e && (e = t[e]), "function" != typeof e) throw new Error("bind() requires a function");
			var o = n.call(arguments, 2);
			return function() {
				return e.apply(t, o.concat(n.call(arguments)))
			}
		}
	}, function(t, e) {
		function n(t) {
			t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter >
				0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0
		}
		t.exports = n, n.prototype.duration = function() {
			var t = this.ms * Math.pow(this.factor, this.attempts++);
			if (this.jitter) {
				var e = Math.random(),
					n = Math.floor(e * this.jitter * t);
				t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n
			}
			return 0 | Math.min(t, this.max)
		}, n.prototype.reset = function() {
			this.attempts = 0
		}, n.prototype.setMin = function(t) {
			this.ms = t
		}, n.prototype.setMax = function(t) {
			this.max = t
		}, n.prototype.setJitter = function(t) {
			this.jitter = t
		}
	}, function(t, e) {
		"use strict";
		t.exports = {
			SDK_VERSION: "2.5.0",
			WSS_ADDRESS: "wss://ws.im.jiguang.cn",
			UPLOAD_FILE: "https://sdk.im.jiguang.cn/resource",
			DOWNLOAD_FILE: "http://10.10.2.12:8888",
			ALLOW_MSG_TYPE: ["text", "image", "file", "location", "custom"],
			LOGIN_OUT_EVENT: [1, 2],
			FROM_PLATFORM: "j",
			ACK_TIMEOUT: 5e3,
			RESP_TIMEOUT: 3e4,
			RETRY_TIMES: 5,
			SYNC_INTERVAL: 15e4,
			RECEIPT_REPORT_INTERVAL: 2e3,
			RECEIPT_REPORT_MAX_SIZE: 50,
			EVENT_KEY: "eve-k-",
			CONVERSATION_KEY: "conversations-",
			SYNC_TYPE_OPEN: 1,
			SYNC_TYPE_CLOSE: 0,
			FRIEND_INVITE: 1,
			FRIEND_INVITED: 2,
			PLAT_CHANNEL: "w",
			EVENTS: {
				ACK: "ack",
				INIT: "c_init",
				LOGIN: "login",
				REGISTER: "register",
				GET_USER_INFO: "get_across_user_info",
				GET_ACROSS_USER_INFO: "get_across_user_info",
				S_SINGLE_TEXT: "s_across_single_text",
				S_SINGLE_TEXT_: "s_single_text",
				MSG_SYNC: "msg_sync",
				MSG_RECV: "msg_recv",
				MSG_RECV_V2: "msg_recv_v2",
				SEND_GROUP_MSG: "send_group_msg",
				CREATE_GROUP: "create_group",
				GET_GROUPS_LIST: "get_groups_list",
				GET_GROUP_INFO: "get_group_info",
				ADD_GROUP_MEMBER: "add_group_member",
				ADD_ACROSS_GROUP_MEMBER: "add_across_group_member",
				DEL_GROUP_MEMBER: "del_group_member",
				DEL_ACROSS_GROUP_MEMBER: "del_across_group_member",
				GET_GROUP_MEMBERS: "get_group_members",
				UPDATE_GROUP_INFO: "update_group_info",
				EXIT_GROUP: "exit_group",
				EVENT_NOTIFICATION: "event_notification",
				GET_CONVERSATIONS: "get_conversations",
				GET_UPLOAD_TOKEN: "get_upload_token",
				NO_DISTURB: "no_disturb",
				ADD_MSG_NO_DISTURB_SINGLE: "add_msg_no_disturb_single",
				DELETE_MSG_NO_DISTURB_SINGLE: "delete_msg_no_disturb_single",
				ADD_MSG_NO_DISTURB_GROUP: "add_msg_no_disturb_group",
				DELETE_MSG_NO_DISTURB_GROUP: "delete_msg_no_disturb_group",
				ADD_MSG_NO_DISTURB_GLOBAL: "add_msg_no_disturb_global",
				DELETE_MSG_NO_DISTURB_GLOBAL: "delete_msg_no_disturb_global",
				DISCONNECT: "disconnect",
				GET_BLACK_LIST: "get_black_list",
				ADD_BLACK_LIST: "add_black_list",
				DEL_BLACK_LIST: "del_black_list",
				UPDATE_SELF_INFO: "update_user_inf",
				UPDATE_SELF_PWD: "update_user_pwd",
				ADD_MSG_SHIELD_GROUP: "add_msg_shield_group",
				DEL_MSG_SHIELD_GROUP: "del_msg_shield_group",
				ADD_FRIEND: "add_friend",
				DEL_FRIEND: "del_friend",
				UPDATE_FRIEND_MEMO: "update_friend_memo",
				GET_FRIEND_LIST: "get_friend_list",
				SYNC_CHECK: "sync_check",
				SYNC_CONVERSATION: "sync_conversation",
				SYNC_CONVERSATION_ACK: "sync_conversation_ack",
				MSG_RETRACT: "msg_retract",
				GET_RESOURCE: "get_resource",
				LIST_SHIELD_GROUP: "list_shield_group",
				SYNC_EVENT_CHECK: "sync_event_check",
				SYNC_EVENT: "sync_event",
				SYNC_EVENT_ACK: "sync_event_ack",
				RECEIPT_REPORT: "receipt_report",
				SYNC_RECEIPT_ACK: "sync_receipt_ack",
				SYNC_RECEIPT: "sync_receipt",
				RECEIPT_CHANGE: "receipt_change",
				UNREAD_GROUP_COUNT: "unread_group_count",
				UNREAD_SINGLE_COUNT: "unread_single_count",
				MSG_UNREAD_LIST: "msg_unread_list",
				TRANS_MSG_SINGLE: "trans_msg_single",
				TRANS_MSG_GROUP: "trans_msg_group",
				TRANS_MSG_PLATFORM: "trans_msg_platform",
				TRANS_MSG_REC: "trans_msg_rec",
				ADMIN_ADD_GROUP_MEMBER: "admin_add_group_member",
				APPLY_JOIN_GROUP: "apply_join_group",
				ROOM_LIST: "room_list",
				ROOM_LIST_SELF: "room_list_self",
				JOIN_ROOM: "join_room",
				EXIT_ROOM: "exit_room",
				ROOM_INFO: "room_info",
				SEND_ROOM_MSG: "send_room_msg",
				ROOM_MSG_SYNC: "room_msg_sync",
				GROUP_MEM_SILENCE: "group_mem_silence",
				ROOM_MSG_SYNC_HIS: "room_msg_sync_his",
				DISSOLVE_GROUP: "dissolve_group",
				ADD_GROUP_KEEPER: "add_group_keeper",
				DEL_GROUP_KEEPER: "del_group_keeper",
				CHANGE_GROUP_ADMIN: "change_group_admin",
				PUBLIC_GROUP_LIST: "public_group_list"
			}
		}
	}, function(t, e, n) {
		"use strict";
		var o = n(59),
			r = function(t) {
				this.channel = t, this.rid = this.channel.generateRid(), this.times = 1
			};
		r.prototype.setEvent = function(t) {
			return this.event = t, this
		}, r.prototype.setData = function(t) {
			return this.data = t, this
		}, r.prototype.onSuccess = function(t) {
			return "function" == typeof t && (this.success = t), this
		}, r.prototype.onFail = function(t) {
			return "function" == typeof t && (this.fail = t), this
		}, r.prototype.onTimeout = function(t) {
			if ("function" == typeof t) {
				this.timeout = t;
				var e = this;
				this.respTimeoutTaskId = setTimeout(function() {
					e.respTimeoutTask()
				}, o.RESP_TIMEOUT)
			}
			return this
		}, r.prototype.onAck = function(t) {
			return "function" == typeof t && (this.ack = t), this
		}, r.prototype.onInnerCall = function(t) {
			return "function" == typeof t && (this.innerCall = t), this
		}, r.prototype.onUserInfoGet = function(t) {
			return "function" == typeof t && (this.userInfoGet = t), this
		}, r.prototype.addHook = function(t) {
			return "function" == typeof t && (this.hook = t), this
		}, r.prototype.ackTimeoutTask = function() {
			if (this.times < o.RETRY_TIMES) {
				this.channel.send(this.event, this._data), this.times++;
				var t = this;
				this.ackTimeoutTaskId = setTimeout(function() {
					t.ackTimeoutTask()
				}, o.ACK_TIMEOUT)
			} else this.timeout && this.timeout({
				rid: this.rid,
				data: this.data,
				response_timeout: !1
			}), delete this.channel.dataCache[this.rid];
			return this
		}, r.prototype.respTimeoutTask = function() {
			if (this.times < o.RETRY_TIMES) {
				this.channel.send(this.event, this._data), this.times++;
				var t = this;
				this.respTimeoutTaskId = setTimeout(function() {
					t.respTimeoutTask()
				}, o.RESP_TIMEOUT)
			} else this.timeout && this.timeout({
				rid: this.rid,
				data: this.data,
				response_timeout: !0
			}), delete this.channel.dataCache[this.rid];
			return this
		}, r.prototype.cleanAckTimeout = function() {
			return this.ackTimeoutTaskId && clearTimeout(this.ackTimeoutTaskId), this
		}, r.prototype.cleanRespTimeout = function() {
			return this.respTimeoutTaskId && clearTimeout(this.respTimeoutTaskId), this
		}, r.prototype.send = function() {
			if (this.event && this.data) {
				var t = this;
				return this.ackTimeoutTaskId = setTimeout(function() {
						t.ackTimeoutTask()
					}, o.ACK_TIMEOUT), this._data = JSON.parse(JSON.stringify(this.data)), this._data.rid = this.rid, this.channel
					.send(this.event, this._data), this.channel.dataCache[this.rid] = this, this
			}
			console.error("send fail，event and data can not empty")
		}, t.exports = r
	}, function(t, e) {
		"use strict";
		var n = function(t) {
			this.args = t
		};
		n.prototype.onSuccess = function(t) {
			return "function" == typeof t && (this.success = t), this
		}, n.prototype.onFail = function(t) {
			return "function" == typeof t && (this.fail = t), this
		}, n.prototype.onTimeout = function(t) {
			return "function" == typeof t && (this.timeout = t), this
		}, n.prototype.onAck = function(t) {
			return "function" == typeof t && (this.ack = t), this
		}, t.exports = n
	}, function(t, e) {
		"use strict";
		var n = function(t, e) {
			this.current_user = t, this.current_appkey = e, this.version = 1, this.from_platform = "web"
		};
		n.prototype.setNeedReceipt = function(t) {
			return this.need_receipt = t, this
		}, n.prototype.setNoOffline = function(t) {
			return this.no_offline = t, this
		}, n.prototype.setNoNotification = function(t) {
			return this.no_notification = t, this
		}, n.prototype.setType = function(t) {
			return this.type = t, this
		}, n.prototype.setAtList = function(t) {
			return this.at_list = t, this
		}, n.prototype.setAppkey = function(t) {
			return t && (this.appkey = t), this
		}, n.prototype.setTarget = function(t, e) {
			return this.target_id = t.toString(), this.target_name = e, this
		}, n.prototype.setFromName = function(t) {
			return this.from_name = t, this
		}, n.prototype.setText = function(t, e) {
			return this.msg_type = "text", this.msg_body = {
				text: t
			}, e && (this.msg_body.extras = e), this
		}, n.prototype.setImage = function(t, e) {
			return this.msg_type = "image", this.msg_body = {
				media_id: t.media_id,
				media_crc32: t.media_crc32,
				width: t.width,
				height: t.height,
				format: t.format,
				fsize: t.fsize
			}, e && (this.msg_body.extras = e), this
		}, n.prototype.setFile = function(t, e) {
			return this.msg_type = "file", this.msg_body = {
				media_id: t.media_id,
				media_crc32: t.media_crc32,
				hash: t.hash,
				fsize: t.fsize,
				fname: t.fname
			}, e && (this.msg_body.extras = e), this
		}, n.prototype.setCustomNotification = function(t) {
			return t && (this.custom_notification = t), this
		}, n.prototype.setLocation = function(t, e) {
			return this.msg_type = "location", this.msg_body = {
				latitude: t.latitude,
				longitude: t.longitude,
				scale: t.scale,
				label: t.label
			}, e && (this.msg_body.extras = e), this
		}, n.prototype.setCustom = function(t, e) {
			return this.msg_type = "custom", this.msg_body = t, e && (this.msg_body.extras = e), this
		}, n.prototype.build = function() {
			var t = this.current_user;
			if ("single" != this.type && "group" != this.type && "across_single" != this.type && "chatroom" != this.type)
				return console.log("type must be single or group or chatroom");
			if (!this.target_id) return console.error("target_id must not null");
			if ("text" == this.msg_type) {
				if (!this.msg_body.text && this.at_list && "single" != this.type) this.msg_body.text = " ";
				else if (!this.msg_body.text && !this.at_list) return console.error("未设置文本消息内容")
			} else if ("custom" == this.msg_type) {
				if (!this.msg_body) return console.error("custom对象不能为空")
			} else if ("image" == this.msg_type) {
				if (!this.msg_body.media_id) return console.error("未设置image消息media_id字段");
				if (!this.msg_body.media_crc32) return console.error("未设置image消息media_crc32字段");
				if (!this.msg_body.width) return console.error("未设置image消息width字段");
				if (!this.msg_body.height) return console.error("未设置image消息height字段")
			} else if ("file" == this.msg_type) {
				if (!this.msg_body.media_id) return console.error("未设置file消息media_id字段");
				if (!this.msg_body.media_crc32) return console.error("未设置file消息media_crc32字段");
				if (!this.msg_body.fsize) return console.error("未设置file消息fsize字段");
				if (!this.msg_body.fname) return console.error("未设置file消息fname字段")
			} else {
				if ("location" != this.msg_type) return console.error("请设置合法的msg_type");
				if (!this.msg_body.latitude) return console.error("未设置location消息latitude字段");
				if (!this.msg_body.longitude) return console.error("未设置location消息longitude字段");
				if (!this.msg_body.scale) return console.error("未设置location消息scale字段");
				if (!this.msg_body.label) return console.error("未设置location消息label字段")
			}
			var e = {
				version: this.version,
				target_type: this.type,
				from_platform: this.from_platform,
				target_id: this.target_id,
				target_name: this.target_name,
				from_id: t,
				from_name: this.from_name,
				create_time: (new Date).getTime(),
				msg_type: this.msg_type,
				msg_body: this.msg_body
			};
			this.appkey && (e.target_appkey = this.appkey, e.from_appkey = this.current_appkey);
			var n = {
				content: e
			};
			if (n.no_offline = this.no_offline, n.no_notification = this.no_notification, n.custom_notification = this.custom_notification,
				n.target_name = e.target_name, n.need_receipt = this.need_receipt, "single" == e.target_type) n.target_id = e.target_id;
			else if (n.target_gid = e.target_id, this.at_list && this.at_list instanceof Array) n.users = this.at_list;
			else if (this.at_list && !(this.at_list instanceof Array)) return console.error("参数值不合法，at_list必须为数组类型");
			return this.appkey ? n.appkey = this.appkey : n.appkey = this.current_appkey, n
		}, t.exports = n
	}, function(t, e) {
		"use strict";
		t.exports = function() {
			function t(t, e) {
				var n = (65535 & t) + (65535 & e);
				return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n
			}

			function e(e, n, o, r, i, s) {
				return t((a = t(t(n, e), t(r, s))) << (c = i) | a >>> 32 - c, o);
				var a, c
			}

			function n(t, n, o, r, i, s, a) {
				return e(n & o | ~n & r, t, n, i, s, a)
			}

			function o(t, n, o, r, i, s, a) {
				return e(n & r | o & ~r, t, n, i, s, a)
			}

			function r(t, n, o, r, i, s, a) {
				return e(n ^ o ^ r, t, n, i, s, a)
			}

			function i(t, n, o, r, i, s, a) {
				return e(o ^ (n | ~r), t, n, i, s, a)
			}

			function s(e, s) {
				var a, c, u, p, h;
				e[s >> 5] |= 128 << s % 32, e[14 + (s + 64 >>> 9 << 4)] = s;
				var l = 1732584193,
					f = -271733879,
					d = -1732584194,
					_ = 271733878;
				for (a = 0; a < e.length; a += 16) c = l, u = f, p = d, h = _, f = i(f = i(f = i(f = i(f = r(f = r(f = r(f = r(
								f = o(f = o(f = o(f = o(f = n(f = n(f = n(f = n(f, d = n(d, _ = n(_, l = n(l, f, d, _, e[a], 7, -
											680876936), f, d, e[a + 1], 12, -389564586), l, f, e[a + 2], 17, 606105819), _, l, e[a + 3],
										22, -1044525330), d = n(d, _ = n(_, l = n(l, f, d, _, e[a + 4], 7, -176418897), f, d, e[a + 5],
										12, 1200080426), l, f, e[a + 6], 17, -1473231341), _, l, e[a + 7], 22, -45705983), d = n(d, _ =
										n(_, l = n(l, f, d, _, e[a + 8], 7, 1770035416), f, d, e[a + 9], 12, -1958414417), l, f, e[a +
											10], 17, -42063), _, l, e[a + 11], 22, -1990404162), d = n(d, _ = n(_, l = n(l, f, d, _, e[a +
										12], 7, 1804603682), f, d, e[a + 13], 12, -40341101), l, f, e[a + 14], 17, -1502002290), _, l,
									e[a + 15], 22, 1236535329), d = o(d, _ = o(_, l = o(l, f, d, _, e[a + 1], 5, -165796510), f, d,
									e[a + 6], 9, -1069501632), l, f, e[a + 11], 14, 643717713), _, l, e[a], 20, -373897302), d = o(d,
									_ = o(_, l = o(l, f, d, _, e[a + 5], 5, -701558691), f, d, e[a + 10], 9, 38016083), l, f, e[a +
										15], 14, -660478335), _, l, e[a + 4], 20, -405537848), d = o(d, _ = o(_, l = o(l, f, d, _, e[a +
									9], 5, 568446438), f, d, e[a + 14], 9, -1019803690), l, f, e[a + 3], 14, -187363961), _, l, e[a +
									8], 20, 1163531501), d = o(d, _ = o(_, l = o(l, f, d, _, e[a + 13], 5, -1444681467), f, d, e[a + 2],
									9, -51403784), l, f, e[a + 7], 14, 1735328473), _, l, e[a + 12], 20, -1926607734), d = r(d, _ = r(_,
										l = r(l, f, d, _, e[a + 5], 4, -378558), f, d, e[a + 8], 11, -2022574463), l, f, e[a + 11], 16,
									1839030562), _, l, e[a + 14], 23, -35309556), d = r(d, _ = r(_, l = r(l, f, d, _, e[a + 1], 4, -
								1530992060), f, d, e[a + 4], 11, 1272893353), l, f, e[a + 7], 16, -155497632), _, l, e[a + 10], 23, -
							1094730640), d = r(d, _ = r(_, l = r(l, f, d, _, e[a + 13], 4, 681279174), f, d, e[a], 11, -358537222),
							l, f, e[a + 3], 16, -722521979), _, l, e[a + 6], 23, 76029189), d = r(d, _ = r(_, l = r(l, f, d, _, e[a +
							9], 4, -640364487), f, d, e[a + 12], 11, -421815835), l, f, e[a + 15], 16, 530742520), _, l, e[a + 2],
						23, -995338651), d = i(d, _ = i(_, l = i(l, f, d, _, e[a], 6, -198630844), f, d, e[a + 7], 10,
						1126891415), l, f, e[a + 14], 15, -1416354905), _, l, e[a + 5], 21, -57434055), d = i(d, _ = i(_, l = i(l,
						f, d, _, e[a + 12], 6, 1700485571), f, d, e[a + 3], 10, -1894986606), l, f, e[a + 10], 15, -1051523), _,
					l, e[a + 1], 21, -2054922799), d = i(d, _ = i(_, l = i(l, f, d, _, e[a + 8], 6, 1873313359), f, d, e[a +
					15], 10, -30611744), l, f, e[a + 6], 15, -1560198380), _, l, e[a + 13], 21, 1309151649), d = i(d, _ = i(_,
						l = i(l, f, d, _, e[a + 4], 6, -145523070), f, d, e[a + 11], 10, -1120210379), l, f, e[a + 2], 15,
					718787259), _, l, e[a + 9], 21, -343485551), l = t(l, c), f = t(f, u), d = t(d, p), _ = t(_, h);
				return [l, f, d, _]
			}

			function a(t) {
				var e, n = "";
				for (e = 0; e < 32 * t.length; e += 8) n += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
				return n
			}

			function c(t) {
				var e, n = [];
				for (n[(t.length >> 2) - 1] = void 0, e = 0; e < n.length; e += 1) n[e] = 0;
				for (e = 0; e < 8 * t.length; e += 8) n[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
				return n
			}

			function u(t) {
				var e, n, o = "0123456789abcdef",
					r = "";
				for (n = 0; n < t.length; n += 1) e = t.charCodeAt(n), r += o.charAt(e >>> 4 & 15) + o.charAt(15 & e);
				return r
			}

			function p(t) {
				return unescape(encodeURIComponent(t))
			}

			function h(t) {
				return a(s(c(e = p(t)), 8 * e.length));
				var e
			}

			function l(t, e) {
				return function(t, e) {
					var n, o, r = c(t),
						i = [],
						u = [];
					for (i[15] = u[15] = void 0, r.length > 16 && (r = s(r, 8 * t.length)), n = 0; n < 16; n += 1) i[n] =
						909522486 ^ r[n], u[n] = 1549556828 ^ r[n];
					return o = s(i.concat(c(e)), 512 + 8 * e.length), a(s(u.concat(o), 640))
				}(p(t), p(e))
			}
			return function(t, e, n) {
				return e ? n ? l(e, t) : u(l(e, t)) : n ? h(t) : u(h(t))
			}
		}
	}, function(t, e) {
		"use strict";
		var n = {
				isBlack: function(t) {
					return !(t && "string" == typeof t && t.length > 0)
				}
			},
			o = {
				addItem: function(t, e) {
					window.localStorage && localStorage.setItem(t, e)
				},
				removeItems: function(t) {
					if (window.localStorage) {
						for (var e = localStorage.length, n = [], o = 0; o < e; o++) localStorage.getItem(localStorage.key(o)) ===
							t && n.push(localStorage.key(o));
						n.forEach(function(t) {
							localStorage.removeItem(t)
						})
					}
				},
				getItem: function(t) {
					return window.localStorage ? localStorage.getItem(t) : null
				}
			},
			r = {
				delRepeatItem: function(t) {
					var e = [];
					return t.forEach(function(t) {
						-1 === e.indexOf(t) && null != t && e.push(t)
					}), e
				}
			},
			i = {
				rooms: {}
			};
		t.exports = {
			StringUtils: n,
			StorageUtils: o,
			ArrayUtils: r,
			Cache: i
		}
	}])
});

// 导出
export default JMessage
