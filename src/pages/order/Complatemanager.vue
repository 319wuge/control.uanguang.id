<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="订单编号">
        <el-input v-model="searchForm.uuid"></el-input>
      </el-form-item>  
      <el-form-item label="姓名">
        <el-input v-model="searchForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="申请期限">
       <el-select v-model="searchForm.borrowingTerm" placeholder="请选择" clearable>
        <el-option v-for="item in qixianlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="订单渠道">
     <el-select v-model="searchForm.channel" placeholder="请选择" clearable>
      <el-option v-for="item in ddqudaolist" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="申请时间">
    <div class="block">
      <el-date-picker v-model="searchForm.createBeginTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
      </el-date-picker> ~
      <el-date-picker v-model="searchForm.createEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期">
      </el-date-picker>
    </div>
  </el-form-item>
  <el-form-item label="订单状态">
   <el-select v-model="searchForm.status" placeholder="请选择" clearable>
    <el-option v-for="item in ddzhuangtai" :label="item.name" :key="item.code" :value="item.code"></el-option>
  </el-select>
</el-form-item>
<el-form-item label="初审分配时间">
  <div class="block">
    <el-date-picker v-model="searchForm.juniorAssignBeginTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
    </el-date-picker> ~
    <el-date-picker v-model="searchForm.juniorAssignEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期">
    </el-date-picker>
  </div>
</el-form-item>
<el-form-item label="初审完成时间">
  <div class="block">
    <el-date-picker v-model="searchForm.juniorFinishBeginTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
    </el-date-picker> ~
    <el-date-picker v-model="searchForm.juniorFinishEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期">
    </el-date-picker>
  </div>
</el-form-item>
<el-form-item label="复审分配时间">
  <div class="block">
    <el-date-picker v-model="searchForm.seniorAssignBeginTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
    </el-date-picker> ~
    <el-date-picker v-model="searchForm.seniorAssignEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期">
    </el-date-picker>
  </div>
</el-form-item>
<el-form-item label="复审完成时间">
  <div class="block">
    <el-date-picker v-model="searchForm.seniorFinishBeginTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
    </el-date-picker> ~
    <el-date-picker v-model="searchForm.seniorFinishEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期">
    </el-date-picker>
  </div>
</el-form-item>
<el-form-item>
  <el-button @click="search" type="info">查询</el-button>
</el-form-item>
</el-form>

<!--列表-->
<template>
  <el-table :data="gridData" highlight-current-row v-loading="gridLoading" @row-click="rowClick" class="grid" :default-sort = "{prop: 'applyTime', order: 'descending'}">
   <el-table-column label="订单编号" prop="uuid" width="220">
   </el-table-column> 
   <el-table-column label="姓名" prop="realName" width="220" >
   </el-table-column>
   <el-table-column label="申请金额" prop="amountApply" width="120" sortable>
   </el-table-column>
   <el-table-column label="申请期限" prop="borrowingTerm" width="120" sortable>
   </el-table-column>
   <el-table-column label="初审人员" prop="juniorReviewerName" width="120" sortable>
   </el-table-column>
   <el-table-column label="复审人员" prop="seniorReviewerName" width="120" sortable>
   </el-table-column>
   <el-table-column label="申请时间" prop="applyTime" width="240" sortable>
    <template scope="scope">
      {{getdate(scope.row.applyTime)}}
    </template>
  </el-table-column>
  <el-table-column label="订单渠道" prop="channel" width="120" sortable>
    <template scope="scope">
      {{getChannelName(scope.row.channel)}}
    </template>
  </el-table-column>
  <!-- <el-table-column label="初审人员" prop="firstChecker" width="120" sortable >
  </el-table-column> -->
  <el-table-column label="初审提交时间" prop="juniorReviewTime" width="240" sortable>
    <template scope="scope">
      {{getdate(scope.row.juniorReviewTime)}}
    </template>
  </el-table-column>
<!--   <el-table-column label="复审人员" prop="secondChecker" width="120" >
</el-table-column> -->
<el-table-column label="复审提交时间" prop="seniorReviewTime" width="240">
  <template scope="scope">
    {{getdate(scope.row.seniorReviewTime)}}
  </template>
</el-table-column>
<el-table-column label="初审分配时间" prop="seniorReviewTime" width="240">
  <template scope="scope">
    {{getdate(scope.row.juniorAssignTime)}}
  </template>
</el-table-column>
<el-table-column label="复审分配时间" prop="seniorReviewTime" width="240">
  <template scope="scope">
    {{getdate(scope.row.seniorAssignTime)}}
  </template>
</el-table-column>
<el-table-column label="订单状态" prop="status" width="120">
  <template scope="scope">
    <span>{{getOrderType(scope.row.status)}}</span>
  </template>
</el-table-column>
<el-table-column label="逾期天数" prop="overdueDays" width="120">
  <template scope="scope">
    <span>{{(scope.row.overDueDays < -1) ? -1:scope.row.overDueDays}}</span>
  </template>
</el-table-column>    
</el-table>

<!--分页-->
<el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
</el-pagination>
</template>
</section>
</template>
<script>
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
import Config from '../../common/config'
export default {
  data () {
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
        mobile:'',
        createBeginTime:'',
        createEndTime:'',
        channel: '',
        uuid:'',
        borrowingTerm:'',
        status:'',
        juniorAssignBeginTime:'',
        juniorAssignEndTime:'',
        juniorFinishBeginTime:'',
        juniorFinishEndTime:'',
        seniorAssignBeginTime:'',
        seniorAssignEndTime:'',
        seniorFinishBeginTime:'',
        seniorFinishEndTime:'',

      },
      qixianlist : [{
        code: '7',
        name: '7天'
      }, {
        code: '14',
        name: '14天'
      }],
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
      ddzhuangtai : [{
        code: 'SUBMITTING',
        name: '待提交',
        value:'1'
      }, {
        code: 'MACHINE_CHECKING',
        name: '待机审',
        value:'2'
      }, {
        code: 'FIRST_CHECK',
        name: '初审',
        value:'3'
      },{
        code: 'SECOND_CHECK',
        name: '复审',
        value:'4'
      },{
        code: 'LOANING',
        name: '待放款',
        value:'5'
      }, {
        code: 'LOANING_DEALING',
        name: '放款处理中',
        value:'6'
      }, {
        code: 'RESOLVING_NOT_OVERDUE',
        name: '待还款（未逾期)',
        value:'7'
      },{
        code: 'RESOLVING_OVERDUE',
        name: '待还款（已逾期）',
        value:'8'
      }, {
        code: 'RESOLVED_DEALING',
        name: '还款处理中',
        value:'9'
      }, {
        code: 'RESOLVED_NOT_OVERDUE',
        name: '正常已还款',
        value:'10'
      },{
        code: 'RESOLVED_OVERDUE',
        name: '逾期已还款',
        value:'11'
      },{
        code: 'MACHINE_CHECK_NOT_ALLOW',
        name: '机审不通过',
        value:'12'
      }, {
        code: 'FIRST_CHECK_NOT_ALLOW',
        name: '初审不通过',
        value:'13'
      }, {
        code: 'SECOND_CHECK_NOT_ALLOW',
        name: '复审不通过',
        value:'14'
      }, {
        code: 'CANCEL',
        name: '取消',
        value:'15'
      }, {
        code: 'LOAN_FAILD',
        name: '打款失败',
        value:'16'
      }],
      qudaolist: [],
      gridLoading: false,
      gridData: [],
      pageIndex: this.$store.getters.getUserListIndex,
      pageSize: 10,
      dataTotal: 20,
      pickerOptions1: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "createEndTime", "s")
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "createBeginTime", "e")
        }
      }
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
  //  dateDiff(endDate,startDate) {
  //   let aDate,  oDate1,  oDate2,  iDays ;
  //   aDate  =  endDate.split("-")
  //   oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
  //   aDate  =  startDate.split("-")
  //   oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
  //   iDays  =  parseInt((oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
  //   return  iDays
  // },
  //  getQudaoList() {
  //   this.$http.post('manage/completeOrderList',).then(response=>{
  //     let {body} = response;
  //     this.qudaolist = body.data;
  //   },response=>{});
  // },
  formatTime(time){
    return DataUtil.formatUnixTime(time);
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


      getOrderType(type){
        return enums.getOrderPro(type);
      },
      search() {
        this.bindGrid()
      },
      check(row){
        window.open('#/UserDetail?&uuid='+row.uuid);
      },
      rowClick(row){
        window.open('#/completeOrderDetail?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
      },
      pageSizeChange(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.bindGrid()
      },
      pageIndexChange(val) {
        this.pageIndex = val;
        this.$store.dispatch('getUserListIndex',val);
        this.bindGrid();
      },
      bindGrid() {
        this.gridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize}, this.searchForm,{
            createBeginTime:DataUtil.formatTime(this.searchForm.createBeginTime)||'',
            createEndTime:DataUtil.formatTime(this.searchForm.createEndTime)||'',
            juniorAssignBeginTime:DataUtil.formatTime(this.searchForm.juniorAssignBeginTime)||'',
            juniorAssignEndTime:DataUtil.formatTime(this.searchForm.juniorAssignEndTime)||'',
             juniorFinishBeginTime:DataUtil.formatTime(this.searchForm. juniorFinishBeginTime)||'',
            juniorFinishEndTime:DataUtil.formatTime(this.searchForm.juniorFinishEndTime)||'',
            seniorAssignBeginTime:DataUtil.formatTime(this.searchForm.seniorAssignBeginTime)||'',
             seniorAssignEndTime:DataUtil.formatTime(this.searchForm. seniorAssignEndTime)||'',
            seniorFinishBeginTime:DataUtil.formatTime(this.searchForm.seniorFinishBeginTime)||'',
            seniorFinishEndTime:DataUtil.formatTime(this.searchForm.seniorFinishEndTime)||'',
          });
        this.$http.post('manage/orders/admin-review-finished', _data).then(response => {
          let {body} = response;
          if (1 == body.code) {
            this.gridLoading = false;
            this.gridData = body.data.data;
            this.dataTotal = body.data.recordsTotal;
          } else {
            this.$message.error(body.message);
          }
        }).catch((e) =>{
          this.gridLoading = false;
        })
      }
    },
    mounted: function () {
      this.bindGrid();
  // this.getQudaoList();
}
}
</script>