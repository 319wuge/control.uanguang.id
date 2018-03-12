/**
* Created by tonggen on 2017/1/7.
*/
<template>
  <section class="orderBox">
    <div class="divid-line"></div>
    <!-- 订单状态 -->
    <el-row>
      <div class="one-title">订单状态</div>
      <el-col :span="8" class="grid-content">
        <div><span>订单编号:</span><span>{{ uuid }}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>订单状态:</span><span>{{getOrderType(orderStatus.status)}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>复借订单:</span><span> <el-tag :type="orderStatus.isRepeatBorrowing==1?'danger':''"><span>{{orderStatus.isRepeatBorrowing==1?"是":"否"}}</span></el-tag></span></div>
      </el-col>
    <!--   <el-col :span="8" class="grid-content">
        <div><span>审核标识:</span><span><el-tag :type="orderStatus.checkFlag==0?'success':'primary'"><span>{{checkFlag}}</span></el-tag></span></div>
      </el-col> -->
      <el-col :span="8" class="grid-content">
        <div><span>下单时间:</span><span>{{orderStatus.createTime}}</span></div>
      </el-col>
      <!--<el-col :span="8" class="grid-content">-->
        <!--<div><span>进件标识:</span><span>{{orderStatus.intoOrdFlag}}</span></div>-->
        <!--</el-col>-->
     <!--   <el-col :span="8" class="grid-content">
      <span>资金渠道:</span><span><el-tag type="danger">{{orderStatus.payChannel || '无'}}</el-tag></span> </el-col> -->
      <el-col :span="8" class="grid-content">
        <div><span>催收标识:</span><span>{{getOrderTag(orderStatus.collectionFlag)}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>申请金额:</span><span>{{orderStatus.amountApply}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>申请时间:</span><span>{{getdate(orderStatus.applyTime)}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>逾期账户管理费:</span><span>{{orderStatus.overdueFee}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>逾期账户滞纳金:</span><span>{{orderStatus.overdueMoney}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>应还款总额:</span><span>{{orderStatus.shouldPayAmount}}</span></div>
      </el-col>
    </el-row>
    <div class="divid-line"></div>
    <el-row>
      <div class="one-title">订单进度</div>
      <el-steps :data="orderProData" :active="active" :align-center="true" finish-status="success">
        <el-step v-for="item in orderProData" :key="item.status" :title="getOrderPro(item.status)">
          <div slot="description">
            {{getOrderPro(item.status)}}<br>{{getdate(item.createTime)}}</div>
          </el-step>
        </el-steps>
      </el-row>
      <div class="divid-line"></div>
      <!-- 客户信息 baseInf-->
      <el-row>
        <div class="containers">
          <div class="asides">
            <div class="one-title">客户信息</div>
            <table v-if="workerSeen" border='.1px' width="100%" style="table-layout:fixed;">
              <tr>
                <td>客户姓名</td>
                <td>{{baseInfList.realName}}</td>
              </tr>
              <tr>
                <td>身份证号</td>
                <td>{{baseInfList.idCardNo}}</td>
              </tr>
              <tr>
                <td>客户性别</td>
                <td>{{baseInfList.sex}}</td>
              </tr>
              <tr>
                <td>手机号</td>
                <td>{{baseInfList.mobileNumberDES}}</td>
              </tr>


              <tr>
                <td>邮箱地址</td>
                <td>{{baseInfList.email}}</td>
              </tr>
              <tr>
                <td>学历</td>
                <td>{{baseInfList.academic}}</td>
              </tr>
              <tr>
                <td>婚姻状况</td>
                <td>{{baseInfList.maritalStatus}}</td>
              </tr>
              <tr>
                <td>出生日期</td>
                <td>{{baseInfList.birthday}}</td>
              </tr>
              <tr>
                <td>宗教</td>
                <td>{{baseInfList.religion}}</td>
              </tr>
              <tr>
                <td>母亲姓名</td>
                <td>{{baseInfList.motherName}}</td>
              </tr>
              <tr>
                <td>家庭成员数量</td>
                <td>{{baseInfList.familyMemberAmount}}</td>
              </tr>
              <tr>
                <td>子女数量</td>
                <td>{{baseInfList.childrenAmount}}</td>
              </tr>
              <tr>
                <td>现居地址</td>
                <td>{{baseInfList.province}}{{baseInfList.city}}{{baseInfList.bigDirect}}{{baseInfList.smallDirect}}</td>
              </tr>
              <tr>
                <td>借款人身份</td>
                <td>已工作</td>
              </tr>
              <tr>
                <td>详细地址</td>
                <td>{{baseInfList.detailed}}</td>
              </tr>
            </table>

            <table v-if='studentSeen' border='.1px' width="100%" style="table-layout:fixed;">
              <tr>
                <td>客户姓名</td>
                <td>{{baseInfList.realName}}</td>
              </tr>
              <tr>
                <td>借款身份</td>
                <td>在校大学生</td>
              </tr>
              <tr>
                <td>身份证号</td>
                <td>{{baseInfList.idCardNo}}</td>
              </tr>
              <tr>
                <td>客户性别</td>
                <td>{{baseInfList.sex}}</td>
              </tr>
              <tr>
                <td>手机号</td>
                <td>{{baseInfList.mobileNumberDES}}</td>
              </tr>
              <tr>
                <td>邮箱地址</td>
                <td>{{baseInfList.email}}</td>
              </tr>
              <tr>
                <td>学历</td>
                <td>{{baseInfList.academic}}</td>
              </tr>
              <tr>
                <td>家庭成员数量</td>
                <td>{{baseInfList.familyMemberAmount}}</td>
              </tr>
              <tr>
                <td>家庭年收入</td>
                <td>{{baseInfList.familyAnnualIncome}}</td>
              </tr>
              <tr>
                <td>父亲姓名</td>
                <td>{{baseInfList.fatherName}}</td>
              </tr>
              <tr>
                <td>父亲手机号</td>
                <td>{{baseInfList.fatherMobile}}</td>
              </tr>
              <tr>
                <td>父亲职位</td>
                <td>{{baseInfList.fatherPosition}}</td>
              </tr>
              <tr>
                <td>母亲姓名</td>
                <td>{{baseInfList.motherName}}</td>
              </tr>
              <tr>
                <td>母亲手机号</td>
                <td>{{baseInfList.motherMobile}}</td>
              </tr>
              <tr>
                <td>母亲职位</td>
                <td>{{baseInfList.motherPosition}}</td>
              </tr>
              <tr>
                <td>现居地址</td>
                <td>{{baseInfList.province}}{{baseInfList.city}}{{baseInfList.bigDirect}}{{baseInfList.smallDirect}}</td>
              </tr>
              <tr>
                <td>详细地址</td>
                <td>{{baseInfList.detailed}}</td>
              </tr>
            </table>

            </div>
          </div>
        </el-row>
        <div class="divid-line"></div>
        <!-- 工作信息 jobInf-->
        <el-row>
          <div class="containers" v-if="workerSeen">
            <div class="asides">
              <div class="one-title">工作信息</div>
              <table v-if="workerSeen" border='.1px' width="100%" style="table-layout:fixed;">
                <tr>
                  <td>公司名称</td>
                  <td>{{jobInfList.companyName}}</td>
                </tr>
                <tr>
                  <td>职位名称</td>
                  <td>{{jobInfList.positionName}}</td>
                </tr>
                <tr>
                  <td>月收入</td>
                  <td>{{jobInfList.monthlyIncome}}</td>
                </tr>
                <tr>
                  <td>公司电话</td>
                  <td>{{jobInfList.companyPhone}}</td>
                </tr>
                <tr>
                  <td>公司地址</td>
                  <td>{{jobInfList.province}}{{jobInfList.city}}{{jobInfList.bigDirect}}{{jobInfList.smallDirect}}</td>
                </tr>
                <tr>
                  <td>详细地址</td>
                  <td>{{jobInfList.detailed}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="containers" v-if="studentSeen">
            <div class="asides">
              <div class="one-title">学校信息</div>
              <table border='.1px' width="100%" style="table-layout:fixed;" class="studentsInf">
                <tr>
                  <td>学校名称</td>
                  <td>{{jobInfList.schoolName}}</td>
                </tr>
                <tr>
                  <td>专业</td>
                  <td>{{jobInfList.major}}</td>
                </tr>
                <tr>
                  <td>入学时间</td>
                  <td>{{jobInfList.startSchoolDate}}</td>
                </tr>
                <tr>
                  <td>学号</td>
                  <td>{{jobInfList.studentNo}}</td>
                </tr>
                <tr>
                  <td>学生证照片</td>
                  <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.studentCardUrl" @click.stop="studentCardUrlClick" alt=""></td>
                </tr>
                <tr>
                  <td>奖学金照片</td>
                  <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.scholarshipUrl" @click.stop="scholarshipUrlClick" alt=""></td>
                </tr>
                <tr>
                  <td>英语证书照片</td>
                  <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.englishUrl" @click.stop="englishUrlClick" alt=""></td>
                </tr>
                <tr>
                  <td>计算机证书</td>
                  <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.ComputerUrl" @click.stop="ComputerUrlClick" alt=""></td>
                </tr>
                <tr>
                  <td>校园卡照片</td>
                  <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.schoolCardUrl" @click.stop="schoolCardUrlClick" alt=""></td>
                </tr>
                <tr>
                  <td>其他大赛照片</td>
                  <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.otherCertificateUrl" @click.stop="otherCertificateUrlClick" alt=""></td>
                </tr>
              </table>
            </div>
          </div>
        </el-row>
        <div class="divid-line"></div>

        <!-- 联系人信息 connectInf-->
        <el-row>
          <div class="containers">
            <div class="one-title">联系人信息 &nbsp;&nbsp;
              <el-badge :value="totalLinkMan">
                <el-button type="primary" size="small" @click="addressBook">通讯录信息</el-button>
                <el-dialog title="通讯录信息" v-model="dialogTableVisible">
                  <el-table :data="linkData" v-loading="linkLoading" height="260" size="medium">
                    <el-table-column property="name" label="姓名"></el-table-column>
                    <el-table-column property="mobile" label="手机号"></el-table-column>
                  </el-table>
                </el-dialog>
              </el-badge>
              <el-button style="float: right;margin-left: 30px" :disabled="isTrueMXCall" type="primary" size="small" @click="moxieCallLog">通话记录</el-button>
              <el-dialog v-model="moxieCallLogDialog" title="通话记录" size="large">
                <el-table border :data="moxieCallLogData" v-loading="moxieCallLogLoading" max-height="500">
                  <el-table-column property="mobile" label="电话号码"></el-table-column>
                  <el-table-column property="realName" label="姓名"></el-table-column>
                  <el-table-column property="callCount" label="通话总次数"></el-table-column>
                  <el-table-column property="duration" label="通话总时长（秒）"></el-table-column>
                  <el-table-column property="callTime" label="最近通话时间"></el-table-column>
                  <!-- <el-table-column property="callPlace" label="最近通话地点"></el-table-column> -->
                  <!-- <el-table-column property="callType" label="通话类型"></el-table-column> -->
                  <el-table-column property="type" label="呼叫类型">
                    <template scope="scope">
                      <span>{{getContractType(scope.row.type)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-dialog>
            </div>
          </div>
        </el-row>
        <el-row>
          <div class="asides">
            <table border='.1px' width="100%" style="table-layout:fixed;">
              <tr>
                <td>联系人姓名1</td>
                <td>{{connectInfList.contactsName1}}</td>
              </tr>
              <tr>
                <td>与借款人关系1</td>
                <td>{{connectInfList.relation1}}</td>
              </tr>
              <tr>
                <td>联系人电话1</td>
                <td>{{connectInfList.contactsMobile1}}</td>
              </tr>
              <tr>
                <td>联系人姓名2</td>
                <td>{{connectInfList.contactsName2}}</td>
              </tr>
              <tr>
                <td>与借款人关系2</td>
                <td>{{connectInfList.relation2}}</td>
              </tr>
              <tr>
                <td>联系人电话2</td>
                <td>{{connectInfList.contactsMobile2}}</td>
              </tr>
              <tr>
                <td>备用联系人电话</td>
                <td>{{connectInfList.alternatePhoneNo}}</td>
              </tr>
            </table>
          </div>
        </el-row>
        <div class="divid-line"></div>
        <!-- 银行卡信息 -->
        <el-row>
          <div class="one-title">银行卡信息</div>
          <el-col :span="8" class="grid-content">
            <div><span>开户行:</span><span>{{cardbackInfList.bankCode}}</span></div>
          </el-col>
          <el-col :span="8" class="grid-content">
            <div><span>银行卡号:</span><span>{{cardbackInfList.bankNumberNo}}</span></div>
          </el-col>
          <el-col :span="8" class="grid-content">
            <div><span>账户名称:</span><span>{{cardbackInfList.bankCardName}}</span></div>
          </el-col>
          <el-col :span="8" class="grid-content">
            <div><span>银行卡状态:</span><span>{{getBankStatus(cardbackInfList.status)}}</span></div>
          </el-col>
        </el-row>
        <div class="divid-line"></div>
        <!-- 人脸识别 faceCheck-->
        <el-row>
          <div class="containers">
            <div class="asides">
              <div class="one-title">人脸识别</div>
              <div class="faceCheck">
                <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="facePhotoUrls"  @click.stop="facePhotoUrlClick"><br>活体识别截图</div>
                <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img class="handleImg" :src="baseInfList.handIdCardUrl"  @click.stop="handIdCardUrlClick"><br>手持身份证照片</div>
                <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.idCardUrl"  @click.stop="idCardUrlClick"><br>身份证正面照</div>
              </div>
            </div>
          </div>
        </el-row>
        <div class="divid-line"></div>
        <!-- 视频认证 videoCheck-->
        <el-row>
          <div class="containers">
            <div class="asides">
              <div class="one-title">视频认证</div>
              <el-button @click="searcher" type="primary">旋转</el-button>
              <div v-bind:class= "{ vadio:isActive,vadios:noActive}">
                <video-player
                class="video-player-box videos"
                ref="videoPlayer"
                :options="playerOptions"
                :playsinline="true"
                customEventName="customstatechangedeventname">
              </video-player>
            </div>
          </div>
        </div>
      </div>
    </el-row>
    <div class="divid-line"></div>
    <!-- 订单备注 -->
    <el-row>
      <h1 class="one-title">订单备注</h1>
      <div style="margin-bottom: 10px"></div>
      <el-table :data="orderRemarkList" v-loading="orderRemarkLoading" max-height="200">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="220">
          <template scope="scope">{{formatUnixTime(scope.row.createTime)}}</template>
        </el-table-column>
        <el-table-column prop="operator" label="操作员" width="220">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column prop="orderTag" label="标签" width="100">
          <template scope="scope">{{getOrderTag(scope.row.orderTag)}}</template>
        </el-table-column>
        <el-table-column prop="alertTime" label="下次提醒时间" width="220">
          <template scope="scope">{{formatUnixTime(scope.row.alertTime)}}</template>
        </el-table-column>
      </el-table>
    </el-row>
    <div class="divid-line"></div>

    <!-- 添加备注 -->
    <el-row>
      <h1 class="one-title">添加订单标签及备注</h1>
      <el-form :model="addRemarkForm" :rule="addRemarkRule" ref="addRemarkForm" label-width="100px">
        <el-form-item label="填写备注" prop="remark">
          <el-input type="textarea" v-model="addRemarkForm.remark" :maxlength="300" :rows="5"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="tagForm" :rule="addRemarkRule" label-width="100px" ref="addRemarkForm">
        <el-form-item label="选择标签" prop="remark">
          <el-select v-model="tagForm.orderTag" placeholder="请选择" clearable>
            <el-option v-for="item in tagList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label="添加提醒时间" prop="remindTime">
          <el-date-picker v-model="tagForm.remindDate" type="date" placeholder="请选择日期" :picker-options="pickerOptions"></el-date-picker>
          <el-time-select placeholder="请选择时间" v-model="tagForm.remindTime" :picker-options="pickerTimeOptions"></el-time-select>
          （非必填）
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveTagForm" :loading="tagFormLoading">打个标签</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div class="divid-line"></div>

    <el-row>
      <div class="one-title">历史订单记录</div>
      <el-table :data="historyData" v-loading="historyLoading" @row-click="rowClick" size="large">
        <el-table-column prop="uuid" width="300" label="订单编号"></el-table-column>
        <el-table-column prop="status" width="300" label="订单状态">
          <template scope="scope">
            <span>{{getenums(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="amountApply" width="360" label="申请金额"></el-table-column>
        <el-table-column prop="borrowingTerm" width="250" label="期限">
        </el-table-column>
      </el-table>
    </el-row>
  </section>
</template>
<script>
import mlPhotoBox from '../../components/_photoBox.vue'
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
import Config from '../../common/config'
import { videoPlayer } from 'vue-video-player'
import ElRow from "element-ui/packages/row/src/row";

export default {
  components: {
    ElRow,
    mlPhotoBox,
    videoPlayer
  },
  data () {
    let compareDate = (time) => {
      let _time = time.setDate(time.getDate()+1);
      return time.getTime() <= Date.now();
    };
    return {
      playerOptions: {
        muted: true,
        addClass: "videos",
        width: 400,
        height: 450,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: ""
        }],
        poster: "",
      },
      tagList:[{
        name:'完全失联',code:1
      },{
        name:'暂时失联',code:2
      },{
        name:'可联跳票',code:3
      },{
        name:'可联承诺',code:4
      }],
      pickerTimeOptions: {
        start: '00:00',
        end: '23:00',
        step: '01:00'
      },
      pickerOptions: {
        disabledDate(time) {
          return compareDate(time)
        }
      },
      totalLinkMan: 0,//通讯录个数
      historyLoading: false,
      orderRemarkList:[], //订单备注

      orderStatus: {
          borrowingCount: '',//借款次数
          createTime: '',//申请时间
          userUuid: '', //订单编号;
          collectionFlag:''
        },
        status: '', //审核结果
        remark: '', //审核意见

        textarea: '',
        totalLinkMan: 0,//通讯录个数
        facePhotoUrls:'',
        linkData: [],//通讯录
        dicFlag: [],//通讯录标签
        callLogData: [],//通话记录
        moxieCallLogData: [],//通话记录
        //baseInf 客户基本信息

        // 基本信息
        baseInfList: {},
        historyData: [],
        jobInfList: {},
        connectInfList: [],
        cardbackInfList:{},//银行卡信息

        // radio显示
        baseInfShow: true,
        jobInfShow: true,
        connectInfShow: true,
        faceCheckShow: true,
        videoCheckShow: true,
        addtionInfShow: true,
        orderRemarkLoading: false,
        //备注
        baseInfRemark: '',
        jobInfRemark: '',
        connectInfRemark: '',
        faceCheckRemark: '',
        videoCheckRemark: '',
        addtionInfRemark: '',
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
          code: 'RESOLVED_OVERDUE',
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
        }],
        qingkuanglist : [{
          code: '0',
          name: '在校'
        }, {
          code: '1',
          name: '在家住'
        }, {
          code: '2',
          name: '在外租住'
        }],
        isActive:true,
        noActive:false,
        linkData: [],//通讯录
        dialogTableVisible: false,
        isTrueMXCall:false,
        workerSeen: true,
        studentSeen: false,
        moxieCallLogDialog: false,
        moxieCallLogLoading: false,
        userUuid: "",
        uuid: "",
        IsStudents: false,
        active: 2,
        orderProData: '',
        addRemarkForm:{},  //订单备注
        addRemarkRule:{},
        linkLoading: false,
        tagForm:{
          orderTag:'',
          remindTime: '',
          remindDate: ''
        },       //订单标签
        tagFormLoading:false,
      }
    },
    methods: {
      getRealdate(dates) {
        var myDate = new Date(dates);
      // myDate.setUTCHours(10);
      // return myDate.toLocaleString(); //获取日期与时间
      let minute=myDate.getMinutes();
      if(minute<10){
        minute="0"+minute;
      }
      let seconds=myDate.getSeconds()
      if(seconds<10){
        seconds="0"+seconds;
      }
      return myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+minute+":"+seconds
    },
    getdate(dates) {
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
      searcher() {
        if (this.isActive) {
         this.isActive=false;
         this.noActive=true;
         return;
       }
       if (!this.isActive) {
         this.isActive=true;
         this.noActive=false;
       }


     },
      getOrderPro(val) {//订单进度
        return enums.getOrderPro(val)
      },
      // 通讯录信息按钮
      addressBook(){
        this.dialogTableVisible = true;
      },
      getOrderTag(type){
        return enums.getOrderTagList(type);
      },
      formatUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      facePhotoUrlClick(){
        if(this.facePhotoUrls){
          let _photoList = [
          this.facePhotoUrls
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      handIdCardUrlClick(){
        if(this.baseInfList.handIdCardUrl){
          let _photoList = [
          this.baseInfList.handIdCardUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },

      idCardUrlClick(){
        if(this.baseInfList.idCardUrl){
          let _photoList = [
          this.baseInfList.idCardUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      getContractType(type) {
        if (type == '0') {
          return '未接';
        }
        if (type == '1') {
          return '打入';
        }
        if (type == '2') {
          return '打出';
        }
      },

      //当前订单状态
      getOrderStatus(){
        let _data={
          "uuid": this.uuid,
        }
        this.$http.post("manage/orderInfoByUuid", _data).then(response => {
          if (1 == response.body.code && response.body.data) {
            this.orderStatus=response.body.data;
            this.orderStatus.createTime=this.getdate(this.orderStatus.createTime);
            if(this.orderStatus.userRole==1){
              this.workerSeen=false;
              this.studentSeen=true;
            }else{
              this.workerSeen=true;
              this.studentSeen=false;
            }
            this.getBaseInf(this.userUuid,3);
            this.getBaseInf(this.userUuid,4);
            this.getBaseInf(this.userUuid,5);
            this.getBaseInf(this.userUuid,6);
            this.getBaseInf(this.userUuid,7);

            this.addreBook();
            this.getTop20ContactList();
          }
        })
      },
      getOrderTypeone(val){
        let re = '';
        this.qingkuanglist.forEach(function (obj) {
          if(obj.code == val){
            re = obj.name;
            return;
          }
        });
        return re;
      },
      getTop20ContactList(channel) {
         this.$http.post("manage/orderUserCallRecordMongoByUuid",{uuid:this.userUuid,dataType:1,orderNo:this.uuid,channel:channel}).then((response) =>{   //通话记录
          let {body} = response;
          if(1 == body.code && body.data){
            try{
              let result = body.data;
              if(result){
                this.isTrueMXCall = false;
              }
              this.moxieCallLogData = result;
            }catch (e){}
          }
        })
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
       getOrderTag(type) {
        let re = '';
        this.tagList.forEach(obj => {
          if (obj.code == type) {
            re = obj.name;
            return
          }
        });
        return re
      },
      //获取历史订单
      getHistoryDetail(){
        let _data={
          "uuid": this.userUuid
        }
        this.historyLoading=true;
        this.$http.post("manage/orderHistoryListByUserUuid", _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code && response.body.data) {
            let data=response.body.data;
            let i=0;
            data.forEach(e=>{
              e.borrowingCount=data.length-i;
              i++;
            })
            this.historyData=data;
          }

        })
      },
      //获取银行卡状态
      getBankStatus(val) {
        return enums.getBankStatus(val);
      },
      getOrderType(type){
        return enums.getOrderPro(type);
      },
      //枚举订单状态
      getenums(val){
        let re = '';
        enums.orderPro.forEach(function(obj) {
          if (obj.code == val) {
            re = obj.name;
            return
          }
        });
        return re
      },
      //获取订单进度
      orderSchedule(){
        this.$http.post('manage/orderSchedule', {uuid:this.uuid}).then(response => {
          let {body} = response;
          if (1 == body.code) {
            if(body.data){
              this.active = body.data.length;
              this.orderProData = body.data;
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
        });
      },
      //获取手机号码
      getUmobileNum(){
        let _data={
          "userUuid":this.userUuid,
        }
        this.$http.post("manage/userMobileByUuid", _data).then(response => {
          if (1 == response.body.code) {
            Object.assign(this.baseInfList,response.body.data);
            this.baseInfList=Object.assign({},this.baseInfList);
            if(this.baseInfList.maritalStatus==0){
              this.baseInfList.maritalStatus="未婚"
            }else if(this.baseInfList.maritalStatus==1){
              this.baseInfList.maritalStatus="已婚"
            }else {
              this.baseInfList.maritalStatus="离异"
            }
            if(this.baseInfList.sex==0){
              this.baseInfList.sex="未知"
            }else if(this.baseInfList.sex==1){
              this.baseInfList.sex="男"
            }else {
              this.baseInfList.sex="女"
            }
          }
        })
      },
      /**
       * 通讯录信息
       * @return {[type]} [description]
       */
       addreBook(){
        this.linkLoading = true;
        let _url = 'manage/orderUserContactMongoByOrderNo';
        let _data = {'orderNo': this.uuid};
        this.$http.post(_url, _data).then(response => {
          this.linkLoading = false;
          if (1 == response.body.code && response.body.data) {
            let {body} = response;
            if(1 == body.code && body.data){
              this.totalLinkMan = body.data.length;
              this.linkData = body.data;
            }
          }
        })
      },
      //通话记录
      moxieCallLog(){
        this.moxieCallLogDialog = true;
      },
      getRemarkList() {
        this.orderRemarkLoading = true;
        this.$http.post("manage/collection/manOrderRemarkList",{uuid:this.uuid}).then(response =>{
          let {body} = response;
          if(1 == body.code && body.data){
            this.orderRemarkList= body.data;
          }
          this.orderRemarkLoading = false;
        }).catch(e =>{this.orderRemarkLoading = false})
      },
      //获取用户基本信息
      getBaseInf(userUuid,type){
        let _data={
          "orderNo": this.uuid,
          "type": type,
        }
        let urlss="manage/orderUserDataMongo";
        this.$http.post(urlss, _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code && response.body.data) {
            var data=response.body.data;

            if(type==2){
              Object.assign(this.baseInfList,response.body.data);
              this.baseInfList=Object.assign({},this.baseInfList);
              this.getUmobileNum();
            }
            if(type==3){
              this.baseInfList=data;
              this.getBaseInf(this.userUuid,2);
            }
            if(type==4){
              this.jobInfList=data;
            }
            if(type==5){
              this.connectInfList=data;
            }
            if(type==6){
              if(data[0].attachmentType==2){
                this.facePhotoUrls=data[0].attachmentUrl;
                this.playerOptions.sources[0].src=data[1].attachmentUrl;
              }else {
                this.playerOptions.sources[0].src=data[0].attachmentUrl;
                this.facePhotoUrls=data[1].attachmentUrl;


              }
            }

            if(type==7){
              this.cardbackInfList=data;
            }
          }
        })
      },
      saveTagForm(){
        if(!this.tagForm.orderTag){
          this.$message.error("请选择标签");
          return false;
        }
        if(!this.addRemarkForm.remark || this.addRemarkForm.remark.length > 300){
          this.$message.error("请正确填写备注");
          return false;
        }
        if(!this.tagForm.remindDate && this.tagForm.remindTime){
          this.$message.error('请先选择日期');
          return false;
        }
        if(this.tagForm.remindDate && !this.tagForm.remindTime){
          this.$message.error('请选择具体时间');
          return false;
        }
        let _data = {
          orderNo:this.uuid,
          orderTag:this.tagForm.orderTag,
          userUuid:this.userUuid,
          remark:this.addRemarkForm.remark + ' ['+DataUtil.userName()+'|'+DataUtil.formatUnixTime(new Date())+']',
          createUser: DataUtil.id(),
          updateUser: DataUtil.id(),
          alertTime: this.getRealdate(this.tagForm.remindDate ? (this.tagForm.remindDate.setHours(this.tagForm.remindTime.split(':')[0])) : ''),
          type: 2,
          langue : 1
        };
        this.tagFormLoading = true;
        this.$http.post("manage/inserOrUpdateManOrderRemark",_data).then(response =>{
          let {body} = response;
          if(1 == body.code){
            window.location.reload();
          }
          this.tagFormLoading = false;
        })
      },
    },
    mounted: function () {

     this.uuid = this.$route.query['uuid']||'';
     this.userUuid = this.$route.query['userUuid']||'';
     this.sessionId=DataUtil.sid();
     this.getOrderStatus();
     this.getHistoryDetail();
     this.orderSchedule();
     this.getRemarkList();
   }
 }
 </script>

 <style>
 .reviewTable {
  width: 80%;
  border-spacing: 0;
  border: 1px solid gray;
  margin: 20px auto;
}
.reviewTable td {
  text-align: center;
  border: 1px solid gray;
  height: 40px;
  line-height: 40px;

  width: 50%;
  word-wrap:break-word;
}
.videos {
  width: 80%;
  margin: 20px auto;
}
/*侧边框布局*/
.containers {
  width: 100%;
  /*height: 400px;*/
  display: flex;

}
.containers .asides {
  flex: 6;

}
.containers .mains {
  flex: 4;
  margin-left: 40px;
}
.other_remark {
  width: 100%;
}
.mains .smallRemark {
  width: 100%;
}
.asides table {
  border-spacing: 0;
  border: 1px solid #A9A9A9 ;
  border-radius: 2px;
}
.asides table td {
  border: .5px solid #efefef;
  word-wrap:break-word;
  line-height: 20px;
  padding: 5px;
}
table td img {
  width: 100%;
}
.aside_title {
  font-weight: 400;
  line-height: 40px;
  font-size: 16px;
}
.question_radio {
  padding-bottom: 30px;
  margin: 5px 10px;
}
.question_radio .radio_box {
  /*margin-bottom: -30px;*/
  line-height: 20px;
  float: right;
}
.addreBook {
  text-align: center;
  width: 40px;
}
/* 标题 */
.main-title{
  font-size: 22px;
  margin-top: -15px;
  margin-bottom: 15px;
}
.one-title{
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
}
.two-title{
  font-size: 13px;
  color: #888;
  margin: 10px 0
}
.subtitle{
  font-size: 13px;
  color: #888;
}
.orderBox .el-row {
  margin: 15px 30px;
}
.orderBox .el-col span{
  margin-right: 10px;
}
.orderBox .el-button span,.orderBox .el-tag span{
  margin-right: 0;
}
.orderBox .box-card .el-button{
  margin-right: 5px;
}
.vadio {
  float: left;
  margin-left:60px;
  transform: rotate(-180deg);
  -webkit-transform: rotate(-180deg);
}
.vadios {
 float: left;
 margin-right:60px;
}
.orderBox .grid-content {
  line-height: 28px;
}

.divid-line{
  height: 10px;
  background: #f1f2f7;
}
/*借款信息*/
.loanDetail{
  margin: 0 30px 15px;
  width: 94%;
  max-height:250px;
}
/*依图识别*/
.yituInfo{
  display: block;
  text-align: center;
  margin-top: 10px;
}
/*征信*/
.orderBox .box-card{
  height: 225px;
}
.JXLBox{
  border: 1px solid #ccc;
  padding: 10px
}
.JXLBox div{
  padding: 5px;
}

.orderBox .el-table .info-row {
  background: #e2f0e4;
}

.orderBox .el-table .red-row{
  background: #F33;
}
.redInfo{
  color: #F33;
}

.line-height .el-col{
  margin-bottom: 10px;
}
.faceCheck {
  margin: 0 auto;
  overflow: hidden;
}
.faceCheck .faceImg{
  width: 45%;
  height: 350px;
  overflow: hidden;
  margin: 1.5%;
  float: left;
  text-align: center;
}
.faceCheck .faceImg img {
  margin: 0 auto;
  display: block;
  width: 90%;
  height: 90%;
  /*    border: .5px solid #F1F2F7;
  border-radius: 5px;*/
}
.faceImgTop {
  width: 45%;
  height: 250px;
  /*overflow: hidden;*/
  margin: 1.5%;
  float: left;
  text-align: center;
}
.faceImgTop img{
  margin: 0 auto;
  height: 200px;
  display: block;
  max-height: 100%;
  max-width: 100%;
  min-width: 65%;
  min-height: 65%;
  border: .5px solid #F1F2F7;
  border-radius: 5px;
}
.faceImgBottom {
  width: 90%;
  height: 350px;
  overflow: hidden;
  margin: 2.5%;
  float: left;
  text-align: center;

}
.faceImgBottom img{
  margin: 0 auto;
  display: block;
  height: 300px;
  min-width: 80%;
  min-height: 80%;
  border: .5px solid #F1F2F7;
  border-radius: 5px;
}

#btnForm{
  width: 90%;
  margin: 0 auto
}
#studentsInf td img{
  max-width: 300px;
  max-height: 200px;
}
.lastTitle {
  margin-right: 40px;
  float: left;
  font-weight: 400;
  line-height: 40px;
  font-size: 16px;
}
.reviewTable {
  width: 60%;
  margin: 0 auto;
}
table td img {
  width: 100%;
}
.faceImgTop .handleImg {
  width: 40%;
  transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
}
</style>
