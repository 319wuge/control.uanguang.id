<!--  逾期订单查询 -->
<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="Nomor Permohonan">
        <el-input v-model="searchForm.uuid"></el-input>
      </el-form-item>  
      <el-form-item label="Nama lengkap">
        <el-input v-model="searchForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="Nomor Ponsel">
        <el-input v-model="searchForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="tester">
       <el-select v-model="searchForm.isTest" placeholder="Silahkan" clearable>
        <el-option v-for="item in fjzhuangtai" :label="item.name" :key="item.code" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Pinjaman ulang">
     <el-select v-model="searchForm.isRepeatBorrowing" placeholder="Silahkan" clearable>
      <el-option v-for="item in fjzhuangtai" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Jenis Identitas">
   <el-select v-model="searchForm.userRole" placeholder="Silahkan" clearable>
    <el-option v-for="item in jkzhuangtai" :label="item.name" :key="item.value" :value="item.code"></el-option>
  </el-select>
</el-form-item>
<el-form-item label="Durasi pinjaman">
 <el-select v-model="searchForm.borrowingTerm" placeholder="Silahkan" clearable>
  <el-option v-for="item in qixianlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
</el-select>
</el-form-item>
<el-form-item label="Jenis perangkat">
 <el-select v-model="searchForm.channel" placeholder="Silahkan" clearable>
  <el-option v-for="item in ddqudaolist" :label="item.name" :key="item.value" :value="item.code"></el-option>
</el-select>
</el-form-item>
<el-form-item label="Label permohonan">
 <el-select v-model="searchForm.status" placeholder="Silahkan" clearable>
  <el-option v-for="item in ddzhuangtai" :label="item.name" :key="item.value" :value="item.code"></el-option>
</el-select>
</el-form-item>
<el-form-item label="Waktu Pengajuan">
  <div class="block">
    <el-date-picker v-model="searchForm.createBeginTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Pilih tanggal">
    </el-date-picker> ~
    <el-date-picker v-model="searchForm.createEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Pilih tanggal">
    </el-date-picker>
  </div>
</el-form-item>
<el-form-item label="Petugas penagihan" prop="outsourceId">
  <el-select v-model="searchForm.outsourceId" placeholder="Silahkan" filterable clearable>
    <el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.code"></el-option>
  </el-select>
</el-form-item>

<el-form-item label="Tanggal wajib pelunasan">
  <div class="block">
    <el-date-picker v-model="searchForm.dueDayStartTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Pilih tanggal">
    </el-date-picker> ~
    <el-date-picker v-model="searchForm.dueDayEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Pilih tanggal">
    </el-date-picker>
  </div>
</el-form-item>
<el-form-item label="Jumlah hari terlambat terkecil" label-width="100">
  <el-input v-model="searchForm.minOverdueDays"></el-input>
</el-form-item>
<el-form-item label="Jumlah hari terlambat terbesar" label-width="100">
  <el-input v-model="searchForm.maxOverdueDays"></el-input>
</el-form-item>

<el-form-item>
  <el-button @click="search" type="info">Temukan</el-button>
</el-form-item>
</el-form>

<!--列表-->
<template>
  <el-table :data="gridData" highlight-current-row v-loading="gridLoading" @row-click="rowClick" class="grid">
   <el-table-column label="Nomor Permohonan" prop="uuid" width="220">
   </el-table-column> 
   <el-table-column label="Nama lengkap" prop="realName" width="220" >
   </el-table-column>
   <el-table-column label="Jenis Identitas" prop="userRole" width="120" sortable>
    <template scope="scope">
      {{getChannelNameOne(scope.row.userRole)}}
    </template>
  </el-table-column>
  <el-table-column label="Pinjaman ulang" prop="isRepeatBorrowing" sortable width="120">
   <template scope="scope">
    <el-tag :type="scope.row.isRepeatBorrowing==1? 'success' : 'danger'" close-transition>{{scope.row.isRepeatBorrowing==1?'Ya':'Bukan'}}</el-tag>
  </template>
</el-table-column>
<el-table-column label="tester" prop="isTest" sortable width="120">
 <template scope="scope">
  <el-tag :type="scope.row.isTest==1? 'success' : 'danger'" close-transition>{{scope.row.isRepeatBorrowing==1?'Ya':'Bukan'}}</el-tag>
</template>
</el-table-column>
<el-table-column label="Label permohonan" prop="status" width="120">
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
<el-table-column label="Tanggal wajib pelunasan" prop="refundTime" width="240" sortable>
  <template scope="scope">
    {{getdate(scope.row.refundTime)}}
  </template>
</el-table-column>  
<el-table-column label="Jumlah hari keterlambatan" prop="overdueDays" max-width="10">
  <template scope="scope">
    <span>{{(scope.row.overdueDays < -1) ? -1:scope.row.overdueDays}}</span>
  </template>
</el-table-column>
<el-table-column label="Petugas penagihan" prop="outsourceUserName" width="120" sortable>
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
        isAgain:'',
        applyTime:'',
        amountApply:'',
        updateBeginTime:'',
        updateEndTime:'',
        isRepeatBorrowing:'',
        userRole :'',
        isTest:'',
        overdueDayMin: '',
        overdueDayMax: '',
        minOverdueDays:'',
        maxOverdueDays:'',
        dueDayStartTim:'',
        dueDayEndTime:'',

      },
      thirdCompanyList: [],
      fjzhuangtai:[{
        code:'1',
        name:'Ya'
      },{
        code:'0',
        name:'Bukan'
      }],
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
      ddzhuangtai :[{
        code: '0',
        name: ' Tidak tersambung'
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
      qudaolist: [],
      gridLoading: false,
      gridData: [],
      pageIndex: this.$store.getters.getUserListIndex,
      pageSize: 10,
      isAgainOrder:enums.isAgainOrder,
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


      getOrderType(type) {
       let re = '';
       this.ddzhuangtai.forEach(obj => {
        if (obj.value == type) {
          re = obj.name;
          return
        }
      });
       return re
     },
     search() {
      this.bindGrid()
    },
    check(row){
      window.open('#/UserDetail?&uuid='+row.uuid);
    },
    rowClick(row){
      window.open('#/OrderDetails?seen=true&userUuid='+row.userUuid+
        '&uuid='+row.uuid);
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.bindGrid()
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
    pageIndexChange(val) {
      this.pageIndex = val;
      this.$store.dispatch('getUserListIndex',val);
      this.bindGrid();
    },
    bindGrid() {
      if(this.searchForm.minOverdueDays && this.searchForm.maxOverdueDays){
        if(this.searchForm.minOverdueDays < 0 || this.searchForm.maxOverdueDays < 0 || Number(this.searchForm.minOverdueDays) >= Number(this.searchForm.maxOverdueDays)){
          this.$message.error("请先正确填写天数");
          return false;
        }
      };
      this.gridLoading = true;
      let _data = Object.assign({
        pageNo:this.pageIndex,
        pageSize:this.pageSize
      }, this.searchForm);
      this.$http.post('manage/orders/overdue-list', _data).then(response => {
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
    this.getCollectionList();
  }
}
</script>