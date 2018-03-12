/**
 * Created by alan on 17-4-30.
 */
import Login from '../pages/Login.vue'
import Main from '../pages/Main.vue'

const routes = [{
  path:'/login',
  component:Login
},{
  name:'管理后台',
  path:'/',
  redirect:'/home',
  component:Main,
  children:[{
    name:'首页',
    path:'/home',
    component:resolve => require(['../pages/Home.vue'], resolve),
  },{
    name:'首页',
    path:'/homeInn',
    component:resolve => require(['../pages/HomeInn.vue'], resolve),
  },{
    name: 'APP版本管理',
    path: '/AppVersion',
    component:resolve => require(['../pages/system/AppVersion.vue'], resolve)
  },{
    name: 'APP Manajemen aplikasi',
    path: '/AppVersionInn',
    component:resolve => require(['../pages/system/AppVersionInn.vue'], resolve)
  },{
    name: '权限列表',
    path: '/Permission',
    component:resolve => require(['../pages/system/Permission.vue'], resolve)
  },{
    name: 'Manajemen batas akses',
    path: '/PermissionInn',
    component:resolve => require(['../pages/system/PermissionInn.vue'], resolve)
  },
  {
    name: '订单详情-初审',
    path: '/orderPreliminaryReview',
    component:resolve => require(['../pages/order/orderPreliminaryReview.vue'], resolve)
  },{
    name: 'Detail Permohonan - manual pertama',
    path: '/orderPreliminaryReviewInn',
    component:resolve => require(['../pages/order/orderPreliminaryReviewInn.vue'], resolve)
  },{
    name: '订单详情-复审',
    path: '/orderSecondReview',
    component:resolve => require(['../pages/order/orderSecondReview.vue'], resolve)
  },{
    name: 'Detail Permohonan - manual akhir',
    path: '/orderSecondReviewInn',
    component:resolve => require(['../pages/order/orderSecondReviewInn.vue'], resolve)
  },{
    name: '订单详情',
    path: '/completeOrderDetail',
    component:resolve => require(['../pages/order/completeOrderDetail.vue'], resolve)
  },{
    name: 'Detail Permohonan',
    path: '/completeOrderDetailInn',
    component:resolve => require(['../pages/order/completeOrderDetailInn.vue'], resolve)
  },
  {
    name: '角色管理',
    path: '/Role',
    component:resolve => require(['../pages/system/Role.vue'], resolve)
  },{
    name: '字典管理',
    path: '/DictionaryManage',
    component:resolve => require(['../pages/system/DictionaryManage.vue'], resolve)
  },{
    name: 'Manajemen kata/kamus',
    path: '/DictionaryManageInn',
    component:resolve => require(['../pages/system/DictionaryManageInn.vue'], resolve)
  },{
    name:'用户管理',
    path:'Manager',
    component:resolve => require(['../pages/system/Manager.vue'], resolve)
  },{
    name: 'Manajemen peran',
    path: '/RoleInn',
    component:resolve => require(['../pages/system/RoleInn.vue'], resolve)
  },{
    name:'Manajemen akun pengguna',
    path:'ManagerInn',
    component:resolve => require(['../pages/system/ManagerInn.vue'], resolve)
  },{
    name:'初审列表',
    path:'/RiviewTheListFirst',
    component:resolve => require(['../pages/order/RiviewTheListxiao.vue'],resolve),
  },{
    name:'Daftar verifikasi permohonan - manual pertama',
    path:'/RiviewTheListFirstInn',
    component:resolve => require(['../pages/order/RiviewTheListxiaoInn.vue'],resolve),
  },{
    name: '复审列表',
    path: '/RiviewTheListSecond',
    component:resolve => require(['../pages/order/RiviewTheListwei.vue'], resolve),
  },{
    name: 'Daftar verifikasi permohonan - manual akhir',
    path: '/RiviewTheListSecondInn',
    component:resolve => require(['../pages/order/RiviewTheListweiInn.vue'], resolve),
  },{
    name: '审核人员管理',
    path: '/AuditPersonnelmanage',
    component:resolve => require(['../pages/order/AuditPersonnelmanage.vue'], resolve),
  },{
    name: '审核人员管理',
    path: '/AuditPersonnelmanage',
    component:resolve => require(['../pages/order/AuditPersonnelmanage.vue'], resolve),
  },{
    name: 'Manajemen petugas verivikasi',
    path: '/AuditPersonnelmanageInn',
    component:resolve => require(['../pages/order/AuditPersonnelmanageInn.vue'], resolve),
  },{
    name: '订单分配列表',
    path: '/OrderDistributionList',
    component:resolve => require(['../pages/order/OrderDistributionList.vue'], resolve),
  },{
    name: 'Daftar alokasi permohonan',
    path: '/OrderDistributionListInn',
    component:resolve => require(['../pages/order/OrderDistributionListInn.vue'], resolve),
  },{
    name: '订单分配列表详情',
    path: '/OrderListDetails',
    component:resolve => require(['../pages/order/OrderListDetails.vue'], resolve),
  },{
    name: 'Daftar alokasi permohonan-details',
    path: '/OrderListDetailsInn',
    component:resolve => require(['../pages/order/OrderListDetailsInn.vue'], resolve),
  },{
    name: '全部完成订单',
    path: '/ComplateOrderStatistics',
    component:resolve => require(['../pages/order/ComplateOrderStatistics.vue'], resolve),
  },{
    name: 'Semua permohonan',
    path: '/ComplateOrderStatisticsInn',
    component:resolve => require(['../pages/order/ComplateOrderStatisticsInn.vue'], resolve),
  },{
    name: '全部订单查询',
    path: '/FullOrderEnquiry',
    component:resolve => require(['../pages/management/FullOrderEnquiry.vue'], resolve),
  },{
    name: 'Semua permohonan',
    path: '/FullOrderEnquiryInn',
    component:resolve => require(['../pages/management/FullOrderEnquiryInn.vue'], resolve),
  },{
    name: '全部订单详情',
    path: '/OrderDetails',
    component:resolve => require(['../pages/management/OrderDetails.vue'], resolve),
  },{
    name: '全部订单详情',
    path: '/OrderDetailsInn',
    component:resolve => require(['../pages/management/OrderDetailsInn.vue'], resolve),
  },{
    name: 'D0订单查询',
    path: '/D0Details',
    component:resolve => require(['../pages/management/D0Details.vue'], resolve),
  },{
    name: 'Pencarian permohonan hari H',
    path: '/D0DetailsInn',
    component:resolve => require(['../pages/management/D0DetailsInn.vue'], resolve),
  },{
    name: '逾期订单查询',
    path: '/OverdueOrderDetails',
    component:resolve => require(['../pages/management/OverdueOrderDetails.vue'], resolve),
  },{
    name: 'Pencarian keterlambatan pelunasan',
    path: '/OverdueOrderDetailsInn',
    component:resolve => require(['../pages/management/OverdueOrderDetailsInn.vue'], resolve),
  },{
    name: '已还款订单查询',
    path: '/RepaymentOrder',
    component:resolve => require(['../pages/management/RepaymentOrder.vue'], resolve),
  },{
    name: 'Pencarian pinjaman yg sudah lunas',
    path: '/RepaymentOrderInn',
    component:resolve => require(['../pages/management/RepaymentOrderInn.vue'], resolve),
  },{
    name: '打款失败列表',
    path: '/CallFailureOrder',
    component:resolve => require(['../pages/management/CallFailureOrder.vue'], resolve),
  },{
    name: 'Pencarian pencairan gagal',
    path: '/CallFailureOrderInn',
    component:resolve => require(['../pages/management/CallFailureOrderInn.vue'], resolve),
  },{
    name: '自动审核配置-新户',
    path: '/AutomaticAudit-new',
    component:resolve => require(['../pages/automaticaudit/AutomaticAudit-new.vue'], resolve),
  },{
    name: '自动审核配置-新户',
    path: '/AutomaticAudit-newInn',
    component:resolve => require(['../pages/automaticaudit/AutomaticAudit-newInn.vue'], resolve),
  },{
    name: '逾期订单（内）',
    path: '/BackOrder',
    component:resolve => require(['../pages/collectionManagement/BackOrder.vue'], resolve),
  },{
    name: 'permohonan terlambat',
    path: '/BackOrderInn',
    component:resolve => require(['../pages/collectionManagement/BackOrderInn.vue'], resolve),
  },{
    name: '已还款订单-内',
    path: '/HasTheRepaymentOrder',
    component:resolve => require(['../pages/collectionManagement/HasTheRepaymentOrder.vue'], resolve),
  },{
    name: 'Permohonan sudah lunas',
    path: '/HasTheRepaymentOrderInn',
    component:resolve => require(['../pages/collectionManagement/HasTheRepaymentOrderInn.vue'], resolve),
  },{
    name: '已还款订单-管理员',
    path: '/AdminHasTheRepaymentOrder',
    component:resolve => require(['../pages/collectionManagement/AdminHasTheRepaymentOrder.vue'], resolve),
  },{
    name: 'Permohonan sudah lunas-admin',
    path: '/AdminHasTheRepaymentOrderInn',
    component:resolve => require(['../pages/collectionManagement/AdminHasTheRepaymentOrderInn.vue'], resolve),
  },{
    name: 'D0订单分配',
    path: '/D0OrderAllocation',
    component:resolve => require(['../pages/collectionManagement/D0OrderAllocation.vue'], resolve),
  },{
    name: 'D0Alokasi permohonan',
    path: '/D0OrderAllocationInn',
    component:resolve => require(['../pages/collectionManagement/D0OrderAllocationInn.vue'], resolve),
  },{
    name: '逾期订单分配',
    path: '/OverdueOrderDistribution',
    component:resolve => require(['../pages/collectionManagement/OverdueOrderDistribution.vue'], resolve),
  },{
    name: 'Alokasi permohonan terlambat',
    path: '/OverdueOrderDistributionInn',
    component:resolve => require(['../pages/collectionManagement/OverdueOrderDistributionInn.vue'], resolve),
  },{
    name: '分配人员管理',
    path: '/ThePersonnelManagement',
    component:resolve => require(['../pages/collectionManagement/ThePersonnelManagement.vue'], resolve),
  },{
    name: 'Petugas alokasi',
    path: '/ThePersonnelManagementInn',
    component:resolve => require(['../pages/collectionManagement/ThePersonnelManagementInn.vue'], resolve),
  },{
    name: '全部订单管理',
    path: '/Complatemanager',
    component:resolve => require(['../pages/order/Complatemanager.vue'], resolve),
  },{
    name: 'Manajemen semua permohonan',
    path: '/ComplatemanagerInn',
    component:resolve => require(['../pages/order/ComplatemanagerInn.vue'], resolve),
  },{
    name: '手机号码解密',
    path: '/CheakMobileNoWithDecryption',
    component:resolve => require(['../pages/system/CheakMobileNoWithDecryption.vue'], resolve),
  },{
    name: '催收订单详情',
    path: '/CollectionOrderDetails',
    component:resolve => require(['../pages/collectionManagement/CollectionOrderDetails.vue'], resolve),
  },{
    name: 'penagihan permohonan',
    path: '/CollectionOrderDetailsInn',
    component:resolve => require(['../pages/collectionManagement/CollectionOrderDetailsInn.vue'], resolve),
  },{
    name: '运营管理',
    path: '/UserFeedBack',
    component:resolve => require(['../pages/operate/UserFeedBack.vue'], resolve),
  },{
    name: '运营管理',
    path: '/UserFeedBackInn',
    component:resolve => require(['../pages/operate/UserFeedBackInn.vue'], resolve),
  }]
  },{
  path:'/404',
  component:resolve => require(['../pages/404.vue'], resolve)
},{
  path:'*',
  redirect:{path:'/404'}
}];

export default routes  
