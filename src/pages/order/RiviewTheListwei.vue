<!-- 订单审核列表-复审 -->
<template>
	<section>
		<!--列表-->
		<template>
			<el-table :data="gridData" border highlight-current-row v-loading="gridLoading" class="grid" :default-sort = "{prop: 'updateTime', order: 'descending'}">
				<el-table-column label="订单编号" prop="uuid" width="250">
				</el-table-column>
        <el-table-column label="复审状态" prop="secondCheckStatus" width="180">
           <template scope="scope">
            <span>{{getChannelNameone(scope.row.secondCheckStatus)}}</span>
          </template>
        </el-table-column>
        </el-table-column>
				<el-table-column label="姓名" prop="realName" width="250">
				</el-table-column>
				<el-table-column label="申请金额" prop="amountApply">
				</el-table-column>
				<el-table-column label="申请期限" prop="borrowingTerm">
				</el-table-column>
        <el-table-column label="初审人员" prop="firstChecker">
        </el-table-column>
				<el-table-column label="更新时间" prop="updateTime" min-width="116" sortable>
					<template scope="scope">
						<span>{{getdate(scope.row.updateTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="订单渠道" prop="channel">
					<template scope="scope">
						{{getChannelName(scope.row.channel)}}
					</template>
				</el-table-column>
				<el-table-column inline-template label="操作" width="100">
					<div>
						<el-button size="small" @click="check(row)">审核</el-button>
					</div>
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
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
export default {
	data () {
		return {
			sex: enums.sex,
			searchForm:{
				uuid:'',
				orderTag:'',
				status:'',
				isAgain:'',
				channel:'',
				refundTime:'',
				realName:'',
				amountApply:'',
				borrowingTerm:'',
				refundTime:'',
				updateTime:'',
			},
      ddqudaolist : [{
        code: '0',
        name: '默认'
      }, {
        code: '1',
        name: 'Android'
      }, {
        code: '2',
        name: 'ios'
      }],
      fushenlist : [{
        code: '0',
        name: '未处理'
      }, {
        code: '1',
        name: '处理中'
      }],

        //订单状态
        orderStatus:enums.orderPro,
        isAgainOrder:enums.isAgainOrder,
        orderTagList:enums.orderTagList,
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        qudaolist: [],
        gridLoading: false,
      }
    },
    methods: {
     getChannelName(type) {
       let re = '';
       this.ddqudaolist.forEach(obj => {
        if (obj.code == type) {
          re = obj.name;
          return
        }
      });
       return re
     },
     getChannelNameone(type) {
       let re = '';
       this.fushenlist.forEach(obj => {
        if (obj.code == type) {
          re = obj.name;
          return
        }
      });
       return re
     },
     getQudaoList() {
      this.$http.post('manage/orders/reviewer/userSelf',{status:4}).then(response=>{
       let {body} = response;
       this.gridData = body.data;
     },response=>{});
    },
	// formatTime(time){
	// 	return DataUtil.formatUnixTime(time);
	// },
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

      check(row){
        window.open('#/orderSecondReview?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
      },
      getOrderType(type){
      	return enums.getOrderPro(type);
      },
      getOrderTag(type){
      	return enums.getOrderTagList(type);
      },
      getUnixTime(time){
      	return DataUtil.formatUnixTime(time);
      },
      getSex(val) {
      	return enums.getSex(val)
      },
      search() {
      	this.pageIndex = 1;
      	this.bindGrid()
      },
      // rowClick(row){
      // 	window.open('#/orderSecondReview?seen=true&userUuid='+row.userUuid+
      // 		'&uuid='+row.uuid);
      // },
      pageSizeChange(val) {
      	this.pageSize = val;
      	this.pageIndex = 1;
      	this.bindGrid()
      },
      pageIndexChange(val) {
      	this.pageIndex = val;
        //this.$store.dispatch('setOrderListAllIndex',val)
        this.bindGrid()
      },
      bindGrid() {
       this.gridLoading = true;
       let _data = {
        pageNo:this.pageIndex,
        pageSize:this.pageSize,
        status:4
      };
      this.$http.post('manage/orders/reviewer/userSelf', _data).then(response => {
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
  mounted: function () {
   this.bindGrid();
	 // this.getQudaoList();
	}
}
</script>
