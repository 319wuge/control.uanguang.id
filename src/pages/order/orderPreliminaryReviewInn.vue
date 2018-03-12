/**
* Created by alan on 2017/3/10.
*/
<template>
  <section class="orderBox">
    <div class="divid-line"></div>
    <!-- 订单状态 -->
    <el-row>
      <div class="one-title">Status Permohonan</div>  <!-- 订单状态 -->
      <el-col :span="8" class="grid-content">
        <div><span>Nomor Permohonan:</span><span>{{ uuid }}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Waktu Pengajuan:</span><span>{{orderStatus.createTime}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Urutan Pengajuan:</span><span><el-tag :type="orderStatus.orderStep==0?'success':'primary'"><span>{{"Pengajuan ke-"+orderStatus.orderStep}}</span></el-tag></span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Jumlah pinjaman:</span><span>{{orderStatus.amountApply}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Durasi pinjaman:</span><span>{{orderStatus.borrowingTerm}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Petugas manual pertama:</span><span>{{orderStatus.firstChecker}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Tujuan pinjaman:</span><span>{{orderStatus.borrowUse}}</span></div>
      </el-col>
    </el-row>
    <div class="divid-line"></div>
    <el-row>
      <div class="one-title">Riwayat Permohonan</div>
      <el-table :data="historyData" v-loading="historyLoading" @row-click="rowClick" size="large">
        <el-table-column prop="borrowingCount" width="180" label="Urutan Pengajuan"></el-table-column>
        <el-table-column prop="createTime" width="200" label="Waktu Pengajuan">
          <template scope="scope">
            <span>{{getdate(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uuid" width="240" label="Nomor Permohonan"></el-table-column>
        <el-table-column prop="status" width="240" label="Hasil Verifikasi">
          <template scope="scope">
            <span>{{getOrderPro(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="Keterangan"></el-table-column>
      </el-table>
    </el-row>
    <div class="divid-line"></div>
    <!-- 客户信息 baseInf-->
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
              <td>{{this.hideUserPhone(baseInfList.mobileNumberDES)}}</td>
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
              <td>{{this.hideUserPhone(baseInfList.mobileNumberDES)}}</td>
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
              <td>{{this.hideUserPhone(baseInfList.fatherMobile)}}</td>
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
              <td>{{this.hideUserPhone(baseInfList.motherMobile)}}</td>
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
                <el-button @click="baseInfSave" type="primary" size="small">Simpan</el-button>
                <el-button @click="baseInfEdit" type="primary" size="small">Ubah</el-button>
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
            <td>{{this.hideUserPhone(jobInfList.companyPhone)}}</td>
          </tr>
        </table>
      </div>
      <div class="mains">
        <div class="check_rule">
          <el-form label-width="140px">
            <el-form-item label="Peraturan verifikasi">
              <el-button @click="jobInfSave" type="primary" size="small">Simpan</el-button>
              <el-button @click="jobInfEdit" type="primary" size="small">Ubah</el-button>
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
              <el-button @click="jobInfSave" type="primary" size="small">Simpan</el-button>
              <el-button @click="jobInfEdit" type="primary" size="small">Ubah</el-button>
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
          <td>{{this.hideUserPhone(connectInfList.contactsMobile1)}}</td>
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
          <td>{{this.hideUserPhone(connectInfList.contactsMobile2)}}</td>
        </tr>
        <tr>
          <td>Nomor telepon sekunder</td>
          <td>{{this.hideUserPhone(connectInfList.alternatePhoneNo)}}</td>
        </tr>
      </table>
    </div>
    <div class="mains">
      <div class="check_rule">
        <el-form label-width="140px">
          <el-form-item label="Peraturan verifikasi">
            <el-button @click="connectInfSave" type="primary" size="small">Simpan</el-button>
            <el-button @click="connectInfEdit" type="primary" size="small">Ubah</el-button>
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
            <el-button @click="faceCheckSave" type="primary" size="small">Simpan</el-button>
            <el-button @click="faceCheckEdit" type="primary" size="small">Ubah</el-button>
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
          <el-button @click="videoCheckSave" type="primary" size="small">Simpan</el-button>
          <el-button @click="videoCheckEdit" type="primary" size="small">Ubah</el-button>
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
      <div class="question_radio">
        <div class="question_text">10、Video sama sekali tidak membacakan teks？</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[9].ruleResult"></el-checkbox>
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
            <el-col ><div class="lastTitle">Keterangan Lainnya</div><el-button @click="addtionInfSave" type="primary" size="small">Simpan</el-button>
              <el-button @click="addtionInfEdit" type="primary" size="small">Ubah</el-button></el-col>
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
<!-- 提交   -->
<el-form id="btnForm">
  <el-form-item align="right">
    <el-button @click="dialogVisible1 = true" type="primary"> lebih baik ditolak</el-button>
    <el-button @click="dialogVisible = true" type="primary">Rekomendasi</el-button>
  </el-form-item>
</el-form>
<el-dialog
title="Rekomendasi"
:visible.sync="dialogVisible"
width="50%">
<el-col>
  <i class="el-icon-warning"></i>Apakah Anda yakin mengirim hasil verifikasi ini?
</el-col>
<el-col>
  <i>Hasil Verifikasi:</i>
  <el-radio-group v-model="radio">
    <el-radio :label="1">Best</el-radio>
    <el-radio :label="2">Baik</el-radio>
    <el-radio :label="3">Normal</el-radio>
  </el-radio-group>
</el-col>
<el-input
type="textarea"
:rows="6"
placeholder=""
v-model="reviewRemark"
class = 'textarear'>
</el-input>
<span slot="footer" class="dialog-footer">
  <el-button @click="dialogVisible = false">BATAL</el-button>
  <el-button type="primary" @click="reviewDialog(1)">Kirim</el-button>
</span>
</el-dialog>
<el-dialog
title="lebih baik ditolak"
:visible.sync="dialogVisible1"
width="50%">
<el-col>
  <i class="el-icon-warning"></i>Apakah Anda yakin mengirim hasil verifikasi ini?
</el-col>
<el-col>
  <i>Hasil Verifikasi:</i>
  <el-radio v-model="radio" label="4">tidak cocok kualifikasi</el-radio>
  <el-radio v-model="radio" label="5">informasi tidak sama</el-radio>
</el-col>
<el-input
type="textarea"
:rows="6"
placeholder=""
v-model="reviewRemark1"
class = 'textarear'>
</el-input>
<span slot="footer" class="dialog-footer">
  <el-button @click="dialogVisible1 = false">BATAL</el-button>
  <el-button type="primary" @click="reviewDialog(2)">Kirim</el-button>
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

      orderStatus: {
          borrowingCount: '',//借款次数
          createTime: '',//申请时间
          uuid: '', //订单编号;
        },
        status: '', //审核结果
        remark: '', //审核意见
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

        // check显示
        baseInfShow: false,
        jobInfShow: false,
        connectInfShow: false,
        faceCheckShow: false,
        videoCheckShow: false,
        addtionInfShow: false,
        //备注
        baseInfRemark: '',
        jobInfRemark: '',
        connectInfRemark: '',
        faceCheckRemark: '',
        videoCheckRemark: '',
        addtionInfRemark: '',
        // Peraturan verifikasi
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
          attachmentUrl: require("../../assets/noneInn.png")
        },{
          attachmentName:"驾驶证",
          attachmentType:5,
          attachmentUrl: require("../../assets/noneInn.png")
        },{
          attachmentName:"税卡",
          attachmentType:6,
          attachmentUrl: require("../../assets/noneInn.png")
        },{
          attachmentName:"家庭卡",
          attachmentType:7,
          attachmentUrl: require("../../assets/noneInn.png")
        },{
          attachmentName:"工资卡",
          attachmentType:8,
          attachmentUrl: require("../../assets/noneInn.png")
        },{
          attachmentName:"银行卡流水",
          attachmentType:9,
          attachmentUrl: require("../../assets/noneInn.png")
        }],
        workerSeen: true,
        studentSeen: false,
        isActive:true,
        noActive:false,
        userUuid: "",
        uuid: "",
        radio:"",
        IsStudents: false,
        sessionId: '',
        dialogVisible: false,
        dialogVisible1:false,
        reviewRemark: '',
        reviewRemark1: '',
        pairVerifySimilarity: '',
        //印尼版订单进度
        orderPros:[{
          code: "1",
          name: "Menunggu mengirim"
        },{
          code: "2",
          name: "menunggu verifikasi otomatis"
        }, {
          code: "3",
          name: "Menunggu verifikasi manual pertama"
        },{
          code: "4",
          name: "Menunggu verifikasi manual akhir "
        }, {
          code: "5",
          name: "Menunggu dana cair"
        },{
          code: "6",
          name: "Dalam proses pencairan dana"
        },{
          code: "7",
          name: "Menunggu pelunasan pinjaman",
        },{
          code: "8",
          name: "Menunggu pelunasan pinjaman (terlambat)"
        },{
          code: "9",
          name: "Dalam proses pelunasan pinjaman"
        },{
          code: "10",
          name: "Pelunasan tepat waktu "// 订单生命周期完成 (正常完成)
        },{
          code: "11",
          name: "Pelunasan terlambat "// 订单生命周期完成 (正常完成)
        },{
          code: "12",
          name: "Tidak lulus verifikasi otomatis"// (异常完成)
        },{
          code: "13",
          name: "Tidak lulus verifikasi manual pertama"// (异常完成)
        },{
          code: "14",
          name: "Tidak lulus verifikasi manual akhir"// (异常完成)
        },{
          code: "15",
          name: "Permohonan dibatalkan"// 因为审核不通过被取消，订单生命周期完成(异常完成)
        }]
      }
    },
    methods: {
      formatUnixDateTime(time){
        return DataUtil.formatUnixDateTime(time);
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
      // Ubah按钮click
      baseInfEdit(){
        this.baseInfShow=false;
      },
      jobInfEdit(){
        this.jobInfShow=false;
      },
      connectInfEdit(){
        this.connectInfShow=false;
      },
      faceCheckEdit(){
        this.faceCheckShow=false;
      },
      videoCheckEdit(){
        this.videoCheckShow=false;
      },
      addtionInfEdit(){
        this.addtionInfShow=false;
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
      // Simpan按钮
      baseInfSave(){
        if(this.baseInfShow==true){
          this.$message('Ubah dulu, lalu simpan.');return;
        }
        let _data={
          "orderNo":this.uuid,
          "checkRuleRemark":{"remark": this.baseInfRemark},
          "checkRuleList": this.baseRuleList,
          "infoType": 1,
          "sessionId": this.sessionId
        }
        if(this.IsStudents==true){
          _data.infoType=2;
        }
        this.$http.post("manage/manOrderCheckRuleEdit", _data).then(response => {
          if (1 == response.body.code) {
            this.$message('Berhasil menyimpan');
            this.baseInfShow=true;
          }else{
            this.$message('Verifikasi gagal');
          }
        })
      },
      jobInfSave(){
        if(this.jobInfShow==true){
          this.$message('Ubah dulu, lalu simpan.');return;
        }
        let _data={
          "orderNo":this.uuid,
          "checkRuleRemark":{"remark": this.jobInfRemark},
          "checkRuleList": this.jobRuleList,
          "infoType": 3,
          "sessionId": this.sessionId
        }
        if(this.IsStudents==true){
          _data.infoType=4;
          _data.checkRuleList = this.jobRuleList1;
        }
        this.$http.post("manage/manOrderCheckRuleEdit", _data).then(response => {
          if (1 == response.body.code) {
            this.$message('Berhasil menyimpan');
            this.jobInfShow=true;
          }else{
            this.$message('Verifikasi gagal');
          }
        })
      },
      connectInfSave(){
        if(this.connectInfShow==true){
          this.$message('Ubah dulu, lalu simpan.');return;
        }
        let _data={
          "orderNo":this.uuid,
          "checkRuleRemark":{"remark": this.connectInfRemark},
          "checkRuleList": this.connectRuleList,
          "infoType": 5,
          "sessionId": this.sessionId
        }
        this.$http.post("manage/manOrderCheckRuleEdit", _data).then(response => {
          if (1 == response.body.code) {
            this.$message('Berhasil menyimpan');
            this.connectInfShow=true;
          }else{
            this.$message('Verifikasi gagal');
          }
        })
      },
      faceCheckSave(){
        if(this.faceCheckShow==true){
          this.$message('Ubah dulu, lalu simpan.');return;
        }
        let _data={
          "orderNo":this.uuid,
          "checkRuleRemark":{"remark": this.faceCheckRemark},
          "checkRuleList": this.faceCheckRuleList,
          "infoType": 6,
          "sessionId": this.sessionId
        }
        this.$http.post("manage/manOrderCheckRuleEdit", _data).then(response => {
          if (1 == response.body.code) {
            this.$message('Berhasil menyimpan');
            this.faceCheckShow=true;
          }else{
            this.$message('Verifikasi gagal');
          }
        })
      },
      videoCheckSave(){
        if(this.videoCheckShow==true){
          this.$message('Ubah dulu, lalu simpan.');return;
        }
        let _data={
          "orderNo":this.uuid,
          "checkRuleRemark":{"remark": this.videoCheckRemark},
          "checkRuleList": this.videoCheckRuleList,
          "infoType": 7,
          "sessionId": this.sessionId
        }
        this.$http.post("manage/manOrderCheckRuleEdit", _data).then(response => {
          if (1 == response.body.code) {
            this.$message('Berhasil menyimpan');
            this.videoCheckShow=true;
          }else{
            this.$message('Verifikasi gagal');
          }
        })
      },
      addtionInfSave(){
        if(this.addtionInfShow==true){
          this.$message('Ubah dulu, lalu simpan.');return;
        }
        let _data={
          "orderNo":this.uuid,
          "checkRuleRemark":{"remark": this.addtionInfRemark},
          "checkRuleList": this.otherCheckRuleList,
          "infoType": 8,
          "sessionId": this.sessionId
        }
        this.$http.post("manage/manOrderCheckRuleEdit", _data).then(response => {
          if (1 == response.body.code) {
            this.$message('Berhasil menyimpan');
            this.addtionInfShow=true;
          }else{
            this.$message('Verifikasi gagal');
          }
        })
      },

      //当前订单状态
      getOrderStatus(){
        let _data={
          "uuid": this.uuid,
        }
        this.$http.post("manage/orderInfoByUuid", _data).then(response => {
          if (1 == response.body.code) {
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
      getIndex(index){
        return this.historyData.lenght-index+1;
      },
      //枚举订单状态
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
          return re
        }else{
          return enums.getOrderPro(val)
        }
      },
      //获取Peraturan verifikasi
      getCheckRule(){
        for(let type=1;type<10;type++){
          let _data={
            "orderNo": this.uuid,
            "infoType": type
          }
          this.$http.post("manage/manOrderCheckRuleInfo", _data).then(response => {
            if (1 == response.body.code && response.body.data.checkRuleList[0]) {
              let data=response.body.data;
              if(type==1&&data.checkRuleList!==''&&data.checkRuleList.length===14){this.baseRuleList=data.checkRuleList;this.baseInfRemark=data.checkRuleRemark.remark;}
              if(type==2&&data.checkRuleList!==''&&data.checkRuleList.length===14){this.baseRuleList=data.checkRuleList;this.baseInfRemark=data.checkRuleRemark.remark}
              if(type==3&&data.checkRuleList!==''&&data.checkRuleList.length===11){this.jobRuleList=data.checkRuleList;this.jobInfRemark=data.checkRuleRemark.remark;}
              if(type==4&&data.checkRuleList!==''&&data.checkRuleList.length===7){this.jobRuleList1=data.checkRuleList;this.jobInfRemark=data.checkRuleRemark.remark}
              if(type==5&&data.checkRuleList!==''&&data.checkRuleList.length===2){this.connectRuleList=data.checkRuleList;this.connectInfRemark=data.checkRuleRemark.remark}
              if(type==6&&data.checkRuleList!==''&&data.checkRuleList.length===4){this.faceCheckRuleList=data.checkRuleList;this.faceCheckRemark=data.checkRuleRemark.remark}
              if(type==7&&data.checkRuleList!==''&&data.checkRuleList.length===10){this.videoCheckRuleList=data.checkRuleList;this.videoCheckRemark=data.checkRuleRemark.remark}
              if(type==8&&data.checkRuleList!==''&&data.checkRuleList.length===4){this.otherCheckRuleList=data.checkRuleList;this.addtionInfRemark=data.checkRuleRemark.remark}
            }
        })
        }
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
      //获取用户基本信息
      getBaseInf(userUuid,type){
        let _data={
          "userUuid": this.userUuid,
          "type": type,
          "langue":2
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
              data.forEach(function(obj) {
                if(obj.attachmentType==4){
                  adt[0].attachmentUrl=obj.attachmentUrl;
                }
                if(obj.attachmentType==5){
                  adt[1].attachmentUrl=obj.attachmentUrl;
                }
                if(obj.attachmentType==6){
                  adt[2].attachmentUrl=obj.attachmentUrl;
                }
                if(obj.attachmentType==7){
                  adt[3].attachmentUrl=obj.attachmentUrl;
                }
                if(obj.attachmentType==8){
                  adt[4].attachmentUrl=obj.attachmentUrl;
                }
                if(obj.attachmentType==9){
                  adt[5].attachmentUrl=obj.attachmentUrl;
                }
              });
              this.addtionInfList=adt;
            }
            if(type==9){
              this.playerOptions.sources[0].src=data[0].attachmentUrl;
            }
          }
        })
      },
      //提交复审
      reviewDialog(type){
        if (type == 1) {
          if (this.reviewRemark == '' && !this.radio) {
            this.$message.error("pilih hasil manual pertama");
            return ;
          }
        }else{
          if (this.reviewRemark1 == '' && !this.radio) {
            this.$message.error("pilih hasil manual pertama");
            return ;
          }
        }
        // if (type ==2) {
        //   this.dialogVisible1=true;
        //   this.dialogVisible=false;

        // } else if (type ==1) {
        //   this.dialogVisible=true;
        //   this.dialogVisible1=false;
        // }

        let _data={
          "remark": type == 1 ? this.reviewRemark : this.reviewRemark1,  //必填
          "orderNo": this.uuid,
          "sessionId": this.sessionId,
          "type" : this.radio
        }
        this.$http.post("manage/firstCheck", _data).then(response => {
          if (1 == response.body.code) {
            this.dialogVisible=false;
            this.dialogVisible1=false;
            this.$message("Berhasil menyimpan");
            window.close();
            window.open('#/RiviewTheListFirstInn');
            return;
          }else{
            this.$message(response.body.message);
            this.dialogVisible=false;
            this.dialogVisible1=false;
            window.close();
            window.open('#/RiviewTheListFirstInn');
            return;
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
      hideUserPhone(phone) {
        if (phone == '' || phone.length < 5) {
          return phone;
        }
        var mobile = '';
        for (var index = 0; index < phone.length - 4 ;index++ ) {
          mobile += '*';
        }
        mobile = mobile + phone[phone.length - 4] + phone[phone.length - 3]
          + phone[phone.length - 2] + phone[phone.length - 1];
        return mobile;
      }
    },
    mounted: function () {
      this.uuid = this.$route.query['uuid']||'';
      this.userUuid = this.$route.query['userUuid']||'';
      this.sessionId=DataUtil.sid();
      this.getOrderStatus();
      this.getHistoryDetail();
      this.getCheckRule();
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
/*    border: .5px solid #F1F2F7;
border-radius: 5px;*/
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
.textarear .el-textarea__inner{
  font-size:15px;
  font-weight: 900;
}
</style>
