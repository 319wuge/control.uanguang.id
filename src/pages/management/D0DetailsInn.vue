/**
* Created by xiaowei on 17-5-11.
*/
<template>
	<section>
		<!-- 工具条 -->
		<el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" >
			<el-row>
				<el-form-item label="Nomor Permohonan">
					<el-input v-model="searchForm.uuid" width="200"></el-input>
				</el-form-item>
				<el-form-item label="Nama lengkap">
					<el-input v-model="searchForm.realName"></el-input>
				</el-form-item>
				<el-form-item label="Nomor Ponsel">
					<el-input v-model="searchForm.mobile"></el-input>
				</el-form-item>
				<el-form-item label="Status permohonan">
					<el-select v-model="searchForm.status" placeholder="Silahkan pilih" clearable>
						<el-option v-for="item in ztList" :label="item.name" :key="item.code" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Pinjaman ulang">
					<el-select v-model="searchForm.isRepeatBorrowing" placeholder="Silahkan pilih" clearable>
						<el-option v-for="item in fjzhuangtai" :label="item.name" :key="item.code" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Jenis Identitas">
					<el-select v-model="searchForm.userRole" placeholder="Silahkan pilih" clearable>
						<el-option v-for="item in jkzhuangtai" :label="item.name" :key="item.value" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Durasi pinjaman">
					<el-select v-model="searchForm.borrowingTerm" placeholder="Silahkan pilih" clearable>
						<el-option v-for="item in qixianlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Tanggal pengajuan">
					<div class="block">
						<el-date-picker v-model="searchForm.createBeginTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Pilih tanggal">
						</el-date-picker> ~
						<el-date-picker v-model="searchForm.createEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Pilih tanggal">
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item label="Jenis perangkat">
					<el-select v-model="searchForm.channel" placeholder="Silahkan pilih" clearable>
						<el-option v-for="item in ddqudaolist" :label="item.name" :key="item.value" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Label permohonan">
					<el-select v-model="searchForm.orderTag" placeholder="Silahkan pilih" clearable>
						<el-option v-for="item in bqxianlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Petugas penagihan" prop="outsourceId">
					<el-select v-model="searchForm.outsourceId" placeholder="Silahkan pilih" filterable clearable>
						<el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="search" type="info" style="width: 100px">Temukan</el-button>
					<!-- <el-button @click="exportExl" type="success" style="width:100px">导出</el-button> -->
				</el-form-item>
			</el-row>
		</el-form>

		<!--列表-->
		<template>
			<el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
				<el-table-column label="Nomor Permohonan" prop="uuid" width="220">
				</el-table-column> 
				<el-table-column label="Nama lengkap" prop="realName" width="220" >
				</el-table-column>
				<el-table-column label="Jenis Identitas" prop="userRole" width="120" sortable>
					<template scope="scope">
						{{getChannelNameOne(scope.row.userRole)}}
					</template>
				</el-table-column>
				<el-table-column label="Pinjaman ulang" prop="isRepeatBorrowing" width="120">
					<template scope="scope">
						<el-tag :type="scope.row.isRepeatBorrowing==1? 'success' : 'danger'" close-transition>{{scope.row.isRepeatBorrowing==1?'Ya':'Bukan'}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="Status permohonan" prop="status" width="120">
					<template scope="scope">
						<span>{{getOrderType(scope.row.status)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="Jumlah pinjaman" prop="amountApply" width="120" sortable>
				</el-table-column>
				<el-table-column label="Durasi pinjaman" prop="borrowingTerm" width="120" sortable>
				</el-table-column>
				<el-table-column label="Waktu Pengajuan" prop="applyTime" width="240" sortable>
					<template scope="scope">
						{{getdate(scope.row.applyTime)}}
					</template>
				</el-table-column>
				<el-table-column label="Jenis perangkat" prop="channel" width="120" sortable>
					<template scope="scope">
						{{getChannelName(scope.row.channel)}}
					</template>
				</el-table-column>    		
			</el-table>
		</template>

		<!--分页-->
		<el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
		layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
	</el-pagination>

</section>
</template>


<script>
import DataUtil from '../../common/dataUtil'
import Config from '../../common/config'

export default {
	data() {
		let compareDate = (time, form, txt, type) => {
			let _cp1 = time.getTime() >= Date.now()
			let _cp2 = false
			let _input = this[form][txt]
			if (_input) {
				let _time = Date.parse(new Date(_input))
				if ((type == "s" && time.getTime() > _time) || (type == "e" && time.getTime() < _time)) {
					_cp2 = true
				}
			}
			return _cp1 || _cp2
		}
		return {
			searchForm:{
				realName:'',
				userName:'',
				startTime:'',
				endTime:'',
				orderNo:'',
				type:'',
				payChannelType:'',
				mobile:'',
				userRole:'',
				createBeginTime:'',
				createEndTime:'',
				channel:'',
				orderTag:'',
				uuid:'',

			},
			thirdCompanyList: [],
			jkzhuangtai:[{
				code:'WORKING_STAFF',
				name:'Sudah berkerja',
				value:'2'
			},{
				code:'Student',
				name:'Mahasiswa',
				value:'1'
			}],
			qixianlist : [{
				code: '7',
				name: '7Hari'
			}, {
				code: '14',
				name: '14Hari'
			}],
			orderStatus : [{
				code: '0',
				name: '充值'
			}, {
				code: '1',
				name: '放款'
			}, {
				code: '2',
				name: '还款'
			}],
			bqxianlist : [{
				code: '0',
				name: 'Tidak tersambung'
			},{
				code: '1',
				name: 'Sementara tidak tersambung'
			},{
				code: '2',
				name: 'Tersambung, ingkar janji'
			},{
				code: '3',
				name: 'Tersambung, memberi janji'
			}],
			fjzhuangtai:[{
				code:'0',
				name:'Bukan',
			},{
				code:'1',
				name:'Ya'
			}],
			ztList : [{
				code: 'RESOLVING_NOT_OVERDUE',
				name: 'Menunggu dana cair',
				value:'7'
			}, {
				code: 'RESOLVED_NOT_OVERDUE',
				name: 'Dalam proses pelunasan pinjaman',
				value:'10'
			}],
			ddqudaolist : [{
				code: 'DEFAULT',
				name: '默认',
				value:'0'
			}, {
				code: 'Android',
				name: 'Android',
				value:'1'
			}, {
				code: 'iOS',
				name: 'ios',
				value:'2'
			}],
			qixianlist : [{
				code: '7',
				name: '7Hari'
			}, {
				code: '14',
				name: '14Hari'
			}],
			pickerOptions1:{
				disabledDate(time) {
					return compareDate(time, "searchForm", "endTime", "s")
				}
			},
			pickerOptions2: {
				disabledDate(time) {
					return compareDate(time, "searchForm", "startTime", "e")
				}
			},
			gridLoading: false,

			gridData: [],
			pageIndex: 1,
			pageSize: 10,
			dataTotal: 0
		}
	},

	methods:{
		pageSizeChange(val) {
			this.pageSize = val;
			this.pageIndex = 1;
			this.bindGrid()
		},
		getdate(dates) {
			if(!dates){
       return '';
    }
			var myDate = new Date(dates);
			var offset = -7*60*60000;
			offset = myDate.getTimezoneOffset()*60000;
			var myDates = new Date(dates+offset+7*3600000);
    // myDate.setUTCHours(10);
        // return myDate.toLocaleString(); //获取日期与时间
        let minute=myDates.getMinutes();
        if(minute<10){
        	minute="0"+minute;
        }
        let seconds=myDates.getSeconds()
        if(seconds<10){
        	seconds="0"+seconds;
        }
        return myDates.getFullYear()+"-"+(myDates.getMonth()+1)+"-"+myDates.getDate()+" "+myDates.getHours()+":"+minute+":"+seconds
    },
    getOrderType(val){
    	let re = '';
    	this.ztList.forEach(function (obj) {
    		if(obj.value == val){
    			re = obj.name;
    			return;
    		}
    	});
    	return re;
    },
    getCollectionList() {
    	this.$http.post('manage/collection/collectors',{isThird:1}).then(response => {
    		let {body} = response;
    		if(body.code == 1){
    			this.thirdCompanyList = body.data;
    		}else{
    			this.thirdCompanyList = [];
    		}
    	},response => {});
    },
    getChannelName(type) {
    	let re = '';
    	this.ddqudaolist.forEach(obj => {
    		if (obj.value == type) {
    			re = obj.name;
    			return
    		}
    	});
    	return re
    },
    getChannelNameOne(type) {
    	let re = '';
    	this.jkzhuangtai.forEach(obj => {
    		if (obj.value == type) {
    			re = obj.name;
    			return
    		}
    	});
    	return re
    },
    getOrderTypeone(val){
    	let re = '';
    	this.ztList.forEach(function (obj) {
    		if(obj.code == val){
    			re = obj.name;
    			return;
    		}
    	});
    	return re;
    },
    getPayChannelType(val){
    	let re = '';
    	this.zhifuStatus.forEach(function (obj) {
    		if(obj.code == val){
    			re = obj.name;
    			return;
    		}
    	});
    	return re;
    },
    pageIndexChange(val) {
    	this.pageIndex = val;
    	this.bindGrid();
    },
    search() {
    	this.pageIndex = 1;
    	this.bindGrid()
    },
    exportExl() {
    	if(!(this.searchForm.startTime!= "" && this.searchForm.endTime != "")){
    		this.$message({
    			message: '仅支持导出一周内的数据~',
    			type: 'warning'
    		});
    		return;
    	}

    	if(DataUtil.JudgeDate(this.searchForm.startTime,this.searchForm.endTime,7)){
    		this.$message({
    			message: '仅支持导出一周内的数据~',
    			type: 'warning'
    		});
    		return;
    	}

    	window.open(Config.host + "/manage/sysTotalAccountHistoryExcel?sessionId="+DataUtil.sid()+"&orderNo="+this.searchForm.orderNo+"&type="+this.searchForm.type+"&startTime="+DataUtil.formatTime(this.searchForm.startTime)+"&endTime="+DataUtil.formatTime(this.searchForm.endTime)+"&payChannelType="+this.searchForm.payChannelType+"&userName="+this.searchForm.userName);
    },
    bindGrid() {
    	this.gridLoading = true;

    	let _data = Object.assign({
    		pageNo:this.pageIndex,
    		pageSize:this.pageSize
    	}, this.searchForm);

    	this.$http.post('manage/orders/D0-list', _data).then(response => {

    		if (1 == response.body.code) {
    			this.gridLoading = false;
    			if(response.body.data){
    				this.gridData = response.body.data.data;
    				this.dataTotal = response.body.data.recordsTotal;
    			}else {
    				this.gridData = [];
    				this.dataTotal = 0;
    			}
    		} else {
    			this.$message.error(response.body.message);
    		}
    	}, response => {
    		this.gridLoading = false;
    	});
    }
},

mounted:function(){
	this.bindGrid();
	this.getCollectionList();
}



}

</script>
