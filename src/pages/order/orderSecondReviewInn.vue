/**
* Created by alan on 2017/3/10.
*/
<template>
  <section class="orderBox">
    <div class="divid-line"></div>
    <!-- 订单状态 -->
    <el-row>
      <div class="one-title">Status Permohonan</div>
      <el-col :span="8" class="grid-content">
        <div><span>Nomor Permohonan:</span><span>{{ uuid }}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Waktu Pengajuan:</span><span>{{orderStatus.createTime}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Urutan Pengajuan:</span><span><el-tag :type="orderStatus.orderStep==0?'success':'primary'"><span>{{"Pengajuan ke-"+orderStatus.orderStep+""}}</span></el-tag></span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Jumlah pinjaman:</span><span>{{orderStatus.amountApply}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Durasi pinjaman:</span><span>{{orderStatus.borrowingTerm}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Petugas manual pertama:</span><span>{{orderStatus.juniorReviewerName}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Tujuan pinjaman:</span><span>{{orderStatus.borrowUse}}</span></div>
      </el-col>
    </el-row>
    <div class="divid-line"></div>
    <el-row>
      <div class="one-title">Keterangan</div>
      <table class="reviewTable">
        <tr>
          <td> Keterangan manual pertama </td>
          <td>{{firstCheckSuggest}}</td>
          <td>{{firstReviewSuggest}}</td>
        </tr>
        <tr>
          <td> Keterangan manual akhir</td>
          <td></td>
          <td>{{secondReviewSuggest}}</td>
        </tr>
      </table>
    </el-row>
    <div class="divid-line"></div>
    <el-row>
      <div class="one-title">Riwayat Permohonan</div>
      <el-table :data="historyData" v-loading="historyLoading" @row-click="rowClick" size="large">
        <el-table-column prop="borrowingCount" width="120" label="Urutan Pengajuan"></el-table-column>
        <el-table-column prop="createTime" width="240" label="Waktu Pengajuan">
          <template scope="scope">
            <span>{{getdates(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uuid" width="240" label="Nomor Permohonan"></el-table-column>
        <el-table-column prop="status" width="120" label="Hasil Verifikasi">
          <template scope="scope">
            <span>{{getOrderType(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="Keterangan"></el-table-column>
      </el-table>
    </el-row>
    <div class="divid-line"></div>
    <!-- Tamu/pelanggan信息 baseInf-->
    <el-row>
      <div class="containers">
        <div class="asides">
          <div class="one-title">Informasi Dasar</div>
          <table v-if="workerSeen" border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>Nama Pengguna</td>
              <td>{{baseInfList.realName}}</td>
            </tr>
            <tr>
              <td>Jenis Identitas</td>
              <td>Sudah bekerja</td>
            </tr>
            <tr>
              <td>Nomor KTP</td>
              <td>{{baseInfList.idCardNo}}</td>
            </tr>
            <tr>
              <td>Jenis Kelamin</td>
              <td>{{baseInfList.sex}}</td>
            </tr>
            <tr>
              <td>Nomor Ponsel</td>
              <td>{{baseInfList.mobileNumberDES}}</td>
            </tr>
            <tr>
              <td>Alamat e-mail</td>
              <td>{{baseInfList.email}}</td>
            </tr>
            <tr>
              <td>Riwayat Pendidikan Terakhir</td>
              <td>{{baseInfList.academic}}</td>
            </tr>
            <tr>
              <td>Status Perkawinan</td>
              <td>{{baseInfList.maritalStatus}}</td>
            </tr>
            <tr>
              <td>Tanggal Lahir</td>
              <td>{{baseInfList.birthday}}</td>
            </tr>
            <tr>
              <td>Agama</td>
              <td>{{baseInfList.religion}}</td>
            </tr>
            <tr>
              <td>Nama Ibu</td>
              <td>{{baseInfList.motherName}}</td>
            </tr>
            <tr>
              <td>Jumlah Anak</td>
              <td>{{baseInfList.childrenAmount}}</td>
            </tr>
            <tr>
              <td>Alamat Tempat Tinggal Sekarang</td>
              <td>{{baseInfList.province}}{{baseInfList.city}}{{baseInfList.bigDirect}}{{baseInfList.smallDirect}}</td>
            </tr>
            <tr>
              <td>Alamat Detail Tempat Tinggal Sekarang</td>
              <td>{{baseInfList.detailed}}</td>
            </tr>
          </table>

          <table v-if='studentSeen' border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>Nama Pengguna</td>
              <td>{{baseInfList.realName}}</td>
            </tr>
            <tr>
              <td>Jenis Identitas</td>
              <td>Mahasiswa</td>
            </tr>
            <tr>
              <td>Nomor KTP</td>
              <td>{{baseInfList.idCardNo}}</td>
            </tr>
            <tr>
              <td>Jenis Kelamin</td>
              <td>{{baseInfList.sex}}</td>
            </tr>
            <tr>
              <td>Nomor Ponsel</td>
              <td>{{baseInfList.mobileNumberDES}}</td>
            </tr>
            <tr>
              <td>Alamat e-mail</td>
              <td>{{baseInfList.email}}</td>
            </tr>
            <tr>
              <td>Riwayat Pendidikan Terakhir</td>
              <td>{{baseInfList.academic}}</td>
            </tr>
            <tr>
              <td>Jumlah Anggota Keluarga</td>
              <td>{{baseInfList.familyMemberAmount}}</td>
            </tr>
            <tr>
              <td>Pendapatan Tahunan Keluarga</td>
              <td>{{baseInfList.familyAnnualIncome}}</td>
            </tr>
            <tr>
              <td>Nama Ayah</td>
              <td>{{baseInfList.fatherName}}</td>
            </tr>
            <tr>
              <td>Nomor Ponsel Ayah</td>
              <td>{{baseInfList.fatherMobile}}</td>
            </tr>
            <tr>
              <td>Profesi Ayah</td>
              <td>{{baseInfList.fatherPosition}}</td>
            </tr>
            <tr>
              <td>Nama Ibu</td>
              <td>{{baseInfList.motherName}}</td>
            </tr>
            <tr>
              <td>Nomor Ponsel Ibu</td>
              <td>{{baseInfList.motherMobile}}</td>
            </tr>
            <tr>
              <td>Profesi Ibu</td>
              <td>{{baseInfList.motherPosition}}</td>
            </tr>
            <tr>
              <td>Alamat Tempat Tinggal Sekarang</td>
              <td>{{baseInfList.province}}{{baseInfList.city}}{{baseInfList.bigDirect}}{{baseInfList.smallDirect}}</td>
            </tr>
            <tr>
              <td>Alamat Detail Tempat Tinggal Sekarang</td>
              <td>{{baseInfList.detailed}}</td>
            </tr>
          </table>
          <div class="faceCheck">
            <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.idCardUrl"  @click.stop="idCardUrlClick"><br>身份证正面照</div>
          </div>
        </div>
        <div class="mains">
          <div class="check_rule">
            <el-form label-width="140px">
              <el-form-item label="Peraturan verifikasi">
              </el-form-item>
            </el-form>
            <div class="question_radio">
              <div class="question_text">1、Informasi KTP tidak jelas?</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[0].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">2、Informasi penting dalam KTP hilang.？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[1].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">3、Bukan ktp ASLI (photocopy, hasil screenshot, dll)？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[2].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">4、KTP berupa RESI KTP？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[3].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">5、Nama yang ditulis dan nama di ktp tidak sama（eg:Black Smith, White Smith）？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[4].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">6、Ada kesalahan huruf dalam penulisan nama (misal：Danny Smith, Danniel Smith/lucy, lucky）.？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[5].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">7、jenis kelamin berbeda dengan yang di KTP？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[6].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">8、Status pernikahan yang ditulis tidak sama dengan KTP ？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[7].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">9、tidak sesuai dengan ketentuan latar belakang foto KTP (ganjil : merah, genap : biru)？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[8].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">10、 Alamat tempat tinggal yang ditu;is bukan merupakan alamat (asdsadsad/343432)？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[9].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">11、Alamat yang ditulis tidak lengkap. (ga ada nomor rumah atau tidak detil)？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[10].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">12、alamat yang di google pun ga keluar hasil？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[11].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">13、tempat tinggal adalah ruang publik, （kantor pemerintah, taman, dll.）？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[12].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">14、Alamat tempat tinggal adalah alamat palsu (misalnya, tidak mungkin alamatnya ada di area bangunan / perumahan)？</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[13].ruleResult"></el-checkbox>
              </div>
            </div>
          </div>
          <div class="other_remark smallRemark">
            <div class="aside_title">Keterangan Lainnya</div>
            <el-input
              type="textarea"
              class = 'textarear'
              :rows="12"
              placeholder=""
              :disabled="baseInfShow"
              v-model="baseInfRemark">
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
          <div class="one-title">Informasi perusahaan</div>
          <table v-if="workerSeen" border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>Nama Perusahaan</td>
              <td>{{jobInfList.companyName}}</td>
            </tr>
            <tr>
              <td>Posisi Jabatan</td>
              <td>{{jobInfList.positionName}}</td>
            </tr>
            <tr>
              <td>Pendapatan Bulanan</td>
              <td>{{jobInfList.monthlyIncome}}</td>
            </tr>
            <tr>
              <td>Alamat Perusahaan</td>
              <td>{{jobInfList.province}}{{jobInfList.city}}{{jobInfList.bigDirect}}{{jobInfList.smallDirect}}</td>
            </tr>
            <tr>
              <td>Alamat Detail Perushaan</td>
              <td>{{jobInfList.detailed}}</td>
            </tr>
            <tr>
              <td>No telepon perusahaan</td>
              <td>{{jobInfList.companyPhone}}</td>
            </tr>
          </table>
        </div>
        <div class="mains">
          <div class="check_rule">
            <el-form label-width="140px">
              <el-form-item label="Peraturan verifikasi">
              </el-form-item>
            </el-form>
            <div class="question_radio">
              <div class="question_text">1、Nama perusahaan jelas jelas sembarang isi（eg:no 3 q/AA BB？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[0].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">2、kantor di google pun tidak ada hasil？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[1].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">3、nama kantor dan alamat kantor tidak sesuai？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[2].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">4、alamat kantor yang ditulis bukan merupakan alamat？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[3].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">5、alamat kantor tidak ditemukan di kantor？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[4].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">6、telepon yang ditulis merupakan nomor palsu？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[5].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">7、google tidak bisa menemukan nomor telepon kantor？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[6].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">8、 nama kator dan nomor kantor tidak sesuai ？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[7].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">9、jabatan yang ditulis tidak sesuai dengan yang sebenarnya (misalkan isi staff tapi ternyata hanya keamanan？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[8].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">10、jabatan dan gaji tidak sesuai/ tidak imbang？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[9].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">11、alamat temapt tinggal dan alamat kantor sama？</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[10].ruleResult"></el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="containers" v-if="studentSeen">
        <div class="asides">
          <div class="one-title">Informasi Perguruan Tinggi</div>
          <table id="studentsInf" border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>Nama perguruan Tinggi</td>
              <td>{{jobInfList.schoolName}}</td>
            </tr>
            <tr>
              <td>Jurusan</td>
              <td>{{jobInfList.major}}</td>
            </tr>
            <tr>
              <td>kapan mulai masuk Sekolah</td>
              <td>{{jobInfList.startSchoolDate}}</td>
            </tr>
            <tr>
              <td>Nomor Pelajar</td>
              <td>{{jobInfList.studentNo}}</td>
            </tr>
            <tr>
              <td>Alamat Tempat Tinggal Sekarang</td>
              <td>{{baseInfList.province}}{{baseInfList.city}}{{baseInfList.bigDirect}}{{baseInfList.smallDirect}}</td>
            </tr>
            <tr>
              <td>Alamat Detail Tempat Tinggal Sekarang</td>
              <td>{{baseInfList.detailed}}</td>
            </tr>
            <tr>
              <td>Foto Kartu Pelajar</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.studentCardUrl" alt="" @click.stop="studentCardUrlClick"></td>
            </tr>
            <tr>
              <td>Foto Beasiswa</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.scholarshipUrl" alt="" @click.stop="scholarshipUrlClick"></td>
            </tr>
            <tr>
              <td>Foto Sertifikat Bahasa Inggris</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.englishUrl" alt="" @click.stop="englishUrlClick"></td>
            </tr>
            <tr>
              <td>Foto Sertifikat Komputer</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.ComputerUrl" alt="" @click.stop="ComputerUrlClick"></td>
            </tr>
            <tr>
              <td>Foto Kartu Sekolah Lainnya</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.schoolCardUrl" alt="" @click.stop="schoolCardUrlClick"></td>
            </tr>
            <tr>
              <td>Foto Piagam/Sertifikat Lomba</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.otherCertificateUrl" alt="" @click.stop="otherCertificateUrlClick"></td>
            </tr>
          </table>
        </div>
        <div class="mains">
          <div class="check_rule">
            <el-form label-width="80px">
              <el-form-item label="Peraturan verifikasi">
              </el-form-item>
            </el-form>
            <div class="question_radio">
              <div class="question_text">1、Apakah foto kartu pelajar tidak jelas?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList1[0].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">2、Apakah wajah di KTP dan wajah di kartu pelajar sangat tidak mirip?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList1[1].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">3、Apakah informasi di KTP dan di kartu pelajar tidak sesuai?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList1[2].ruleResult"></el-checkbox>

              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">4、Apakah kartu pelajar yang digunakan ada kemungkinan kartu pelajar palsu?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList1[3].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">5、Apakah foto kartu pelajar yang digunakan tidak terdapat informasi?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList1[4].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">6、Apakah alamat perguruan tinggi tidak detail?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList1[5].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">7、Apakah nama perguruan tinggi tidak sesuai?</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="jobRuleList1[6].ruleResult"></el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="other_remark">
        <div class="aside_title">Keterangan Lainnya</div>
        <el-input
          type="textarea"
          class = 'textarear'
          :rows="4"
          placeholder=""
          :disabled="jobInfShow"
          v-model="jobInfRemark">
        </el-input>
      </div>
    </el-row>
    <div class="divid-line"></div>
    <!-- 联系人信息 connectInf-->
    <el-row>
      <div class="containers">
        <div class="asides">
          <div class="one-title">Informasi Kontak yang Bisa Dihubungi</div>
          <table border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>Nama kontak yang bisa dihubungi 1</td>
              <td>{{connectInfList.contactsName1}}</td>
            </tr>
            <tr>
              <td>hubungan</td>
              <td>{{connectInfList.relation1}}</td>
            </tr>
            <tr>
              <td>Nomor Ponsel 1</td>
              <td>{{connectInfList.contactsMobile1}}</td>
            </tr>
            <tr>
              <td>Nama kontak yang bisa dihubungi 2</td>
              <td>{{connectInfList.contactsName2}}</td>
            </tr>
            <tr>
              <td>hubungan</td>
              <td>{{connectInfList.relation2}}</td>
            </tr>
            <tr>
              <td>Nomor Ponsel 2</td>
              <td>{{connectInfList.contactsMobile2}}</td>
            </tr>
            <tr>
              <td>Nomor telepon sekunder</td>
              <td>{{connectInfList.alternatePhoneNo}}</td>
            </tr>
          </table>
        </div>
        <div class="mains">
          <div class="check_rule">
            <el-form label-width="140px">
              <el-form-item label="Peraturan verifikasi">
              </el-form-item>
            </el-form>
            <div class="question_radio">
              <div class="question_text">1、nama kontak tidak sesuai dengan persyaratan (nama restoran, nama rumah sakit, AA？</div>
              <div class="radio_box">
                <el-checkbox :disabled="connectInfShow" v-model="connectRuleList[0].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">2、kontak yang bisa dihubungi kemungkinan adalah pendaftar itu sendiri？</div>
              <div class="radio_box">
                <el-checkbox :disabled="connectInfShow" v-model="connectRuleList[1].ruleResult"></el-checkbox>
              </div>
            </div>
          </div>
          <div class="other_remark smallRemark">
            <div class="aside_title">Keterangan Lainnya</div>
            <el-input
              type="textarea"
              class = 'textarear'
              :rows="4"
              placeholder=""
              :disabled="connectInfShow"
              v-model="connectInfRemark">
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
          <div class="one-title">Pengenalan Wajah</div>
          <span class="titlePhone">Nomor KTP：  {{baseInfList.idCardNo}}</span>
          &nbsp;&nbsp;
          <span class="titlePhone">Nilai pengenalan wajah：  {{pairVerifySimilarity}}</span>
          <div class="faceCheck">
            <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="facePhotoUrls" @click.stop="facePhotoUrlClick"><br>Bukti pengenaan wajah</div>
            <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img class="handleImg" :src="baseInfList.handIdCardUrl"  @click.stop="handIdCardUrlClick"><br>Foto pengguna memegang KTP</div>
            <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.idCardUrl"  @click.stop="idCardUrlClick"><br>Foto KTP Tampak Depan</div>
          </div>
        </div>
        <div class="mains">
          <div class="check_rule">
            <el-form label-width="140px">
              <el-form-item label="Peraturan verifikasi">
              </el-form-item>
            </el-form>
            <div class="question_radio">
              <div class="question_text">1、KTP rusak parah / informasi tidak lengkap? </div>
              <div class="radio_box">
                <el-checkbox :disabled="faceCheckShow" v-model="faceCheckRuleList[0].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">2、KTP tidak asli？ </div>
              <div class="radio_box">
                <el-checkbox :disabled="faceCheckShow" v-model="faceCheckRuleList[1].ruleResult"></el-checkbox>
              </div>
            </div>
            <div v-if ="flager">
              <div class="question_radio">
                <div class="question_text">3、 foto memegang KTP tidak terlihat mukanya dengan jelas？ </div>
                <div class="radio_box">
                  <el-checkbox :disabled="faceCheckShow" v-model="faceCheckRuleList[2].ruleResult"></el-checkbox>
                </div>
              </div>
              <div class="question_radio">
                <div class="question_text">4、Wajah di foto memegang ktp tidak sama dengan wajah di pengenalan wajah？</div>
                <div class="radio_box">
                  <el-checkbox :disabled="faceCheckShow" v-model="faceCheckRuleList[3].ruleResult"></el-checkbox>
                </div>
              </div>
            </div>
            <div class="other_remark smallRemark">
              <div class="aside_title">Keterangan Lainnya</div>
              <el-input
                type="textarea"
                class = 'textarear'
                :rows="9"
                placeholder=""
                :disabled="faceCheckShow"
                v-model="faceCheckRemark">
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
          <div class="one-title">Sertifikasi Video</div>
          <el-button @click="searcher" type="primary">putar</el-button>
          <div v-bind:class= "{ vadio:noActive,vadios:isActive}">
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
            <el-form label-width="140px">
              <el-form-item label="Peraturan verifikasi">
              </el-form-item>
            </el-form>
            <div class="question_radio">
              <div class="question_text">1、Apakah suara pembaca seperti diwakilkan?</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[0].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">2、Apakah ada orang lain di dalam rekaman?</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[1].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">3、video bukan peminjam langsung yang membuat? </div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[2].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">4、Apakah jenis kelamin yang di isi berbeda dari apa yang ada di video?</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[3].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">5、Apakah wajah yang ada di video terdapat bekas luka sampai tidak bisa dikenali?</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[4].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">6、Apakah busana yang digunakan keterlaluan? (memperlihatkan bagian tubuh yang tidak perlu)</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[5].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">7、Apakah kualitas video tidak bagus, atau gelap?</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[6].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">8、Muka dalam video terlihat seperti palsu? </div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[7].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">9、Muka tidak sepenuhnya masuk kedalam video, terhalang objek dll？</div>
              <div class="radio_box">
                <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[8].ruleResult"></el-checkbox>
              </div>
            </div>
            <!--<div class="question_radio">-->
              <!--<div class="question_text">10、Video sama sekali tidak membacakan teks？</div>-->
              <!--<div class="radio_box">-->
                <!--<el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[9].ruleResult"></el-checkbox>-->
              <!--</div>-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="other_remark">
        <div class="aside_title">Keterangan Lainnya</div>
        <el-input
          type="textarea"
          class = 'textarear'
          :rows="4"
          :disabled="videoCheckShow"
          placeholder=""
          v-model="videoCheckRemark">
        </el-input>
      </div>
      </div>
    </el-row>
    <div class="divid-line"></div>
    <!-- 补充信息 addtionInf-->
    <el-row>
      <div class="containers">
        <div class="asides">
          <div class="one-title">Informasi Tambahan</div>
          <div class="faceCheck">
            <div class="faceImg">
              <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[0].attachmentUrl" @click.stop="attachmentUrl0"><br>Kartu Kredit
            </div>
            <div class="faceImg">
              <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[1].attachmentUrl" @click.stop="attachmentUrl1"><br>SIM
            </div>
            <div class="faceImg">
              <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[2].attachmentUrl" @click.stop="attachmentUrl2"><br>NPWP
            </div>
            <div class="faceImg">
              <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[3].attachmentUrl" @click.stop="attachmentUrl3"><br>KK
            </div>
            <div class="faceImg" v-if="workerSeen">
              <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[4].attachmentUrl" @click.stop="attachmentUrl4"><br>Slip gaji
            </div>
            <div class="faceImg">
              <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[5].attachmentUrl" @click.stop="attachmentUrl5"><br>Mutasi bank
            </div>
          </div>
          <div class="other_remark smallRemark">
            <el-form>
              <el-form-item>
                <el-col ><div class="lastTitle">Keterangan Lainnya</div></el-col>
                <el-col :span="12">
                </el-col>
              </el-form-item>
            </el-form>
            <div class="question_radio">
              <div class="question_text">1、Nama perusahaan di slip gaji tidak sama dengan nama perusahaan yang diisi？</div>
              <div class="radio_box">
                <el-checkbox :disabled="addtionInfShow" v-model="otherCheckRuleList[0].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">2、Jumlah pendapatan yang ditulis dan jumlah yang ada di dslip gaji sesuai (di dalam lingkupan 200rb, lebih 200 atau kurang 200)？</div>
              <div class="radio_box">
                <el-checkbox :disabled="addtionInfShow" v-model="otherCheckRuleList[1].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">3、Slip gaji melebihi 2 bulan dari waktu pendaftaran？</div>
              <div class="radio_box">
                <el-checkbox :disabled="addtionInfShow" v-model="otherCheckRuleList[2].ruleResult"></el-checkbox>
              </div>
            </div>
            <div class="question_radio">
              <div class="question_text">4、 foto pada SIM tidak sama dengan foto pada KTP？</div>
              <div class="radio_box">
                <el-checkbox :disabled="addtionInfShow" v-model="otherCheckRuleList[3].ruleResult"></el-checkbox>
              </div>
            </div>
          </div>
          <el-input
            type="textarea"
            class = 'textarear'
            :rows="6"
            placeholder=""
            :disabled="addtionInfShow"
            v-model="addtionInfRemark">
          </el-input>
        </div>
      </div>
    </el-row>
    <div class="divid-line"></div>
    <!-- 电话审核 -->
    <el-row>
      <div class="one-title">Modul verifikasi telepon<span class="titlePhone">Nomor Ponsel：  {{baseInfList.mobileNumberDES}}</span><span class="titlePhone">Nama lengkap：  {{baseInfList.realName}}</span>
        <span class="titlePhone">Jenis Kelamin：  {{baseInfList.sex}}</span>
        <!--<span class="titlePhone">公司电话：  {{jobInfList.companyPhone}}</span>-->
      </div>

      <el-row>
        <span class="two-title">verifikasi kontak terdekat dan kantor &nbsp;<el-button v-if="comPhoneCheckStartVif" @click="comPhoneCheckStart" type="primary">Mulai</el-button></span>
        <template>
          <el-table
            :data="comPhoneChecktableData"
            style="width: 100%">
            <el-table-column
              type="index"
              label="No.urut"
              width="70">
            </el-table-column>
            <el-table-column
              prop="teleReviewObject"
              label="Objek verifikasi"
              width="105">
            </el-table-column>
            <el-table-column
              prop="realName"
              label=" Nama objek verifikasi"
              width="105">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="Nomor telepon"
              width="105">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="waktu mulai"
              width="105">
            </el-table-column>
            <el-table-column
              prop="endTime"
              label="waktu selesai"
              width="105">
            </el-table-column>
            <el-table-column
              prop="burningTime"
              label="Durasi"
              width="116">
            </el-table-column>
            <el-table-column
              prop="teleReviewResult"
              label="hasil verifikasi telepon"
              width="150">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="keterangan"
              width="170">
            </el-table-column>
            <el-table-column
              prop="alertTime"
              label="pemberitahuan selanjutnya"
              width="105">
            </el-table-column>
            <el-table-column prop="updateTime" label="Tambahkan keterangan" width="105">
            </el-table-column>
            <el-table-column
              label="Opsi"
              width="300" align="center">
              <template scope="scope">
                <el-button-group>
                  <el-button v-if="scope.row.teleReviewOperationType==0" @click="comDialCheckClick(scope.row,scope.$index,'1','0')"  type="primary" class="company-pass" round size="medium">Tersambung</el-button>
                  <el-button v-if="scope.row.teleReviewOperationType==0" @click="comDialCheckClick(scope.row,scope.$index,'0','0')" class="company-pass" type="danger" round size="medium">Tidak tersambung</el-button>
                  <el-button v-if="scope.row.teleReviewOperationType!=0" @click="comDialCheckClick(scope.row,scope.$index,'2', '1')" class="company-pass" type="primary" round size="medium">Detil</el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="Silahkan pilih"
                   :visible.sync="smallCompanyDialogVisible"
                   width="25%">
          <el-row>
              <el-radio  v-model="smallCompany" label="1">Telepon beberapa saat lagi</el-radio>
              <el-radio v-if="judgeWhichSamllDialog == '1'" v-model="smallCompany" label="2">Kontak yg sering dihubungi ke-1</el-radio>
              <el-radio v-if="judgeWhichSamllDialog == '2'" v-model="smallCompany" label="2">Kontak yg sering dihubungi ke-2</el-radio>
              <el-radio v-if="judgeWhichSamllDialog == '3'" v-model="smallCompany" label="2">结束电核</el-radio>
          </el-row>
          <span slot="footer" class="dialog-footer">
                  <el-button @click="smallCompanyCancel">BATAL</el-button>
                  <el-button type="primary" @click="smallCompanyOk">YAKIN</el-button>
                </span>
        </el-dialog>
        <!-- 电核弹窗 -->
        <el-dialog
          title="keterangan"
          :visible.sync="companyDialogVisible"
          width="50%">
          <el-col>
            <template v-if="dialogType === '2'">
              <span>pertanyaan 1：apakah{{baseInfList.realName}} bekerja di perusahaan ini?</span><br/>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio1" label="1" @change.native="judgeResult">berkerja</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio1" label="2" @change.native="judgeResult">sudah keluar</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio1" label="3" @change.native="judgeResult">Tidak yakin apakah ada di perusahaan tsb</el-radio>
            </template>
          </el-col>
          <el-col>
            <template v-if="dialogType === '2'">
              <span>pertanyaan 2：Kira-kira sudah berapa lama bekerja?</span><br/>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio2" label="1">Tidak diketahui</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio2" label="2">3 bulan kebawah</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio2" label="3">3-6 bulan</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio2" label="4">6-12 bulan</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio2" label="5">1 tahun keatas</el-radio>
            </template>
          </el-col>
          <el-col v-if="dialogType === '2'">
            <template>
              <span>pertanyaan 3：Apakah kira-kira peminjam sedang dikejar penagihan oleh perusahaan lainnya?</span><br/>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio3" label="1" @change.native="judgeResult">Tidak diketahui</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio3" label="2" @change.native="judgeResult">penerima telepon memberikan respon negatif terhadap pemohon</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio3" label="3" @change.native="judgeResult">Tidak</el-radio>
            </template>
          </el-col>
          <!--<el-col v-if="dialogType === '2'">-->
          <!--<template>-->
          <!--<span>Nama kontak hp：</span><br/>-->
          <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio4" label="1">Ya</el-radio>-->
          <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio4" label="2">Bukan</el-radio>-->
          <!--</template>-->
          <!--</el-col>-->
          <el-col>
            <template v-if="dialogType === '4'">
              <span>pertanyaan 1：Apa hubungan Anda dengan yang peminjam?</span><br/>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="1">Tidak kenal</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="2">Orang tua</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="3">Saudara/i</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="4">Anak</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="5">Teman</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="6">Rekan kerja</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="7">Tamu/pelanggan</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="8">Lainnya</el-radio>
            </template>
          </el-col>
          <!--<el-col>-->
          <!--<template v-if="dialogType === '4'">-->
          <!--<span>pertanyaan 2：Apakah peminjam sekarang berkerja?</span><br/>-->
          <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio6" label="1">Tidak diketahui</el-radio>-->
          <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio6" label="2">Sering</el-radio>-->
          <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio6" label="3">sudah lama tidak berhubungan </el-radio>-->
          <!--</template>-->
          <!--</el-col>-->
          <el-col v-if="dialogType === '4'">
            <template>
              <span>pertanyaan 2：Apakah peminjam sekarang berkerja?</span><br/>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio7" label="1" @change.native="judgeResult">Tidak diketahui</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio7" label="2" @change.native="judgeResult">Tidak punya kerja</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio7" label="3" @change.native="judgeResult">Berkerja</el-radio>
            </template>
          </el-col>
          <el-col>
            <template v-if="dialogType === '4'">
              <span>pertanyaan 3：Kira-kira sudah berapa lama bekerja?</span><br/>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio8" label="1">Tidak diketahui</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio8" label="2">3 bulan kebawah</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio8" label="3">3-6 bulan</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio8" label="4">6-12 bulan</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio8" label="5">1 tahun keatas</el-radio>
            </template>
          </el-col>
          <el-col v-if="dialogType === '4'">
            <template>
              <span>pertanyaan 4：Apakah kira-kira peminjam sedang dikejar penagihan oleh perusahaan lainnya?</span><br/>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio9" label="1" @change.native="judgeResult">Tidak diketahui</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio9" label="2" @change.native="judgeResult">Tidak</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio9" label="3" @change.native="judgeResult">penerima telepon memberikan respon negatif terhadap pemohon</el-radio>
            </template>
          </el-col>
          <!--<el-col v-if="dialogType === '4'">-->
          <!--<template>-->
          <!--<span>Informasi diragukan：</span><br/>-->
          <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio10" label="1">Ya</el-radio>-->
          <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio10" label="2">Bukan</el-radio>-->
          <!--</template>-->
          <!--</el-col>-->

          <el-col>
            <template v-if="dialogType === '6'">
              <span>pertanyaan 1：Apa hubungan Anda dengan yang peminjam? </span><br/>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="1" @change.native="judgeResult">Tidak kenal</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="2" @change.native="judgeResult">Orang tua</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="3" @change.native="judgeResult">Saudara/i</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="4" @change.native="judgeResult">Anak</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="5" @change.native="judgeResult">Teman</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="6" @change.native="judgeResult">Rekan kerja</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="7" @change.native="judgeResult">Tamu/pelanggan</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="8" @change.native="judgeResult">Lainnya</el-radio>
            </template>
          </el-col>
          <!--<el-col>-->
          <!--<template v-if="dialogType === '6'">-->
          <!--<span>pertanyaan 2：Apakah Anda masih berhubungan dengan peminjam?</span><br/>-->
          <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio12" label="1">Tidak diketahui</el-radio>-->
          <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio12" label="2">Sering</el-radio>-->
          <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio12" label="3">sudah lama tidak berhubungan</el-radio>-->
          <!--</template>-->
          <!--</el-col>-->
          <el-col v-if="dialogType === '6'">
            <template>
              <span>pertanyaan 2：Apakah peminjam sekarang berkerja?</span><br/>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio13" label="1" @change.native="judgeResult">Tidak diketahui</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio13" label="2" @change.native="judgeResult">Tidak punya kerja</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio13" label="3" @change.native="judgeResult">Berkerja</el-radio>
            </template>
          </el-col>
          <el-col>
            <template v-if="dialogType === '6'">
              <span>pertanyaan 3：Kira-kira sudah berapa lama bekerja?</span><br/>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio14" label="1">Tidak diketahui</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio14" label="2">3 bulan kebawah</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio14" label="3">3-6 bulan</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio14" label="4">6-12 bulan</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio14" label="5">1 tahun keatas</el-radio>
            </template>
          </el-col>
          <el-col v-if="dialogType === '6'">
            <template>
              <span>pertanyaan 4：Apakah kira-kira peminjam sedang dikejar penagihan oleh perusahaan lainnya?</span><br/>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio15" label="1" @change.native="judgeResult">Tidak diketahui</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio15" label="2" @change.native="judgeResult">Tidak</el-radio>
              <el-radio :disabled="companyDisabled" v-model="dialogResultRadio15" label="3" @change.native="judgeResult">penerima telepon memberikan respon negatif terhadap pemohon</el-radio>
            </template>
          </el-col>
          <!--<el-col v-if="dialogType === '6'">-->
          <!--<template>-->
          <!--<span>Informasi diragukan：</span><br/>-->
          <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio16" label="1">Ya</el-radio>-->
          <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio16" label="2">Bukan</el-radio>-->
          <!--</template>-->
          <!--</el-col>-->
          <el-col>
            <div class="grid-content bg-purple"><span>hasil verifikasi telepon：</span>
              <template v-if="dialogType === '1'">
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio21" label="1">nomor kosong/tidak terdaftar/salah</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio21" label="2" @change.native="setSmallDialog(1)">sedang sibuk</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio21" label="3">dialihkan/pembatasan panggilan masuk</el-radio>
              </template>
              <template v-if="dialogType === '2'">
                <el-radio :disabled="companyDisabled2" v-model="dialogResultRadio22" label="1" @change.native="getCurrentRow">penerima tlp menolak menjawab</el-radio>
                <el-radio :disabled="companyDisabled2" v-model="dialogResultRadio22" label="2" @change.native="getCurrentRow">Telepon beberapa saat lagi</el-radio>
                <el-radio :disabled="companyDisabled2" v-model="dialogResultRadio22" label="3" @change.native="getCurrentRow">Informasi diragukan</el-radio>
                <el-radio :disabled="companyDisabled2" v-model="dialogResultRadio22" label="4" @change.native="getCurrentRow">tolak</el-radio>
                <el-radio :disabled="companyDisabled2" v-model="dialogResultRadio22" label="5" @change.native="getCurrentRow">LULUS</el-radio>
                <el-radio :disabled="companyResultDisabled" v-model="dialogResultRadio221" label="6">Best</el-radio>
                <el-radio :disabled="companyResultDisabled" v-model="dialogResultRadio221" label="7">Baik</el-radio>
                <el-radio :disabled="companyResultDisabled" v-model="dialogResultRadio221" label="8">Normal</el-radio>
              </template>
              <template v-if="dialogType === '3'">
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio23" label="1">nomor kosong/tidak terdaftar/salah</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio23" label="2" @change.native="setSmallDialog(2)">sedang sibuk</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio23" label="3">dialihkan/pembatasan panggilan masuk</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio23" label="4" @change.native="setSmallDialog(2)">tidak dalam area jasa layanan</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio23" label="5" @change.native="setSmallDialog(2)">tidak</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio23" label="6">tidak aktif</el-radio>
              </template>
              <template v-if="dialogType === '4'">
                <el-radio :disabled="companyDisabled4" v-model="dialogResultRadio24" label="1">penerima tlp menolak menjawab</el-radio>
                <el-radio :disabled="companyDisabled4" v-model="dialogResultRadio24" label="2">Telepon beberapa saat lagi</el-radio>
                <el-radio :disabled="companyDisabled4" v-model="dialogResultRadio24" label="3">Informasi diragukan</el-radio>
                <el-radio :disabled="companyDisabled4" v-model="dialogResultRadio24" label="4">tolak</el-radio>
                <el-radio :disabled="companyDisabled4" v-model="dialogResultRadio24" label="5">LULUS</el-radio>
              </template>
              <template v-if="dialogType === '5'">
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio25" label="1">nomor kosong/tidak terdaftar/salah</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio25" label="2" @change.native="setSmallDialog(3)">sedang sibuk</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio25" label="3">dialihkan/pembatasan panggilan masuk</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio25" label="4" @change.native="setSmallDialog(3)">tidak dalam area jasa layanan</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio25" label="5" @change.native="setSmallDialog(3)">tidak</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio25" label="6">tidak aktif</el-radio>
              </template>
              <template v-if="dialogType === '6'">
                <el-radio :disabled="companyDisabled6" v-model="dialogResultRadio26" label="1">penerima tlp menolak menjawab</el-radio>
                <el-radio :disabled="companyDisabled6" v-model="dialogResultRadio26" label="2">Telepon beberapa saat lagi</el-radio>
                <el-radio :disabled="companyDisabled6" v-model="dialogResultRadio26" label="3">Informasi diragukan</el-radio>
                <el-radio :disabled="companyDisabled6" v-model="dialogResultRadio26" label="4">tolak</el-radio>
                <el-radio :disabled="companyDisabled6" v-model="dialogResultRadio26" label="5">LULUS</el-radio>
              </template>
            </div>
          </el-col>
          <el-col>
            <span> keterangan：</span>
            <el-input
              type="textarea"
              :rows="8"
              placeholder="Tidak lebih dari 800 huruf"
              v-model="checkTextarea"
              class = 'textarear'>
            </el-input>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple"><span>Tambahkan waktu：</span>
              <template>
                <el-date-picker
                  v-model="phoneCheckDate"
                  type="datetime"
                  placeholder="Pilih hari dan waktu"
                  format="yyyy-MM-dd hh:mm">
                </el-date-picker>
              </template>
            </div>
          </el-col>
          <span slot="footer" class="dialog-footer">
                  <el-button @click="phoneCheckBack(dialogType)">BATAL</el-button>
                  <el-button v-if="!this.companyDisabled" type="primary" @click="companyReviewCommit(dialogType)"> YAKIN</el-button>
                </span>
        </el-dialog>
        <el-dialog
          title="keterangan"
          :visible.sync="checkDialogVisible"
          width="50%"
          v-loading="phoneCheckDialogLoading">
          <el-col>
            <div class="grid-content bg-purple"><span>hasil verifikasi telepon：</span>
              <template v-if="dialogType === '1'">
                <el-radio v-model="dialogResultRadio" label="1">dialihkan/pembatasan panggilan masuk</el-radio>
                <el-radio v-model="dialogResultRadio" label="2">sedang sibuk</el-radio>
              </template>
              <template v-if="dialogType === '2'">
                <el-radio v-model="dialogResultRadio" label="1">Best</el-radio>
                <el-radio v-model="dialogResultRadio" label="2">Baik</el-radio>
                <el-radio v-model="dialogResultRadio" label="3">Normal</el-radio>
              </template>
              <template v-if="dialogType === '3'">
                <el-radio v-model="dialogResultRadio" label="1">penerima tlp menolak menjawab/tidak bisa menentukan apakah benar bekerja di perusahaan tsb</el-radio>
                <el-radio v-model="dialogResultRadio" label="2">sudah 3x menelepon</el-radio>
              </template>
              <template v-if="dialogType === '4'">
                <el-radio v-model="dialogResultRadio" label="1">sudah tidak bekerja di perusahaan tsb</el-radio>
                <el-radio v-model="dialogResultRadio" label="2">nomor kosong/tidak terdaftar/salah</el-radio>
                <el-radio v-model="dialogResultRadio" label="3">penerima telepon memberikan respon negatif terhadap pemohon</el-radio>
              </template>
              <template v-if="dialogType === '5'">
                <el-radio v-model="dialogResultRadio" label="1">sedang sibuk</el-radio>
                <el-radio v-model="dialogResultRadio" label="2">pemohon menyuruh Telepon beberapa saat lagi </el-radio>
                <el-radio v-model="dialogResultRadio" label="3">tidak</el-radio>
                <el-radio v-model="dialogResultRadio" label="4">tidak dalam area jasa layanan</el-radio>
                <el-radio v-model="dialogResultRadio" label="5">dialihkan/pembatasan panggilan masuk</el-radio>
                <el-radio v-model="dialogResultRadio" label="6">penerima bukan pemohon langsung</el-radio>
              </template>
              <template v-if="dialogType === '6'">
                <el-radio v-model="dialogResultRadio" label="1">Best</el-radio>
                <el-radio v-model="dialogResultRadio" label="2">Baik</el-radio>
                <el-radio v-model="dialogResultRadio" label="3">Normal</el-radio>
              </template>
              <template v-if="dialogType === '7'">
                <el-radio v-model="dialogResultRadio" label="1">pemohon meminta untuk dibatalkan</el-radio>
                <el-radio v-model="dialogResultRadio" label="2">pemohon tidak mau bekerja sama dalam proses verifikasi</el-radio>
                <el-radio v-model="dialogResultRadio" label="3">nomor kosong/tidak terdaftar/salah</el-radio>
                <el-radio v-model="dialogResultRadio" label="4">tidak aktif</el-radio>
                <el-radio v-model="dialogResultRadio" label="5">tidak memenuhi standar untuk meminjam</el-radio>
                <el-radio v-model="dialogResultRadio" label="6">yg bersangkutan tidak mengajukan permohonan</el-radio>
                <el-radio v-model="dialogResultRadio" label="7">informasi palsu/ada kemungkinan penipuan</el-radio>
                <el-radio v-model="dialogResultRadio" label="8">sudah 3x menelepon</el-radio>
              </template>
            </div>
          </el-col>
          <el-col>
            <span>keterangan：</span>
            <el-input
              type="textarea"
              :rows="10"
              placeholder="Tidak lebih dari 800 huruf"
              v-model="checkTextarea"
              class = 'textarear'>
            </el-input>
          </el-col>
          <el-col v-if="this.dialogType < 5">
            <div class="grid-content bg-purple"><span>durasi kerja：</span>
              <template>
                <el-radio v-model="workYearRadio" label="1">Tidak diketahui</el-radio>
                <el-radio v-model="workYearRadio" label="2">3 bulan kebawah</el-radio>
                <el-radio v-model="workYearRadio" label="3">3-6 bulan</el-radio>
                <el-radio v-model="workYearRadio" label="4">6-12 bulan</el-radio>
                <el-radio v-model="workYearRadio" label="5">1-3 tahun</el-radio>
                <el-radio v-model="workYearRadio" label="6">3 tahun keatas</el-radio>
              </template>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple"><span>Tambahkan waktu：</span>
              <template>
                <el-date-picker
                  v-model="phoneCheckDate"
                  type="datetime"
                  placeholder="Pilih hari dan waktu"
                  format="yyyy-MM-dd hh:mm">
                </el-date-picker>
              </template>
            </div>
          </el-col>
          <span slot="footer" class="dialog-footer">
            <el-button @click="phoneCheckBack(0)">BATAL</el-button>
            <el-button type="primary" @click="phoneCheckCommit(dialogType)">YAKIN</el-button>
          </span>
        </el-dialog>
      </el-row>
      <div class="divid-line"></div>
      <el-row>
        <el-col :span="2"><div class="grid-content bg-purple">pertanyaan 1：</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[0].question}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">jawaban yg benar：</div></el-col>
        <el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[0].question === 'Sebutkan alamat tempat tingal pada KTP Anda?'">
          <img :src="phoneCheckQuestions[0].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[0].answer)" alt="" width="150px" height="100px">
        </div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[0].answer}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">jawaban pengguna：</div></el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <template>
              <el-radio v-model="phoneRadio1" label="1">benar</el-radio>
              <el-radio v-model="phoneRadio1" label="0">salah</el-radio>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div class="grid-content bg-purple">pertanyaan 2：</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[1].question}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">jawaban yg benar：</div></el-col>
        <el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[1].question === 'Sebutkan alamat tempat tingal pada KTP Anda?'">
          <img :src="phoneCheckQuestions[1].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[1].answer)" alt="" width="150px" height="100px">
        </div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[1].answer}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">jawaban pengguna：</div></el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <template>
              <el-radio v-model="phoneRadio2" label="1">benar</el-radio>
              <el-radio v-model="phoneRadio2" label="0">salah</el-radio>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div class="grid-content bg-purple">pertanyaan 3：</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[2].question}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">jawaban yg benar：</div></el-col>
        <el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[2].question === 'Sebutkan alamat tempat tingal pada KTP Anda?'">
          <img :src="phoneCheckQuestions[2].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[2].answer)" alt="" width="150px" height="100px">
        </div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[2].answer}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">jawaban pengguna：</div></el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <template>
              <el-radio v-model="phoneRadio3" label="1">benar</el-radio>
              <el-radio v-model="phoneRadio3" label="0">salah</el-radio>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <span class="two-title">Verifikasi yang bersangkutan &nbsp;<el-button v-if="phoneCheckStartVif" @click="phoneCheckStart" type="primary">Mulai</el-button><el-button v-if="phoneCheckEndVif" @click="phoneCheckEnd" type="info">selesai</el-button></span>
        <template>
          <el-table
            :data="phoneChecktableData"
            style="width: 100%">
            <el-table-column
              type="index"
              label="No.urut"
              width="60">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="waktu mulai"
              width="105">
            </el-table-column>
            <el-table-column
              prop="endTime"
              label="waktu selesai"
              width="105">
            </el-table-column>
            <el-table-column
              prop="burningTime"
              label="Durasi"
              width="90">
            </el-table-column>
            <el-table-column
              prop="teleReviewResult"
              label="hasil verifikasi telepon"
              width="170">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="Keterangan Lainnya"
              width="170">
            </el-table-column>
            <el-table-column
              prop="alertTime"
              label="pemberitahuan selanjutnya"
              width="105">
            </el-table-column>
            <el-table-column prop="updateTime" label="Tambahkan waktu" width="105">
            </el-table-column>
            <el-table-column
              label="Opsi"
              width="220" align="center">
              <template scope="scope">
                <el-button-group style="padding:5px;">
                  <el-button v-if="scope.row.remark==''" @click="phoneCheckClick(scope.row,scope.$index, 5)"  type="primary" class="company-pass" round size="medium">Telepon beberapa saat lagi</el-button>
                  <el-button v-if="scope.row.remark==''" @click="phoneCheckClick(scope.row,scope.$index, 6)" class="company-pass" type="primary" round size="medium">LULUS</el-button>
                  <el-button v-if="scope.row.remark==''" @click="phoneCheckClick(scope.row,scope.$index, 7)" class="company-pass" round type="danger" size="medium">tolak </el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-row>
    </el-row>
    <!-- 提交   -->
    <el-form id="btnForm">
      <el-form-item align="right">
        <el-button @click="dialogVisible=true" type="primary">Batalkan</el-button>
        <el-button @click="dialogVisible1=true" type="primary">Yakin</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="Tolak permohonan"
      :visible.sync="dialogVisible"
      width="50%">
      <el-col>
        <i class="el-icon-warning"></i>Pemohon milik akun{{baseInfList.realName}}Silakan tulis opini atau keterangan akhir pada kololm di bawah ini.
      </el-col>
      <el-input
        type="textarea"
        :rows="6"
        placeholder=""
        v-model="reviewRemark"
        class = 'textarear'>
      </el-input>
      <span slot="footer" class="dialog-footer">
  <el-button @click="dialogVisible = false">Batalkan</el-button>
  <el-button type="primary" @click="reviewRefuse">Yakin</el-button>
</span>
    </el-dialog>
    <el-dialog
      title="Apakah Anda yakin mengirim hasil verifikasi ini?"
      :visible.sync="dialogVisible1"
      width="50%">
      <!-- <el-col>
        <i class="el-icon-question"></i> YAKIN社和提交吗？
      </el-col> -->
      <!-- <el-input
      type="textarea"
      :rows="6"
      placeholder=""
      v-model="reviewRemark1">
    </el-input> -->
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible1 = false">BATAL</el-button>
      <el-button type="primary" @click="reviewPass">YAKIN</el-button>
    </span>
    </el-dialog>

  </section>
</template>
<script>
  import mlPhotoBox from '../../components/_photoBox.vue'
  import enums from '../../common/Enum'
  import DataUtil from '../../common/dataUtil'
  import Config from '../../common/config'
  import { videoPlayer } from 'vue-video-player'
  import ElButtonGroup from "../../../node_modules/element-ui/packages/button/src/button-group.vue";
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    components: {
      ElCol,
      ElButtonGroup,
      mlPhotoBox,
      videoPlayer
    },
    data () {
      // let compareDate = (time) => {
      //   let _time = time.setDate(time.getDate()+1);
      //   return time.getTime() <= Date.now();
      // }
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

        orderStatus: {
          borrowingCount: '',//借款次数
          createTime: '',//申请时间
          uuid: '', //订单编号;
          borrowUse:''
        },
        status: '', //审核结果
        remark: '', //审核意见
        companyDisabled: false,
        companyDisabled2: false,
        companyDisabled4: false,
        companyDisabled6: false,
        companyDialogVisible:false,
        companyResultDisabled: true,
        // 电话审核radio
        phoneRadio1: "1",
        phoneRadio2: "1",
        phoneRadio3: "1",
        dialogResultRadio: "0",
        dialogResultRadio21: "0",
        dialogResultRadio221: "0",
        dialogResultRadio22: "0",
        dialogResultRadio23: "0",
        dialogResultRadio24: "0",
        dialogResultRadio25: "0",
        dialogResultRadio26: "0",
        dialogResultRadio1:"0",
        dialogResultRadio2:"0",
        dialogResultRadio3:"0",
//        dialogResultRadio4:"0",
        dialogResultRadio5:"0",
        dialogResultRadio6:"0",
        dialogResultRadio7:"0",
        dialogResultRadio8:"0",
        dialogResultRadio9:"0",
//        dialogResultRadio10:"0",
        dialogResultRadio11:"0",
        dialogResultRadio12:"0",
        dialogResultRadio13:"0",
        dialogResultRadio14:"0",
        dialogResultRadio15:"0",
        judgeWhichSamllDialog: '1',
        smallCompanyDialogVisible: false,
        smallCompany: "0",
//        dialogResultRadio16:"0",
        workYearRadio: "0",
        phoneChecktableData: [],
        comPhoneChecktableData: [],
        phoneCheckCurrent: {
          "remark": "",
          "orderTag": 0,
          "alertTime": '',
          "startTime": '',
          "endTime": '',
          "burningTime": "",
          "current": true,
          "workYear": "",
          "teleReviewResult":""
        },
        comPhoneCheckCurrent: {
          "remark": "",
          "orderTag": 0,
          "alertTime": '',
          "startTime": '',
          "endTime": '',
          "burningTime": "",
          "current": true,
          "workYear": "",
          "teleReviewResult":"",
          "realName":'',
          "mobile":'',
          "teleReviewObject":"Nomor telepon",
          "teleReviewOperationType":"",
          "teleReviewResultType":""
        },comPhoneCheckCurrent1: {
          "remark": "",
          "orderTag": 0,
          "alertTime": '',
          "startTime": '',
          "endTime": '',
          "burningTime": "",
          "current": true,
          "workYear": "",
          "teleReviewResult":"",
          "realName":'',
          "mobile":'',
          "teleReviewObject":"Nomor telepon",
          "teleReviewOperationType":"",
          "teleReviewResultType":""
        },comPhoneCheckCurrent2: {
          "remark": "",
          "orderTag": 0,
          "alertTime": '',
          "startTime": '',
          "endTime": '',
          "burningTime": "",
          "current": true,
          "workYear": "",
          "teleReviewResult":"",
          "realName":'',
          "mobile":'',
          "teleReviewObject":"Nomor telepon",
          "teleReviewOperationType":"",
          "teleReviewResultType":""
        },
        workYear:[{
          code: 'DEFALUT',
          name: '',
          value:'0'
        },{
          code: 'WEIZHI',
          name: 'Tidak diketahui',
          value:'1'
        },{
          code: 'THREEMONTH',
          name: '3 bulan kebawah',
          value:'2'
        },{
          code: 'THREE_SIX_MONTH',
          name: '3-6 bulan',
          value:'3'
        },{
          code: 'SIX_TWELE_MONTH',
          name: '6-12 tahun',
          value:'4'
        },{
          code: 'ONE_THREE_YEAR',
          name: '1-3 tahun',
          value:'5'
        },{
          code: 'THREE_YEAR_UP',
          name: '3 tahun keatas',
          value:'6'
        }],
        facePhotoUrls:'',
        phoneCheckQuestions: [{'question':'','answer':''},
          {'question':'','answer':''},
          {'question':'','answer':''}],
        checkDialogVisible: false,
        checkTextarea: '',
        dialogType:'1',
        phoneCheckDate: '',
        phoneCheckStartVif: true,
        phoneCheckEndVif: false,
        comPhoneCheckStartVif: true,
        // comPhoneCheckEndVif: false,
        recordStartTime: '',
        comRecordStartTime: new Date(),
        burningTime:'',
        recordEndTime: '',
        comRecordEndTime: '',
        phoneCheckDialogLoading: false,
        phoneCheckId: '',
        comPhoneCheckId: '',
        phoneCheckIndex: '',
        comPhoneCheckIndex: '',

        textarea: '',
        orderNo: '',
        totalLinkMan: 0,//通讯录个数
        linkData: [],//通讯录
        dicFlag: [],//通讯录标签
        callLogData: [],//通话记录
        moxieCallLogData: [],//通话记录
        passOrNot:'0',//1表示没有tolak 的电审
        //baseInf Tamu/pelanggan基本信息

        // 基本信息
        baseInfList: {},
        historyData: [],
        jobInfList: {},
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
        isActive:true,
        noActive:false,
        baseInfRemark: '',
        jobInfRemark: '',
        connectInfRemark: '',
        faceCheckRemark: '',
        videoCheckRemark: '',
        addtionInfRemark: '',
        firstReviewSuggest: '',
        firstCheckSuggest: '',
        secondReviewSuggest: '',
        ddzhuangtai : [{
          code: 'SUBMITTING',
          name: 'Menunggu mengirim',
          value:'1'
        }, {
          code: 'MACHINE_CHECKING',
          name: 'menunggu verifikasi otomatis',
          value:'2'
        }, {
          code: 'FIRST_CHECK',
          name: 'Menunggu verifikasi manual pertama',
          value:'3'
        },{
          code: 'SECOND_CHECK',
          name: 'Menunggu verifikasi manual akhir ',
          value:'4'
        },{
          code: 'LOANING',
          name: 'Menunggu dana cair',
          value:'5'
        }, {
          code: 'LOANING_DEALING',
          name: 'Dalam proses pencairan dana',
          value:'6'
        }, {
          code: 'RESOLVING_NOT_OVERDUE',
          name: 'Menunggu pelunasan pinjaman',
          value:'7'
        },{
          code: 'RESOLVING_OVERDUE',
          name: 'Menunggu pelunasan pinjaman (terlambat) ',
          value:'8'
        }, {
          code: 'RESOLVED_DEALING',
          name: 'Dalam proses pelunasan pinjaman',
          value:'9'
        }, {
          code: 'RESOLVED_NOT_OVERDUE',
          name: 'Pelunasan tepat waktu ',
          value:'10'
        },{
          code: 'RESOLVED_OVERDUE',
          name: 'Pelunasan terlambat ',
          value:'11'
        },{
          code: 'MACHINE_CHECK_NOT_ALLOW',
          name: 'Tidak lulus verifikasi otomatis',
          value:'12'
        }, {
          code: 'FIRST_CHECK_NOT_ALLOW',
          name: 'Tidak lulus verifikasi manual pertama',
          value:'13'
        }, {
          code: 'SECOND_CHECK_NOT_ALLOW',
          name: 'Tidak lulus verifikasi manual akhir',
          value:'14'
        }, {
          code: 'CANCEL',
          name: 'Permohonan dibatalkan',
          value:'15'
        }, {
          code: 'LOAN_FAILD',
          name: 'Pinjaman gagal',
          value:'16'
        }],
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
            "description":'9、出生年月为偶数但身份证背景为红色/出生年月为奇数但身份证背景为蓝色？'
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
            "description":'13、居住地址Ya公共场所（例如：填写某商场/政府 /公园或广场等)？'
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
            "description":'9、职位跟公司不匹配（例如：职位Ya教师但公司名称不Ya学校）？'
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
          "ruleLevel":3,
          "ruleResult":false,
          "description":'1、手持照片看不清人脸（非身份证）？ '
        },{
          "ruleCount":2,
          "ruleLevel":1,
          "ruleResult":false,
          "description":'2、手持照片人脸（非身份证）与活体人脸不一致？ '
        },{
          "ruleCount":3,
          "ruleLevel":1,
          "ruleResult":false,
          "description":'3、活体识别与驾驶证照片不一致？ '
        },{
          "ruleCount":4,
          "ruleLevel":1,
          "ruleResult":false,
          "description":'4、无法判断驾驶证照片与活体识别是否一致？ '
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
          attachmentName:"Kartu Kredit",
          attachmentType:4,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"SIM",
          attachmentType:5,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"NPWP",
          attachmentType:6,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"Slip gaji",
          attachmentType:7,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"mutasi bank",
          attachmentType:8,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"buku bank",
          attachmentType:9,
          attachmentUrl: require("../../assets/none.png")
        }],
        workerSeen: true,
        studentSeen: false,
        userUuid: "",
        uuid: "",
        IsStudents: false,
        flager:true,
        dialogVisible: false,
        dialogVisible1: false,
        reviewRemark:'',
        reviewRemark1:'',
        pairVerifySimilarity:''
      }
    },
    methods: {
      judgeResult () {
        if (this.dialogResultRadio1 == '2'
          || this.dialogResultRadio3 == '2') {
          this.companyResultDisabled = true;
          this.companyDisabled2 = true;
          this.dialogResultRadio22 = '4';
        } else {
          // this.companyResultDisabled = false;
          this.companyDisabled2 = false;
          this.dialogResultRadio22 = '0';
        }
        if (this.dialogResultRadio7 == '2'
          || this.dialogResultRadio9 == '3') {
          this.companyDisabled4 = true;
          this.dialogResultRadio24 = '4';
        } else {
          this.companyDisabled4 = false;
          this.dialogResultRadio24 = '0';
        }
        if (this.dialogResultRadio11 == '1'
          || this.dialogResultRadio13 == '2'
          || this.dialogResultRadio15== '3') {
          this.companyDisabled6 = true;
          this.dialogResultRadio26 = '4';
        } else {
          this.companyDisabled6 = false;
          this.dialogResultRadio26 = '0';
        }
      },
      getCurrentRow () {
        if (this.dialogResultRadio22 == '5') {
          this.companyResultDisabled = false;
          this.dialogResultRadio22 = '0';
        } else {
          this.companyResultDisabled = true;
          this.dialogResultRadio221 = '0';
        }
      },
      setSmallDialog (type) {
        this.smallCompanyDialogVisible = true;
        if (type == 1) {
          this.judgeWhichSamllDialog = '1';
        } else if (type == 2) {
          this.judgeWhichSamllDialog = '2';
        } else if (type == 3) {
          this.judgeWhichSamllDialog = '3';
        }
//        if (this.dialogResultRadio22 == '5') {
//          this.companyResultDisabled = false;
//          this.dialogResultRadio22 = '0';
//        } else {
//          this.companyResultDisabled = true;
//          this.dialogResultRadio221 = '0';
//        }
      },
      formatUnixDateTime(time){
        return DataUtil.formatUnixDateTime(time);
      },
      getWorkType(type) {
        let re = '';
        this.workYear.forEach(obj => {
          if (obj.value == type) {
            re = obj.name;
            return
          }
        });
        return re
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
      getdates(dates) {
        if (!dates) {
          return '';
        }
        var myDate = new Date(dates);
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
      //当前订单状态
      getOrderStatus(){
        let _data={
          "uuid": this.uuid,
        }
        this.$http.post("manage/orderInfoByUuid", _data).then(response => {
          if (1 == response.body.code) {
            this.orderStatus=response.body.data;
            this.orderStatus.createTime=this.getdates(this.orderStatus.createTime);
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
            this.getBaseInf(this.userUuid,8);
            this.getPhoneCheck(this.orderStatus.userRole);
          }
        })
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
      //获取审核意见
      getcheckSuggest(){
        let _data={
          "uuid": this.uuid,
          "langue": 2
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

      //获取历史订单
      getHistoryDetail(){
        let _data={
          "uuid": this.userUuid
        }
        this.historyLoading=true;
        this.$http.post("manage/orderHistoryListByUserUuid", _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code) {
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
      //枚举订单状态
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
      //获取审核规则
      getCheckRule(){
        for(let type=1;type<10;type++){
          if (this.studentSeen && type == 3) {
            continue;
          } else if (this.workerSeen && type == 4) {
            continue ;
          }
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
          if (1 == response.body.code) {
            Object.assign(this.baseInfList,response.body.data);
            this.baseInfList=Object.assign({},this.baseInfList);
            if(this.baseInfList.maritalStatus==0){
              this.baseInfList.maritalStatus="Single"
            }else if(this.baseInfList.maritalStatus==1){
              this.baseInfList.maritalStatus="Menikah"
            }else {
              this.baseInfList.maritalStatus="Cerai"
            }
            if(this.baseInfList.sex==0){
              this.baseInfList.sex="Tidak diketahui"
            }else if(this.baseInfList.sex==1){
              this.baseInfList.sex="Laki-Laki"
            }else {
              this.baseInfList.sex="Perempuan"
            }
          }
        })
      },
      //获取用户基本信息
      getBaseInf(userUuid,type){
        let _data={
          "userUuid": this.userUuid,
          "type": type,
          "langue":2,
        }
        let urlss;
        if(this.orderStatus.status>4){
          urlss="manage/orderUserDataMongo"
        }else{
          urlss="manage/orderUserDataSql";
        }
        this.$http.post(urlss, _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code) {
            var data=response.body.data;

            if(type==2){
              this.$http.post(urlss,_data).then(response => {
                if (1 == response.body.code) {
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
              this.getComPhoneCheck(this.orderStatus.userRole);
            }
            if(type==5){
              this.connectInfList=data;
            }
            if(type==6){
              if(data[0].attachmentType==2){
                this.facePhotoUrls=data[0].attachmentUrl;
                if (data[1]) {
                  this.playerOptions.sources[0].src=data[1].attachmentUrl;
                }
              }else {
                this.playerOptions.sources[0].src=data[0].attachmentUrl;
                if (data[1]) {
                  this.facePhotoUrls=data[1].attachmentUrl;
                }
              }
            }
            if(type==8){
              let adt=this.addtionInfList;
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
            // if(type==9){
            //   this.playerOptions.sources[0].src=data[0].attachmentUrl;
            // }
          }
        })
      },
      //提交复审

      reviewPass(){
        this.phoneCheckQuestions[0].result = Number(this.phoneRadio1);
        this.phoneCheckQuestions[1].result = Number(this.phoneRadio2);
        this.phoneCheckQuestions[2].result = Number(this.phoneRadio3);
        let _dataOne={
          "orderNo": this.uuid,
          "resultRequests":this.phoneCheckQuestions,
          "langue":2,
          "userUuid":this.userUuid
        }
        this.$http.post("manage/saveTeleReviewResult", _dataOne);

        let passOrNot = '';
        if (Number(this.phoneRadio1)+Number(this.phoneRadio2)+Number(this.phoneRadio3) >=2 &&
          this.passOrNot == '0') {
          passOrNot = '0';
        } else {
          passOrNot = '1';
        }
        var Orderstar = localStorage.getItem("semyCat");
        var Orderstartime = new Date(Orderstar);
        var Orderendtime = new Date();
        let dureTime=(Orderendtime-Orderstartime)/1000;
        let dureTimeH=Math.floor(dureTime/3600);
        let dureTimeM=Math.floor((dureTime%3600)/60);
        let dureTimeS=Math.floor((dureTime%3600)%60);
        this.burningTime=dureTimeH+":"+dureTimeM+":"+dureTimeS;
        let _data={
          "remark": this.reviewRemark1,  //必填
          "orderNo": this.uuid,
          "sessionId": this.sessionId,
          "pass":  passOrNot,
          "burningTime":this.burningTime
        };
        this.$http.post("manage/secondCheck", _data).then(response => {
            this.historyLoading = false;
            if (1 == response.body.code) {
              this.dialogVisible1=false
              this.$message("Kirim Berhasil");
              window.close();
              window.open('#/RiviewTheListSecond');
              return;
            }else{
              this.$message(response.body.message);
              this.dialogVisible=false;
              window.close();
              window.open('#/RiviewTheListSecond');
              return;
            }
          }

        )
      },
      rowClick(row){
        window.open('#/completeOrderDetail?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
      },
      //活体识别分
      getPairVerifySimilarity(){
        let _data={
          "userUuid":this.userUuid,
          "orderNo":this.uuid
        }
        this.$http.post("manage/getPairVerifySimilarity", _data).then(response => {
          if (1 == response.body.code && response.body.data) {
            this.pairVerifySimilarity = response.body.data;
          }
          if (this.pairVerifySimilarity >40 && this.pairVerifySimilarity <60 && this.addtionInfList[1].attachmentUrl) {
            this.flager = true;
          }else {
            this.flager = false;
          }
        })

      },

      //图片点击放大展示
      teleReviewCardUrlClick(url){
        if(url){
          let _photoList = [
            url
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
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

      reviewRefuse(){
        if(this.reviewRemark==''){
          this.$message("Keterangan verifikasi wajib diisi！");
          return;
        }
        this.phoneCheckQuestions[0].result = Number(this.phoneRadio1);
        this.phoneCheckQuestions[1].result = Number(this.phoneRadio2);
        this.phoneCheckQuestions[2].result = Number(this.phoneRadio3);
        let _dataOne={
          "orderNo": this.uuid,
          "resultRequests":this.phoneCheckQuestions,
          "langue":  2,
          "userUuid":this.userUuid
        }
        this.$http.post("manage/saveTeleReviewResult", _dataOne);
        var Orderstar = localStorage.getItem("semyCat");
        var Orderstartime = new Date(Orderstar);
        var Orderendtime = new Date();
        let dureTime=(Orderendtime-Orderstartime)/1000;
        let dureTimeH=Math.floor(dureTime/3600);
        let dureTimeM=Math.floor((dureTime%3600)/60);
        let dureTimeS=Math.floor((dureTime%3600)%60);
        this.burningTime=dureTimeH+":"+dureTimeM+":"+dureTimeS;
        let _data={
          "remark": this.reviewRemark,  //必填
          "orderNo": this.uuid,
          "sessionId": this.sessionId,
          "pass":2,
          "burningTime":this.burningTime
        }
        this.$http.post("manage/secondCheck", _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code) {
            this.dialogVisible1=false;
            this.$message("Kirim Berhasil");
            window.close();
            window.open('#/RiviewTheListSecond');
            return;
          }else{
            this.$message(response.body.message);
            this.dialogVisible=false;
            window.close();
            window.open('#/RiviewTheListSecond');
            return;
          }
        })
      },
      getPhoneCheck(type){
        let phoneCheckType;
        if(type==1){
          phoneCheckType=1;
        }else {
          phoneCheckType=2;
        }
        let _data={
          "orderNo": this.uuid,
          "type": phoneCheckType,
          "uuid": this.userUuid,
          "langue":2,
          "teleReviewType":1
        }
        this.$http.post("manage/getTeleReviewQuestion", _data).then(response => {

          this.phoneCheckQuestions=response.body.data.questions;
          if (response.body.data.pass == '1') {
            this.passOrNot = '1';
          }
          let res=response.body.data.remarks;
          if (!res) {
            return;
          }
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
            if(e.updateTime && e.remark){
              e.updateTime=this.getdate(e.updateTime);
            } else {
              e.updateTime = "";
            }
            // e.current=false;
          });
          this.phoneChecktableData=res;
          this.phoneChecktableData.push(this.phoneCheckCurrent);
        })
      },
      getComPhoneCheck(type){
        this.getCompanyReviewContract(type);
      },
      getCompanyReviewContract(type){
        let _data={
          "orderNo": this.uuid
        };
        this.$http.post("manage/frequentOrderUserCallRecordMongo", _data).then(response => {

          let result = response.body.data;
          if (result) {
            this.realName1 = result[0].realName;
            this.mobile1 = result[0].mobile;
          }
          if (result && result.length == 2) {
            this.realName2 = result[1].realName;
            this.mobile2 = result[1].mobile;
          }
          let _data={
            "orderNo": this.uuid,
            "type": type,
            "uuid": this.userUuid,
            "langue":2,
            "teleReviewType":3
          };
          this.$http.post("manage/getTeleReviewQuestion", _data).then(response => {

            if (response.body.data.pass == '1') {
              this.passOrNot = '1';
            }
            let res=response.body.data.remarks;
            res.forEach(e=> {
              if (e.startTime) {
                e.startTime = this.getdate(e.startTime);
              }
              if (e.endTime) {
                e.endTime = this.getdate(e.endTime);
              }
              if (e.alertTime) {
                e.alertTime = this.getdate(e.alertTime);
              }
              if (e.updateTime && e.remark) {
                e.updateTime = this.getdate(e.updateTime);
              } else {
                e.updateTime = "";
              }
              // 处理公司审核对象
              if (e.teleReviewOperationType == 1 || e.teleReviewOperationType == 2) {
                e.teleReviewObject = 'Nomor telepon';
              } else if (e.teleReviewOperationType == 3 || e.teleReviewOperationType == 4) {
                e.teleReviewObject = 'Kontak yg sering dihubungi ke-1';
              } else if (e.teleReviewOperationType == 5 || e.teleReviewOperationType == 6) {
                e.teleReviewObject = 'Kontak yg sering dihubungi ke-2';
              }
            });
            this.comPhoneChecktableData=res;
            if ((res == null || res == '') && type == 2) {
              this.comPhoneCheckCurrent.realName = this.jobInfList.companyName;
              this.comPhoneCheckCurrent.mobile = this.jobInfList.companyPhone;
              this.comPhoneChecktableData.push(this.comPhoneCheckCurrent);
            }else if ((res == null || res == '') && type == 1) {
              this.comPhoneCheckCurrent.teleReviewObject = 'Kontak yg sering dihubungi ke-1';
              this.comPhoneCheckCurrent.realName = this.realName1;
              this.comPhoneCheckCurrent.mobile = this.mobile1;
              this.comPhoneChecktableData.push(this.comPhoneCheckCurrent);
            }
            if (res && res.length > 0) {
              let teleType = res[res.length-1].teleReviewOperationType;
              let pass = response.body.data.pass;
              //第一常用联系人
              if (pass == 2 || (!pass && (teleType == 1 || teleType == 2))
                || (pass == 4 && (teleType == 3 || teleType == 4))) {
                this.comPhoneCheckCurrent.teleReviewObject = 'Kontak yg sering dihubungi ke-1';
                this.comPhoneCheckCurrent.realName = this.realName1;
                this.comPhoneCheckCurrent.mobile = this.mobile1;
                //                this.comPhoneCheckId = '';
                this.comPhoneChecktableData.push(this.comPhoneCheckCurrent);
              } else if (pass == 3 || (!pass && (teleType == 3 || teleType == 4))
                || (pass == 4 && (teleType == 5 || teleType == 6))) {
                this.comPhoneCheckCurrent.teleReviewObject = 'Kontak yg sering dihubungi ke-2';
                this.comPhoneCheckCurrent.realName = this.realName2;
                this.comPhoneCheckCurrent.mobile = this.mobile2;
                //                this.comPhoneCheckId = '';
                this.comPhoneChecktableData.push(this.comPhoneCheckCurrent);
                //稍后再拨
              } else if (pass == 4 && (teleType == 1 || teleType == 2)) {
                this.comPhoneCheckCurrent.teleReviewObject = 'Nomor telepon';
                this.comPhoneCheckCurrent.realName = this.jobInfList.companyName;
                this.comPhoneCheckCurrent.mobile = this.jobInfList.companyPhone;
                //                this.comPhoneCheckId = '';
                this.comPhoneChecktableData.push(this.comPhoneCheckCurrent);
              }
            }
            if (this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].endTime) {
              this.comPhoneCheckStartVif = false;
              //              this.comPhoneCheckEndVif = false;
            } else {
              this.comPhoneCheckStartVif = true;
              //              this.comPhoneCheckEndVif = false;
              this.comPhoneCheckId = this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].id;
            }
          })
        })
      },
      comPhoneCheckStart(){
        this.comRecordStartTime = new Date();
        this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].startTime=this.getdates(this.comRecordStartTime);
        this.comPhoneCheckStartVif=false;
        // this.comPhoneCheckEndVif=true;
      },
      phoneCheckStart(){
        this.recordStartTime = new Date();
        this.phoneChecktableData[this.phoneChecktableData.length-1].startTime=this.getdates(this.recordStartTime);
        this.phoneCheckStartVif=false;
        this.phoneCheckEndVif=true;
      },
      phoneCheckEnd(){
        this.recordEndTime = new Date();
        this.phoneChecktableData[this.phoneChecktableData.length-1].endTime=this.getdates(this.recordEndTime);
        let dureTime=(this.recordEndTime-this.recordStartTime)/1000;
        let dureTimeH=Math.floor(dureTime/3600);
        let dureTimeM=Math.floor((dureTime%3600)/60)
        let dureTimeS=Math.floor((dureTime%3600)%60);
        this.phoneCheckCurrent.burningTime=dureTimeH+":"+dureTimeM+":"+dureTimeS;
        this.phoneChecktableData[this.phoneChecktableData.length-1].burningTime=this.phoneCheckCurrent.burningTime;
        this.phoneCheckStartVif=false;
        this.phoneCheckEndVif=false;
        let _data={
          "userUuid":this.userUuid,
          "createUser": DataUtil.id(),
          "updateUser": DataUtil.id(),
          "orderNo": this.uuid,
          "startTime": this.phoneChecktableData[this.phoneChecktableData.length-1].startTime,
          "endTime": this.phoneChecktableData[this.phoneChecktableData.length-1].endTime,
          "burningTime": this.phoneCheckCurrent.burningTime,
          "type":"1",
          "id": this.phoneCheckId,
          "langue":2
        }
        this.$http.post("manage/inserOrUpdateManOrderRemark", _data).then(response => {
          if (1 == response.body.code) {
            this.phoneCheckDialogLoading = false;
            this.checkDialogVisible = false;
            this.phoneCheckId=response.body.data;
            this.$message({
              message: 'Berhasil menyimpan',
              center: true
            });
          }
        })

      },
      phoneCheckBack(dialogType){
        this.checkDialogVisible = false;
        this.companyDialogVisible = false;
        this.phoneCheckDate="";
        this.companyDisabled2 = false;
        this.companyDisabled4 = false;
        this.companyDisabled6 = false;
        if (!this.companyDisabled) {
          this.checkTextarea="";
          this.dialogResultRadio="0";
          if (dialogType == '1') {
            this.dialogResultRadio21 = '0';
          } else if (dialogType == '2') {
            this.dialogResultRadio22 = '0';
            this.dialogResultRadio221 = '0';
            this.dialogResultRadio1 = '0';
            this.dialogResultRadio2 = '0';
            this.dialogResultRadio3 = '0';
//            this.dialogResultRadio4 = '0';
          } else if (dialogType == '3') {
            this.dialogResultRadio23 = '0';
          } else if (dialogType == '4') {
            this.dialogResultRadio24 = '0';
            this.dialogResultRadio5 = '0';
            this.dialogResultRadio6 = '0';
            this.dialogResultRadio7 = '0';
            this.dialogResultRadio8 = '0';
            this.dialogResultRadio9 = '0';
//            this.dialogResultRadio10 = '0';
          } else if (dialogType == '5') {
            this.dialogResultRadio25 = '0';
          } else if (dialogType == '6') {
            this.dialogResultRadio26 = '0';
            this.dialogResultRadio11 = '0';
            this.dialogResultRadio12 = '0';
            this.dialogResultRadio13 = '0';
            this.dialogResultRadio14 = '0';
            this.dialogResultRadio15 = '0';
//            this.dialogResultRadio16 = '0';
          }
        }
        this.workYearRadio = "0";
      },
      smallCompanyCancel(){
        this.smallCompanyDialogVisible = false;
        this.smallCompany="0";
      },
      smallCompanyOk() {
        if (this.smallCompany == '0') {
          this.$message("请选择需要的操作！");
          return;
        }
        this.smallCompanyDialogVisible = false;
      },
      // 点击添加公司弹框事件
      comDialCheckClick(row,index,type, showOrNot){
        this.comPhoneCheckIndex=index;
        this.companyDialogVisible=true;
        this.companyDisabled = false;
        this.companyResultDisabled = true;
        this.companyDisabled2 = false;
        this.companyDisabled4 = false;
        this.companyDisabled6 = false;
        this.realName = row.realName;
        this.mobile = row.mobile;
        if(row.id){
          this.comPhoneCheckId=row.id
        } else {
          this.comPhoneCheckId='';
        }
        //查看详情
        if (showOrNot === '1') {
          this.companyDisabled = true;
          this.companyDisabled2 = true;
          this.companyDisabled4 = true;
          this.companyDisabled6 = true;
          // this.companyResultDisabled = true;
          //数据回显
          let _data={
            "orderNo": this.uuid,
            "type": this.orderStatus.userRole,
            "uuid": this.userUuid,
            "langue":2,
            "teleReviewType":3
          };
          this.$http.post("manage/getTeleReviewQuestion", _data).then(response => {
            let questions = response.body.data.questions;
            //先处理没有问题的情况
            if (row.teleReviewOperationType === 1) {
              this.dialogResultRadio21 = "" + row.teleReviewResultType;
            } else if (row.teleReviewOperationType === 3) {
              this.dialogResultRadio23 = "" + row.teleReviewResultType;
            } else if (row.teleReviewOperationType === 5) {
              this.dialogResultRadio25 = "" + row.teleReviewResultType;
            } else if (row.teleReviewOperationType === 2) {
//              debugger;
              this.dialogResultRadio22 = "" + row.teleReviewResultType;
              this.dialogResultRadio221 = "" + row.teleReviewResultType;
              for (let i = 0; i < questions.length ; i++) {
                if (questions[i].manOrderRemarkId === row.id) {
                  this.dialogResultRadio1 = questions[i].answer;
                  this.dialogResultRadio2 = questions[i+1].answer;
                  this.dialogResultRadio3 = questions[i+2].answer;
                  break;
                }
              }
            } else if (row.teleReviewOperationType === 4) {
              this.dialogResultRadio24 = "" + row.teleReviewResultType;
              for (let i = 0; i < questions.length ; i++) {
                if (questions[i].manOrderRemarkId === row.id) {
                  this.dialogResultRadio5 = questions[i].answer;
                  this.dialogResultRadio7 = questions[i+1].answer;
                  this.dialogResultRadio8 = questions[i+2].answer;
                  this.dialogResultRadio9 = questions[i+3].answer;
                  break;
                }
              }
            } else if (row.teleReviewOperationType === 6) {
              this.dialogResultRadio26 = "" + row.teleReviewResultType;
              for (let i = 0; i < questions.length ; i++) {
                if (questions[i].manOrderRemarkId === row.id) {
                  this.dialogResultRadio11 = questions[i].answer;
                  this.dialogResultRadio13 = questions[i+1].answer;
                  this.dialogResultRadio14 = questions[i+2].answer;
                  this.dialogResultRadio15 = questions[i+3].answer;
                  break;
                }
              }
            }
          });
        } else {
          if (row.teleReviewObject === 'Nomor telepon') {
            if (type == '0') {
              this.dialogType = '1';
              this.dialogResultRadio21 = "0";
            } else {
              this.dialogType = '2';
              this.dialogResultRadio22 = "0" ;
              this.dialogResultRadio221 = "0";
              this.dialogResultRadio1 = "0";
              this.dialogResultRadio2 = "0";
              this.dialogResultRadio3 = "0";
            }
          } else if (row.teleReviewObject === 'Kontak yg sering dihubungi ke-1') {
            if (type == '0') {
              this.dialogType = '3';
              this.dialogResultRadio23 = "0";
            } else {
              this.dialogType = '4';
              this.dialogResultRadio24 = "0";
              this.dialogResultRadio5 = "0";
              this.dialogResultRadio7 = "0";
              this.dialogResultRadio8 = "0";
              this.dialogResultRadio9 = "0";
            }
          } else if (row.teleReviewObject === 'Kontak yg sering dihubungi ke-2'){
            if (type == '0') {
              this.dialogType = '5';
              this.dialogResultRadio25 = "0";
            } else {
              this.dialogType = '6';
              this.dialogResultRadio26 = "0";
              this.dialogResultRadio11 = "0";
              this.dialogResultRadio13 = "0";
              this.dialogResultRadio14 = "0";
              this.dialogResultRadio15 = "0";
            }
          }
          return;
        }
        if (row.teleReviewOperationType === 1) {
          this.dialogType = '1';
        } else if (row.teleReviewOperationType === 2) {
          this.dialogType = '2';
        } else if (row.teleReviewOperationType === 3) {
          this.dialogType = '3';
        } else if (row.teleReviewOperationType === 4) {
          this.dialogType = '4';
        } else if (row.teleReviewOperationType === 5) {
          this.dialogType = '5';
        } else if (row.teleReviewOperationType === 6) {
          this.dialogType = '6';
        }
      },
      // 点击添加个人LULUS备注
      phoneCheckClick(row,index, type){
        this.phoneCheckIndex=index;
        this.checkDialogVisible=true;
        if(row.id){
          this.phoneCheckId=row.id
        }
        if (type == 5) {
          this.dialogType = '5';
        } else if (type == 6) {
          this.dialogType = '6';
        } else if (type == 7) {
          this.dialogType = '7';
        }
      },
      companyReviewCommit(type){
        let dialogResultRadio = '0';
        let companyTeleQARequest = [];
        //判断是否稍后再拨
        let flag = false;
        if (type == '1') {
          dialogResultRadio = this.dialogResultRadio21;
          if (dialogResultRadio == '2') {
            flag = true;
          }
        } else if (type == '2') {
          companyTeleQARequest = [{'question':'apakah' + this.baseInfList.realName + 'bekerja di perusahaan ini?','answer':this.dialogResultRadio1, 'remark':'1'},
            {'question':'Kira-kira sudah berapa lama bekerja?','answer':this.dialogResultRadio2, 'remark':'2'},
            {'question':'Apakah kira-kira peminjam sedang dikejar penagihan oleh perusahaan lainnya?','answer':this.dialogResultRadio3, 'remark':'3'}];
          dialogResultRadio = this.dialogResultRadio22 == '0' ? this.dialogResultRadio221 : this.dialogResultRadio22;
        } else if (type == '4') {
          companyTeleQARequest = [{'question':'Apa hubungan Anda dengan yang peminjam? ','answer':this.dialogResultRadio5, 'remark':'1'},

            {'question':'Apakah peminjam sekarang berkerja?','answer':this.dialogResultRadio7, 'remark':'3'},
            {'question':'Kira-kira sudah berapa lama bekerja?','answer':this.dialogResultRadio8, 'remark':'4'},
            {'question':'Apakah kira-kira peminjam sedang dikejar penagihan oleh perusahaan lainnya?','answer':this.dialogResultRadio9, 'remark':'5'}];
          dialogResultRadio = this.dialogResultRadio24;
        } else if (type == '6') {
          companyTeleQARequest = [{'question':'Apa hubungan Anda dengan yang peminjam? ','answer':this.dialogResultRadio11, 'remark':'1'},

            {'question':'Apakah peminjam sekarang berkerja?','answer':this.dialogResultRadio13, 'remark':'3'},
            {'question':'Kira-kira sudah berapa lama bekerja?','answer':this.dialogResultRadio14, 'remark':'4'},
            {'question':'Apakah kira-kira peminjam sedang dikejar penagihan oleh perusahaan lainnya?','answer':this.dialogResultRadio15, 'remark':'5'}];
          dialogResultRadio = this.dialogResultRadio26;
        } else if(type == '3') {
          dialogResultRadio = this.dialogResultRadio23;
          if (dialogResultRadio == '2' || dialogResultRadio == '4' || dialogResultRadio == '5') {
            flag = true;
          }
        } else if (type == '5') {
          dialogResultRadio = this.dialogResultRadio25;
          if (dialogResultRadio == '2' || dialogResultRadio == '4' || dialogResultRadio == '5') {
            flag = true;
          }
        }
        if (dialogResultRadio == '0') {
          this.$message("Silahkan isi keterangan atau pilih hasil verifikasi！");
          return;
        }
        if (!flag) {
          this.smallCompany = '0';
        }
        let index= this.comPhoneCheckIndex ;
        if (this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].startTime) {
          this.comRecordEndTime = new Date();
          this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].endTime=this.getdates(this.comRecordEndTime);
          let dureTime=(this.comRecordEndTime-this.comRecordStartTime)/1000;
          let dureTimeH=Math.floor(dureTime/3600);
          let dureTimeM=Math.floor((dureTime%3600)/60);
          let dureTimeS=Math.floor((dureTime%3600)%60);
          this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].burningTime=dureTimeH+":"+dureTimeM+":"+dureTimeS;
          this.comPhoneCheckStartVif=false;
        }

        let _data={
          "userUuid":this.userUuid,
          "createUser": DataUtil.id(),
          "updateUser": DataUtil.id(),
          "orderNo": this.uuid,
          "alertTime": this.getdates(this.phoneCheckDate),
          "remark": this.checkTextarea,
          "type": "3",
          "id": this.comPhoneCheckId,
          "langue":2,
          "teleReviewResult":dialogResultRadio,
          "workYear":this.workYearRadio,
          "teleReviewOperationType":type,
          "companyTeleQARequest":companyTeleQARequest,
          "teleReviewResultType":dialogResultRadio,
          "realName":this.realName,
          "mobile":this.mobile,
          "startTime": this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].startTime,
          "endTime": this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].endTime,
          "burningTime": this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].burningTime,
          "judgeDialog": this.smallCompany
        };
        this.$http.post("manage/inserOrUpdateManOrderRemark", _data,false).then(response => {
          if (1 == response.body.code) {
            this.companyDialogVisible = false;
            this.comPhoneCheckId = response.body.data;
//            this.$message({
//              message: '提交成功',
//              center: true
//            });
            this.showCompanyLastData(index);
          }
        })
      },
      phoneCheckCommit(type){

        if (this.checkTextarea == '' && this.dialogResultRadio == '0') {
          this.$message.error("Silahkan isi keterangan atau pilih hasil verifikasi");
          return ;
        }
        // if (this.workYearRadio == '0' && type < 5) {
        //   this.$message.error("请选择durasi kerja");
        //   return ;
        // }
        this.phoneCheckDialogLoading = true;
        let index= type < 5 ? this.comPhoneCheckIndex : this.phoneCheckIndex;
        let _data={
          "userUuid":this.userUuid,
          "createUser": DataUtil.id(),
          "updateUser": DataUtil.id(),
          "orderNo": this.uuid,
          "alertTime": this.getdates(this.phoneCheckDate),
          "remark": this.checkTextarea,
          "type":type <5 ? "3" : "1",
          "id": type <5 ? this.comPhoneCheckId : this.phoneCheckId,
          "langue":2,
          "teleReviewResult":this.dialogResultRadio,
          "workYear":this.workYearRadio,
          "operationType":type <5 ? this.dialogType : this.dialogType - 4
        };
        this.$http.post("manage/inserOrUpdateManOrderRemark", _data).then(response => {
          if (1 == response.body.code) {
            this.phoneCheckDialogLoading = false;
            this.checkDialogVisible = false;
            if (type < 5) {
              this.comPhoneCheckId = response.body.data;
            } else {
              this.phoneCheckId=response.body.data;
            }
            this.$message({
              message: 'Kirim Berhasil',
              center: true
            });

            this.showLastData(type, index);
            this.checkTextarea="";
            this.phoneCheckDate="";
            this.dialogResultRadio="0";
            this.workYearRadio = "0";
          }
        })
      },
      showCompanyLastData(index) {
        this.checkTextarea = '';
        let _data={
          "orderNo": this.uuid,
          "uuid": this.userUuid,
          "langue":2,
          "type": 1,//此处传死
          "teleReviewType":3
        }
        this.$http.post("manage/getTeleReviewQuestion", _data).then(response => {

          let pass = response.body.data.pass;
          let res = response.body.data.remarks;
          if (res && res.length > 0) {
            let teleType = res[res.length-1].teleReviewOperationType;

            //进行最后一行记录赋值
            let data = res[res.length - 1];
            this.comPhoneChecktableData[index].id = data.id;
            this.comPhoneChecktableData[index].teleReviewResultType = data.teleReviewResultType;
            this.comPhoneChecktableData[index].alertTime=this.getdates(data.alertTime);
            this.comPhoneChecktableData[index].remark=data.remark;
            this.comPhoneChecktableData[index].teleReviewResult = data.teleReviewResult;
            this.comPhoneChecktableData[index].teleReviewOperationType = data.teleReviewOperationType;
            this.comPhoneChecktableData[index].updateTime = data.remark == '' ? '' : this.getdates(data.updateTime);
            if (this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].startTime) {
              this.comPhoneCheckStartVif = false;
//            this.comPhoneCheckEndVif = false;
            } else {
              this.comPhoneCheckStartVif = true;
//            this.comPhoneCheckEndVif = false;
            }
            //重置
            let comPhoneCheckCurrent1 = {
              "remark": "",
              "orderTag": 0,
              "alertTime": '',
              "startTime": '',
              "endTime": '',
              "burningTime": "",
              "current": true,
              "workYear": "",
              "teleReviewResult":"",
              "realName":'',
              "mobile":'',
              "teleReviewObject":"Nomor telepon",
              "teleReviewOperationType":"",
              "teleReviewResultType":""
            };
            //第一常用联系人
            if (pass == 2 || (!pass && (teleType == 1 || teleType == 2))
              || (pass == 4 && (teleType == 3 || teleType == 4))) {
              comPhoneCheckCurrent1.teleReviewObject = 'Kontak yg sering dihubungi ke-1';
              comPhoneCheckCurrent1.realName = this.realName1;
              comPhoneCheckCurrent1.mobile = this.mobile1;
              //                this.comPhoneCheckId = '';
              this.comPhoneChecktableData.push(comPhoneCheckCurrent1);
            } else if (pass == 3 || (!pass && (teleType == 3 || teleType == 4))
              || (pass == 4 && (teleType == 5 || teleType == 6))) {
              comPhoneCheckCurrent1.teleReviewObject = 'Kontak yg sering dihubungi ke-2';
              comPhoneCheckCurrent1.realName = this.realName2;
              comPhoneCheckCurrent1.mobile = this.mobile2;
              //                this.comPhoneCheckId = '';
              this.comPhoneChecktableData.push(comPhoneCheckCurrent1);
              //稍后再拨
            } else if (pass == 4 && (teleType == 1 || teleType == 2)) {
              comPhoneCheckCurrent1.teleReviewObject = 'Nomor telepon';
              comPhoneCheckCurrent1.realName = this.jobInfList.companyName;
              comPhoneCheckCurrent1.mobile = this.jobInfList.companyPhone;
              //                this.comPhoneCheckId = '';
              this.comPhoneChecktableData.push(comPhoneCheckCurrent1);
            }
          }
          if (this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].endTime) {
            this.comPhoneCheckStartVif = false;
            //              this.comPhoneCheckEndVif = false;
          } else {
            this.comPhoneCheckStartVif = true;
            //              this.comPhoneCheckEndVif = false;
            this.comPhoneCheckId = this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].id;
          }
          if (pass == 1) {
            this.passOrNot = '1';
          }
        })
      },
      showLastData(type,index) {
        let _data={
          "orderNo": this.uuid,
          "uuid": this.userUuid,
          "langue":2,
          "type": 1,//此处传死
          "teleReviewType":type <5 ? 3 : 1 //3公司，1个人
        }
        this.$http.post("manage/getTeleReviewQuestion", _data).then(response => {

          if (response.body.data.pass == '1') {
            this.passOrNot = '1';
          }
          let res=response.body.data.remarks;
          if (!res) {
            return;
          }
          let data = res[0];
          if (type <5) {
            this.comPhoneChecktableData[index].alertTime=this.getdates(data.alertTime);
            this.comPhoneChecktableData[index].remark=data.remark;
            this.comPhoneChecktableData[index].workYear = data.workYear;
            this.comPhoneChecktableData[index].teleReviewResult = data.teleReviewResult;
            this.comPhoneChecktableData[index].updateTime = this.getdates(data.updateTime);
          } else {
            this.phoneChecktableData[index].alertTime=this.getdates(data.alertTime);
            this.phoneChecktableData[index].remark=data.remark;
            this.phoneChecktableData[index].workYear = data.workYear;
            this.phoneChecktableData[index].teleReviewResult = data.teleReviewResult;
            this.phoneChecktableData[index].updateTime = this.getdates(data.updateTime);
          }
        })
      }
    },
    mounted: function () {
      this.uuid = this.$route.query['uuid']||'';
      this.userUuid = this.$route.query['userUuid']||'';
      this.sessionId=DataUtil.sid();
      this.getOrderStatus();
      this.getHistoryDetail();
      this.getCheckRule();
      this.getcheckSuggest();
      this.getPairVerifySimilarity();
    }

  }
</script>

<style>
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
  /*  .asides tr :nth-child(1){
      width: 30%;
    }
    .asides tr :nth-child(2){
      width: 70%;
      }*/

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
    font-weight: bold;
    color: #888;
    margin: 10px 0
  }
  .company-pass{
    font-size:11px;

  }
  .subtitle{
    font-size: 13px;
    color: #888;
  }
  .orderBox .el-row {
    margin: 15px 30px;
  }
  /*.orderBox .el-col span{*/
  /*margin-right: 10px;*/
  /*}*/
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
  .imgCss{
    display:block;
    width: 100%;
    height: 250px;
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
  .asides .faceCheck .faceImgTop {
    width: 45%;
    height: 250px;
    /*overflow: hidden;*/
    margin: 1.5%;
    float: left;
    text-align: center;
  }
  .asides .faceCheck .faceImgTop img{
    margin: 0 auto;
    height: 200px;
    display: block;
    border: .5px solid #F1F2F7;
    border-radius: 5px;
  }
  .asides .faceCheck .faceImgBottom {
    width: 90%;
    height: 350px;
    overflow: hidden;
    margin: 2.5%;
    float: left;
    text-align: center;

  }
  .asides .faceCheck .faceImgBottom img{
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

