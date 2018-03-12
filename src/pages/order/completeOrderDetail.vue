/**
* Created by alan on 2017/3/10.
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
        <div><span>下单时间:</span><span>{{orderStatus.createTime}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>申请次数:</span><span><el-tag :type="orderStatus.orderStep==0?'success':'primary'"><span>{{"第"+orderStatus.orderStep+"次申请"}}</span></el-tag></span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>申请金额:</span><span>{{orderStatus.amountApply}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>申请时间:</span><span>{{getdate(orderStatus.applyTime)}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>申请期限:</span><span>{{orderStatus.borrowingTerm}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>初审人员:</span><span>{{orderStatus.firstChecker}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>复审人员:</span><span>{{orderStatus.secondChecker}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>借款用途:</span><span>{{orderStatus.borrowUse}}</span></div>
      </el-col>
    </el-row>
    <div class="divid-line"></div>
    <el-row>
      <div class="one-title">审核意见</div>
      <table class="reviewTable">
        <tr>
          <td>初审意见</td>
          <td>{{firstCheckSuggest}}</td>
          <td>{{firstReviewSuggest}}</td>
        </tr>
        <tr>
          <td>复审意见</td>
          <td></td>
          <td>{{secondReviewSuggest}}</td>
        </tr>
      </table>
    </el-row>
    <div class="divid-line"></div>
    <el-row>
      <div class="one-title">订单进度</div>
      <el-steps :data="orderProData" :active="active" :align-center="true" finish-status="success">
        <el-step class="ten" v-for="item in orderProData" :key="item.status" :title="getOrderPro(item.status)">
          <div slot="description" class="ten">
          {{getdate(item.createTime)}}</div>
        </el-step>
      </el-steps>

    </el-row>
    <div class="divid-line"></div>
    <el-row>
      <div class="one-title">历史订单记录</div>
      <el-table :data="historyData" v-loading="historyLoading" @row-click="rowClick" size="large">
        <el-table-column prop="borrowingCount" width="120" label="申请次数"></el-table-column>
        <el-table-column prop="createTime" width="240" label="申请时间">
          <template scope="scope">
            <span>{{getdate(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uuid" width="240" label="订单编号"></el-table-column>
        <el-table-column prop="status" width="120" label="审核结果">
          <template scope="scope">
            <span>{{getOrderPro(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="审核意见"></el-table-column>
      </el-table>
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
              <td>借款人身份</td>
              <td>已工作</td>
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
              <td>子女数量</td>
              <td>{{baseInfList.childrenAmount}}</td>
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
          <div class="faceCheck">
            <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.idCardUrl"  @click.stop="idCardUrlClick"><br>身份证正面照</div>
          </div>
        </div>
        <div class="mains">
          <div class="check_rule">
            <el-form label-width="80px">
              <el-form-item label="审核规则">
              </el-form-item>
            </el-form>
            <div class="question_radio">
              <div class="question_text">1、身份证信息不清晰？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[0].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">2、身份证关键信息丢失？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[1].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">3、身份证照片非原件（如复印件/翻拍照片/视频截图等）？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[2].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">4、身份证照片为政府提供的证明？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[3].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">5、用户填写的姓名和身份证姓名不同（eg:Black Smith,White Smith)？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[4].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">6、用户填写的姓名和身份证姓名个别字母不同（eg:Danny Smith ,Danniel Smith/lucy,lucky)？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[5].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">7、用户填写的性别与身份证信息的性别不一致？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[6].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">8、用户填写的婚姻与身份证婚姻不一致？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[7].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">9、出身年月为偶数但身份证背景为红色/出身年月为奇数但身份证背景为蓝色？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[8].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">10、居住地址所填内容非地址（eg:no 3q/768899668等)？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[9].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">11、居住地址没有精确到的**路/xx门牌号？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[10].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">12、google不到居住地址？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[11].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">13、居住地址是公共场所（例如：填写某商场/政府 /公园或广场等)？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[12].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">14、居住地址为假地址（例如该地址不可能存在建筑/居民区)？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[13].ruleResult"></el-checkbox>
              </div>
            </div>
          </div>
          <div class="other_remark smallRemark">
            <div class="aside_title">其他备注</div>
            <el-input
              type="textarea"
              :rows="12"
              placeholder=""
              :disabled="baseInfShow"
              v-model="baseInfRemark"
              class = 'textarear'
            >
            </el-input>
          </div>
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
              <td>公司地址</td>
              <td>{{jobInfList.province}}{{jobInfList.city}}{{jobInfList.bigDirect}}{{jobInfList.smallDirect}}</td>
            </tr>
            <tr>
              <td>详细地址</td>
              <td>{{jobInfList.detailed}}</td>
            </tr>
            <tr>
              <td>公司电话</td>
              <td>{{jobInfList.companyPhone}}</td>
            </tr>
          </table>
        </div>
        <div class="mains">
          <div class="check_rule">
            <el-form label-width="80px">
              <el-form-item label="审核规则">
              </el-form-item>
            </el-form>
            <div class="question_radio">
              <div class="question_text">1、公司名称明显乱填（eg:no 3 q/AA BB等)？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[0].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">2、google不到公司名称?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[1].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">3、公司名称与公司地址不匹配？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[2].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">4、公司地址所填内容非地址（eg:no 3q/1122342124等)</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[3].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">5、google不到公司地址？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[4].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">6、公司电话造假（例如：021-000000000/021-11111000等)?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[5].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">7、google不到公司电话？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[6].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">8、公司名与公司电话不匹配?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[7].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">9、职位跟公司不匹配（例如：职位是教师但公司名称不是学校）？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[8].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">10、收入跟职位不匹配?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[9].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">11、居住地址跟公司地址相同？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[10].ruleResult"></el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="containers" v-if="studentSeen">
        <div class="asides">
          <div class="one-title">学校信息</div>
          <table id="studentsInf" border='.1px' width="100%" style="table-layout:fixed;">
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
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.studentCardUrl" alt="" @click.stop="studentCardUrlClick"></td>
            </tr>
            <tr>
              <td>奖学金照片</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.scholarshipUrl" alt="" @click.stop="scholarshipUrlClick"></td>
            </tr>
            <tr>
              <td>英语证书照片</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.englishUrl" alt="" @click.stop="englishUrlClick"></td>
            </tr>
            <tr>
              <td>计算机证书</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.ComputerUrl" alt="" @click.stop="ComputerUrlClick"></td>
            </tr>
            <tr>
              <td>校园卡照片</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.schoolCardUrl" alt="" @click.stop="schoolCardUrlClick"></td>
            </tr>
            <tr>
              <td>其他大赛照片</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.otherCertificateUrl" alt="" @click.stop="otherCertificateUrlClick"></td>
            </tr>
          </table>
        </div>
        <div class="mains">
          <div class="check_rule">
            <el-form label-width="80px">
              <el-form-item label="审核规则">
              </el-form-item>
            </el-form>
            <div class="question_radio">
              <div class="question_text">1、学生证照片不清晰？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList1[0].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">2.学生证头像与身份证照片不一致?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList1[1].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">3.学生证其它信息与身份证信息不一致?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList1[2].ruleResult"></el-checkbox>

              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">4.学生证照片疑似造假?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList1[3].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">5.学生证照片非信息面?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList1[4].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">6.学校地址不详细？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList1[5].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">7.学校名称为该校简称？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList1[6].ruleResult"></el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="other_remark">
        <div class="aside_title">其他备注</div>

        <el-input
          type="textarea"
          :rows="4"
          placeholder=""
          :disabled="jobInfShow"
          v-model="jobInfRemark"
          class = 'textarear'
        >
        </el-input>
      </div>
    </el-row>
    <div class="divid-line"></div>
    <!-- 联系人信息 connectInf-->
    <el-row>
      <div class="containers">
        <div class="asides">
          <div class="one-title">联系人信息</div>
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
        <div class="mains">
          <div class="check_rule">
            <el-form label-width="80px">
              <el-form-item label="审核规则">
              </el-form-item>
            </el-form>
            <div class="question_radio">
              <div class="question_text">1、联系人姓名不符合要求（例如：姓名为AA/DOG/XXX客服/警察局/医院等？</div>
              <div class="radio_box">
                <el-checkbox :disabled="connectInfShow" v-model="connectRuleList[0].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">2、联系人可能是本人（备注为自己/第X个号等）？</div>
              <div class="radio_box">
                <el-checkbox :disabled="connectInfShow" v-model="connectRuleList[1].ruleResult"></el-checkbox>
              </div>
            </div>
          </div>
          <div class="other_remark smallRemark">
            <div class="aside_title">其他备注</div>
            <el-input
              type="textarea"
              :rows="4"
              placeholder=""
              :disabled="connectInfShow"
              v-model="connectInfRemark"
              class = 'textarear'>
            </el-input>
          </div>
        </div>
      </div>
    </el-row>
    <div class="divid-line"></div>
    <!-- 人脸识别 faceCheck-->
    <el-row>
      <div class="containers">
        <div class="asides">
          <div class="one-title">人脸识别</div>
          <span class="titlePhone">身份证号码：  {{baseInfList.idCardNo}}</span>
          &nbsp;&nbsp;
          <span class="titlePhone">活体识别分：  {{pairVerifySimilarity}}</span>
          <div class="faceCheck">
            <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="facePhotoUrls" @click.stop="facePhotoUrlClick"><br>活体识别截图</div>
            <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img class="handleImg" :src="baseInfList.handIdCardUrl"  @click.stop="handIdCardUrlClick"><br>手持身份证照片</div>
            <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.idCardUrl"  @click.stop="idCardUrlClick"><br>身份证正面照</div>
          </div>
        </div>
        <div class="mains">
          <div class="check_rule">
            <el-form label-width="80px">
              <el-form-item label="审核规则">
              </el-form-item>
            </el-form>
            <div class="question_radio">
              <div class="question_text">1、身份证严重破损/信息不全？ </div>
              <div class="radio_box">
                <el-checkbox :disabled="faceCheckShow" v-model="faceCheckRuleList[0].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">2、非身份证原件？ </div>
              <div class="radio_box">
                <el-checkbox :disabled="faceCheckShow" v-model="faceCheckRuleList[1].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">3、手持照片看不清人脸（非身份证）？ </div>
              <div class="radio_box">
                <el-checkbox :disabled="faceCheckShow" v-model="faceCheckRuleList[2].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">4、手持照片人脸（非身份证）与活体人脸不一致？ </div>
              <div class="radio_box">
                <el-checkbox :disabled="faceCheckShow" v-model="faceCheckRuleList[3].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="other_remark smallRemark">
              <div class="aside_title">其他备注</div>
              <el-input
                type="textarea"
                :rows="9"
                placeholder=""
                :disabled="faceCheckShow"
                v-model="faceCheckRemark"
                class = 'textarear'>
              </el-input>
            </div>
          </div>
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
        <div class="mains">
          <div class="check_rule">
            <el-form label-width="80px">
              <el-form-item label="审核规则">
              </el-form-item>
            </el-form>
            <div class="question_radio">
              <div class="question_text">1、视频声音是他人代读？</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[0].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">2、视频旁边有他人指导？</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[1].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">3、视频非用户本人?</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[2].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">4、申请人性别与视频中人不相符？</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[3].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">5、视频中人脸有严重毁容？</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[4].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">6、视频中人有过分裸露肢体？</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[5].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">7、视频不清晰或者背光看不清脸?</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[6].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">8、视频出现假人脸（出现照片，身份证等）?</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[7].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">9、视频未出现完整真人脸（出现天花板，人脸未完全入境等）?</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[8].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">10、视频完全未读?</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[9].ruleResult"></el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="other_remark">
        <div class="aside_title">其他备注</div>
        <el-input
          type="textarea"
          :rows="4"
          :disabled="videoCheckShow"
          placeholder=""
          v-model="videoCheckRemark"
          class = 'textarear'>
        </el-input>
      </div>
      </div>
    </el-row>
    <div class="divid-line"></div>
    <!-- 补充信息 addtionInf-->
    <el-row>
      <div class="containers">
        <div class="asides">
          <div class="one-title">补充信息</div>
          <div class="faceCheck">
            <div class="faceImg">
              <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[0].attachmentUrl" @click.stop="attachmentUrl0"><br>{{addtionInfList[0].attachmentName}}
            </div>
            <div class="faceImg">
              <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[1].attachmentUrl" @click.stop="attachmentUrl1"><br>{{addtionInfList[1].attachmentName}}
            </div>
            <div class="faceImg">
              <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[2].attachmentUrl" @click.stop="attachmentUrl2"><br>{{addtionInfList[2].attachmentName}}
            </div>
            <div class="faceImg">
              <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[3].attachmentUrl" @click.stop="attachmentUrl3"><br>{{addtionInfList[3].attachmentName}}
            </div>
            <div class="faceImg" v-if="workerSeen">
              <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[4].attachmentUrl" @click.stop="attachmentUrl4"><br>{{addtionInfList[4].attachmentName}}
            </div>
            <div class="faceImg">
              <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[5].attachmentUrl" @click.stop="attachmentUrl5"><br>{{addtionInfList[5].attachmentName}}
            </div>
          </div>
          <div class="mains">
            <div class="check_rule">
              <el-form label-width="80px">
                <el-form-item label="审核规则">
                </el-form-item>
              </el-form>
              <div class="question_radio">
                <div class="question_text">1、工资单上的公司名称和所填的公司名称一致？</div>
                <div class="radio_box">
                  <el-checkbox :disabled="addtionInfShow" v-model="otherCheckRuleList[0].ruleResult"></el-checkbox>
                </div>
              </div>
              <div class="question_radio">
                <div class="question_text">2、工资单上的薪资与所填的收入一致（上下浮动IDR200,000以内）？</div>
                <div class="radio_box">
                  <el-checkbox :disabled="addtionInfShow" v-model="otherCheckRuleList[1].ruleResult"></el-checkbox>
                </div>
              </div>
              <div class="question_radio">
                <div class="question_text">3、工资单的日期距申请日期小于60天?</div>
                <div class="radio_box">
                  <el-checkbox :disabled="addtionInfShow" v-model="otherCheckRuleList[2].ruleResult"></el-checkbox>
                </div>
              </div>
              <div class="question_radio">
                <div class="question_text">4、驾驶证照片与身份证照片一致？</div>
                <div class="radio_box">
                  <el-checkbox :disabled="addtionInfShow" v-model="otherCheckRuleList[3].ruleResult"></el-checkbox>
                </div>
              </div>
            </div>

            <div class="other_remark smallRemark">
              <el-input
                type="textarea"
                :rows="6"
                placeholder=""
                :disabled="addtionInfShow"
                v-model="addtionInfRemark"
                class = 'textarear'>
              </el-input>
            </div></div>
        </div>
      </div>
    </el-row>

<div class="divid-line"></div>
<!-- 电核模块 -->
<el-row>
  <div class="one-title">电核模块<span class="titlePhone">用户手机号码：  {{baseInfList.mobileNumberDES}}</span><span class="titlePhone">姓名：  {{baseInfList.realName}}</span>
    <span class="titlePhone">性别：  {{baseInfList.sex}}</span>
    <span class="titlePhone">公司电话：  {{jobInfList.companyPhone}}</span>
  </div>
  <el-row>
    <span class="two-title">公司电核 &nbsp;</span>
    <template>
      <el-table
      :data="comPhoneChecktableData"
      style="width: 100%">
      <el-table-column
      type="index"
      label="序号"
      width="80">
    </el-table-column>
    <el-table-column
    prop="startTime"
    label="开始时间"
    width="160">
  </el-table-column>
  <el-table-column
  prop="endTime"
  label="结束时间"
  width="160">
</el-table-column>
<el-table-column
prop="burningTime"
label="时长"
width="120">
</el-table-column>
<el-table-column
prop="teleReviewResult"
label="电核结果"
width="220">
</el-table-column>
<el-table-column
prop="remark"
label="备注信息"
width="220">
</el-table-column>
<el-table-column
prop="workYear"
label="工作年限">
<template scope="scope">
  <span>{{getWorkType(scope.row.workYear)}}</span>
</template>
</el-table-column>
<el-table-column
prop="alertTime"
label="下次提醒时间"
width="160">
</el-table-column>
<el-table-column prop="updateTime" label="添加备注时间" width="200">
</el-table-column>
</el-table>
</template>
<!-- 电核弹窗 -->
</el-row>
<div class="divid-line"></div>
<el-row>
  <el-col :span="2"><div class="grid-content bg-purple">问题一：</div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[0].question}}</div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple">正确答案：</div></el-col>
  <el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[0].question === '请问您身份证上的居住地址是哪里?'">
    <img :src="phoneCheckQuestions[0].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[0].answer)" alt="" width="150px" height="100px">
  </div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[0].answer}}</div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple">用户答案：</div></el-col>
  <el-col :span="5">
    <div class="grid-content bg-purple">
      <template>
        <el-radio v-model="phoneRadio1" label="1" disabled >正确</el-radio>
        <el-radio v-model="phoneRadio1" label="0" disabled >错误</el-radio>
      </template>
    </div>
  </el-col>
</el-row>
<el-row>
  <el-col :span="2"><div class="grid-content bg-purple">问题二：</div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[1].question}}</div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple">正确答案：</div></el-col>
  <el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[1].question === '请问您身份证上的居住地址是哪里?'">
    <img :src="phoneCheckQuestions[1].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[1].answer)" alt="" width="150px" height="100px">
  </div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[1].answer}}</div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple">用户答案：</div></el-col>
  <el-col :span="5">
    <div class="grid-content bg-purple">
      <template>
        <el-radio v-model="phoneRadio2" label="1" disabled >正确</el-radio>
        <el-radio v-model="phoneRadio2" label="0" disabled >错误</el-radio>
      </template>
    </div>
  </el-col>
</el-row>
<el-row>
  <el-col :span="2"><div class="grid-content bg-purple">问题三：</div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[2].question}}</div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple">正确答案：</div></el-col>
  <el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[2].question === '请问您身份证上的居住地址是哪里?'">
    <img :src="phoneCheckQuestions[2].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[2].answer)" alt="" width="150px" height="100px">
  </div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[2].answer}}</div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple">用户答案：</div></el-col>
  <el-col :span="5">
    <div class="grid-content bg-purple">
      <template>
        <el-radio v-model="phoneRadio3" label="1" disabled >正确</el-radio>
        <el-radio v-model="phoneRadio3" label="0" disabled >错误</el-radio>
      </template>
    </div>
  </el-col>
</el-row>
<el-row>
  <span class="two-title">本人审核 &nbsp;</span>
  <template>
    <el-table
    :data="phoneChecktableData"
    style="width: 100%">
    <el-table-column
    type="index"
    label="序号"
    width="80">
  </el-table-column>
  <el-table-column
  prop="startTime"
  label="开始时间"
  width="160">
</el-table-column>
<el-table-column
prop="endTime"
label="结束时间"
width="160">
</el-table-column>
<el-table-column
prop="burningTime"
label="时长"
width="120">
</el-table-column>
<el-table-column
prop="teleReviewResult"
label="电核结果"
width="220">
</el-table-column>
<el-table-column
prop="remark"
label="备注信息"
width="220">
</el-table-column>
<el-table-column
prop="alertTime"
label="下次提醒时间"
width="160">
</el-table-column>
<el-table-column prop="updateTime" label="添加备注时间" width="220">
</el-table-column>
</el-table>
</template>
</el-row>
</el-row>
<!-- 催收记录 -->
<div class="divid-line"></div>
<el-row>
  <h1 class="one-title">催收记录</h1>
  <div style="margin-bottom: 10px"></div>
  <el-table :data="orderRemarkList" v-loading="orderRemarkLoading" max-height="200">
    <el-table-column type="index" label="序号" width="100">
    </el-table-column>
    <el-table-column prop="createTime" label="添加时间" width="220">
      <template scope="scope">{{getdate(scope.row.createTime)}}</template>
    </el-table-column>
    <el-table-column prop="remark" label="备注">
    </el-table-column>
    <el-table-column prop="orderTag" label="标签" width="100">
     <template scope="scope">{{getOrderTag(scope.row.orderTag)}}</template>
   </el-table-column>
   <el-table-column prop="alertTime" label="下次提醒时间" width="220">
    <template scope="scope">{{getdate(scope.row.alertTime)}}</template>
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

export default {
  components: {
    mlPhotoBox,
    videoPlayer
  },
  data () {
    return {
      playerOptions: {
        muted: false,
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
      historyLoading: false,
      facePhotoUrls:'',
      orderRemarkLoading:false,
      orderRemarkList:[],
      pairVerifySimilarity:'',

      orderStatus: {
          borrowingCount: '',//借款次数
          createTime: '',//申请时间
          userUuid: '', //订单编号;
          firstChecker:'',
          borrowUse:''
        },
        status: '', //审核结果
        remark: '', //审核意见

        //电话
        comPhoneChecktableData:[],
        phoneCheckQuestions: [{"question":"","answer":"","result":"1"},
        {"question":"","answer":"","result":"1"}
        ,{"question":"","answer":"","result":"1"}],
        phoneRadio1: "1",
        phoneRadio2: "1",
        phoneRadio3: "1",
        phoneChecktableData: [],
        facePhotoUrls:'',
        phoneCheckDialogVisible: false,
        phoneCheckTextarea: '',
        phoneCheckDate: '',
        isActive:true,
        noActive:false,
        phoneCheckStartVif: true,
        phoneCheckEndVif: false,
        recordStartTime: '',
        recordEndTime: '',
        phoneCheckDialogLoading: false,
        phoneCheckId: '',
        phoneCheckIndex: '',
        textarea: '',
        totalLinkMan: 0,//通讯录个数
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

        // radio显示
        baseInfShow: true,
        jobInfShow: true,
        connectInfShow: true,
        faceCheckShow: true,
        videoCheckShow: true,
        addtionInfShow: true,
        //备注
        baseInfRemark: '',
        jobInfRemark: '',
        connectInfRemark: '',
        faceCheckRemark: '',
        videoCheckRemark: '',
        addtionInfRemark: '',
        // 审核规则
      baseRuleList: [{
        "ruleCount":1,
        "ruleLevel":3,
        "ruleResult":false,
        "description":'1、身份证信息不清晰？'
      },
        {
          "ruleCount":2,
          "ruleLevel":2,
          "ruleResult":false,
          "description":'2、身份证关键信息丢失？'
        },
        {
          "ruleCount":3,
          "ruleLevel":3,
          "ruleResult":false,
          "description":'3、身份证照片非原件（如复印件/翻拍照片/视频截图等）？'
        },
        {
          "ruleCount":4,
          "ruleLevel":4,
          "ruleResult":false,
          "description":'4、身份证照片为政府提供的证明？'
        },{
          "ruleCount":5,
          "ruleLevel":2,
          "ruleResult":false,
          "description":'5、用户填写的姓名和身份证姓名不同（eg:Black Smith,White Smith)？'
        },{
          "ruleCount":6,
          "ruleLevel":3,
          "ruleResult":false,
          "description":'6、用户填写的姓名和身份证姓名个别字母不同（eg:Danny Smith ,Danniel Smith/lucy,lucky)？ '
        },{
          "ruleCount":7,
          "ruleLevel":2,
          "ruleResult":false,
          "description":'7、用户填写的性别与身份证信息的性别不一致？'
        },{
          "ruleCount":8,
          "ruleLevel":2,
          "ruleResult":false,
          "description":'8、用户填写的婚姻与身份证婚姻不一致？'
        },{
          "ruleCount":9,
          "ruleLevel":1,
          "ruleResult":false,
          "description":'9、出身年月为偶数但身份证背景为红色/出身年月为奇数但身份证背景为蓝色？'
        },{
          "ruleCount":10,
          "ruleLevel":2,
          "ruleResult":false,
          "description":'10、居住地址所填内容非地址（eg:no 3q/768899668等)？'
        },{
          "ruleCount":11,
          "ruleLevel":3,
          "ruleResult":false,
          "description":'11、居住地址没有精确到的**路/xx门牌号？'
        },{
          "ruleCount":12,
          "ruleLevel":5,
          "ruleResult":false,
          "description":'12、google不到居住地址？'
        },{
          "ruleCount":13,
          "ruleLevel":4,
          "ruleResult":false,
          "description":'13、居住地址是公共场所（例如：填写某商场/政府 /公园或广场等)？'
        },{
          "ruleCount":14,
          "ruleLevel":2,
          "ruleResult":false,
          "description":'14、居住地址为假地址（例如该地址不可能存在建筑/居民区)？'
        }],
      jobRuleList: [{
        "ruleCount":1,
        "ruleLevel":2,
        "ruleResult":false,
        "description":'1、公司名称明显乱填（eg:no 3 q/AA BB等)？'
      },{
        "ruleCount":2,
        "ruleLevel":5,
        "ruleResult":false,
        "description":'2、google不到公司名称?'
      },
        {
          "ruleCount":3,
          "ruleLevel":4,
          "ruleResult":false,
          "description":'3、公司名称与公司地址不匹配？'
        },{
          "ruleCount":4,
          "ruleLevel":2,
          "ruleResult":false,
          "description":'4、公司地址所填内容非地址（eg:no 3q/1122342124等)'
        },
        {
          "ruleCount":5,
          "ruleLevel":5,
          "ruleResult":false,
          "description":'5、google不到公司地址？'
        },{
          "ruleCount":6,
          "ruleLevel":2,
          "ruleResult":false,
          "description":'6、公司电话造假（例如：021-000000000/021-11111000等)?'
        },
        {
          "ruleCount":7,
          "ruleLevel":5,
          "ruleResult":false,
          "description":'7、google不到公司电话？'
        },{
          "ruleCount":8,
          "ruleLevel":4,
          "ruleResult":false,
          "description":'8、公司名与公司电话不匹配?'
        },
        {
          "ruleCount":9,
          "ruleLevel":4,
          "ruleResult":false,
          "description":'9、职位跟公司不匹配（例如：职位是教师但公司名称不是学校）？'
        },{
          "ruleCount":10,
          "ruleLevel":4,
          "ruleResult":false,
          "description":'10、收入跟职位不匹配?'
        },
        {
          "ruleCount":11,
          "ruleLevel":4,
          "ruleResult":false,
          "description":'11、居住地址跟公司地址相同？'
        }],
      jobRuleList1: [{
        "ruleCount":1,
        "ruleLevel":3,
        "ruleResult":false,
        "description":'1、学生证照片不清晰？'
      },{
        "ruleCount":2,
        "ruleLevel":1,
        "ruleResult":false,
        "description":'2、学生证头像与身份证照片不一致?'
      },{
        "ruleCount":3,
        "ruleLevel":4,
        "ruleResult":false,
        "description":'3.学生证其它信息与身份证信息不一致? '
      },{
        "ruleCount":4,
        "ruleLevel":1,
        "ruleResult":false,
        "description":'学生证照片疑似造假?'
      },{
        "ruleCount":5,
        "ruleLevel":3,
        "ruleResult":false,
        "description":'5.学生证照片非信息面?'
      },{
        "ruleCount":6,
        "ruleLevel":3,
        "ruleResult":false,
        "description":'6.学校地址不详细？'
      },{
        "ruleCount":7,
        "ruleLevel":3,
        "ruleResult":false,
        "description":'7.学校名称为该校简称？'
      }],
      connectRuleList: [{
        "ruleCount":1,
        "ruleLevel":2,
        "ruleResult":false,
        "description":'1、联系人姓名不符合要求（例如：姓名为AA/DOG/XXX客服/警察局/医院等？'
      },
        {
          "ruleCount":2,
          "ruleLevel":5,
          "ruleResult":false,
          "description":'2、联系人可能是本人（备注为自己/第X个号等）？'
        }],
      faceCheckRuleList: [{
        "ruleCount":1,
        "ruleLevel":1,
        "ruleResult":false,
        "description":'1、身份证严重破损/信息不全？ '
      },{
        "ruleCount":2,
        "ruleLevel":1,
        "ruleResult":false,
        "description":'2、非身份证原件？ '
      },{
        "ruleCount":3,
        "ruleLevel":3,
        "ruleResult":false,
        "description":'3、手持照片看不清人脸（非身份证）？ '
      },{
        "ruleCount":4,
        "ruleLevel":1,
        "ruleResult":false,
        "description":'4、手持照片人脸（非身份证）与活体人脸不一致？ '
      }],
      videoCheckRuleList: [{
        "ruleCount":1,
        "ruleLevel":1,
        "ruleResult":false,
        "description":'1、视频声音是他人代读？'
      },{
        "ruleCount":2,
        "ruleLevel":1,
        "ruleResult":false,
        "description":'2、视频旁边有他人指导？'
      },{
        "ruleCount":3,
        "ruleLevel":1,
        "ruleResult":false,
        "description":'3、视频非用户本人?'
      },{
        "ruleCount":4,
        "ruleLevel":1,
        "ruleResult":false,
        "description":'4、申请人性别与视频中人不相符？'
      },{
        "ruleCount":5,
        "ruleLevel":1,
        "ruleResult":false,
        "description":'5、视频中人脸有严重毁容？'
      },{
        "ruleCount":6,
        "ruleLevel":1,
        "ruleResult":false,
        "description":'6、视频中人有过分裸露肢体？'
      },{
        "ruleCount":7,
        "ruleLevel":3,
        "ruleResult":false,
        "description":'7、视频不清晰或者背光看不清脸?'
      },{
        "ruleCount":8,
        "ruleLevel":1,
        "ruleResult":false,
        "description":'8、视频出现假人脸（出现照片，身份证等）?'
      },{
        "ruleCount":9,
        "ruleLevel":3,
        "ruleResult":false,
        "description":'9、视频未出现完整真人脸（出现天花板，人脸未完全入境等）?'
      },{
        "ruleCount":10,
        "ruleLevel":3,
        "ruleResult":false,
        "description":'10、视频完全未读?'
      }],
      otherCheckRuleList: [{
        "ruleCount":1,
        "ruleLevel":5,
        "ruleResult":false,
        "description":'1、工资单上的公司名称和所填的公司名称一致？'
      },{
        "ruleCount":2,
        "ruleLevel":5,
        "ruleResult":false,
        "description":'2、工资单上的薪资与所填的收入一致（上下浮动IDR200,000以内）？'
      },{
        "ruleCount":3,
        "ruleLevel":5,
        "ruleResult":false,
        "description":'3、工资单的日期距申请日期小于60天?'
      },{
        "ruleCount":4,
        "ruleLevel":1,
        "ruleResult":false,
        "description":'4、驾驶证照片与身份证照片一致？'
      }],
        addtionInfList:[{
          attachmentName:"信用卡",
          attachmentType:4,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"驾驶证",
          attachmentType:5,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"税卡",
          attachmentType:6,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"家庭卡",
          attachmentType:7,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"工资卡",
          attachmentType:8,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"银行卡流水",
          attachmentType:9,
          attachmentUrl: require("../../assets/none.png")
        }],
        workYear:[{
          code: 'DEFALUT',
          name: '',
          value:'0'
        },{
          code: 'WEIZHI',
          name: '未知',
          value:'1'
        },{
          code: 'THREEMONTH',
          name: '3个月以下',
          value:'2'
        },{
          code: 'THREE_SIX_MONTH',
          name: '3-6个月',
          value:'3'
        },{
          code: 'SIX_TWELE_MONTH',
          name: '6-12个月',
          value:'4'
        },{
          code: 'ONE_THREE_YEAR',
          name: '1-3年',
          value:'5'
        },{
          code: 'THREE_YEAR_UP',
          name: '3年以上',
          value:'6'
        }],
        workerSeen: true,
        studentSeen: false,
        userUuid: "",
        uuid: "",
        IsStudents: false,
        firstReviewSuggest: '',
        firstCheckSuggest: '',
        secondReviewSuggest: '',
        active: 2,
        orderProData: '',
      }
    },
    methods: {
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
      getOrderPro(val) {//订单进度
        let urlCheck=window.location.hash;
        if(urlCheck.indexOf('Inn')!==-1){
          let re = '';
          this.orderPros.forEach(function(obj) {
            if (obj.code == val) {
              re = obj.name;
              return
            }
          });
          console.log(re)
          return re
        }else{
          return enums.getOrderPro(val)
        }
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
     getWorkType(type) {
      let re = '';
      this.workYear.forEach(obj => {
        if (obj.value == type) {
          re = obj.name;
          return re;
        }
      });
      return re;
    },
    //活体识别分
      getPairVerifySimilarity(){
        let _data={
          "userUuid":this.userUuid,
          "orderNo":this.uuid
        }
        this.$http.post("manage/getPairVerifySimilarity", _data).then(response => {
          if (1 == response.body.code) {
            this.pairVerifySimilarity = response.body.data;
          }
        })
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
            this.getBaseInf(this.userUuid,8);
            this.getBaseInf(this.userUuid,9);
          }
        })
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

       //获取电核信息
       getPhoneCheck(type){
        let _data={
          "orderNo": this.uuid,
          "uuid": this.userUuid,
          "langue":1,
          "teleReviewType":1
        };
        this.$http.post("manage/getTeleReviewRecords", _data).then(response => {
          if(1 == response.body.code) {
            if (response.body.data.questions.length>0) {
              this.phoneCheckQuestions=response.body.data.questions;
              this.phoneRadio1 = this.phoneCheckQuestions[0].result;
              this.phoneRadio2 = this.phoneCheckQuestions[1].result;
              this.phoneRadio3 = this.phoneCheckQuestions[2].result;
            }

            if (response.body.data.remarks) {
             let res=response.body.data.remarks;
             res.forEach(e=>{
              if(e.startTime){
                e.startTime=this.getdate(e.startTime);
              }
              if(e.endTime){
                e.endTime=this.getdate(e.endTime);
              }
              if(e.alertTime){
                e.alertTime=this.getdate(e.alertTime);
              }
              if (e.updateTime && e.remark) {
                e.updateTime = this.getdate(e.updateTime);
              }

            });
             this.phoneChecktableData=res;
           }



         }});
       //公司电核
       _data.teleReviewType = 3;
       this.$http.post("manage/getTeleReviewRecords", _data).then(response => {
        if(1 == response.body.code && response.body.data.remarks) {
          let res=response.body.data.remarks;
          res.forEach(e=>{
            if(e.startTime){
              e.startTime=this.getdate(e.startTime);
            }
            if(e.endTime){
              e.endTime=this.getdate(e.endTime);
            }
            if(e.alertTime){
              e.alertTime=this.getdate(e.alertTime);
            }
            if (e.updateTime) {
              e.updateTime = this.getdate(e.updateTime);
            }
              // e.current=false;
            });

          this.comPhoneChecktableData=res;
        }

      })
     },

      //获取审核意见
      getcheckSuggest(){
        let _data={
          "uuid": this.uuid,
          "langue": 1
        }
        this.$http.post("manage/CheckRemarkListByOrderNo", _data).then(response => {
          if (1 == response.body.code && response.body.data) {
            if(response.body.data[0].type==1){
              this.firstReviewSuggest=response.body.data[0].remark;
              this.firstCheckSuggest = response.body.data[0].suggest;
            }else{
              this.secondReviewSuggest=response.body.data[0].remark
            }
            if(response.body.data[1].type==1){
              this.firstReviewSuggest=response.body.data[1].remark;
              this.firstCheckSuggest = response.body.data[1].suggest;
            }else{
              this.secondReviewSuggest=response.body.data[1].remark
            }
          }
        })
      },
      getOrderTag(type){
        return enums.getOrderTagList(type);
      },
      //获取订单进度
      orderSchedule(){
        this.$http.post('manage/orderSchedule', {uuid:this.uuid}).then(response => {
          let {body} = response;
          if (1 == body.code && body.data) {
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

      //获取Peraturan verifikasi
      getCheckRule(){
        for(let type=1;type<10;type++){
          let _data={
            "orderNo": this.uuid,
            "infoType": type
          }
          this.$http.post("manage/manOrderCheckRuleInfo", _data).then(response => {
            if (1 == response.body.code ) {
              let data=response.body.data;
              if (response.body.data.checkRuleList[0]
                && response.body.data.checkRuleList[0].description != undefined) {
                if(type==1&&response.body.data.checkRuleList.length===14){this.baseRuleList=data.checkRuleList;}
                if(type==2&&response.body.data.checkRuleList.length===14){this.baseRuleList=data.checkRuleList;}
                if(type==3&&response.body.data.checkRuleList.length===11){this.jobRuleList=data.checkRuleList;}
                if(type==4&&response.body.data.checkRuleList.length===7){this.jobRuleList1=data.checkRuleList;}
                if(type==5&&response.body.data.checkRuleList.length===2){this.connectRuleList=data.checkRuleList;}
                if(type==6&&response.body.data.checkRuleList.length===4){this.faceCheckRuleList=data.checkRuleList;}
                if(type==7&&response.body.data.checkRuleList.length===10){this.videoCheckRuleList=data.checkRuleList;}
                if(type==8&&response.body.data.checkRuleList.length===4){this.otherCheckRuleList=data.checkRuleList;}
              }
              if(type==1){this.baseInfRemark=data.checkRuleRemark.remark;}
              if(type==2){this.baseInfRemark=data.checkRuleRemark.remark}
              if(type==3){this.jobInfRemark=data.checkRuleRemark.remark;}
              if(type==4){this.jobInfRemark=data.checkRuleRemark.remark}
              if(type==5){this.connectInfRemark=data.checkRuleRemark.remark}
              if(type==6){this.faceCheckRemark=data.checkRuleRemark.remark}
              if(type==7){this.videoCheckRemark=data.checkRuleRemark.remark}
              if(type==8){this.addtionInfRemark=data.checkRuleRemark.remark}

            }
          })
        }
      },
      //获取手机号码
      getUmobileNum(){
        let _data={
          "userUuid":this.userUuid,
        }
        this.$http.post("manage/userMobileByUuid", _data).then(response => {
          if (1 == response.body.code && response.body.data) {
            Object.assign(this.baseInfList,response.body.data);
            this.baseInfList=Object.assign({},this.baseInfList);
            if(this.baseInfList.maritalStatus==0){
              this.baseInfList.maritalStatus="Belum menikah"
            }else if(this.baseInfList.maritalStatus==1){
              this.baseInfList.maritalStatus="Sudah menikah"
            }else {
              this.baseInfList.maritalStatus="Cerai hidup"
            }
            if(this.baseInfList.sex==0){
              this.baseInfList.sex="Tidak diketahui"
            }else if(this.baseInfList.sex==1){
              this.baseInfList.sex="Laki-laki"
            }else {
              this.baseInfList.sex="Perempuan"
            }

          }
        })
      },
      rowClick(row){
        window.open('#/completeOrderDetailInn?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
      },

      //图片点击放大展示
      studentCardUrlClick(){
        if(this.jobInfList.studentCardUrl){
          let _photoList = [
          this.jobInfList.studentCardUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      scholarshipUrlClick(){
        if(this.jobInfList.scholarshipUrl){
          let _photoList = [
          this.jobInfList.scholarshipUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      englishUrlClick(){
        if(this.jobInfList.englishUrl){
          let _photoList = [
          this.jobInfList.englishUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      ComputerUrlClick(){
        if(this.jobInfList.ComputerUrl){
          let _photoList = [
          this.jobInfList.ComputerUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },

      schoolCardUrlClick(){
        if(this.jobInfList.schoolCardUrl){
          let _photoList = [
          this.jobInfList.schoolCardUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },

      otherCertificateUrlClick(){
        if(this.jobInfList.otherCertificateUrl){

          let _photoList = [
          this.jobInfList.otherCertificateUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
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

      attachmentUrl0(){
        if(this.addtionInfList[0].attachmentUrl){
          let _photoList = [
          this.addtionInfList[0].attachmentUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      attachmentUrl1(){
        if(this.addtionInfList[1].attachmentUrl){
          let _photoList = [
          this.addtionInfList[1].attachmentUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      attachmentUrl2(){
        if(this.addtionInfList[2].attachmentUrl){
          let _photoList = [
          this.addtionInfList[2].attachmentUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      attachmentUrl3(){
        if(this.addtionInfList[3].attachmentUrl){
          let _photoList = [
          this.addtionInfList[3].attachmentUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      attachmentUrl4(){
        if(this.addtionInfList[4].attachmentUrl){
          let _photoList = [
          this.addtionInfList[4].attachmentUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      attachmentUrl5(){
        if(this.addtionInfList[5].attachmentUrl){
          let _photoList = [
          this.addtionInfList[5].attachmentUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },

      //获取用户基本信息
      getBaseInf(userUuid,type){
        let _data={
          "userUuid": this.userUuid,
          "type": type,
          "langue":1
        }
        let urlss;
        if(this.orderStatus.status>4){
          urlss="manage/orderUserDataMongo";
          _data={
            "orderNo": this.uuid,
            "type": type,
            "langue":1
          }
        }else{
          urlss="manage/orderUserDataSql";
        }
        this.$http.post(urlss, _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code && response.body.data) {
            var data=response.body.data;
            if(type==2){
              this.$http.post(urlss,_data).then(response => {
                if (1 == response.body.code && response.body.data) {
                  Object.assign(this.baseInfList,response.body.data);
                  this.baseInfList=Object.assign({},this.baseInfList);
                  this.getUmobileNum();
                }
              })
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
              // this.getBaseInf(this.userUuid,7);
            }
            if(type==8){
              let adt=this.addtionInfList;
              console.log(adt)
              data.forEach(function(obj) {
                if(obj.attachmentType==4){
                  adt[0]=obj;
                }
                if(obj.attachmentType==5){
                  adt[1]=obj;
                }
                if(obj.attachmentType==6){
                  adt[2]=obj;
                }
                if(obj.attachmentType==7){
                  adt[3]=obj;
                }
                if(obj.attachmentType==8){
                  adt[4]=obj;
                }
                if(obj.attachmentType==9){
                  adt[5]=obj;
                }
              });
              this.addtionInfList=adt;
            }
            if(type==9){

            }
          }
        })
      },
    },
    mounted: function () {
      this.uuid = this.$route.query['uuid']||'';
      this.userUuid = this.$route.query['userUuid']||'';
      this.sessionId=DataUtil.sid();
      this.getOrderStatus();
      this.getHistoryDetail();
      this.getCheckRule();
      this.getcheckSuggest();
      this.orderSchedule();
      this.getPhoneCheck();
      this.getRemarkList();
      this.getPairVerifySimilarity();
    }
  }
  </script>

  <style>
  .reviewTable {
    border-spacing: 0;
    border: 1px solid gray;
    margin: 20px auto;
  }
  .reviewTable td {
    text-align: center;
    border: 1px solid gray;
    height: 40px;
    line-height: 40px;
    word-wrap:break-word;
    width: 400px;
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
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 7px;
  }
  .two-title{
    font-size: 15px;
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
    margin: 0 auto;
    width: 200px;
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
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
 .titlePhone {
  /*float: left;*/
  display: inline-block;
  margin: 10px 40px;
  font-size: 14px;
  font-weight: 400;

}
.textarear .el-textarea__inner{
  font-size:15px;
  font-weight: 900;
}
.el-radio__inner{
  width: 14px;
  height: 14px;
}
.el-radio__label {
  font-size:13px;
}
</style>
